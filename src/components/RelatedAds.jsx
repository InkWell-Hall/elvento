import React, { useContext, useEffect, useState } from "react";
// import ProductsItems from "./ProductsItems";
import { Link, useParams } from "react-router";
import { AdContext } from "../context/AdContext";
import Title from "../components/Ttitle";
import Card from "../components/Card";

const RelatedProducts = ({ category }) => {
  const { allAds } = useContext(AdContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = async () => {
    allAds.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, allAds]);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (allAds.length > 0) {
      let productsCopy = allAds.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);

      // productsCopy = productsCopy.filter(
      //   (item) => subCategory === item.subCategory
      // );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [allAds]);

  // Scroll to top when a new product is clicked

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <Card
            onClick={() => setImage(item)}
            key={index}
            name={item.name}
            id={item.id}
            image={item.image[0]}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
