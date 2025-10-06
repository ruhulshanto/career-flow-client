
import { createBrowserRouter, Navigate } from "react-router";
import Main from "../Layout/Main";
import Home from "../Home/Home/Home";
import NewsDetails from "../Home/News/NewsDetails";
import Coverage from "../Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
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
import AdminLayout from "../Layout/AdminLayout";
import AllBooksPage from "../Books/AllBooksPage";
import BookDetailsPage from "../Books/BookDetailsPage";
import AboutUs from "../Home/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/news',
        Component: AllNews
      },
      {
        path: '/news/:id',
        Component: NewsDetails
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },
      // NEW: Add book routes under main layout
      {
        path: 'books/:careerId',
        Component: AllBooksPage
      },
      {
        path: 'books/:careerId/details/:bookId',
        Component: BookDetailsPage
      },
      {
        path: 'about',
        Component: AboutUs
      }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
    ]
  },

  {
    path: "/roadLayout",
    element: <PrivateRoute><RoadLayout></RoadLayout></PrivateRoute>,
    children: [
      {
        path: 'roadmap',
        Component: Roadmap
      },
      {
        path: 'chooseGoal',
        Component: ChooseGoal
      },
      {
        path: 'questions/:questionId',
        Component: Questions
      },
      {
        path: 'result/:score/:total',
        Component: Result
      },
    ]
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'myDashboard',
        Component: Mydashboard
      },
      {
        path: 'apply-instructor',
        Component: ApplyInstructor
      }
    ]
  },

  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminLayout></AdminLayout>
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/applicants" replace />
      },
      {
        path: "applicants",
        element: <AppliedInstructors />
      },
      {
        path: "dashboard",
        element: <Mydashboard />
      }
    ]
  }
]);