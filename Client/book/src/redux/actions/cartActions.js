export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
export const setMaxQuantity = (productId, maxQuantity) => {
  return {
    type: "SET_MAX_QUANTITY",
    payload: {
      productId,
      maxQuantity,
    },
  };
};
export const removeFromCart = (productId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: productId,
  };
};

export const updateQuantity = (productId, quantityInCart, quantity) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: {
      id: productId,
      quantityInCart,
      quantity,
    },
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};

export const addMultipleToCart = (products) => {
  return {
    type: "ADD_MULTIPLE_TO_CART",
    payload: {
      products,
    },
  };
};

export const socketUpdateQuantity = (data) => ({
  type: "SOCKET_UPDATE_QUANTITY",
  payload: data,
});
