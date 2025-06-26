import React, { useContext } from "react";
import { AdContext } from "../context/AdContext";

const Women = () => {
  const { allAds } = useContext(AdContext);
  const women = allAds.filter(
    (item) => item.category === allAds?.products?.category
  );

  console.log(women);

  return women ? (
    <div>
      <h1>woman oooo</h1>
      {women}
    </div>
  ) : (
    <div>
      <h1>No Woman</h1>
    </div>
  );
};

export default Women;
