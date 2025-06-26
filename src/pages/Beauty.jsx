import React, { useContext } from "react";
import { AdContext } from "../context/AdContext";

const Beauty = () => {
  const { allAds } = useContext(AdContext);
  const beauty = allAds.filter(
    (item) => item.category === allAds?.products?.category
  );

  console.log(beauty);

  return women ? (
    <div>
      <h1>woman oooo</h1>
      {beauty}
    </div>
  ) : (
    <div>
      <h1>No Woman</h1>
    </div>
  );
};

export default Beauty;
