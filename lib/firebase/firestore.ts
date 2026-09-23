import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./client";
import { SavedFormRecord, FormDefinition } from "@/types/form";

const FORMS_COLLECTION = "forms";
const LOCAL_STORAGE_KEY = "ai_google_forms_history";

// Helper to check if Firebase is configured with real project credentials
function isRealFirebaseConfigured(): boolean {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return Boolean(apiKey && !apiKey.includes("DemoDummyKey"));
}

// Local storage fallback for seamless local testing without Firebase configuration
function getLocalForms(userId: string): SavedFormRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const all: SavedFormRecord[] = JSON.parse(raw);
    return all.filter((f) => f.userId === userId);
  } catch {
    return [];
  }
}

function saveLocalForm(form: SavedFormRecord): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const all: SavedFormRecord[] = raw ? JSON.parse(raw) : [];
    const index = all.findIndex((f) => f.id === form.id);
    if (index >= 0) {
      all[index] = form;
    } else {
      all.unshift(form);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error("Local storage save error:", err);
  }
}

function deleteLocalForm(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    const all: SavedFormRecord[] = JSON.parse(raw);
    const filtered = all.filter((f) => f.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Local storage delete error:", err);
  }
}

export async function saveFormDraft(
  userId: string,
  formDef: FormDefinition,
  formId?: string
): Promise<SavedFormRecord> {
  const id = formId || `form_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = Date.now();

  const record: SavedFormRecord = {
    id,
    userId,
    title: formDef.title || "Untitled Form",
    description: formDef.description || "",
    status: "draft",
    createdAt: now,
    updatedAt: now,
    formDefinition: formDef,
  };

  if (isRealFirebaseConfigured()) {
    try {
      const docRef = doc(db, FORMS_COLLECTION, id);
      await setDoc(docRef, {
        ...record,
        updatedAt: serverTimestamp(),
      });
      return record;
    } catch (e) {
      console.warn("Firestore save failed, falling back to local storage:", e);
    }
  }

  saveLocalForm(record);
  return record;
}

export async function getUserForms(userId: string): Promise<SavedFormRecord[]> {
  if (isRealFirebaseConfigured()) {
    try {
      // Note: intentionally no orderBy() here — combining it with the where()
      // clause below requires a Firestore composite index that this project
      // does not provision. Sorting is done client-side instead.
      const q = query(collection(db, FORMS_COLLECTION), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const forms: SavedFormRecord[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        forms.push({
          ...data,
          id: docSnap.id,
          createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : data.createdAt || Date.now(),
          updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : data.updatedAt || Date.now(),
        } as SavedFormRecord);
      });
      forms.sort((a, b) => b.updatedAt - a.updatedAt);
      if (forms.length > 0) return forms;
    } catch (e) {
      console.warn("Firestore fetch failed, falling back to local storage:", e);
    }
  }

  return getLocalForms(userId);
}

export async function getFormById(id: string): Promise<SavedFormRecord | null> {
  if (isRealFirebaseConfigured()) {
    try {
      const docRef = doc(db, FORMS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : data.createdAt || Date.now(),
          updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : data.updatedAt || Date.now(),
        } as SavedFormRecord;
      }
    } catch (e) {
      console.warn("Firestore getById failed, falling back to local storage:", e);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const all: SavedFormRecord[] = JSON.parse(raw);
        const match = all.find((f) => f.id === id);
        if (match) return match;
      }
    } catch {}
  }

  return null;
}

export async function updateFormPublication(
  id: string,
  googleFormId: string,
  responderUri: string,
  editUri?: string
): Promise<void> {
  const updates: Partial<SavedFormRecord> = {
    googleFormId,
    responderUri,
    editUri,
    status: "published",
    updatedAt: Date.now(),
  };

  if (isRealFirebaseConfigured()) {
    try {
      const docRef = doc(db, FORMS_COLLECTION, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore update publication failed:", e);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const all: SavedFormRecord[] = JSON.parse(raw);
        const index = all.findIndex((f) => f.id === id);
        if (index >= 0) {
          all[index] = { ...all[index], ...updates };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
        }
      }
    } catch {}
  }
}

export async function deleteForm(id: string): Promise<void> {
  if (isRealFirebaseConfigured()) {
    try {
      const docRef = doc(db, FORMS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn("Firestore delete failed:", e);
    }
  }
  deleteLocalForm(id);
}
