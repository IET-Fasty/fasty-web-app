'use client';

import { useEffect, useState } from 'react';
import type { AdminError, OrderWithDetails } from '@/types/admin.types';
import { fetchAllOrders } from '@/services/admin/orders.services';

const useOrders = () => {
	const [orders, setOrders] = useState<OrderWithDetails[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<AdminError | null>(null);

	const fetchOrders = async () => {
		try {
			setIsLoading(true);
			const data = await fetchAllOrders();
			setOrders(data);
			setError(null);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error as AdminError);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return {
		orders,
		isLoading,
		error,
		refetch: fetchOrders,
	};
};

export default useOrders;
