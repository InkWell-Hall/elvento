import React, { useContext } from "react";
import { AdContext } from "../context/AdContext";

const Curve = () => {
  const { allAds } = useContext(AdContext);
  const curve = allAds.filter(
    (item) => item.category === allAds?.products?.category
  );

  console.log(curve);

  return women ? (
    <div>
      <h1>woman oooo</h1>
      {curve}
    </div>
  ) : (
    <div>
      <h1>No Woman</h1>
    </div>
  );
};

export default Curve;
