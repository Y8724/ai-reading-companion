# 📚 AI Reading Companion

A full-stack web appliocation that helps users track books they read and generate AI-powered summaries and notes.

build as a portfolio porject demonstrating modern full-stack development, API integration, and clean environment configuration.

---

## ✨ Features

- 📖 Create, edit and delete books
- 🤖 Generate AI summaries using OpenAI
- 🔐 Admin-protected actions (token-base)
- 📱 Mobile-friendly resposnsive UI
- ⚙️ Environmnet-safe configuration (no secrets commited)

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS (mobile-first, reponsive)

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- OpenAI API

---

## 📂 Project Structure

<p align="center">
  <img src="./images/project-structure.png" width="500" />
</p>


---

## ⚙️ Environment Setup

### Backend

Create .env file iside backend/:

DATABASE_URL=postgresql://username:password@localhost:5432/dbname
OPEN_API_KEY=your_openai_key
ADMIN_TOKEN=your_admin_token

Install dependencies and run:

<p align="center">
  <img src="./images/dependenciesrun.jpg" width="500"/>
</p>

Frontend

Create .env.local iside frontend/:

VITE_API_URL=http://localhost:8000
VITE_IS_ADMIN=false
VITE_ADMIN_TOKEN=your_admin_token

Run frontend:

<p align="center">
  <img src="./images/runfrontend.jpg" width="500"/>
</p>

🔐 Admin Mode

Admin actions (create, updatr, delete)
are enable when:

.VITE_IS_ADMIN-true
.Valid VITE_ADMIN_TOKEN is provided

This simulates role based access
control for demonstartion purposes.


🚀 Future Improvements

. User authentication

. Role based permissions

. Deplyment (Render/Railway/Vercel)

. AI prompt customization

. Pagination & search


👩🏽‍💻 Author

Yanay Sanchez Garcia
Full-Sstack Developer & Artist

📄 License

This project is for educational and
portfolio purposes.

<p align="center">
 <img src="./images/finalstep.jpg" width="500"/>
</p>
