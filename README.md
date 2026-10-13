# 🛡️ Complaint Management System (CMS)

A full-stack, cloud-native Complaint Management System built with a dark-themed responsive UI, serverless Node.js/Express API endpoints, and a persistent cloud PostgreSQL database.

---

## 🚀 Live Application URL
- **Live Deployment**: [Open CMS Portal](https://complaintmanagement-zeta.vercel.app)

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Demo User** | user@system.com | pass123 | File new complaints, view personal status tracker & charts |
| **Demo Admin** | admin@system.com | pass123 | View all complaints across users, update statuses, delete complaints |

---

## 📖 Overview & Features

- **User/Admin Authentication**: Interactive portal allowing both quick demo login and new user account registration.
- **Role-Based Complaint Filtering**: Non-admin users are restricted to viewing only their own submitted complaints, while administrators maintain full operational visibility across all system records.
- **Real-time Analytics Dashboard**: Dynamic visual analytics powered by Chart.js, featuring distribution donuts and category breakdown bar charts.
- **Complete CRUD Operations**: Users can file complaints; admins can modify status stages (Pending -> In Progress -> Resolved) or remove records.
- **Serverless Database Synchronization**: Automatic relational schema verification and persistence powered by Neon Serverless PostgreSQL.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+), Chart.js, FontAwesome
- **Backend API**: Node.js, Express.js (Vercel Serverless Functions)
- **Database**: PostgreSQL (Hosted on Neon Cloud with Pooled SSL Connections)
- **Hosting & Deployment**: Vercel Platform

---

## 💻 Local Setup & Execution Instructions

### Prerequisites
- Node.js (v18 or higher)
- Git

### Running Locally

1. Clone the repository:
   git clone https://github.com/roshinig2025/PAT4_25BCE1676.git
   cd PAT4_25BCE1676

2. Install dependencies:
   npm install

3. Configure Environment Variables:
   Create a .env file in the root directory and add your PostgreSQL connection string:
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require

4. Start the local development server:
   node api/index.js
