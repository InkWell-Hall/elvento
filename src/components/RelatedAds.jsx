import React, { use, useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import { Link, useParams } from "react-router";
import Card from "./Card";
// import BookItem from "./BookItem";
// import { useParams } from "react-router";
// import { apiClient } from "../api/client";

const RelatedAds = ({ category, subCategory }) => {
  const { allAds } = useContext(AdContext);
  const [related, setRelated] = useState([]);
  const { id } = useParams();
  console.log(allAds);

  useEffect(() => {
    if (allAds.length && category) {
      const relatedBooks = allAds.filter(
        (item) =>
          item.id !== id && // exclude current book
          item.category?.toLowerCase() === category.toLowerCase()
      );
      setRelated(relatedBooks.slice(0, 5));
    }
  }, [allAds, category, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.location.reload();
  }, [id]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <h1>RELATED PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6 w-[90%] mx-auto">
        {related.map((item, index) => (
          <Link to={`/ad/${item.id}`} key={item.id}>
            <Card
              title={item.name}
              id={item.id}
              image={item.image[0]}
              // author={item.author}
              oldPrice={20}
              discount={90}
              key={index}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedAds;
