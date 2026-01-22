# Productivity Dashboard (Pomodoro + Task Manager)

A modern productivity-focused web application built with **React** and **Vite**, combining **task management** with a **Pomodoro focus timer** to promote deep work and disciplined time management.

🔗 **Live Demo**  
https://react-productivity-golddashboard.vercel.app



## ✨ Overview

The Productivity Dashboard is designed around the principle of **single-task focus**.  
Users manage tasks while working in structured Pomodoro cycles (25 minutes focus + 5 minutes break), reducing distractions and improving productivity.

The application features a clean UI, persistent state using browser storage, and a scalable React architecture.



## 🚀 Features

### ✅ Task Management
- Add, complete, and delete tasks
- Filter tasks by **All / Active / Completed**
- Persistent storage using **localStorage**
- Minimal and distraction-free interface

### ⏱ Pomodoro Focus Timer (25 / 5)
- 25-minute focus sessions
- 5-minute break cycles
- Automatic phase switching
- Visual countdown and status indication

### 📊 Productivity Analytics
- Completed task count
- Focus session tracking
- Simple productivity insights

### 🎨 Theme System
- Light and Dark mode support
- Elegant gold-based theme
- User preference persists across sessions



## 🧱 Tech Stack

**Frontend**
- React (Functional Components)
- Vite (Fast build & HMR)
- Context API + useReducer
- Custom React Hooks

**Styling**
- CSS Modules
- Theme variables (CSS custom properties)

**State & Persistence**
- localStorage
- Global state management via Context

**Deployment**
- Vercel (CI/CD with GitHub integration)



## 🗂 Project Structure



src/
├── components/
│   ├── Navbar.jsx
│   ├── TaskCard.jsx
│   ├── Timer.jsx
│   └── Stats.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Analytics.jsx
│   └── Settings.jsx
│
├── context/
│   └── AppContext.jsx
│
├── hooks/
│   ├── usePomodoro.js
│   └── useLocalStorage.js
│
├── styles/
│   └── theme.css
│
├── App.jsx
├── main.jsx
└── index.css





## 🛠 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/AshmithaB/react-productivity-dashboard.git

# Navigate to the project directory
cd react-productivity-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
````



## 🧪 Testing Checklist (Pre-Deployment)

* Task add / delete / complete works correctly
* Filters update task views correctly
* Pomodoro timer runs without drift
* Data persists on page refresh
* Theme toggle persists user preference
* No console errors in production build



## 📌 Design Principles

* **Single-task focus** over multitasking
* **Minimal UI** to reduce cognitive load
* **Reusable components** for scalability
* **Separation of concerns** via hooks and context



## 📈 Future Enhancements

* Charts and detailed analytics
* React Router based navigation
* Cloud-based persistence (Backend integration)
* Authentication and user profiles



## 👩‍💻 Author

**Ashmitha B**
Aspiring Software Engineer
Focused on building scalable, production-ready applications



## 📄 License

This project is licensed under the MIT License.





