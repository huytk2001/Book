import React, { useState } from "react";

const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const handlePriceChange = (e) => {
    setPriceRange([0, Number(e.target.value)]);
  };

  return (
    <div className="mb-3">
      <h4 className="text-[18px] mb-2">Giá</h4>
      <div>
        <div className="price-display flex justify-between  relative mt-[10px] w-full py-2">
          <div className="mb-5">
            <span className="min-price  absolute left-0 top-0">0đ</span>
            <span className="max-price absolute right-0  top-0">
              {priceRange[1]}đ
            </span>
          </div>
          <input
            className="w-full mt-6"
            type="range"
            value={priceRange[1]}
            min={0}
            max={500000}
            step={1000}
            onChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
