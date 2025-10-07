import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home/Home";
import NewsDetails from "../Home/News/NewsDetails";
import Coverage from "../Coverage/Coverage";
import Register from "../Authentication/Register/Register";
import Login from "../Authentication/Login/Login";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import Mydashboard from "../MyDashboard/Mydashboard";
import Roadmap from "../Roadmap/Roadmap";
import ChooseGoal from "../Roadmap/ChooseGoal";
import Questions from "../Roadmap/Questions";
import Result from "../Roadmap/Result";
import RoadLayout from "../Roadmap/RoadLayout";
import AllNews from "../Home/News/AllNews";
import ApplyInstructor from "../ApplyInstructor/ApplyInstructor";
import AppliedInstructors from "../ApplyInstructor/AppliedInstructors";
import AdminRoute from "../routes/AdminRoute";
import AllBooksPage from "../Books/AllBooksPage";
import BookDetailsPage from "../Books/BookDetailsPage";
import AboutUs from "../Home/AboutUs/AboutUs";
import Forbidden from "../Forbidden/Forbidden";
import AdminPanel from "../Admin/AdminPanel/AdminPanel";

export const router = createBrowserRouter([
  // ======================
  // Main Layout Routes (Public)
  // ======================
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "news",
        element: <AllNews />,
      },
      {
        path: "news/:id",
        element: <NewsDetails />,
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "books/:careerId",
        element: <AllBooksPage />,
      },
      {
        path: "books/:careerId/details/:bookId",
        element: <BookDetailsPage />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
    ],
  },

  // ======================
  // Authentication Routes (Public)
  // ======================
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  // ======================
  // Road Layout Routes (Protected - Quiz Flow)
  // ======================
  {
    path: "/roadLayout",
    element: (
      <PrivateRoute>
        <RoadLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "roadmap",
        element: <Roadmap />,
      },
      {
        path: "chooseGoal",
        element: <ChooseGoal />,
      },
      {
        path: "questions/:questionId",
        element: <Questions />,
      },
      {
        path: "result/:score/:total",
        element: <Result />,
      },
    ],
  },

  // ======================
  //  Unified Dashboard Routes (Protected - Users + Admins)
  // ======================
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Redirect /dashboard to /dashboard/myDashboard
      {
        index: true,
        element: <Navigate to="/dashboard/myDashboard" replace />,
      },
    
      {
        path: "myDashboard",
        element: <Mydashboard />,
      },
      {
        path: "apply-instructor",
        element: <ApplyInstructor />,
      },

      // Admin-only routes (nested under dashboard)
      {
        path: "admin/applicants",
        element: (
          <AdminRoute>
            <AppliedInstructors />
          </AdminRoute>
        ),
      },
      {
        path: "admin/adminPanel",
        element: (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ),
      },
    ],
  },

  // ======================
  // Redirects & Fallbacks
  // ======================
  {
    path: "admin",
    element: <Navigate to="/dashboard/admin/adminPanel" replace />,
  },
  
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);