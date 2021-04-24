import { ADD_ITEM, REMOVE_ITEM } from './Types';

const initalState = {
  items: [],
  totalAmount: 0,
};

export const cartReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ITEM:
      const hasItem =
        state.items.filter((item) => item.id === payload.id).length > 0;

      if (hasItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === payload.id
              ? { ...item, amount: item.amount + payload.amount }
              : item
          ),
          totalAmount: state.totalAmount + payload.price * payload.amount,
        };
      }

      return {
        ...state,
        items: [...state.items, payload],
        totalAmount: state.totalAmount + payload.price * payload.amount,
      };

    case REMOVE_ITEM:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === payload
      );
      const existingItem = state.items[existingItemIndex];
      let updatedItems;

      if (existingItem.amount > 1) {
        updatedItems = state.items.map((item) =>
          item.id === payload ? { ...item, amount: item.amount - 1 } : item
        );
      } else {
        updatedItems = state.items.filter((item) => item.id !== payload);
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - existingItem.price,
      };

    default:
      return state;
  }
};
