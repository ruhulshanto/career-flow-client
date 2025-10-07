# 🎓 CareerFlow — Your Personalized Career Roadmap

## 📖 Overview

**CareerFlow** is a dynamic and interactive web application designed for **undergraduate students** who feel uncertain about their career paths. It helps students define their goals and generates a **personalized roadmap** to achieve them — step by step. Based on the selected goal, CareerFlow also recommends **relevant books** and **connects learners with expert instructors** in their chosen field.

The platform features a dual-role system for both **Students** and **Admins**, ensuring a tailored experience for every user.

---

## 🌐 Live Demo

🔗 **[career-flow-97fcb.web.app](https://career-flow-97fcb.web.app)**
🔗 **[career-flow-97fcb.firebaseapp.com](https://career-flow-97fcb.firebaseapp.com)**

| **Role** | **Email**                                 | **Password** |
| -------- | ----------------------------------------- | ------------ |
| Admin    | [admin@gmail.com](mailto:admin@gmail.com) | Admin123     |

---

## ✨ Key Features

### 🧑‍🎓 For Students / General Users

* **Secure Authentication** — Firebase-powered login & registration.
* **Goal Selection** — Choose from various career paths (e.g., Software Engineer, Data Scientist).
* **Personalized Roadmap** — A point-based system to guide you step by step.
* **Book Recommendations** — Curated books matched to your career goal.
* **Instructor Access** — Find experts who teach your chosen domain.
* **Career News** — Stay updated with trending career insights and tips.
* **Help Section** — Access FAQ and Service Center for quick support.

### 👨‍💼 For Admins

* **Admin Dashboard** — Centralized control panel for managing content.
* **User & Instructor Management** — Approve or reject instructor applications.
* **Dynamic Content Control** — Add, edit, or remove books, news, and resources.

---

## 🛠️ Tech Stack

Built using the latest modern web technologies:

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Authentication & Database:** Firebase
* **Routing:** React Router v6
* **Custom Hooks:** Axios (Public & Secure API handling)
* **Deployment:** Firebase Hosting

---

## 📂 Project Structure

```
career-flow-client/
├── firebase/
│   └── firebase.init.js
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Admin/
│   │   ├── ApplyInstructor/
│   │   ├── Authentication/
│   │   ├── Books/
│   │   ├── Coverage/
│   │   ├── FrequentlyAskedQuestions/
│   │   ├── Home/
│   │   ├── hooks/
│   │   ├── Instructors/
│   │   ├── Layout/
│   │   ├── MyDashboard/
│   │   ├── Provider/
│   │   ├── Roadmap/
│   │   ├── router/
│   │   ├── routes/
│   │   ├── share/
│   │   ├── App.jsx
│   │   └── index.css
├── main.jsx
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Installation

```bash
git clone https://github.com/your-username/career-flow-client.git
cd career-flow-client
npm install
```

### Environment Variables

Create a `.env` file in the project root and include:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

Then open: `http://localhost:5173`

---

## 🔐 Default Admin Login

| **Email**                                 | **Password** |
| ----------------------------------------- | ------------ |
| [admin@gmail.com](mailto:admin@gmail.com) | Admin123     |

> Use this account to access the admin dashboard and test features.

---

## 🎯 How to Use CareerFlow

1. **Sign Up / Log In:** Create a new account or sign in using Google.
2. **Set Your Goal:** Answer questions to define your career path.
3. **Get Your Roadmap:** View your step-by-step personalized career plan.
4. **Explore Resources:** Access recommended books and instructors.
5. **Admin Access:** Log in as an admin to manage users and site content.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

* **Icons:** React Icons, Heroicons
* **Inspiration:** Every student working hard to find the right direction for their future.

---

Would you like me to make a **shorter version (for GitHub overview)** and a **full version (for README file)** — so you can use both?
