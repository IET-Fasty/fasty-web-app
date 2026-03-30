import { Item } from '@/types/cart.types';

export const calculateCartTotal = (items: Item[]): number => {
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
};
