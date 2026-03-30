'use client';

import AdminSpinner from '@/components/admin/AdminSpinner';
import useOrders from '@/hooks/admin/orders/useOrders';
import Error from '@/components/admin/orders/Error';
import NoOrders from '@/components/admin/orders/NoOrders';
import OrderRows from '@/components/admin/orders/OrderRows';

const Page = () => {
	const { orders, isLoading, error, refetch } = useOrders();

	if (isLoading) return <AdminSpinner />;
	if (error) return <Error error={error} refetch={refetch} />;
	if (!orders || orders.length === 0) return <NoOrders />;

	return <OrderRows orders={orders} />;
};

export default Page;
