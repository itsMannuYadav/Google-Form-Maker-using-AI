export const siteConfig = {
  name: "My AI Form Maker",
  shortName: "Form Maker",
  tagline: "Google Forms Assistant",
  description:
    "Describe the form you need in plain language and publish it straight to Google Forms. Built for government officers, administrative staff, and educators.",
  url: (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, ""),
  themeColor: "#1a365d",
  backgroundColor: "#f8fafc",
};
