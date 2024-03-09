import React, { useState, useEffect, useRef } from "react";
import { Plus } from "react-feather";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../../../redux/actions/cartActions";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function ProductCategory({ selectedItem, history }) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);
  const { id } = useParams();
  const isMounted = useRef(true); // Sử dụng useRef để theo dõi trạng thái mounted

  useEffect(() => {
    return () => {
      // Cleanup function để đánh dấu component đã unmounted
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/category/${id}`
        );
        if (isMounted.current) {
          setProducts(response.data); // Kiểm tra trạng thái mounted trước khi gọi setState
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    fetchProducts();

    return () => {
      // Cleanup function để hủy các yêu cầu khi component unmounts
      // Đảm bảo hủy bỏ các yêu cầu AJAX hoặc các tác vụ không còn cần thiết nữa
    };
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/${productId}`
      );
      const selectedProduct = response.data;

      if (
        selectedProduct &&
        selectedProduct.images &&
        selectedProduct.images.length > 0
      ) {
        const selectedImage = getImageUrl(selectedProduct.images[0]);
        dispatch(addToCart({ ...selectedProduct, image_url: selectedImage }));
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  };

  const getImageUrl = (image) => {
    if (image && typeof image === "object" && image.image_url) {
      return `http://localhost:4000/${image.image_url}`;
    } else if (typeof image === "string") {
      return `http://localhost:4000/${image}`;
    }
    return "";
  };

  const filteredAndSortedProducts = () => {
    if (!Array.isArray(products) || products.length === 0) {
      return []; // Trả về một mảng trống nếu products không tồn tại hoặc không phải là một mảng hợp lệ
    }

    let sortedProducts = [...products];

    switch (selectedItem) {
      case "Tất cả":
        break;
      case "Thứ tự theo giá: từ thấp đến cao":
        sortedProducts.sort((a, b) => a.product_price - b.product_price);
        break;
      case "Thứ tự theo giá: cao thấp đến thấp":
        sortedProducts.sort((a, b) => b.product_price - a.product_price);
        break;
      default:
        break;
    }

    sortedProducts = removeDuplicates(sortedProducts);
    return sortedProducts;
  };

  const removeDuplicates = (arr) => {
    const uniqueProducts = arr.reduce((acc, current) => {
      const x = acc.find((item) => item.product_id === current.product_id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return uniqueProducts;
  };

  const handleProductClick = (productId) => {
    console.log("ID sản phẩm:", productId);
    window.scrollTo(0, 0);
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
    <>
      <div className="grid grid-cols-4 gap-4 w-full ">
        {filteredAndSortedProducts().map(
          (product) =>
            product.status === 1 && (
              <div
                key={product.id}
                className="px-3 py-3 bg-them-gray group hover:group"
              >
                <div className="relative flex justify-center items-center">
                  <div className="w-[170px] h-[140px]">
                    {product && product.image && product.image !== "" && (
                      <img
                        className="w-full h-full object-contain border"
                        src={`http://localhost:4000/uploads/${product.image}`}
                        alt={product.name} // Thêm alt để đảm bảo truy cập đến trường name
                      />
                    )}
                  </div>

                  <div>
                    <ul className="grid grid-cols-3 mt-2 right-0  absolute bg-white top-[80%] z-20 text-center px-[5px] py-[10px] w-full transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible -mb-[5px]">
                      <li>
                        <NavLink
                          to={`/product-detail/${product.product_id}`}
                          onClick={() => handleProductClick(product.product_id)}
                        >
                          <i className="fa-regular fa-eye"></i>
                        </NavLink>
                      </li>

                      <li className="z-30 relative group">
                        <i className="fa-solid fa-code-compare group hover:group"></i>
                      </li>
                      <li className="z-30 relative group">
                        <a className="notifi-wishlist">
                          <i className="fa-regular fa-heart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col">
                  {product && product.category && product.category !== "" && (
                    <span className="mb-2 text-[13px]">{product.category}</span>
                  )}
                  <h5 className="text-[16px] text-text2222 font-normal text-center">
                    {product &&
                    product.product_name &&
                    product.product_name.length > 18
                      ? `${product.product_name.slice(0, 18)}...`
                      : product.product_name}{" "}
                  </h5>
                  <div className="w-full flex mb-2 gap-1 items-center justify-center">
                    <div className="flex gap-1 ">
                      {product &&
                        product.rating &&
                        [...Array(product.rating)].map((_, index) => (
                          <i
                            key={index}
                            className="fa-solid fa-star text-yellow text-[11px]"
                          ></i>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-2 text-center items-center justify-center">
                    <h5 className="">
                      <span className="text-[15px] text-primaryGreen font-[600]">
                        {product && product.price && formatPrice(product.price)}
                      </span>
                      {product &&
                        product.discount &&
                        product.discount !== "" && (
                          <del className="text-[14px] text-textGray font-[400] line-through">
                            {product.discount}
                          </del>
                        )}
                    </h5>
                  </div>

                  <div className="flex justify-center items-center gap-2 mb-1">
                    <h6
                      className={`text-[15px] text-center font-[600] ${
                        product && product.product_status === "Còn hàng"
                          ? "text-primaryGreen"
                          : "text-red-500"
                      }`}
                      style={{ flex: 1 }}
                    >
                      {product &&
                        product.product_status === "Còn hàng" &&
                        product.product_quantity &&
                        product.product_quantity !== "" &&
                        `Còn hàng (${product.product_quantity} ${product.product_unit})`}
                      {product &&
                        product.product_status !== "Còn hàng" &&
                        "Hết hàng"}
                    </h6>
                  </div>

                  <div className="flex items-center">
                    <button
                      className={`relative w-full bg-lineGray hover:bg-them-gray rounded-[50px] p-[8px] flex justify-center items-center gap-2 text-[16px] font-[400] hover:text-text2222 transition ${
                        product && product.product_status === "Hết hàng"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleAddToCart(product.product_id)}
                      disabled={
                        product && product.product_status === "Hết hàng"
                      }
                    >
                      Thêm
                      <div className="absolute right-1 rounded-[50px] p-[7px] bg-white">
                        <Plus size={18} color="#0DA487" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
