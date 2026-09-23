# Build My AI Form Maker (Production-Ready)

## 1. Project Overview

Build a modern, production-ready web application that allows non-technical users, especially government officers and administrative staff, to create sophisticated Google Forms using natural language.

The core experience should be:

> **Describe what you need → AI understands it → AI asks necessary clarification questions → user reviews the form → user edits if needed → user confirms → a real Google Form is created in their Google Drive.**

The application should use:

* **Frontend:** Next.js + TypeScript
* **Styling:** Tailwind CSS
* **UI components:** shadcn/ui where appropriate
* **Authentication:** Firebase Authentication
* **Backend:** Firebase / secure server-side APIs
* **Database:** Firebase Firestore
* **AI:** Groq API
* **Google integration:** Google OAuth + Google Forms API + Google Drive API where required
* **Deployment:** Production-ready architecture suitable for Vercel/Firebase
* **Icons:** Lucide Icons
* **Font:** Use a highly readable modern sans-serif font

Do not build this as a developer-oriented tool.

The primary users may have very little technical knowledge.

The product should feel:

> Simple. Calm. Professional. Trustworthy. Government-friendly.

---

# 2. Core Product Principle

The user should NOT need to understand:

* APIs
* JSON
* Google Forms API
* branching logic
* form schemas
* question types
* database structures
* OAuth tokens
* technical configuration

The application should handle these things automatically.

The user should be able to simply say:

> "Create a registration form for students and teachers."

The AI should then ask useful questions such as:

> "Should students and teachers see different questions?"

Then:

> "What information should we collect from students?"

Then:

> "Should mobile number be mandatory?"

The system should progressively construct the form.

---

# 3. Main User Journey

Design the application around this journey:

```text
Landing Page
     ↓
Sign in with Google
     ↓
Dashboard
     ↓
Create New Form
     ↓
My AI Form Maker
     ↓
Describe Requirement
     ↓
AI Clarification Questions
     ↓
Form Draft
     ↓
Preview
     ↓
Edit
     ↓
Confirm
     ↓
Create Google Form
     ↓
Success Screen
     ↓
Open Google Form / Copy Link
```

Make this journey extremely obvious.

Avoid overwhelming the user with options.

---

# 4. Public Website

Create a polished public-facing website.

Pages should include:

### `/`

Landing page

Sections:

1. Hero
2. How it works
3. Example use cases
4. AI form creation demonstration
5. Features
6. Why use the platform
7. Security and privacy
8. FAQ
9. Call to action
10. Footer

Hero copy should communicate the product immediately.

Example:

> **Create Google Forms by simply describing what you need.**

Supporting text:

> Tell us what your form should collect. Our AI helps structure the questions, sections and logic — then creates the Google Form for you.

Primary CTA:

> **Create a Form**

Secondary CTA:

> **See How It Works**

Do not use exaggerated marketing claims.

---

# 5. Public Website Design

The visual language should be:

* Minimal
* Professional
* Clean
* Trustworthy
* Modern
* Accessible
* Government-friendly
* Not flashy
* Not overly AI-themed

Avoid:

* excessive gradients
* excessive animations
* neon colours
* complicated illustrations
* excessive glassmorphism
* dark futuristic AI interfaces
* unnecessary decorative elements

Use whitespace intelligently.

The interface should feel similar in simplicity to products such as Google Workspace.

---

# 6. Authentication

Create a clean authentication experience.

Primary authentication method:

> **Continue with Google**

Use Firebase Authentication.

After authentication:

```text
Google account
      ↓
Firebase Authentication
      ↓
Application user
      ↓
Dashboard
```

Do not expose OAuth tokens to the frontend.

Keep sensitive credentials and refresh tokens server-side.

Request only the Google permissions actually required.

Clearly explain why Google access is required.

Example:

> We need permission to create Google Forms in your Google Drive.

Do not use confusing technical language such as:

