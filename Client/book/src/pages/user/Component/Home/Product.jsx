import BgBook from "../../../../assets/images/";
import BgBook2 from "../../../../assets/images/";
export default function Product() {
  return (
    <section className="py-[70px]  bg-slate-200">
      <div className="w-[1280px] h-auto m-auto flex items-center justify-between bg-slate-400">
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
              <li className="text-theme-color text-[18px] uppercase font-[500] pb-[10px]">
                <a>Sản phẩm mới</a>
              </li>
              <li className="text-theme-color text-[18px] uppercase font-[500] pb-[10px]">
                Sản phẩm tiêu biểu
              </li>
            </ul>
          </div>
          <div>
            <img src={BgBook} />
          </div>
        </div>
      </div>
    </section>
  );
}
