# Mini Compliance Tracker

## 📌 Features
- View clients
- View tasks per client
- Add new compliance tasks
- Update task status (Pending → Completed)
- Highlight overdue pending tasks
- Filter tasks by status

---

## 🛠 Tech Stack
- Node.js
- Express.js
- PostgreSQL
- HTML, CSS, JavaScript (Bootstrap)

---

## ⚙️ Setup Instructions

### Backend
cd backend
npm install
node server.js

### Frontend
Open frontend/index.html in browser

---

## 🌐 API Endpoints

- GET /clients → Fetch all clients
- GET /tasks/:clientId → Fetch tasks for a client
- POST /tasks → Create a new task
- PUT /tasks/:id → Update task status

---

## 📌 Assumptions
- No authentication implemented
- Clients are pre-seeded
- Single-user system

---

## ⚖️ Tradeoffs
- Simple UI for faster development
- No pagination or advanced filtering
- No authentication layer

---

## 🚀 Future Improvements
- Add authentication (login/signup)
- Add search and sorting
- Dashboard with analytics
- Notifications for overdue tasks
