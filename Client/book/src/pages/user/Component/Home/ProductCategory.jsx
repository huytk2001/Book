import { useState, useEffect } from "react";
import Category from "../../../../assets/images/icon.svg";
import { NavLink } from "react-router-dom";

export default function ProductCategory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);

  return (
    <section className="w-full bg-textbg h-auto py-[30px]">
      <div className="w-[1280px] h-full flex flex-wrap m-auto pt-[20px] bg-white rounded-lg">
        <div className="w-full h-auto border-b ">
          <div className="w-full flex items-center h-auto px-4 py-4">
            <img
              className="h-8 w-8 object-contain mr-2"
              src={Category}
              alt="Category"
            />
            <span className="text-[1.6rem] text-text2222 font-bold">
              Danh mục sản phẩm
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 w-full gap-2 px-4 py-4 items-center">
          {products.map((product) => (
            <NavLink
              to={`/filter-product/${product.id}`}
              key={product.id}
              className="flex items-center mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <div
                key={product.id}
                className="w-full flex flex-col justify-center items-center cursor-pointer group"
              >
                <img
                  src={`http://localhost:4000/uploads/${product.image}`}
                  className="max-w-full h-auto object-center max-h-32"
                  alt={product.name}
                />

                <p className="font-[500] text-text7777 leading-[1.2rem] text-[1.23rem] text-center transition-colors duration-300 group-hover:text-red-500">
                  {product.name}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
