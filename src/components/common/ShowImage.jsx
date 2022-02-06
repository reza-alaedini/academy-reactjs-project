import React from "react";
import { Wave } from "react-css-spinners";
import { Img } from "react-image";

const ShowImage = ({ image, height = null }) => {
  return (
    <Img
      src={[
        `https://toplearnapi.ghorbany.dev/${image}`,
        "https://via.placeholder.com/150x100",
      ]}
      loader={
        <div className="text-center mx-auto">
          <Wave color="#2aaf27" />
        </div>
      }
      height={height}
    />
  );
};

export default ShowImage;
