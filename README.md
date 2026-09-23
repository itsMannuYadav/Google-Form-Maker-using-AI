# AI Google Form Builder 🚀

A modern, production-ready web application that enables administrative staff, government officers, and educators to design and publish structured Google Forms through natural conversation.

---

## 🌟 Key Features

1. **Natural Language Form Design:** Describe your form requirements in plain English.
2. **Intelligent Clarification:** AI asks 1-2 focused questions with clickable suggestion chips to refine questions and sections.
3. **Real-time Live Preview:** Visual Google Forms style preview with instant inline title edits, drag/reorder, duplicate, delete, and manual question settings modal.
4. **Natural Language Modifications:** Modify forms on the fly (e.g. *"Make mobile number mandatory"*, *"Add district question"*, *"Remove gender"*).
5. **Direct Google Forms API Creation:** Generates authentic Google Forms in your Google Drive with direct responder links and edit links.
6. **Government & Admin Friendly UI:** High-trust, calm design system with zero technical jargon.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Authentication:** Firebase Authentication (Google OAuth with `forms.body` & `drive.file` scopes)
- **Database & Storage:** Firebase Cloud Firestore (with local demo storage fallback)
- **AI Engine:** Groq API (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b` with Zod structured output validation and multilingual support)
- **Google Integration:** Google Forms API v1 (`forms.v1`), Google Drive API v3
- **Icons:** Lucide React

---

## 🚀 Quick Start

### 1. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your API keys (optional for instant sandbox testing):
- `GROQ_API_KEY`: Groq API Key from [console.groq.com](https://console.groq.com)
- `NEXT_PUBLIC_FIREBASE_*`: Firebase Web configuration from Firebase Console
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google Cloud OAuth credentials

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

- **Production Build:** `npm run build`
- **Lint:** `npm run lint`
