const orderModel = require("../models/api.order.model");
exports.updateShippingAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const { province, district, ward, street, phoneNumber } = address;

    const shippingAddress = `${street}, ${ward}, ${district}, ${province}`;

    const query =
      "UPDATE users SET payment_method = ?, shipping_address = ?, phone = ? WHERE id = ?";
    const values = [
      "Thanh toán khi nhận hàng",
      shippingAddress,
      phoneNumber,
      userId,
    ];

    await orderModel.Address(query, values);

    console.log("Shipping address updated successfully");
    res.status(200).json({
      success: true,
      message: "Shipping address updated successfully",
    });
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
exports.getOrder = async (req, res) => {
  const { userId, orderId } = req.params;

  try {
    const orderDetails = await orderModel.getOrderDetails(userId, orderId);

    if (!orderDetails.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderInfo = {
      order: {
        id: orderDetails[0].id,
        user_id: orderDetails[0].user_id,
        customer_name: orderDetails[0].customer_name,
        shipping_address: orderDetails[0].shipping_address,
        total_price: orderDetails[0].total_price,
        unit: orderDetails[0].unit,
        order_code: orderDetails[0].order_code,
      },
      orderItems: orderDetails.map((item) => ({
        id: item.id,
        order_id: item.order_id,
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        unit: item.unit,
        product_image: item.image,
      })),
    };

    res.status(200).json(orderInfo);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// OrderController.js

exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.getAllOrdersFromDatabase();

    if (!allOrders.length) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng nào trong hệ thống" });
    }

    const allOrdersInfo = allOrders.reduce((acc, item) => {
      const existingOrder = acc.find((order) => order.id === item.id);

      if (!existingOrder) {
        acc.push({
          id: item.id,
          user_id: item.user_id,
          customer_name: item.customer_name, // Thêm trường customer_name
          shipping_address: item.shipping_address,
          total_price: item.total_price,
          status: item.status,
          unit: item.unit,
          order_code: item.order_code,
          seller_name: item.seller_name,
          orderItems: [
            {
              id: item.order_item_id,
              product_id: item.product_id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              unit: item.unit,
              product_image_url: item.product_image_url,
            },
          ],
        });
      } else {
        existingOrder.orderItems.push({
          id: item.order_item_id,
          product_id: item.product_id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          product_image_url: item.product_image_url,
        });
      }

      return acc;
    }, []);

    res.status(200).json(allOrdersInfo);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả đơn hàng:", error);
    res.status(500).json({ error: "Lỗi Nội bộ của Server" });
  }
};
