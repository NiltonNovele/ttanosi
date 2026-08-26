# Gen-Z E-Commerce Storefront

> A high-performance, aesthetically pleasing e-commerce application tailored for the modern shopper. This project aims to deliver a seamless streetwear shopping experience, featuring dynamic theme transitions, a frictionless cart system, and fluid UI animations. Built from the ground up with a strong focus on responsive design, performance, and an intuitive user journey.

## Features

- **Modern Tech Stack**: Built on top of Next.js 16 (App Router) & React 19.
- **Dynamic Theming**: Fluid light/dark mode transitions built with `next-themes` and Framer Motion.
- **Interactive UI**: Custom animations and micro-interactions powered by Framer Motion.
- **Optimized Performance**: leveraging Next.js optimizations for images, fonts, and scripts.
- **State Management**: Lightweight robust state management using Zustand for the sliding cart.
- **Beautiful Styling**: Sleek, fully responsive design developed with Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/`: Next.js App Router containing pages, layouts, and global styles.
- `src/components/`: Reusable UI components (Mega-menu, Cart Sidebar, Theme Toggle, etc.).
- `src/lib/`: Mock data, utilities, and generic type interfaces.
- `src/store/`: Zustand global state slices.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
