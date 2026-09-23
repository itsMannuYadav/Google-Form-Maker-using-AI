// Server-side handling of files attached to a form request. Files are processed
// in memory only and never stored.

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5MB body limit

// Groq's free tier allows ~8K tokens/minute, so keep extracted document text
// small enough to leave room for the system prompt and the model's reply.
const MAX_DOCUMENT_CHARS = 12000;

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type FormAttachment =
  | { kind: "image"; name: string; dataUrl: string }
  | { kind: "document"; name: string; text: string; truncated: boolean };

export class AttachmentError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((b, i) => bytes[i] === b);
}

// Identify the file by its magic bytes rather than trusting the browser-supplied type.
function detectType(bytes: Uint8Array): "jpeg" | "png" | "webp" | "pdf" | "zip" | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpeg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47])) return "png";
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes.subarray(8), [0x57, 0x45, 0x42, 0x50])) return "webp";
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46])) return "pdf";
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])) return "zip";
  return null;
}

function cleanText(text: string) {
  return text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

export async function extractAttachment(file: File): Promise<FormAttachment> {
  if (file.size === 0) {
    throw new AttachmentError("The uploaded file is empty.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new AttachmentError("That file is too large. Please upload a file under 4 MB.", 413);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = detectType(bytes);
  const name = file.name || "attachment";

  if (type === "jpeg" || type === "png" || type === "webp") {
    const mime = type === "jpeg" ? "image/jpeg" : `image/${type}`;
    const dataUrl = `data:${mime};base64,${Buffer.from(bytes).toString("base64")}`;
    return { kind: "image", name, dataUrl };
  }

  let text = "";

  if (type === "pdf") {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const pdf = await getDocumentProxy(bytes);
    const result = await extractText(pdf, { mergePages: true });
    text = cleanText(result.text as string);
    if (!text) {
      throw new AttachmentError(
        "This PDF has no readable text (it looks scanned). Please upload a photo or screenshot of the page instead."
      );
    }
  } else if (type === "zip" && (file.type === DOCX_MIME || name.toLowerCase().endsWith(".docx"))) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer: Buffer.from(bytes) });
    text = cleanText(result.value);
    if (!text) {
      throw new AttachmentError("This Word document doesn't contain any readable text.");
    }
  } else {
    throw new AttachmentError(
      "Unsupported file type. Please upload an image (JPG, PNG, WEBP), a PDF, or a Word (.docx) document.",
      415
    );
  }

  const truncated = text.length > MAX_DOCUMENT_CHARS;
  return {
    kind: "document",
    name,
    text: truncated ? text.slice(0, MAX_DOCUMENT_CHARS) : text,
    truncated,
  };
}
