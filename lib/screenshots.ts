// Product screenshots in /public/screenshots. Width/height are the real pixel
// sizes so the browser can reserve space before an image loads.
export const SCREENSHOTS = {
  "auth-required": { w: 992, h: 536, path: "/create" },
  "builder-empty": { w: 2880, h: 1800, path: "/create" },
  builder: { w: 2880, h: 1800, path: "/create" },
  "chat-panel": { w: 1200, h: 1606, path: "/create" },
  "confirmation-message": { w: 1472, h: 306, path: "/create" },
  dashboard: { w: 2880, h: 1800, path: "/dashboard" },
  "form-details": { w: 2880, h: 1800, path: "/forms/…" },
  "header-edit": { w: 1472, h: 440, path: "/create" },
  login: { w: 1056, h: 1296, path: "/login" },
  "mobile-chat": { w: 1170, h: 2532, path: "/create" },
  "mobile-dashboard": { w: 1170, h: 2532, path: "/dashboard" },
  "mobile-preview": { w: 1170, h: 2532, path: "/create" },
  "publish-confirm": { w: 1120, h: 712, path: "/create" },
  "published-builder": { w: 2880, h: 1800, path: "/create?formId=…" },
  "question-card": { w: 1472, h: 406, path: "/create" },
  "question-editor": { w: 1120, h: 982, path: "/create" },
  "undo-modal": { w: 864, h: 480, path: "/create" },
  "update-confirm": { w: 1120, h: 846, path: "/create" },
} as const;

export type ScreenshotName = keyof typeof SCREENSHOTS;
