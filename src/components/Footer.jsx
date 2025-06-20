import React from "react";
import googleplay from "../assets/googleplay.svg";
import appstore from "../assets/appstore.svg";
import { Facebook, Instagram, RectangleGogglesIcon, Youtube } from "lucide-react";
import tiktok from "../assets/tiktok.svg";
import snapchat from "../assets/snapchat.svg";
import pinterest from "../assets/pinterest.svg";

export default function Footer() {
  return (
    <footer>
      <div className="bg-black flex flex-row text-white justify-around gap-10 text-xs h-[50vh] p-6 mt-4">
        <div className="text-center mb-10 text-white  ">
          <h3 className="mb-2 font-bold">SHOP FASTER WITH THE APP</h3>


          <img
            src={googleplay.svg} />
          {/* <RectangleGogglesIcon /> */}
          <img
            src={appstore.svg} />

        </div>
        <div className="footer-section mt-1 flex flex-col">
          <h3 className="mb-2 font-bold">Get Help</h3>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section flex flex-col gap-2">
          <h3 className="font-bold "> Company</h3>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#">Careers</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Stores</a></li>
            <li><a href="#">Want to Collab?</a></li>
          </ul>
        </div>
        <div className="footer-section ">
          <h3 className="mb-2 font-bold">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Check Gift Card Balance</a></li>
          </ul>
        </div>
        <div className="footer-section text-left w-[30%] ">
          <h4 className="mb-2">SIGN UP FOR DISCOUNTS + UPDATES</h4>
          <input className="border p-3 bg-white text-zinc-800 rounded-9xl w-80 " type="text" placeholder="Phone Number or Email" />
          <p className="mt-2 text-xxs text-gray-500">By signing up for email, you agree to Elvento <a href="#"> <span className="underline">Terms of Service</span></a> and <a href="#"> <span className="underline">Privacy Policy</span></a>.</p>
          <p className="mt-2 text-xxs text-gray-500">By submitting your phone number, you agree to receive recurring automated promotional and personalized marketing text messages (e.g. cart reminders) from Elvento at the cell number used when signing up. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. <a href="#">View <span className="underline">Terms</span> & <span className="underline">Privacy</span></a>.</p>

          <div className="flex mt-4 gap-4 ">
            <Instagram color="white" />
            <Youtube color="white" />
            <Facebook color="white" />
            <img src={tiktok} />
            <img src={snapchat} />
           {/* <img src={Pinterest} />  */}
          </div>
          
        </div>


      </div>
    </footer>
  );
}




