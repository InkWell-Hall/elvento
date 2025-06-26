import React, { useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import Navbar from "../components/Navbar";
import { products } from "../assets/asset";
import { Trash2 } from "lucide-react";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import empty from "../assets/emptytCart.jpg";
import Title from "../components/Ttitle";
import Card from "../components/Card";

const Favorites = () => {
  const { currency, favoriteItems, updateQuantity, getCartAmount, allAds } =
    useContext(AdContext);

  const [cartData, setCardData] = useState([]);
  const navigate = useNavigate();
  const verifyOrder = () => {
    if (getCartAmount() <= 0) {
      toast.error("Add Product to Cart");
    } else {
      navigate("/place-order");
    }
  };

  useEffect(() => {
    const tempData = [];
    for (const items in favoriteItems) {
      for (const item in favoriteItems[items]) {
        if (favoriteItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: favoriteItems[items][item],
          });
        }
      }
    }
    setCardData(tempData);
  }, [favoriteItems]);

  // const verifyOrder = () => {
  //   if (getCart){

  //   }
  // }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="border-t pt-14 w-[80%] mx-auto mt-4">
          <div className="text-2xl mb-3">
            <h1 className="font-lead-font text-lead-text font-light">
              <Title text1={"YOUR"} text2={"FAVORITES"} />
            </h1>
          </div>
          <div>
            {cartData.map((item, index) => {
              const adData = allAds.find((ad) => ad.id === item.id);
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b grid grid-cols-[4fr_0.5fr_0.5] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <div>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="px-2 sm:px-3 sm:py-1  bg-slate-50">
                          {/* {item.size} */}
                          <Card
                            discount={89}
                            id={item.id}
                            image={adData.image[0]}
                            oldPrice={90}
                            price={24}
                            title={adData.name}
                            key={index}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    onChange={(event) =>
                      event.target.value === "" || event.target.value === "0"
                        ? null
                        : updateQuantity(
                            item.id,
                            item.size,
                            Number(event.target.value)
                          )
                    }
                  />
                  <Trash2
                    className="cursor-pointer"
                    onClick={() => {
                      updateQuantity(item.id, item.size, 0);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Favorites;
