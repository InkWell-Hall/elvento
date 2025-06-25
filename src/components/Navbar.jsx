import { Heart, Search } from "lucide-react";
import bag from "../assets/bag.svg.svg";
import sign from "../assets/sign.svg.svg";
import timer from "../assets/timer.svg.svg";
import { Link } from "react-router";
import { useContext } from "react";
import { AdContext } from "../context/AdContext";

export default function Navbar() {
  const { getCartCount, getFavoriteCount, favoriteItems } =
    useContext(AdContext);
  return (
    <div className="flex justify-between items-center px-8 py-4 text-bold h-10 z-20">
      <div className="flex justify-center items-center">
        <h1 className="text bold space-between font-lead-font font-light text-3xl">
          <Link to={"/"}>
            EL<span className="font-bold">VENTO</span>
          </Link>
        </h1>
        <div>
          <ul className="flex gap-4 p-4">
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
        </div>
      </div>
      <div className="flex relative items-center ml-100">
        <input type="text" className="border rounded-2xl " />
        <Search color="black" size={18} className="absolute left-2 bottom-1 " />
      </div>
      <div className="flex flex-row gap-4">
        <img src={bag} />
        <img src={timer} />
        <img src={sign} />
        <Link to={"/favorites"} className="relative">
          <Heart />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getFavoriteCount()}
          </p>
        </Link>
        <div>
          <Link to={"/cart"} className="relative">
            <img src={bag} />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
