import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BgI from "../../../../assets/images/dragon.jpg";
export default function ProductInfomation() {
  return (
    <>
      <Header />
      <section className="product-info w-[1280px] h-auto bg-textbg m-auto">
        <div className="flex w-full h-auto bg-white px-4 pt-4 pb-6 ">
          <div className="w-[484px] h-auto flex flex-col  ">
            <div className="flex">
              <div>
                <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
                <img src={BgI} className="max-w-[76px] max-h-[76px] mt-1.5" />
              </div>
              <div className="px-1.5 py-1.5">
                <img
                  src={BgI}
                  className="max-w-[392px] max-h-[100%] w-auto h-auto"
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
                Mùa Hè Không Tên - Tặng Kèm Bookmark 2 Mặt + Poster Tranh + Chữ
                Ký Tác Giả Ngẫu Nhiên
              </h1>
              <div className="max-w-[100px] w-full h-[3px] bg-textGray"></div>
              <div className="flex items-center mt-4 pt-2 pb-4">
                <span className="text-textred text-[32px] leading-[32px] font-[700]">
                  1334 d
                </span>
                <del className="ml-2 text-[1em] font-[300]">2222.dd</del>
              </div>

              <p className="font-[400] text-[1em] pb-2">
                7 Thói quen Hiệu quả (7 Habits of Highly Effective People) –
                Cuốn sách của Stephen R.Covey đã được dịch sang 40 ngôn ngữ khác
                nhau và bán ra hơn 30 triệu bản trên toàn thế giới.
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
                        value={1}
                      />
                    </a>
                    <i className="fa-solid fa-plus flex-1 text-center"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
