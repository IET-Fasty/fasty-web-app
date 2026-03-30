import { create } from 'zustand';
import { Cart, Item } from '../types/cart.types';

const useCartStore = create<Cart>()((set) => ({
	// items: [],
	// neeche wala item bas dummy data hai
	items: [
		{
			image: 'https://thumbs.dreamstime.com/b/beautiful-girl-reading-book-22526658.jpg',
			name: 'Book (only book not girl)',
			price: 100,
			product_id: 'dsklfjdslf',
			quantity: 1,
			stock: 5,
		},
		{
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpiapw0DMCxV-AOBikjdZfelcGuPZrDFRiwA&s',
			name: 'Pen',
			price: 250,
			product_id: 'abc123',
			quantity: 2,
			stock: 10,
		},
		{
			image: 'https://backstudiomilan.com/wp-content/uploads/2021/08/autocad13.jpg',
			name: 'AutoCad',
			price: 500,
			product_id: 'xyz789',
			quantity: 1,
			stock: 3,
		},
	],

	addItem: (item: Item) =>
		set((state) => ({
			items: [...state.items, item],
		})),

	removeItem: (id: string) =>
		set((state) => ({
			items: state.items.filter((i) => i.product_id !== id),
		})),

	updateQuantity: (id: string, quantity: number) =>
		set((state) => ({
			items: state.items.map((i) => (i.product_id === id ? { ...i, quantity } : i)),
		})),
}));

export default useCartStore;
