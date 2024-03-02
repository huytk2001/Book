export const getCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantityInCart, 0);

export const getCartItems = (state) => state.cart.items;

// Selector để tính tổng giá trị của giỏ hàng
export const getCartTotal = (state) => {
  const items = getCartItems(state);

  // Sử dụng reduce để tính tổng giá trị của tất cả các sản phẩm trong giỏ hàng
  const total = items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantityInCart;
  }, 0);

  return total;
};

export const getUserId = (state) => state.user.userId;
