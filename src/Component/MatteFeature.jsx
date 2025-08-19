import React from "react";

export default function MatteFeature({ image, children }) {
  return (
    <div className="matte-block">
      <img className="matte-img" src={image} alt="" />
      <div className="matte-glass">
        {children}
      </div>
    </div>
  );
}
