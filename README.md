# 🛒 Advanced E-Commerce Platform (Demo)

A full-featured, scalable e-commerce application built with **Next.js**, **Supabase**, and **Paystack**, designed to simulate a real-world production system.

This project showcases payment integration, business logic handling, and a structured admin workflow — built as a **Level 3 (Growth-stage) e-commerce system**.

---

## 🚀 Live Demo (Optional)

*Add your deployed link here*

---

## 📌 Overview

This is a **demo e-commerce platform** built to demonstrate:

* Real-world checkout and payment flow
* Admin-driven product and order management
* Business logic such as delivery fees and discounts
* Scalable architecture using modern tools

All products are **mock/demo data** and used purely for demonstration purposes.

---

## 🧠 Key Features

### 🛍️ Storefront

* Product listing page
* Product detail page
* Product search and filtering
* Product variants (e.g., size, category)
* Related products

---

### 🛒 Cart & Checkout

* Add/remove items from cart
* Quantity management
* Order summary
* Delivery fee calculation
* Discount/coupon support (optional)

---

### 💳 Payment Integration

* Paystack payment gateway
* Transaction initialization
* Payment verification
* Success & failure handling

---

### 👤 User Features

* User authentication (Supabase Auth)
* Order history
* Saved user details (optional)

---

### 🧾 Order System

* Order creation after successful payment
* Order status tracking:

  * Pending
  * Paid
  * Fulfilled

---

### ⚙️ Admin Dashboard

* Add/Edit/Delete products
* Upload product images (Cloudinary)
* View all orders
* Update order status
* Manage pricing

---

### 📦 Inventory (Basic)

* Track product availability
* Prevent checkout of out-of-stock items

---

### 📊 (Optional Enhancements)

* Analytics dashboard
* Reviews & ratings
* Email notifications

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

### Backend / Database

* Supabase (PostgreSQL + Auth + API)

### Storage

* Cloudinary (image uploads)

### Payments

* Paystack

### Hosting

* Vercel (frontend)
* Supabase (backend)

---

## 🧩 Project Structure

```
/app
  /products
  /cart
  /checkout
  /admin
    /products
    /orders

/lib
  supabaseClient.ts
  paystack.ts

/components
  ProductCard.tsx
  CartItem.tsx
  Navbar.tsx

/utils
  helpers.ts
```

---

## 🗃️ Database Schema (Simplified)

### Products

* id
* name
* price
* image_url
* description
* stock

### Orders

* id
* user_id
* total_amount
* payment_status
* created_at

### Order_Items

* id
* order_id
* product_id
* quantity
* price

---

## 🔄 User Flow

1. User browses products
2. Adds items to cart
3. Proceeds to checkout
4. Enters delivery details
5. Pays via Paystack
6. Payment is verified
7. Order is stored in database
8. Admin processes order

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/your-username/ecommerce-demo.git
cd ecommerce-demo
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

PAYSTACK_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

### 4. Run development server

```
npm run dev
```

---

## 💡 Demo Data

All products in this project are **dummy/demo products**, created to simulate a real store.

Examples:

* Wireless Headphones
* Smart Watch
* Sneakers
* Office Chair
* Phone Accessories

---

## 🎯 Purpose of This Project

This project was built to:

* Practice real-world e-commerce architecture
* Demonstrate payment integration workflows
* Showcase full-stack capabilities
* Serve as a portfolio project for client work

---

## 📈 Future Improvements

* Email notifications (order confirmation)
* Advanced analytics dashboard
* Multi-vendor support
* Mobile app version
* AI-based product recommendations

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome.

---

## 📄 License

This project is for educational and demonstration purposes only.
