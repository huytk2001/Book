import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BgI from "../../../../assets/images/dragon.jpg";
import { useParams } from "react-router-dom";

export default function ProductInfomation() {
  const [product, setProduct] = useState(null); // Đổi tên thành product để phản ánh rõ hơn là chỉ có một sản phẩm

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/${id}`
        );

        setProduct(response.data.result[0]); // Sử dụng response.data.result[0] để lấy thông tin sản phẩm
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("====================================");
    console.log(product);
    console.log("====================================");
  }, [product]);

  return (
    <>
      <Header />
      <section className="product-info w-[1280px] h-auto bg-textbg m-auto">
        {product && (
          <div
            className="flex w-full h-auto bg-white px-4 pt-4 pb-6"
            key={product.id}
          >
            <div className="w-[484px] h-auto flex flex-col">
              <div className="flex">
                <div>
                  <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                  <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                  <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                  <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                </div>
                <div className="px-1.5 py-1.5">
                  <img
                    src={`http://localhost:4000/uploads/${product.image}`}
                    className="max-w-[392px] w-[400px] max-h-[100%] h-auto"
                  />
                </div>
              </div>
              <div className="flex mt-6  px-4 ">
                <div className="flex h-11 w-[220px] bg-white justify-center border-[2px] border-textred rounded-[8px] cursor-pointer">
                  <button className="flex justify-center items-center  ">
                    <i className="fa-solid fa-cart-shopping pl-[10px] text-textred text-[1.1em] font-[700] "></i>
                    <span className="pl-[10px] text-textred text-[1.1em] font-[700] ">
                      Thêm vào giỏ hàng
                    </span>
                  </button>
                </div>
                <div className="flex h-11 w-[220px]  bg-textred ml-2.5 items-center justify-center border-[2px] border-none rounded-[8px] cursor-pointer">
                  <button className="pl-[10px] text-white text-[1.1em] font-[700] ">
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
            <div className=" w-[calc(100%-484px)] pl-9">
              <div className="flex flex-col">
                <h1 className="text-[1.7em] font-[600] text-textBlack  leading-6 pb-4  break-words">
                  {product.name}
                </h1>
                <div className="max-w-[100px] w-full h-[3px] bg-textGray"></div>
                <div className="flex items-center mt-4 pt-2 pb-4">
                  <span className="text-textred text-[32px] leading-[32px] font-[700]">
                    {product.price}
                  </span>
                </div>

                <p className="font-[400] text-[1em] pb-2">
                  {product.description}
                </p>

                <div className="flex h-[32px]">
                  <label
                    htmlFor="qty"
                    className="max-w-[200px] min-w-[150px] font-[650] text-[1.2em] pr-2 text-left"
                  >
                    Số lượng
                  </label>
                  <div className="flex max-w-[140px]  ">
                    <div className="flex flex-2 items-center border border-solid border-gray-300 h-[32px] px-[10px]">
                      <i className="fa-solid fa-minus flex-1 text-center"></i>
                      <a className="flex-1 w-full">
                        <input
                          className="text-[15px]  font-[600] text-text3333 text-center w-full "
                          defaultValue={1} // Thay vì value={1}
                        />
                      </a>
                      <i className="fa-solid fa-plus flex-1 text-center"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
