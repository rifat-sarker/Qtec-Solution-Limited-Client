# 🛍️ Qtec Solution Limited - Client

This is the Frontend for **Qtec Solution Limited**, a responsive shopping cart web application. Built with React, React Router v7, and Tailwind CSS, it allows users to browse products, view product details with image magnification, and manage their cart.

---

## 🚀 Live Demo

🔗 [https://qtec-solution-limited-client.vercel.app](https://qtec-solution-limited-client.vercel.app)

---

## 📦 Features

- 🛍 Product listing and detail pages
- 🔍 Image magnification on hover
- 🛒 Add to cart, update quantity, and manage cart
- 📦 Cart state persists during session
- 🌈 Fully responsive design with Tailwind CSS
- 🧭 Seamless navigation using React Router v7
- 🔔 Beautiful notifications with `sonner`

---

## 🧪 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rifat-sarker/Qtec-Solution-Limited-Client.git
cd Qtec-Solution-Limited-Client

```
### 2. Install Dependencies

```bash
bun install
```
### 3. Environment Setup

```bash
VITE_API_BASE_URL=https://qtec-solution-limited-server.vercel.app/api
Update this value if your backend is hosted locally.
```

### 4. Run the Development Server
```bash
bun run dev

```
### 🛠 Tech Stack
```
| Technology              | Purpose                      |
| ----------------------- | ---------------------------- |
| **React 19**            | Frontend UI library          |
| **React Router v7**     | Client-side routing          |
| **Tailwind CSS**        | Utility-first CSS styling    |
| **Axios**               | HTTP client for API requests |
| **React Image Magnify** | Zoom-in product image viewer |
| **Lucide React**        | Beautiful icons              |
| **Sonner**              | Toast notifications          |
| **Vite**                | Next-gen frontend tooling    |
| **TypeScript**          | Type-safe development        |

```
### Project Structure
src/
├── components/
│ ├── CartSidebar.tsx
│ ├── CheckoutModal.tsx
│ ├── ProductDetails.tsx
│ └── ProductList.tsx
│
├── pages/
│ ├── Home.tsx
│ └── ...
│
├── routes/
├── services/
├── shared/
│ ├── Navbar.tsx
│ └── Footer.tsx
│
└── main.tsx

### 🔗 API Integration
All API requests are made to:
https://qtec-solution-limited-server.vercel.app/api


👨‍💻 Author
Rifat Sarker
🌐 LinkedIn
📧 rifatswd@gmail.com