> "Requesting forms.body OAuth scope."

---

# 7. Dashboard

The dashboard should be extremely simple.

Do not create a complex admin panel.

Recommended layout:

```text
------------------------------------------------
Logo                         Help    Profile
------------------------------------------------

Good morning, [Name]

Create a new form
Turn your requirements into a Google Form.

[ + Create New Form ]


Your Forms

[ Search ]

Form Name                     Created        Action

Scholarship Registration      Today          Open
Student Survey                Yesterday      Open
Teacher Feedback              18 Sep         Open
```

The primary action should always be obvious.

---

# 8. Create Form Experience

When the user clicks:

> Create New Form

Open a dedicated form-building workspace.

The main interface should resemble a simple chat assistant.

Example:

```text
------------------------------------------------
Create your form
------------------------------------------------

Tell us what you need.

┌────────────────────────────────────────────┐
│ I need a registration form for students    │
│ and teachers participating in a programme. │
│                                            │
└────────────────────────────────────────────┘

                         [Create Form →]
```

Allow the user to write naturally.

Do NOT force them to configure fields before starting.

---

# 9. AI Conversation

Use Groq as the AI engine.

The AI should behave as a professional form-design assistant.

Its responsibilities:

1. Understand the user's objective.
2. Identify missing information.
3. Ask only necessary questions.
4. Avoid asking questions whose answers can reasonably be inferred.
5. Build a structured form definition.
6. Detect sections.
7. Detect question types.
8. Detect required/optional fields.
9. Detect conditional logic.
10. Detect validation requirements.
11. Detect confirmation messages.
12. Detect response destinations where supported.
13. Explain important decisions in simple language.
14. Allow the user to modify the draft.

The AI should never directly generate arbitrary Google API requests.

Instead, it must produce a validated structured form specification.

---

# 10. Groq Structured Output

Use Groq's structured-output capabilities.

Define a strict internal schema such as:

```json
{
  "title": "",
  "description": "",
  "sections": [],
  "questions": [],
  "logic": [],
  "settings": {},
  "confirmationMessage": ""
}
```

The exact schema should be designed carefully based on the Google Forms API capabilities.

The AI must NEVER return malformed JSON.

Validate all AI-generated data on the server before sending anything to Google APIs.

Never trust AI-generated data directly.

---

# 11. Clarification System

The AI should ask questions progressively.

Do NOT ask 20 questions at once.

Bad:

> Please provide title, description, sections, questions, validation, branching, response settings, confirmation message...

Instead:

> I can create this form. One thing first: should students and teachers see different questions?

Then:

> What information should we collect from students?

Then:

> Should mobile number be mandatory?

The goal is to make the experience feel conversational.

---

# 12. Smart Question Detection

The AI should automatically understand common requirements.

For example:

User:

> "Create a school registration form."

AI should infer possible fields but should not blindly create them.

It may ask:

> "What information do you want to collect from applicants?"

The AI can suggest:

* Name
* Mobile number
* Email
* School
* Class
* District
* Gender
* Date of birth

The user can select or modify them.

---

# 13. Form Editor

After AI generation, show a visual editor.

Example:

```text
Form Preview

┌─────────────────────────────────────┐
│ Student Registration Form            │
│                                      │
│ Full Name *                          │
│ [________________________]           │
│                                      │
│ Mobile Number *                      │
│ [________________________]           │
│                                      │
│ Applicant Type *                     │
│ ○ Student                            │
│ ○ Teacher                            │
└─────────────────────────────────────┘
```

Beside or below the preview, provide simple controls:

* Edit
* Add question
* Delete
* Duplicate
* Move up
* Move down
* Make required
* Change question type
* Add section
* Edit section
* Add branching

Do not expose complicated technical configuration.

---

# 14. Conditional Sections

Support Google Forms section navigation.

Example:

```text
Applicant Type

○ Student
○ Teacher
```

Student:

