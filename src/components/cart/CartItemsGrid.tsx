'use client';
import useCartStore from '@/store/cart.store';
import CartItem from './CartItem';

export default function CartItemsGrid() {
	const { items } = useCartStore();

	return (
		<div className="flex flex-col overflow-y-auto">
			{items.map((item) => (
				<CartItem key={item.product_id} {...item} />
			))}
		</div>
	);
}
