import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import VendorLogin from "./pages/VendorLogin";
import Login from "./pages/Login";
import VendorHome from "./pages/VendorHome";
import ViewAds from "./pages/ViewAds";
import VendorDashboard from "./pages/VendorDashboard";
import AddNewAd from "./pages/AddNewAd";
import Card from "./components/Card";
import Cart from "./pages/Cart";
import { ToastContainer, toast } from "react-toastify";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/Notfound";
import Collections from "./pages/Collections";
import VendorProfile from "./pages/VendorProfile";

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
  {
    path: "/card",
    element: <Card />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/place-order",
    element: <PlaceOrder />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/collections",
    element: <Collections />,
  },
  {
    path: "/vendor-profile",
    element: <VendorProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <div>
      <ToastContainer /> <RouterProvider router={router} />
    </div>
  );
};

export default App;