```text
Student Information
- School
- Class
- Roll Number
```

Teacher:

```text
Teacher Information
- School
- Designation
- Department
```

The editor should visually explain the logic.

For example:

```text
If Student → Student Information

If Teacher → Teacher Information
```

Make this understandable to non-technical users.

---

# 15. Question Types

Support the Google Forms question types that are realistically available through the API.

Examples:

* Short answer
* Paragraph
* Multiple choice
* Checkboxes
* Dropdown
* Linear scale
* Date
* Time
* Sections/page breaks

Only expose question types that can actually be created reliably through the Google Forms API.

Do not create fake UI controls for unsupported functionality.

---

# 16. Editing with Natural Language

This is a major feature.

Allow users to modify the form by simply telling the AI what they want.

Examples:

> "Add a question asking for the applicant's district."

> "Make mobile number mandatory."

> "Remove gender."

> "Add a teacher section."

> "Students should not see the teacher questions."

> "Change the title."

> "Add an emergency contact number."

The AI should update the internal form specification.

Then show the user the updated preview.

Do not immediately modify the real Google Form unless the user confirms.

---

# 17. Preview Before Creation

Before creating the actual Google Form, show:

> **Your form is ready**

Provide:

* Form title
* Description
* Sections
* Questions
* Required fields
* Conditional logic

Buttons:

```text
← Edit Form

Create Google Form →
```

The user should explicitly confirm creation.

---

# 18. Google Form Creation

After confirmation:

1. Create Google Form.
2. Add sections.
3. Add questions.
4. Configure required fields.
5. Configure supported branching.
6. Apply supported settings.
7. Handle errors.
8. Verify creation.
9. Save metadata in Firestore.

Do not expose API errors directly to users.

Instead of:

> INVALID_ARGUMENT: requests[4].createItem...

show:

> We couldn't add one of the questions. We've kept your draft safe. Please try again.

---

# 19. Success Screen

After successful creation:

```text
✓ Your Google Form is ready

Scholarship Registration Form

Your form has been created successfully.

[ Open Google Form ]

[ Copy Form Link ]

[ Back to Dashboard ]
```

If an edit link is available:

```text
[ Edit in Google Forms ]
```

---

# 20. Form History

Store created forms in Firestore.

Each record should contain appropriate metadata such as:

```text
userId
formId
title
description
createdAt
updatedAt
responseUrl
editUrl
status
formDefinition
```

Do not store sensitive user-submitted form responses unless the product explicitly requires it.

Keep the minimum amount of data necessary.

---

# 21. Help System

Because the target audience is non-technical, add a simple Help system.

Include:

### "What can I say?"

Examples:

> "Create a registration form for students."

> "Create a feedback form with 10 questions."

> "Create separate sections for students and teachers."

> "Make mobile number mandatory."

> "Add a question for district."

### FAQ

Examples:

* What can this tool create?
* Does it create a real Google Form?
* Where is my form stored?
* Can I edit the form later?
* Can I create conditional sections?
* What happens if I make a mistake?
* How does Google authorization work?

Add a small Help button throughout the authenticated application.

---

# 22. Empty States

Do not leave blank screens.

For example:

```text
You haven't created any forms yet.

Describe what you need and we'll help
you create your first Google Form.

[ Create Your First Form ]
```

---

# 23. Loading States

AI operations may take time.

Use friendly loading messages.

Instead of:

> Loading...

Use:

> Understanding your requirements…

Then:

> Designing your form…

Then:

> Preparing your questions…

Then:

> Creating your Google Form…

Do not make fake progress bars that imply exact progress.

---

# 24. Error Handling

Every API interaction must have robust error handling.

Handle:

* Google authentication failure
* expired OAuth token
* insufficient permissions
* Google API errors
* Groq API errors
* invalid AI output
* malformed form definition
* unsupported question type
* network failure
* Firestore failure
* rate limits
* duplicate creation
* partially completed form creation

