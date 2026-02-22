# Zavisoft Frontend Task - Kicks Sneaker Store

A responsive, high-fidelity frontend web application built as an assignment for Zavisoft. The application is built using Next.js (App Router), Redux Toolkit, RTK Query, and Tailwind CSS. It consumes the Platzi Fake Store API.

## 🚀 Live Demo
https://zavisoft-frontend-task.netlify.app/

## 🛠️ Technology Stack
- **Framework:** Next.js 15 (App Router)
- **State Management:** Redux Toolkit
- **Data Fetching:** RTK Query
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

## ✨ Features Implemented
- **Pixel-Perfect UI:** High-fidelity implementation of the provided Figma design including the Landing Page (hero, drops, categories, reviews), Product Details Page, and the Cart Page.
- **Product Listing:** Integrated `https://fakeapi.platzi.com/en/rest/products/` using RTK Query, with robust loading, empty, and error states.
- **Categories Listing:** Integrated `https://fakeapi.platzi.com/en/rest/categories/` using RTK Query.
- **Product details:** Fetches individual product via dynamic routes (`/products/[id]`). 
- **Cart Management (Bonus):** Full local state management for the cart using Redux Toolkit slices. Includes Add to Cart, adjust quantities, remove items, and dynamic total calculation.
- **Responsiveness:** Fully responsive design adapting to mobile, tablet, and desktop viewports seamlessly.
- **Optimized Assets:** Leveraging Next.js `Image` component.

## 📦 Local Setup

1. **Clone the repository**
```bash
git clone <repo-url>
cd zavisoft
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open the app**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Architecture & Decisions
- **RTK Query over Axios:** Chose RTK Query to get built-in caching, automatic re-fetching, and integrated hook generization directly tied to the Redux store, minimizing boilerplate compared to a standard Axios setup.
- **Tailwind CSS:** Used for fast, utility-first styling ensuring pixel-perfect adherence to the Figma design's specific colors, layouts, and typography.
- **Next.js App Router:** Leveraged for simplified file-based routing and optimized layouts.

## 👨‍💻 Author
Implemented by you for the Zavisoft assignment.
