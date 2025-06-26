import React, { useContext } from "react";
import { AdContext } from "../context/AdContext";

const kids = () => {
  const { allAds } = useContext(AdContext);
  const kids = allAds.filter(
    (item) => item.category === allAds?.products?.category
  );

  console.log(kids);

  return women ? (
    <div>
      <h1>woman oooo</h1>
      {kids}
    </div>
  ) : (
    <div>
      <h1>No Woman</h1>
    </div>
  );
};

export default kids;
