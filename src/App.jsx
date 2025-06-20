import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import VendorLogin from "./pages/VendorLogin";
import Login from "./pages/Login";
import VendorHome from "./pages/VendorHome";
import ViewAds from "./pages/ViewAds";
import VendorDashboard from "./pages/VendorDashboard";
import AddNewAd from "./pages/AddNewAd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/vendor-login",
    element: <VendorLogin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/vendor-home",
    element: <VendorHome />,
  },
  {
    path: "/ad/:id",
    element: <ViewAds />,
  },
  {
    path: "/vendor-dashboard",
    element: <VendorDashboard />,
  },
  {
    path: "/add-ad",
    element: <AddNewAd />,
  },
]);

const App = () => {
  return (
    <div>
      {" "}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
