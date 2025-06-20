import { Heart, Search } from "lucide-react";
import bag from "../assets/bag.svg.svg"
import sign from "../assets/sign.svg.svg"
import timer from "../assets/timer.svg.svg"



export default function Navbar() {

  return (
    <nav className="flex justify-between items-center px-8 py-4 text-bold h-10">
      <div className="flex justify-center items-center">
        <h1 className="text bold space-between text-headinding">
          <span>Elvento</span>
        </h1>
        <div>
          <ul class="flex gap-4 p-4 rounded  ">
            <li>
              <a
                class="text-black font-bold"
                href="#">Women</a>
            </li>
            <li>
              <a
                class="text-black font-bold"
                href="#">Curve</a>
            </li>
            <li>
              <a
                class="text-black font-bold"
                href="#">Men</a>
            </li>
            <li>
              <a
                class="text-black font-bold"
                href="#">Kids</a>
            </li>
            <li>
              <a
                class="text-black font-bold"
                href="#">Beauty</a>
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
        <Heart />
        <img src={bag} />
      </div>





    </nav>

  )
}






