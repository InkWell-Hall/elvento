import React, { useState } from "react";
import Video from "../assets/landingvid.mp4";
import asset from "../assets/image1.png";
import asset2 from "../assets/image2.png";
import asset3 from "../assets/image3.png";
import asset5 from "../assets/image5.png";
import asset6 from "../assets/image6.png";
import asset7 from "../assets/image7.png";
import asset8 from "../assets/image8.png";
import asset9 from "../assets/image9.png";
import asset10 from "../assets/image10.png";
import Card from "../components/Card";
import { Sparkle } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router";
import dress1 from "../assets/dress1.jpeg";
import kids1 from "../assets/kids1.jpeg";
import men2 from "../assets/men2.jpeg";
import image from "../assets/image.png";
import beauty from "../assets/beauty1.jpeg"



// const items = [{ name: "for you", icon:  }, "Item 2", "Item 3"];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [active, setActive] = useState("");

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden">
        <div className="mt-3 cursor-pointer">
          <Link to={"/collections"}>
            <video autoPlay loop muted>
              <source src={Video} type="video/mp4" />
            </video>
          </Link>
        </div>
        <section className="w-[90%] mx-auto">
          <h1 className="text-2xl font-bold mt-10 ml-15 mb-4">BEST SELLERS</h1>
          <div className="flex gap-2">
              <img
                src={asset3}
                alt=""
                className="w-75"
              />
              <img
                src={asset7}
                alt=""
                className="w-75"
              />
              <img
                src={asset}
                alt=""
                className="w-75"
              />
              <img
                src={asset2}
                alt=""
                className="w-75"
              />
          </div>
          {/* <img src={asset} alt="" className="w-80" /> */}
        </section>
        <section>
          <div className="bg-[url('./assets/image4.png')] w-[100%] h-[90vh] bg-cover flex flex-col text-white mt-10">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-6xl font-bold">NEW ARRIVALS</h1>
              <button className="mt-4 px-2 py-2 bg-blue-500 cursor-pointer text-white">
                SHOP NOW
              </button>
            </div>
          </div>
        </section>
        <section className="flex">
          <div>
            <h1 className="text-2xl font-bold mt-10 ml-10 mb-4">
              FEATURED PRODUCTS
            </h1>
            <div className="flex w-[90%] mx-auto mr-10 text-white gap-3">
              <div className="flex relative">
                <img src={men2} alt="" className="w-60 h-73" />
                <h1 className="absolute text-2xl font-bold cursor-pointer bottom-5 left-20">
                  VENTO<span className="font-light">MEN</span>
                </h1>
              </div>
              <div className="flex relative">
                <img src={dress1} alt="" className="w-60 h-73" />
                <h1 className="absolute text-2xl cursor-pointer font-bold bottom-5 left-17">
                  VENTO<span className="font-light">DOLL</span>
                </h1>
              </div>
              <div className="flex relative">
                <img src={kids1} alt="" className="w-62 h-73" />
                <h1 className="absolute text-2xl cursor-pointer font-bold bottom-5 left-21">
                  VENTO<span className="font-light">KIDS</span>
                </h1>
              </div>
              <div className="flex relative">
                <img src={image} alt="" className="w-63 h-73" />
                <h1 className="absolute text-2xl cursor-pointer font-bold bottom-5 left-16">
                  VENTO<span className="font-light">CURVE</span>
                </h1>
              </div>
              <div className="flex relative">
                <img src={beauty} alt="" className="w-57 h-73" />
                <h1 className="absolute cursor-pointer text-2xl font-bold bottom-5 left-10">
                  VENTO<span className="font-light">BEAUTY</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-black text-white mt-25 w-[100%]">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1} // <-- FULL WIDTH
            spaceBetween={0} // <-- NO GAP
            className="w-screen text-center h-[50vh]" // <-- FULL WIDTH
          >
            <SwiperSlide className="w-screen h-[70vh] bg-black flex items-center justify-center">
              <div className="text-center mt-27">
                <h1 className="text-4xl font-bold font-lead-font text-[50px] mb-4 flick">
                  60% - 80% OFF SALE
                </h1>
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold">
                  SHOP NOW
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-screen h-[500px] flex items-center justify-center bg-[url(./assets/makeup.jpeg)] bg-no-repeat bg-cover bg-center">
              <h1 className="font-bold text-center mt-30 font-lead-font text-lead-text">
                MAGIC TOUCH OF BEAUTY
              </h1>
            </SwiperSlide>
            <SwiperSlide className="w-screen h-[70vh] bg-black flex items-center justify-center">
              <div className="text-center mt-27">
                <h1 className="text-4xl font-bold font-lead-font text-lead-text mb-4">
                  SUBSCRIBE NOW TO OUR NEWSLETTERS <br /> AND GET THE LATEST
                  UPDATES
                </h1>
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold">
                  Subscribe Now!
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide className="w-screen h-[500px] flex items-center justify-center bg-[url(./assets/face.jpeg)] bg-no-repeat bg-cover bg-center">
              <h1 className="text-4xl font-bold text-center mt-30 font-lead-font text-lead-text">
                MAKE YOUR MOUTH BEAUTIFUL
              </h1>
            </SwiperSlide>
          </Swiper>
        </section>
        <section className="mt-12 px-8">
          <div>
            <div className="flex mb-4">
              <h1 className="text-2xl font-bold ml-10">SHOP THE LATEST</h1>
            </div>
            <div className="flex gap-2 mb-4 cursor-pointer items-center text-xs font-bold ml-10 ">
              <button className="flex rounded-3xl transition-all duration-150 border px-5 py-3 cursor-pointer hover:bg-black hover:text-white">
                {" "}
                <Sparkle size={17} />
                For You
              </button>
              <button className="flex rounded-3xl border transition-all duration-400 px-5 py-3 cursor-pointer hover:bg-black hover:text-white">
                New In
              </button>
              <button className="rounded-3xl border transition-all duration-400 px-5 py-2 cursor-pointer hover:bg-black hover:text-white">
                Sale
              </button>
              <button className="rounded-3xl border transition-all duration-400 px-5 py-2 cursor-pointer hover:bg-black hover:text-white">
                Jeans
              </button>
              <button className="rounded-3xl border transition-all duration-400 px-5 py-2 cursor-pointer hover:bg-black hover:text-white">
                Dress
              </button>
            </div>
          </div>

          <div className="flex"></div>
          <div className="flex cursor-pointer gap-4 w-[80%] mx-auto">
            <Card
              title={"Lola basics-multi colored"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Sena lisa"}
              image={asset7}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Juvit multi-colored"}
              image={asset8}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
          </div>
          <div className="flex gap-4 cursor-pointer mt-20 w-[80%] mx-auto">
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
          </div>
          <div className="flex gap-4 cursor-pointer w-[80%] mx-auto mt-20">
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
            <Card
              title={"Silacs rubisx"}
              image={asset6}
              price={23}
              oldPrice={45}
              discount={50}
            />
          </div>
          {/* <div className="flex justify-center items-center mt-20">
            <button className="boader-2 rounded-3xl px-7 py-2 bg-black text-white text-xs font-medium hover:bg-gray-950">
              Load More
            </button>
          </div> */}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
