import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddressForm = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [savedAddresses, setSavedAddresses] = useState([]);

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({
    province: "",
    district: "",
    ward: "",
    street: "",
    phoneNumber: "",
  });

  const userId = useSelector((state) => state.user.userId);

  const handleSaveAddress = async () => {
    if (!validateForm()) {
      return;
    }
    const selectedProvinceName = province.find(
      (prov) => prov.code === parseInt(selectedProvince)
    )?.name;

    const selectedDistrictName = district.find(
      (dist) => dist.code === parseInt(selectedDistrict)
    )?.name;

    const selectedWardName = ward.find(
      (wr) => wr.code === parseInt(selectedWard)
    )?.name;

    const newAddress = {
      province: selectedProvinceName,
      district: selectedDistrictName,
      ward: selectedWardName,
      street,
      phoneNumber,
    };

    setSavedAddresses([...savedAddresses, newAddress]);
    saveAddressToServer(newAddress);

    console.log("Dữ liệu gửi lên server:", newAddress);
  };

  const saveAddressToServer = (address) => {
    console.log("Dữ liệu gửi đi:", address);
    axios
      .post("http://localhost:4000/update-shipping-address", {
        userId,
        address: {
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWard,
          street,
          phoneNumber,
        },
      })

      .then((response) => {
        console.log("Đã gửi địa chỉ lên server:", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi địa chỉ lên server:", error);
      });
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!selectedProvince) {
      formIsValid = false;
      errors.province = "Vui lòng chọn tỉnh/thành phố.";
    }

    if (!selectedDistrict) {
      formIsValid = false;
      errors.district = "Vui lòng nhập quận/huyện.";
    }

    if (!selectedWard) {
      formIsValid = false;
      errors.ward = "Vui lòng nhập phường/xã.";
    }

    if (!street) {
      formIsValid = false;
      errors.street = "Vui lòng nhập tên đường.";
    }

    if (!phoneNumber) {
      formIsValid = false;
      errors.phoneNumber = "Vui lòng nhập số điện thoại.";
    }

    setErrors(errors);
    return formIsValid;
  };
  return (
    <div>
      <h2>Chọn địa chỉ giao hàng</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tỉnh/Thành phố:
        </label>
        <input
          type="text"
          className={`border rounded p-2 w-full ${
            errors.province ? "border-red-500" : ""
          }`}
          placeholder="Nhập tỉnh/thành phố"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
        />
        {errors.province && (
          <p className="text-red-500 text-sm">{errors.province}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quận/Huyện:
        </label>

        <input
          type="text"
          className={`border rounded p-2 w-full ${
            errors.district ? "border-red-500" : ""
          }`}
          placeholder="Nhập quận/huyện"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        />
        {errors.district && (
          <p className="text-red-500 text-sm">{errors.district}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phường/Xã:
        </label>
        <input
          type="text"
          className={`border rounded p-2 w-full ${
            errors.ward ? "border-red-500" : ""
          }`}
          placeholder="Nhập phường/xã"
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
        />
        {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tên đường:
        </label>
        <input
          type="text"
          className={`border rounded p-2 w-full ${
            errors.street ? "border-red-500" : ""
          }`}
          placeholder="Nhập tên đường"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        {errors.street && (
          <p className="text-red-500 text-sm">{errors.street}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Số điện thoại:
        </label>
        <input
          type="text"
          className={`border rounded p-2 w-full ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}
      </div>

      <button
        type="button"
        className="bg-primaryGreen text-white px-4 py-2 rounded-md"
        onClick={handleSaveAddress}
      >
        Lưu địa chỉ
      </button>
    </div>
  );
};

export default AddressForm;
