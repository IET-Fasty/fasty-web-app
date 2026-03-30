export type AdminError = {
	message: string;
};

export type Product = {
	id: string;
	image_url: string;
	name: string;
	price: number;
	stock: number;
};

export type OrderWithDetails = {
	id: string;
	total_amount: number;
	room_number: string;
	payment_method: 'COD' | 'UPI';
	status: 'pending' | 'paid' | 'on_the_way' | 'delivered' | 'failed';
	created_at: string;

	// joined from profiles
	user: {
		id: string;
		name: string;
		email: string;
	};

	// joined from order_items + products
	items: {
		id: string;
		quantity: number;
		price: number;
		total_price: number;
		product: {
			id: string;
			name: string;
			image_url: string;
		};
	}[];

	// only present when status = 'paid'
	delivery_otp: {
		otp_code: string;
		is_verified: boolean;
	} | null;
};
