'use client';

import AdminSpinner from '@/components/admin/AdminSpinner';
import AddOrUpdateProductSheet from '@/components/admin/inventory/AddOrUpdateProductSheet';
import Error from '@/components/admin/inventory/Error';
import NoProducts from '@/components/admin/inventory/NoProducts';
import ProductRows from '@/components/admin/inventory/ProductRows';
import useInventory from '@/hooks/admin/inventory/useInventory';

const Page = () => {
	const { products, isLoading, error, refetch } = useInventory();

	if (isLoading) return <AdminSpinner />;
	if (error) return <Error error={error} refetch={refetch} />;
	if (!products || products.length === 0) return <NoProducts />;

	return (
		<div className="px-4">
			<div className="flex justify-end m-2">
				<AddOrUpdateProductSheet isEdit={false} />
			</div>

			<ProductRows products={products} />
		</div>
	);
};

export default Page;
