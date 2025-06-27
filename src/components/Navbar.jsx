import { useContext, useState } from "react";
import { Heart, LogIn, Search } from "lucide-react";
import { Menu, X } from "lucide-react";
import bag from "../assets/Bag.svg.svg";
import sign from "../assets/sign.svg.svg";
import timer from "../assets/timer.svg.svg";
import { Link, useNavigate } from "react-router";
import { AdContext } from "../context/AdContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount, getFavoriteCount } = useContext(AdContext);
  const navigate = useNavigate();
  const determiner = localStorage.getItem("ACCESS_TOKEN");
  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/");
  };

  const preventFav = () => {
    if (determiner) {
      navigate("/favorites");
    } else {
      toast.error("Please log In to View Favorites");
    }
  };
  const preventCart = () => {
    if (determiner) {
      navigate("/cart");
    } else {
      toast.error("Please log In to View Favorites");
    }
  };
  return (
    <nav className="flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8 py-4 h-auto relative">
      {/* Logo and Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto gap-10">
        <Link to={"/"}>
          <h1 className="text-lg font-lead-font text-lead-text">
            EL<span className="font-bold">VENTO</span>
          </h1>
        </Link>

        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search"
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-2 py-1 rounded-full outline-none bg-inherit border text-sm"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          />
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Links - collapsible */}
      {isOpen && (
        <ul className="flex flex-col gap-4 p-4 absolute top-16 left-4 bg-white rounded shadow-md md:hidden z-10">
          <li>
            <a className="text-black font-bold" href="#">
              Women
            </a>
          </li>
          <li>
            <a className="text-black font-bold" href="#">
              Curve
            </a>
          </li>
          <li>
            <a className="text-black font-bold" href="#">
              Men
            </a>
          </li>
          <li>
            <a className="text-black font-bold" href="#">
              Kids
            </a>
          </li>
          <li>
            <a className="text-black font-bold" href="#">
              Beauty
            </a>
          </li>
        </ul>
      )}

      {/* Desktop nav (hidden on small screens) */}
      <ul className="hidden md:flex gap-4 p-4">
        <li>
          <a className="text-black font-bold" href="#">
            Women
          </a>
        </li>
        <li>
          <a className="text-black font-bold" href="#">
            Curve
          </a>
        </li>
        <li>
          <a className="text-black font-bold" href="#">
            Men
          </a>
        </li>
        <li>
          <a className="text-black font-bold" href="#">
            Kids
          </a>
        </li>
        <li>
          <a className="text-black font-bold" href="#">
            Beauty
          </a>
        </li>
      </ul>

      {/* Search bar */}
      {/* <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto gap-2">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            className="border border-gray-300 rounded-2xl w-full pl-3 pr-10 py-1"
            placeholder="Search"
          />
          <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div> */}

      {/* Icons */}
      <div className="md:flex flex md:justify-center justify-center gap-10 md:gap-4 mt-4 ml-12 md:mt-0 ">
        {/* <img src={bag} alt="bag" />
        <img src={timer} alt="timer" /> */}
        <img src={sign} alt="sign in" />
        <div className="relative">
          <Link onClick={preventFav}>
            <Heart />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getFavoriteCount()}
            </p>
          </Link>
        </div>
        <div className="relative">
          <Link onClick={preventCart}>
            <img src={bag} alt="bag duplicate" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
        {/* <LogIn/> */}
      </div>
      {/* <Link to={"/login"}> */}
      <div>
        {determiner ? (
          <button
            onClick={logOut}
            className="bg-black hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 items-center cursor-pointer"
          >
            LogOut
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="bg-black hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 items-center cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
