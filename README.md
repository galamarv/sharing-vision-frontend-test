
# Sharing Vision - Article Frontend 

A modern frontend dashboard built with **React**, **Vite**, **Tailwind CSS**, **Axios**, and **Lucide React** to manage and preview articles.

## Features
- **All Posts Dashboard:** Modular tabbed interface for Published, Drafts, and Trashed articles.
- **Interactive Tables:** Displays article titles, categories, and action icons (Edit and Trash).
- **Add & Edit Forms:** Fully responsive forms supporting Title, Content, Category, and status management actions (Publish, Draft, Thrash).
- **Blog Preview:** Public-facing blog layout rendering published articles accompanied by pagination.

## Prerequisites
- Node.js (v18+ or compatible environment)
- Running backend microservice instance (configured on port `8080`)

## Project Setup

1. **Install dependencies:**
```bash
   npm install

```

2. **Configure Tailwind CSS:**
Ensure Tailwind CSS directives are properly included in your main stylesheet and your config files are initialized.
3. **Run the development server:**
```bash
npm run dev

```



The application will start locally (typically on port `5173`) and connect automatically to your backend API service.

## Application Routes

| Path | Component | Description |
| --- | --- | --- |
| `/` | `AllPosts.jsx` | Dashboard with Published, Draft, and Trashed tabs and action options |
| `/add` | `AddNewPost.jsx` | Creation form with title, content, category, and state buttons |
| `/edit/:id` | `EditPost.jsx` | Editing view for modifying existing article properties and statuses |
| `/preview` | `Preview.jsx` | Paginated public blog preview for published articles |