Never lose the user's draft because an API request failed.

---

# 25. Firebase Architecture

Use Firebase for:

### Authentication

Firebase Authentication.

### Database

Cloud Firestore.

### Backend

Use secure server-side functions/API routes.

### Security

Implement Firestore security rules so users can access only their own application data.

Never put:

* Groq API key
* Google client secret
* Google refresh tokens
* service credentials

in frontend code.

Use environment variables/server-side secrets.

---

# 26. Suggested Application Structure

Use a clean architecture.

For example:

```text
app/
  page.tsx
  login/
  dashboard/
  create/
  forms/
  help/

components/
  ui/
  landing/
  dashboard/
  form-builder/
  chat/
  preview/

lib/
  firebase/
  google/
  groq/
  forms/
  validation/

server/
  google/
  groq/
  form-generator/

types/
  form.ts
  user.ts
```

Keep business logic separate from UI.

---

# 27. Form Definition Architecture

Create a single internal representation of a form.

For example:

```text
FormDefinition
    ↓
Validation
    ↓
Google Forms Adapter
```

Do not allow frontend components to directly construct Google Forms API requests.

This architecture should make it possible to support other form providers in the future.

Potential future providers:

* Google Forms
* Microsoft Forms
* Internal forms
* Custom HTML forms

But Google Forms is the first provider.

---

# 28. Security Requirements

Treat this as a serious production application.

Implement:

* secure authentication
* server-side API keys
* secure OAuth handling
* HTTPS
* Firestore security rules
* input validation
* output validation
* rate limiting where appropriate
* CSRF protection where applicable
* XSS protection
* secure cookies where applicable
* least-privilege OAuth scopes
* proper error logging
* no secrets in Git
* no secrets in frontend bundles

Never log OAuth tokens or API keys.

Do not store unnecessary sensitive information.

---

# 29. Accessibility

The application must be usable by people with different levels of technical ability.

Follow accessibility best practices.

Use:

* large readable text
* strong contrast
* obvious buttons
* keyboard accessibility
* meaningful labels
* accessible form controls
* clear error messages
* screen-reader-friendly structure

Do not rely only on colour to communicate state.

---

# 30. Responsive Design

The application must work well on:

* desktop
* laptop
* tablet
* mobile

The primary target may be desktop/laptop users, but mobile must remain usable.

---

# 31. Design System

Use a restrained design system.

Recommended characteristics:

* white/light background
* one primary brand colour
* neutral secondary colours
* rounded cards
* subtle borders
* minimal shadows
* generous spacing
* clear typography
* consistent button styles

Avoid visual clutter.

The interface should feel like a professional productivity tool rather than a consumer social application.

---

# 32. Microcopy

Use simple language.

Prefer:

> Create Form

instead of:

> Initialise Form Generation Workflow

Prefer:

> Add Question

instead of:

> Configure Question Node

Prefer:

> Make this required

instead of:

> Set required validation constraint

Prefer:

> Create Google Form

instead of:

> Execute Google Forms API

The user should never need to understand the underlying technology.

---

# 33. AI Safety and Reliability

The AI must not invent Google Forms capabilities.

If the user asks for something unsupported, explain it clearly.

For example:

> "Google Forms doesn't currently support that option through the available API. I can suggest an alternative."

Do not silently create something different from what the user requested.

If the requirement is ambiguous, ask a clarification question.

Never fabricate successful form creation.

Only show "Form created successfully" after the Google API confirms successful creation.

---

# 34. AI System Prompt Behaviour

Create a dedicated server-side system prompt for the form-generation AI.

The AI should behave as:

> A professional Google Forms design assistant.

It should prioritize:

1. Correctness
2. User intent
3. Simplicity
4. Google Forms compatibility
5. Minimal clarification questions
6. Structured output
7. Safe handling of ambiguity

Never expose internal schemas or API details to the user.

---

# 35. Important AI Rule

