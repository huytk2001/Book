import { AlignLeft } from "react-feather";
export default function ButtonAllCategory() {
  return (
    <>
      <div className="w-1/4 flex items-center border border-t-0 border-b-0 px-3">
        <button className="menu-list flex justify-center items-center gap-[15px]  px-[28px] py-[14px] rounded-[5px] mx-auto">
          <AlignLeft size={24} color="black" />
          <span className="text-[18px] text2222 font-semibold text-center">
            Tất cả danh mục{" "}
          </span>{" "}
        </button>{" "}
      </div>{" "}
    </>
  );
}
