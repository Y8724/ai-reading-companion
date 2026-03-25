# 📚 AI Reading Companion

A full-stack web application that helps users track books they read and generate AI-powered summaries and notes.

## 🚀 Live Demo
https://ai-reading-companion.netlify.app/

## 🧠 Description
This application allows users to manage a personal book collection and generate summaries using AI.

It demonstrates full-stack architecture with a React frontend and FastAPI backend.

---

## ✨ Features
- 📖 Add, edit, and delete books (CRUD)
- 🧠 AI-generated summaries
- 🔐 Basic admin authentication (token-based)
- ⚡ REST API integration
- 📊 Structured backend with validation

---

## 🛠 Tech Stack
Frontend:
- React
- Tailwind CSS
- Axios

Backend:
- Python
- FastAPI
- Pydantic (data validation)

## ⚙️ Environment Variables

Backend `.env`:

ADMIN_TOKEN=your_secret_token

---

## 📦 Installation

### Backend
bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

---

Frontend

cd frontend
npm install
npm run dev

---

## API Endpoints

GET    /books
POST   /books
PUT    /books/{id}
DELETE /books/{id}
POST   /summary

---

## 📸 Screenshots



## 📂 Project Structure

<p align="center">
  <img src="./images/project-structure.png" width="400" />
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
  <img src="./images/dependenciesrun.jpg" width="400"/>
</p>

Frontend

Create .env.local iside frontend/:

VITE_API_URL=http://localhost:8000
VITE_IS_ADMIN=false
VITE_ADMIN_TOKEN=your_admin_token

Run frontend:

<p align="center">
  <img src="./images/runfrontend.jpg" width="400"/>
</p>


---

## 🔐 Admin Mode

Admin actions (create, update, delete)
are enabled when:

.VITE_IS_ADMIN-true
.Valid VITE_ADMIN_TOKEN is provided

This simulates role based access
control for demonstartion purposes.


---

## 🚀 Future Improvements

. User authentication

. Role based permissions

. AI prompt customization

. Pagination & search


---

## 👩🏽‍💻 Author

Yanay Sanchez Garcia
Full-Stack Developer 


---

## 📄 License

This project is for educational and
portfolio purposes.
