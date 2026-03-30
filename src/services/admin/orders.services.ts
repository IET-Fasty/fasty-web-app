import { supabase } from '@/lib/supabase/client';
import type { OrderWithDetails } from '@/types/admin.types';

type RawOrder = {
	id: string;
	total_amount: number;
	room_number: string;
	payment_method: 'COD' | 'UPI';
	status: 'pending' | 'paid' | 'on_the_way' | 'delivered' | 'failed';
	created_at: string;
	user: { id: string; first_name: string; last_name: string; email: string }; // ← object, not array
	items: {
		id: string;
		quantity: number;
		price: number;
		total_price: number;
		product: { id: string; name: string; image_url: string };
	}[];
	delivery_otp: { otp_code: string; is_verified: boolean }[];
};

function transform(raw: RawOrder): OrderWithDetails {
	const user = raw.user; // ← no [0]

	if (!user) throw new Error(`Order ${raw.id} has no associated profile.`);

	return {
		id: raw.id,
		total_amount: raw.total_amount,
		room_number: raw.room_number,
		payment_method: raw.payment_method,
		status: raw.status,
		created_at: raw.created_at,

		user: {
			id: user.id,
			email: user.email,
			name: `${user.first_name} ${user.last_name}`.trim() || user.email.split('@')[0],
		},

		items: raw.items.map((item) => ({
			id: item.id,
			quantity: item.quantity,
			price: item.price,
			total_price: item.total_price,
			product: item.product, // ← no [0], it's already an object
		})),

		delivery_otp:
			raw.status === 'paid' && raw.delivery_otp?.length ? raw.delivery_otp[0] : null,
	};
}

export async function fetchAllOrders(): Promise<OrderWithDetails[]> {
	const { data, error } = await supabase
		.from('orders')
		.select(
			`
    id,
    total_amount,
    room_number,
    payment_method,
    status,
    created_at,

	user:profiles!user_id ( id, first_name, last_name, email ),

    items:order_items (
      id,
      quantity,
      price,
      total_price,
      product:products ( id, name, image_url )
    ),

    delivery_otp:delivery_otps ( otp_code, is_verified )
  `
		)
		.order('created_at', { ascending: false });

	if (error) throw new Error(`Failed to fetch orders: ${error.message}`);

	return (data as unknown as RawOrder[]).map(transform);
}

type OrderStatus = OrderWithDetails['status'];

export async function verifyDeliveryOtp(orderId: string): Promise<void> {
	const { error } = await supabase
		.from('delivery_otps')
		.update({ is_verified: true })
		.eq('order_id', orderId);

	if (error) throw new Error(`Failed to verify OTP: ${error.message}`);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
	const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);

	if (error) throw new Error(`Failed to update order status: ${error.message}`);
}
