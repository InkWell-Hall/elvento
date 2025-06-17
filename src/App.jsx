import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import VendorLogin from "./pages/VendorLogin";
import Login from "./pages/Login";
import VendorHome from "./pages/VendorHome";
import ViewAds from "./pages/ViewAds";
import Sidebar from "./components/sidebar";

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
]);

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px", background: "#f3f4f6" }}>
        {" "}
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
