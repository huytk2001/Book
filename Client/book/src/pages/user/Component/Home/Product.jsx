import { useState } from "react";
import BgBook from "../../../../assets/images/dragon.jpg";
import BgBook2 from "../../../../assets/images/NoelDay.jpg";
import BgBook3 from "../../../../assets/images/nxbtr.jpg";
import BgBook4 from "../../../../assets/images/nglbn.jpg";
import BgBook5 from "../../../../assets/images/damnghi.jpg";

export default function Product() {
  const [activeCategory, setActiveCategory] = useState("newProducts");

  const products = {
    newProducts: [
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      { title: "Dragon Ball5", image: BgBook5, price: "40.000đ" },
      // Add more new products as needed
    ],
    featuredProducts: [
      { title: "Featured Book 1", image: BgBook2, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook3, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook4, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook3, price: "40.000đ" },
      { title: "Dragon Ball", image: BgBook, price: "40.000đ" },
      // Add more featured products as needed
    ],
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  return (
    <section className="py-[30px] product-selection relative ">
      <div className="w-[1280px] h-auto relative m-auto flex items-center justify-between bg-white py-3">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="title-product ">
            <h4 className="text-theme-color text-[18px] uppercase font-[400] pb-[10px] text-center">
              SẢN PHẨM ĐỘC QUYỀN
            </h4>
            <h2 className="text-text2222 font-[700] text-[36px] uppercase px-1 text-center leading-none tracking-wide border-b-[4px] border-theme-color mb-[50px]">
              SẢN PHẨM ĐẶC BIỆT
            </h2>
          </div>
          <div>
            <ul className="flex flex-wrap gap-5">
              <li
                className={`text-${
                  activeCategory === "newProducts" ? "theme-color" : "black"
                } text-[18px] uppercase font-[500] pb-[10px] cursor-pointer`}
                onClick={() => handleCategoryClick("newProducts")}
              >
                Sản phẩm mới
              </li>
              <li
                className={`text-${
                  activeCategory === "featuredProducts"
                    ? "theme-color"
                    : "black"
                } text-[18px] uppercase font-[500] pb-[10px] cursor-pointer`}
                onClick={() => handleCategoryClick("featuredProducts")}
              >
                Sản phẩm tiêu biểu
              </li>
            </ul>
          </div>
          <div className="container mx-auto px-[15px] pb-[20px] ">
            <div className="grid grid-cols-5 w-full gap-2 pt-10">
              {products[activeCategory].map((product, index) => (
                <div
                  key={index}
                  className="grid justify-center items-center w-full group transition-transform duration-300 transform hover:border border-gray-300 p-4"
                >
                  <img
                    className="max-h-[190px] max-w-full rounded-md overflow-hidden"
                    src={product.image}
                    alt={product.title}
                  />
                  <h6 className="leading-6 mt-4 text-[14px] text-center text-text2222 le">
                    {product.title}
                  </h6>
                  <p className="text-[16px] font-[600] text-center text-textred">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}