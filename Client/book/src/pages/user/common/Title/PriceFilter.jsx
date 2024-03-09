import React from 'react';

const PriceFilter = () => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Bộ lọc giá</h2>
            <input
                type="range"
                className="block w-full h-5 rounded-lg  bg-gray-300 appearance-none cursor-pointer"
                min="0"
                max="1000000"
                step="5000"
            />
        </div>
    );
};

export default PriceFilter;
