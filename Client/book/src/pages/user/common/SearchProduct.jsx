import { useState } from "react";
import axios from "axios";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

export default function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false);

  const handleChange = async (e) => {
    const name = e.target.value;
    setSearchTerm(name);

    if (!name.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/product?name=${name}`
      );
      setSuggestions(response.data.data);
      setIsSuggestionClicked(false);
      console.log("Suggestions:", response.data); // Log ra suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // if (!isSuggestionClicked) {
    //   setIsFocused(false);
    // }
  };

  const handleSuggestionClick = () => {
    setIsSuggestionClicked(true);
  };

  const formatPrice = (price) => {
    const formattedPrice = Number(price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedPrice;
  };

  return (
    <>
      <div className="relative flex justify-center items-center">
        <form
          action=""
          className="flex justify-center items-center"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <input
            type="text"
            className="w-[400px] text-[16px] p-3 border border-lineGray rounded-tl-[5px] rounded-bl-[5px] outline-gray-300"
            placeholder="Tìm kiếm nông sản ở đây..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-yellow p-[15px] rounded-tr-[5px] rounded-br-[5px]"
          >
            <Search name="search" size={20} color="white" />
          </button>
        </form>

        {/* Hiển thị danh sách gợi ý khi có focus và có suggestions */}
        {isFocused && suggestions.length > 0 && (
          
          <ul className="absolute top-[40px] left-0 z-40 mt-2 p-4 w-[400px] bg-white border border-gray-300 rounded-b-[5px] overflow-hidden">
            {suggestions.map((item) => (
             
              <li key={item.id}>
                <Link
                  to={`/product-detail/${item.id}`}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={handleSuggestionClick}
                >
                  <img
                    src={`http://localhost:4000/uploads/${item.image}`}
                    className="w-[70px] h-[70px] border object-cover rounded mr-2"
                  />
                  <div>
                    <p className="text-[16px] text-primaryGreen font-semibold">
                      {item.name}
                    </p>
                    <p className="text-[14px] text-textBlack">
                      {formatPrice(item.price)} / 1{item.unit}
                    </p>
                    <p className="text-[13px] text-textBlack">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Hiển thị placeholder khi có focus nhưng không có suggestions */}
        {isFocused && suggestions.length === 0 && (
          <div className="absolute top-[40px] left-0 z-40 mt-2 p-4 w-[400px] bg-white border border-gray-300 rounded-b-[5px] overflow-hidden">
            <p className="text-[14px] text-gray-500">
              Hãy nhập tên sản phẩm bạn muốn tìm kiếm...
            </p>
          </div>
        )}
      </div>
    </>
  );
}
