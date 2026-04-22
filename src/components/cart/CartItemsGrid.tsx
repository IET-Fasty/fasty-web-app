'use client';
import useCartStore from '@/store/cart.store';
import CartItem from './CartItem';
import CartEmpty from './CartEmpty';

interface CartItemsGridProps {
	closeSheet: () => void;
}

export default function CartItemsGrid({ closeSheet }: CartItemsGridProps) {
	const { items } = useCartStore();

	if (items.length === 0) return <CartEmpty closeSheet={closeSheet} />;

	return (
		<div className="flex flex-col overflow-y-auto overflow-x-hidden">
			{items.map((item) => (
				<CartItem key={item.productId} {...item} />
			))}
		</div>
	);
}
