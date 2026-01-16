# Device Catalog — Phones, Tablets & Smartwatches (Mobile-First, Dark UI)

> A modern, mobile-first product catalog for **phones, tablets, and smartwatches**.
> Built for fast discovery with compact product cards, advanced filters, persistent favorites & shopping cart, and a clean dark interface.

---

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-purple.svg)](https://vitejs.dev)

---

## 🔗 Live preview

Open the live demo to explore the finished page:

https://vvynnykv.github.io/phone-catalog/

---

## 🔗 Design reference

**Figma — Phone Catalog**
[https://www.figma.com/design/BUusqCIMAWALqfBahnyIiH/Phone-catalog--V2--Original-Dark?node-id=0-1&p=f&t=ZbzdIZRLoCW48cGq-0](https://www.figma.com/design/BUusqCIMAWALqfBahnyIiH/Phone-catalog--V2--Original-Dark?node-id=0-1&p=f&t=ZbzdIZRLoCW48cGq-0)

---

## 🎯 Project overview

This project is a responsive **e-commerce-style catalog** for consumer electronics. Users can browse phones, tablets, and smartwatches, explore detailed product cards, manage favorites, and add items to a shopping cart. All interactions are optimized for mobile devices and follow a dark, phone-first UI concept.

---

## ✨ Features

* **Mobile-first dark UI** designed from a 320px baseline
* **Responsive layout** for 320px, 640px, 1200px, and 1440px
* **Product catalog** for phones, tablets, and smartwatches
* **Favorites page** with persistent saved items
* **Shopping cart** with quantity control and total price calculation
* **Filtering inside product cards** (storage capacity, color)
* **Global filters** by category, brand, OS, and storage
* **Sorting options**: by year, price, and alphabetical order
* **Search** using URL query parameters
* **Pagination** with configurable items per page
* **Sticky header** for fast navigation
* **Scroll-to-top button**
* **Skeleton loaders** for smooth loading states
* **State persistence** across sessions

---

## 🧰 Technologies used

### Core

* React (v18)
* TypeScript
* SCSS (Sass)

### State management

* React Context

### Routing & UI

* React Router
* Swiper (image galleries)
* use-react-router-breadcrumbs
* react-loading-skeleton

### Tooling & deployment

* Vite
* ESLint
* Prettier
* GitHub Pages

---

## 📁 Project structure

```
/src
  /assets        # device images, icons, fonts
  /components    # reusable UI components (DeviceCard, Filters, Header, Footer)
  /pages         # Catalog, DeviceDetails, Cart, Favorites
  /services      # API or mock data layer
  /context       # store
  /styles        # global SCSS, variables, mixins
  /utils         # helpers & formatters
  main.tsx
  App.tsx
```

---

## 🧩 UI / UX notes

* Designed **mobile-first**, enhanced progressively for larger screens
* Dark theme with clear visual hierarchy and contrast
* URL-driven state for filters, sorting, pagination, and search
* Shareable and bookmarkable catalog links
* Keyboard-accessible navigation and visible focus states

---

## 🚀 Getting started

```bash
# Clone repository
git clone https://vvynnykv.github.io/phone-catalog/.git
cd phone-catalog

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "format": "prettier --write \"src/**/*.{ts,tsx,scss,md}\""
  }
}
```

---

## ✅ Deployment

1. Run `npm run build`
2. Deploy the `dist/` folder to GitHub Pages

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes
4. Open a pull request with a clear description

---

