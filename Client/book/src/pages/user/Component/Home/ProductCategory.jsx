import { useState } from "react";
import Category from "../../../../assets/images/icon.svg";
import Bg1 from "../../../../assets/images/thieunhis2.jpg";
import Bg2 from "../../../../assets/images/T_m_linh.jpg";
import Bg3 from "../../../../assets/images/Thao_t_ng.jpg";
import Bg4 from "../../../../assets/images/xhkt.jpg";
export default function ProductCategory() {
  const [products, setProduct] = useState([
    { id: 1, image: Bg1, title: "Ten san pham 1" },
    { id: 2, image: Bg2, title: "ten san pham 2" },
    { id: 3, image: Bg1, title: "Ten san pham 1" },
    { id: 4, image: Bg2, title: "ten san pham 2" },
    { id: 1, image: Bg1, title: "Ten san pham 1" },
    { id: 2, image: Bg2, title: "ten san pham 2" },
    { id: 3, image: Bg1, title: "Ten san pham 1" },
    { id: 4, image: Bg2, title: "ten san pham 2" },
    { id: 3, image: Bg1, title: "Ten san pham 1" },
    { id: 4, image: Bg2, title: "ten san pham 2" },
  ]);
  return (
    <section className="w-full  bg-textbg h-auto py-[30px] ">
      <div className="w-[1280px] h-full flex flex-wrap m-auto pt-[20px]   bg-white rounded-lg">
        <div className="w-full h-auto border-b ">
          <div className="w-full flex items-center h-auto px-4 py-4">
            <img className="h-8 w-8 object-contain mr-2" src={Category} />
            <span className="text-[1.6rem] text-text2222 font-bold">
              Danh mục sản phẩm
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 w-full  gap-2 px-4 py-4 items-center ">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex flex-col justify-center items-center cursor-pointer group "
            >
              <img
                src={product.image}
                className="max-w-full h-auto object-center"
              />
              <p className="font-[500] text-text7777 leading-[1.2rem] text-[1.23rem] text-center transition-colors duration-300 group-hover:text-red-500">
                {product.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
