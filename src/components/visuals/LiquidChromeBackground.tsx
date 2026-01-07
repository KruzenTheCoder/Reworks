"use client";
import React from "react";
import LiquidChrome from "./LiquidChrome";

const LiquidChromeBackground: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={1}
        amplitude={0.6}
        interactive={true}
      />
    </div>
  );
};

export default LiquidChromeBackground;

