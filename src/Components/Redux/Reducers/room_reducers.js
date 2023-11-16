import { ActionTypes } from "../constants/action-types";

const INITIAL_STATE = [];

const roomReducer = (state = INITIAL_STATE, action) => {
    const { type, payload} = action;
    let quantity;
    // let amount

    switch (type) {
        case ActionTypes.ADD_TO_CART:
            const item = state.find((room) => room.roomTypeId === payload.roomTypeId)
            // console.log("state", state)
            if(!item) {
                return [
                    ...state, 
                    {
                        ...payload,
                        qty: 1,
                        quantity: 1,
                        totalCost: 1 * payload.price,
                        hasError: false,
                        changeQty:1
                    }
                ];
            }
            return [...state]
            case ActionTypes.ADJUST_QTY:
                quantity = state.find((itemQty)=>itemQty.roomTypeId === payload.roomTypeId)
                // console.log("quantity", quantity)
                if(quantity) {
                    const hasError = payload.qty > quantity.availableRooms;
                    const totalCost = payload.qty * quantity.price
                    return state.map((value) =>
                    value.roomTypeId === payload.roomTypeId ? { ...value, qty: payload.qty, changeQty: payload.qty, totalCost, hasError} : value);
                }
          
                return state

            case ActionTypes.REMOVE_FROM_CART: 
                return state.filter((removeProd) => removeProd.roomTypeId !== payload.roomTypeId)
            case ActionTypes.CLEAR_ROOM_CART:
                return INITIAL_STATE;
        default:
            return state;
    }

}

export default roomReducer