import { createSelector } from 'reselect'

export const selectCartItems = (state) => state.cart.items 

export const selectTotalDiscountedPrice = createSelector(
    [selectCartItems],
    (items) => 
        items.reduce((total, item) => total+ item.priceAfterDiscount * item.quantity,0)
)