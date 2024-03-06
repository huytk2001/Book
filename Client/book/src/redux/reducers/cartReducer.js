const initialState = {
  items: [],
  maxQuantities: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.items.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        const newQuantityInCart = existingProduct.quantityInCart + 1;

        // Kiểm tra và xử lý logic vượt quá số lượng có sẵn ở đây
        if (newQuantityInCart > action.payload.quantity) {
          console.error("Số lượng trong giỏ hàng vượt quá số lượng có sẵn!");
          return state;
        }

        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantityInCart: newQuantityInCart,
                  totalPrice: newQuantityInCart * item.price,
                }
              : item
          ),
        };
      } else {
        const newProduct = {
          ...action.payload,
          quantityInCart: 1,
          totalPrice: action.payload.price,
        };

        return {
          ...state,
          items: [...state.items, newProduct],
        };
      }
    }
    case "ADD_MULTIPLE_TO_CART": {
      const { products } = action.payload;

      // Calculate the total quantity being added
      const totalQuantityToAdd = products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      // Calculate the current total quantity in the cart
      const currentTotalQuantity = state.items.reduce(
        (total, item) => total + item.quantityInCart,
        0
      );

      // Calculate the maximum allowed quantity in the cart
      const maxCartQuantity = 100; // You can adjust this based on your requirements

      // Check if adding the new items will exceed the maximum allowed quantity
      if (currentTotalQuantity + totalQuantityToAdd > maxCartQuantity) {
        console.error("Số lượng trong giỏ hàng vượt quá giới hạn!");
        return state;
      }

      // Update the quantities in the cart
      const updatedItems = products.map((product) => {
        const existingProductIndex = state.items.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, update its quantity
          const existingProduct = state.items[existingProductIndex];
          const newQuantityInCart =
            existingProduct.quantityInCart + product.quantity;

          return {
            ...existingProduct,
            quantityInCart: newQuantityInCart,
            totalPrice: newQuantityInCart * existingProduct.price,
          };
        } else {
          // If the product is not in the cart, add it
          return {
            ...product,
            quantityInCart: product.quantity,
            totalPrice: product.quantity * product.price,
          };
        }
      });

      // Combine the existing items with the updated items
      const combinedItems = state.items
        .filter(
          (existingItem) =>
            !products.some((newItem) => newItem.id === existingItem.id)
        )
        .concat(updatedItems);

      return {
        ...state,
        items: combinedItems,
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY": {
      const { id, quantityInCart, quantity } = action.payload;
      const existingProduct = state.items.find((product) => product.id === id);

      if (existingProduct) {
        const newQuantityInCart = quantityInCart;

        if (newQuantityInCart > quantity) {
          console.error("Số lượng trong giỏ hàng vượt quá số lượng có sẵn!");
          return state;
        }

        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantityInCart: newQuantityInCart,
                  totalPrice: newQuantityInCart * item.price,
                }
              : item
          ),
        };
      }

      return state;
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "SET_MAX_QUANTITY":
      return {
        ...state,
        maxQuantities: {
          ...state.maxQuantities,
          [action.payload.productId]: action.payload.maxQuantity,
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
