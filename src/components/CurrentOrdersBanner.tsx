'use client';

import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { profileIdFromClerkId } from '@/services/checkout.services';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CurrentOrdersBanner = () => {
	const { user, isSignedIn, isLoaded } = useUser();

	const [orders, setOrders] = useState(0);

	useEffect(() => {
		const fetchNumberOfPendingOrders = async () => {
			if (!user) return;
			const profileId = await profileIdFromClerkId(user?.id);
			const { data } = await supabase
				.from('orders')
				.select()
				.eq('user_id', profileId)
				.eq('status', 'pending');

			setOrders(data?.length ?? 0);
		};

		fetchNumberOfPendingOrders();
	}, [user, isSignedIn, isLoaded]);

	if (!isLoaded || !isSignedIn || !user) return null;

	if (orders === 0) return null;

	return (
		<Alert className="rounded-none bg-primary/5">
			<AlertDescription className="text-sm flex items-center justify-center">
				<p>
					Your{' '}
					<strong>
						{orders} {orders === 1 ? 'order is' : 'orders are'}
					</strong>{' '}
					on the way to delivery
				</p>
			</AlertDescription>
		</Alert>
	);
};

export default CurrentOrdersBanner;
