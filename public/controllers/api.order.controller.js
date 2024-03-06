const orderModel = require("../models/api.order.model");

exports.updateShippingAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const { province, district, ward, street, phoneNumber } = address;

    const shippingAddress = `${street}, ${ward}, ${district}, ${province}.`;

    const query =
      "UPDATE users SET payment_method = ?, shipping_address = ?, phone = ?  WHERE id = ?";
    const values = [
      "Thanh toán khi nhận hàng",
      shippingAddress,
      phoneNumber,
      userId,
    ];

    await orderModel.Address(query, values);
    // Correct the function name to match the actual export name

    console.log("Shipping address updated successfully");
    res.status(200).send("Shipping address updated successfully");
  } catch (error) {
    console.error("Error updating shipping address:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const orderId = await orderModel.createOrder(orderData);
    res.status(200).json({ success: true, orderId });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
