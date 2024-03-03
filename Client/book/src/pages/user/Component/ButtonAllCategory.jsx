import { useState, useEffect } from "react";
import { AlignLeft } from "react-feather";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ButtonAllCategory() {
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); // Add error state

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/category");
        setCategories(response.data || []);
        console.log("cato", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error); // Set error state if fetch fails
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="w-1/4 flex items-center border border-t-0 border-b-0 px-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="menu-list flex justify-center items-center gap-[15px] px-[28px] py-[14px] rounded-[5px] mx-auto">
        <AlignLeft size={24} color="black" />
        <span className="text-[18px] text2222 font-semibold text-center">
          Tất cả danh mục{" "}
        </span>{" "}
      </button>{" "}
      {isHovered && (
        <div className="absolute z-50 top-[54px] left-0 flex flex-col gap-3 w-[300px] py-4 px-7 bg-white border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          {categories.map((category) => (
            <Link
              to={`/category/detail/${category.id}`}
              key={category.id}
              className="flex items-center mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="">
                <p className="text-[14px] text-textGray font-[500]">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
          {error && <p>Error fetching categories: {error.message}</p>}
        </div>
      )}
    </div>
  );
}
