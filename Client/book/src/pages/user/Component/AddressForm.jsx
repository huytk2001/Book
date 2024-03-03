import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddressForm = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  // State cho các lỗi
  const [errors, setErrors] = useState({
    province: "",
    district: "",
    ward: "",
    street: "",
    phoneNumber: "",
  });

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    // Preload the first province's districts and wards
    if (provinces.length > 0) {
      setDistricts(provinces[0]?.districts || []);
      setWards(provinces[0]?.districts[0]?.wards || []);
    }
  }, [provinces]);

  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;
    setSelectedProvince(selectedProvinceCode);
    setErrors({ ...errors, province: "" }); // Reset lỗi khi chọn tỉnh/thành phố

    const selectedProvinceData = provinces.find(
      (province) => province.code === parseInt(selectedProvinceCode)
    );
    setDistricts(selectedProvinceData.districts);
    setSelectedDistrict(selectedProvinceData.districts[0]?.code);
    setWards(selectedProvinceData.districts[0]?.wards);
    setSelectedWard(selectedProvinceData.districts[0]?.wards[0]?.code);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setErrors({ ...errors, street: "" }); // Reset lỗi khi điền tên đường
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!selectedProvince) {
      newErrors.province = "Vui lòng chọn tỉnh/thành phố";
      valid = false;
    }

    if (!selectedDistrict) {
      newErrors.district = "Vui lòng chọn quận/huyện";
      valid = false;
    }

    if (!selectedWard) {
      newErrors.ward = "Vui lòng chọn phường/xã";
      valid = false;
    }

    if (!street.trim()) {
      newErrors.street = "Vui lòng nhập tên đường";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSaveAddress = async () => {
    // Validate form trước khi lưu
    if (!validateForm()) {
      return;
    }

    // Save the address to the list
    const selectedProvinceName = provinces.find(
      (province) => province.code === parseInt(selectedProvince)
    )?.name;

    const selectedDistrictName = districts.find(
      (district) => district.code === parseInt(selectedDistrict)
    )?.name;

    const selectedWardName = wards.find(
      (ward) => ward.code === parseInt(selectedWard)
    )?.name;

    // Thực hiện Geocoding

    // Lưu địa chỉ vào danh sách và gửi lên server
    const newAddress = {
      province: selectedProvinceName,
      district: selectedDistrictName,
      ward: selectedWardName,
      street,
      phoneNumber,
    };

    setSavedAddresses([...savedAddresses, newAddress]);
    saveAddressToServer(newAddress);

    console.log(newAddress);

    // window.location.reload();
  };

  const saveAddressToServer = (address) => {
    axios
      .post("http://localhost:4000/update-shipping-address", {
        userId,
        address,
      })
      .then((response) => {
        console.log("Đã gửi địa chỉ lên server:", response.data);
        // Xử lý phản hồi từ server nếu cần
      })
      .catch((error) => {
        console.error("Lỗi khi gửi địa chỉ lên server:", error);
      });
  };

  return (
    <div>
      <h2>Chọn địa chỉ giao hàng</h2>

      <form className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tỉnh/Thành phố:
          </label>
          <select
            className={`border rounded p-2 w-full ${
              errors.province ? "border-red-500" : ""
            }`}
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-red-500 text-sm">{errors.province}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quận/Huyện:
          </label>
          <select
            className={`border rounded p-2 w-full ${
              errors.district ? "border-red-500" : ""
            }`}
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phường/Xã:
          </label>
          <select
            className={`border rounded p-2 w-full ${
              errors.ward ? "border-red-500" : ""
            }`}
            value={selectedWard}
            onChange={handleWardChange}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
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
            value={street}
            onChange={handleStreetChange}
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
      </form>
    </div>
  );
};

export default AddressForm;
