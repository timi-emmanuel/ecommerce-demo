# E-Commerce Starter (Client-Ready Template)

This project is a customizable e-commerce starter you can clone for new client builds.

The goal is to keep one solid baseline architecture, then quickly adapt branding, catalog, business rules, and integrations per client.

## Product Goal

Build once, reuse many times:

- Clone this repo whenever a new client needs an e-commerce app.
- Keep core commerce flows stable (catalog, cart, checkout, orders, auth).
- Customize UI, domain, payment account, delivery settings, and content per client.

## Current Scope

### Frontend and UI

- Next.js (App Router)
- shadcn/ui
- Design source in Figma (from Tega)
- Pointers from existing global ecommerce brands like amazon, adidas, apple etc..
### Backend and Auth

- Supabase as database
- Supabase Auth for authentication and user management

### Email

- Nodemailer for transactional emails
- Business email setup for store operations (orders, support, notifications)

### Payments

- Paystack for checkout and payment verification

### Media Storage

- Cloudinary for product and marketing image storage

### Domain and Deployment

- Domain purchase and DNS via Namecheap

### Delivery

- ShipBubble for delivery/logistics workflow

## Later Features

- Analytics
- Product reviews

## Core Features in Template

- Product listing and details
- Cart and checkout flow
- Authenticated customer accounts
- Order creation and status handling
- Admin-ready structure for product/order management

## Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Add environment variables in `.env.local`.
4. Run with `npm run dev`.

## Suggested Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Paystack
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (Nodemailer)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=

# App / Domain
NEXT_PUBLIC_APP_URL=
```

Add additional keys as needed for ShipBubble and any client-specific services.

## Notes

- Mock product data is fine during early setup; switch to real catalog data per client.
- Keep integrations modular so each cloned project can swap providers if needed.
