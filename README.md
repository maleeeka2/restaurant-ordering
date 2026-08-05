# Cafe / Restaurant Online Ordering System

A full-stack Cafe / Restaurant Online Ordering System built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL (Neon Database).

The application allows customers to browse the menu, add items to the cart, place orders, and track order status. Administrators can securely log in to manage incoming orders through an admin dashboard.

This project was completed with a strong emphasis on Software Quality Assurance (SQA), including manual testing, automated testing, AI-assisted test generation, and comprehensive QA documentation.

---

# Deliverables

## GitHub Repository

https://github.com/maleeeka2/restaurant-ordering

## Live Application

https://restaurant-ordering-maleeka.vercel.app/

## Demo Video (3–5 Minutes)

https://drive.google.com/file/d/1O7L62oYJctznQpmS_e3pcMT_Uijvt9q1/view?usp=drive_link

---

# Features

## Customer

- Browse menu by category
- Add and remove items from the cart
- Update item quantities
- Checkout with customer information
- Track order status
- Responsive user interface

## Admin

- Secure administrator login using JWT authentication
- View all customer orders
- Update order status
- Live order board with automatic refresh

---

# Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Authentication | JWT |
| Validation | Zod |
| Password Hashing | bcryptjs |
| Testing | Vitest, Playwright |
| Deployment | Vercel |

---

# Project Structure

```
restaurant-ordering/
│
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── tests/
├── e2e/
├── QA/
├── README.md
└── package.json
```

---

# QA Deliverables

A dedicated **QA** folder is included containing:

- Test Plan
- Manual Test Cases
- Test Execution Report
- Test Coverage Report
- AI-Assisted Test Generation Report
- Build Log

Testing includes:

- Functional Testing
- UI Testing
- API Testing
- Validation Testing
- Negative Testing
- Unit Testing
- Component Testing
- End-to-End Testing

---

# AI-Assisted Testing

AI tools were used to assist in generating:

- Functional test scenarios
- Edge-case test cases
- Negative test cases
- Boundary value tests

All AI-generated test cases were manually reviewed, validated, and executed before being included in the final QA documentation.

---

# Local Setup

## Clone the repository

```bash
git clone https://github.com/maleeeka2/restaurant-ordering.git
cd restaurant-ordering
```

## Install dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key

ADMIN_EMAIL="abc@xyz.com"
ADMIN_PASSWORD="your-password"
```

## Push the database schema

```bash
npx prisma db push
```

## Seed the database

```bash
npm run db:seed
```

## Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Default Admin Login

**Email**

```
admin@cafe.com
```

**Password**

```
admin123
```

---

# Available Scripts

Start the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Start the production server

```bash
npm run start
```

Run unit and component tests

```bash
npm test
```

Run Playwright end-to-end tests

```bash
npm run test:e2e
```

Reset and reseed the database

```bash
npm run db:reset
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/menu` | Retrieve menu items |
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders/[id]` | Retrieve order status |
| POST | `/api/admin/login` | Authenticate administrator |
| GET | `/api/admin/orders` | Retrieve all orders |
| PATCH | `/api/admin/orders/[id]` | Update order status |
| POST | `/api/seed` | Seed sample menu data |

---

# Testing Summary

The project includes:

- Manual Testing
- Automated Unit Testing
- Component Testing
- API Testing
- End-to-End Testing

Complete QA documentation is available in the **QA** folder.

---

# Deployment

The application is deployed on **Vercel** using **Neon PostgreSQL** as the production database.

---

# Future Improvements

- Payment gateway integration
- Email notifications
- Customer authentication
- Order analytics dashboard
- GitHub Actions CI/CD pipeline
- Automated code coverage reporting

---

# Author

**Maleeka Sherazi**

Software Quality Assurance (SQA) Project

---

# Assignment Focus

This project was completed as an evaluation assignment with a strong focus on:

- Full-stack web application development
- Software Quality Assurance (SQA)
- Manual testing
- Automated testing
- AI-assisted test generation
- Professional project documentation
