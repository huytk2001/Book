const db = require("../config/database");

exports.Address = async (sql, values) => {
  try {
    const results = await db.promise().query(sql, values);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

exports.createOrder = async (orderData) => {
  try {
    const {
      userId,
      customerName,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status,
      orderCode,
      items,
    } = orderData;

    // Begin transaction
    await db.promise().beginTransaction();

    // Insert data into the orders table
    const [orderResult] = await db
      .promise()
      .query(
        "INSERT INTO orders (user_id, customer_name, shipping_address, payment_method, total_price, status, order_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          customerName,
          shippingAddress,
          paymentMethod,
          totalPrice,
          status,
          orderCode,
        ]
      );

    const orderId = orderResult.insertId;

    // Prepare data for the order_items table
    const orderItemsValues = items.map((item) => [
      orderId,
      item.productId,
      item.nameItem,
      item.quantity,
      item.price,
      item.unit,
    ]);

    // Insert data into the order_items table
    for (const orderItem of orderItemsValues) {
      await db
        .promise()
        .query(
          "INSERT INTO orders_items (order_id , book_id ,name, quantity, price, unit) VALUES (?, ?, ?, ?, ?, ?)",
          orderItem
        );

      // Update quantity in the products table
      await db
        .promise()
        .query("UPDATE book SET quantity = quantity - ? WHERE id = ?", [
          orderItem[3], // Corrected index for quantity
          orderItem[1],
        ]);

      // Update status in the products table
      await db
        .promise()
        .query(
          "UPDATE book SET status = 'hethang' WHERE id = ? AND quantity = 0",
          [orderItem[1]]
        );
    }

    // Commit transaction
    await db.promise().commit();

    // Return success response
    return { success: true, orderId };
  } catch (error) {
    // Rollback transaction on error
    await db.promise().rollback();
    console.error("Error creating order:", error);

    // Return error response
    return { success: false, error: "Failed to create order" };
  }
};
exports.getOrderDetails = async (userId, orderId) => {
  try {
    const [orderDetails] = await db
      .promise()
      .query(
        "SELECT o.*, MIN(oi.id) as order_item_id, oi.book_id, p.name, p.image, oi.quantity, oi.price, oi.unit " +
          "FROM orders o " +
          "JOIN orders_items oi ON o.id = oi.order_id " +
          "JOIN book p ON oi.book_id = p.id " +
          "WHERE o.id = ? AND o.user_id = ? " +
          "GROUP BY oi.book_id",
        [orderId, userId]
      );

    return orderDetails;
  } catch (error) {
    throw error;
  }
};
exports.getAllOrdersFromDatabase = async () => {
  try {
    // Thực hiện truy vấn tới dịch vụ cơ sở dữ liệu của bạn
    const [rows] = await db.promise().query(
      "SELECT o.*, oi.book_id, p.name, oi.quantity, oi.price, oi.unit, u.name AS customer_name " +
        "FROM orders o " +
        "JOIN orders_items oi ON o.id = oi.order_id " +
        "JOIN book p ON oi.book_id = p.id " +
        "JOIN users u ON o.user_id = u.id " + // Thêm phép JOIN để lấy tên khách hàng
        "GROUP BY o.id, oi.book_id " +
        "ORDER BY o.id DESC, oi.book_id ASC"
    );

    // Kiểm tra xem rows có phải là một mảng không
    if (!Array.isArray(rows)) {
      throw new Error("Invalid data format returned from database");
    }

    console.log("rows:", rows); // Log giá trị rows trước khi trả về

    return rows;
  } catch (error) {
    throw error;
  }
};
