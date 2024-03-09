import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function ProductHot() {
  const [activeCategory, setActiveCategory] = useState("newProducts");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  const formatPrice = (price) => {
    // Chuyển đổi giá trị thành chuỗi và tách phần nguyên và phần thập phân
    const [integerPart, decimalPart] = price.toString().split(".");

    // Định dạng phần nguyên
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Nếu có phần thập phân, thêm vào định dạng
    if (decimalPart !== undefined) {
      formattedInteger += "." + decimalPart.padEnd(3, "0"); // Sử dụng padEnd để thêm số 0 vào phần thập phân
    } else {
      formattedInteger += ".000"; // Nếu không có phần thập phân, thêm '.000' vào cuối
    }

    // Thêm ký tự 'đ' vào cuối chuỗi định dạng
    return formattedInteger + "đ";
  };

  return (
    <section className="py-[30px] bg-textbg relative ">
      <div className="w-[1280px] h-auto relative m-auto flex items-center  bg-white  rounded-xl">
        <div className="w-full flex flex-col  ">
          <div className="title-product flex  items-center py-3 pl-4 bg-texthot  rounded-tr-[8px] rounded-tl-lg ">
            <span className="text-[18px] uppercase font-[600] ">
              {activeCategory === "newProducts"
                ? "Sản phẩm mới"
                : "Sản phẩm giảm sốc"}
            </span>
          </div>
          <div>
            <ul className="flex flex-wrap gap-5 pl-4 border-b">
              <li
                className={`text-${
                  activeCategory === "newProducts" ? "theme-color" : "black"
                } mr-10 text-[14px] uppercase font-[500] py-[10px] cursor-pointer ${
                  activeCategory === "newProducts"
                    ? "border-b-2 border-theme-color"
                    : ""
                } `}
                onClick={() => handleCategoryClick("newProducts")}
              >
                Sản phẩm mới
              </li>
              <li
                className={`text-${
                  activeCategory === "featuredProducts"
                    ? "theme-color"
                    : "black"
                } mr-10 text-[14px] uppercase font-[500] py-[10px] cursor-pointer ${
                  activeCategory === "featuredProducts"
                    ? "border-b-2 border-theme-color"
                    : ""
                }`}
                onClick={() => handleCategoryClick("featuredProducts")}
              >
                Sản phẩm giảm sốc
              </li>
            </ul>
          </div>
          <div className="container mx-auto px-[15px] pb-[20px] ">
            <div className="grid grid-cols-5 w-full gap-2 pt-10">
              {products
                .filter((product) =>
                  activeCategory === "featuredProducts"
                    ? product.price && product.price > 0 && product.price * 0.9
                    : true
                )
                .map(
                  (product) =>
                    product.status === "1" && (
                      <NavLink
                        to={`/product-detail/${product.id}`}
                        key={product.id}
                        className="grid justify-center items-center w-full group transition-transform duration-300 transform hover:border border-gray-300 p-4"
                      >
                        <img
                          className="max-h-[190px] max-w-full rounded-md overflow-hidden"
                          src={`http://localhost:4000/uploads/${product.image}`}
                          alt={product.title}
                        />
                        <h6 className="leading-6 mt-4 text-[14px] text-center text-text2222 le">
                          {product.name}
                        </h6>
                        <p className="text-[16px] font-[600] text-center text-textred">
                          {activeCategory === "featuredProducts" ? (
                            <>
                              {formatPrice(product.price * 0.9)}
                              <br />
                              <span className="line-through">
                                {formatPrice(product.price)}
                              </span>{" "}
                            </>
                          ) : (
                            formatPrice(product.price)
                          )}
                        </p>
                      </NavLink>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