Separate:

### Conversation

from:

### Form Specification

from:

### Google API execution

Architecture:

```text
User
 ↓
Conversation AI
 ↓
Form Specification
 ↓
Schema Validation
 ↓
Google Forms Adapter
 ↓
Google API
```

Never:

```text
User
 ↓
LLM
 ↓
Google API directly
```

---

# 36. Auditability

Because this application may be used by government/administrative users, design the system so important actions can be traced.

Record appropriate non-sensitive events such as:

```text
Form draft created
Form draft updated
Form creation requested
Form successfully created
Form creation failed
```

Do not log sensitive information unnecessarily.

---

# 37. Do Not Overbuild

This is extremely important.

Do NOT initially build:

* complicated enterprise dashboards
* unnecessary analytics
* team collaboration
* complicated permissions
* payment systems
* excessive settings
* dozens of configuration screens
* unnecessary animations
* unnecessary AI agents

Build the smallest polished product that solves:

> **"I want to create a Google Form without knowing how to build one."**

---

# 38. Development Method

Do not generate the entire application blindly in one pass.

Build in phases.

### Phase 1

Project setup:

* Next.js
* TypeScript
* Tailwind
* shadcn/ui
* Firebase
* basic routing
* environment configuration

### Phase 2

Public website.

### Phase 3

Google authentication.

### Phase 4

Dashboard.

### Phase 5

AI chat interface.

### Phase 6

Groq integration.

### Phase 7

Structured FormDefinition.

### Phase 8

Form editor and preview.

### Phase 9

Google OAuth integration.

### Phase 10

Google Forms API integration.

### Phase 11

Conditional sections.

### Phase 12

Firestore persistence.

### Phase 13

Error handling/security.

### Phase 14

Testing and polish.

Do not move to the next phase until the previous phase works.

---

# 39. Testing Requirements

Create tests for:

* authentication
* AI response validation
* form schema validation
* question creation
* required questions
* section creation
* branching
* form creation
* Google API errors
* expired authentication
* Firestore access
* mobile UI
* accessibility

Test realistic prompts such as:

### Example 1

> Create a student registration form.

### Example 2

> Create a feedback form for teachers with 15 questions.

### Example 3

> Create a registration form where users first choose Student or Teacher. Students should see student questions and teachers should see teacher questions.

### Example 4

> Create a scholarship application form with personal information, academic information and document-related questions.

### Example 5

> Add a mandatory mobile number and optional email address.

### Example 6

> Remove the gender question and add district.

The application should correctly understand these requests.

---

# 40. UI Quality Standard

Before considering the project complete, review every page.

Check:

* spacing
* typography
* mobile responsiveness
* button hierarchy
* empty states
* loading states
* error states
* accessibility
* navigation
* consistency
* visual hierarchy

The application should look like a finished professional product, not a developer prototype.

---

# 41. Final Product Experience

The final experience should feel like:

> **"I tell the application what I need, it helps me figure out the details, I review the result, and it creates the Google Form for me."**

The technology should disappear behind the experience.

The user should never need to think about:

* Groq
* APIs
* JSON
* OAuth scopes
* Firebase
* Google Forms API

They should simply think:

> **"I need a form."**

And the application should guide them from that sentence to a working Google Form.

---

# 42. First Task

Before writing large amounts of code:

1. Analyse this specification.
2. Identify technical dependencies.
3. Identify Google API limitations that could affect the proposed functionality.
4. Identify anything that cannot reliably be implemented.
5. Propose the project architecture.
6. Propose the Firestore data model.
7. Propose the FormDefinition schema.
8. Propose the authentication/OAuth flow.
9. Propose the folder structure.
10. Explain the implementation phases.

Then begin implementation **one phase at a time**.

Do not skip architecture and immediately generate the whole application.

When making implementation decisions, prefer:

> **simple + reliable + maintainable**

over:

> complex + impressive + difficult to maintain.