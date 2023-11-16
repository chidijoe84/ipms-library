import { useSelector } from "react-redux";
import { ActionTypes } from "../constants/action-types";

export const handleAddToCart = (item) => async (dispatch) => {
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: item
    })
}

export const GetCartData = () => {
    const cart = useSelector((state) => state.rootReducer.cart);
    return cart;
  };

  export const handleRemoveFromCart = (itemId) => async (dispatch) => {
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: {
            roomTypeId: itemId
        }
    })
  }

  export const handleAdjustQty = (itemId, value) => async (dispatch) => {
    dispatch({
        type: ActionTypes.ADJUST_QTY, 
        payload: {
            roomTypeId: itemId,
            qty: +value
        }
    })
  }

  export const handleClearStore = () => async (dispatch) =>{
    dispatch({
        type: ActionTypes.CLEAR_ROOM_CART
    })
  }