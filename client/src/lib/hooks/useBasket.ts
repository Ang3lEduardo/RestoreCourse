import type { Item } from "../../app/models/basket";
import { useClearBasketMutation, useFetchBasketQuery } from "../../features/basket/basketAPI";

export const useBasket = () => {
    const {data:basket} = useFetchBasketQuery();
    const [clearBasket] = useClearBasketMutation();
    const subtotal = basket ? basket.items.reduce((sum: number, item: Item) => sum + (item.price * item.quantity), 0) : 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;
    const total = subtotal + deliveryFee;

    return {basket, subtotal, deliveryFee, total, clearBasket};
}