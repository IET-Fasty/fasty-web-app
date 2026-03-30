'use client';

import { useEffect, useState } from 'react';
import type { AdminError, Product } from '@/types/admin.types';
import { getProducts } from '@/services/admin/inventory.services';

const useInventory = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<AdminError | null>(null);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const data = await getProducts();
			setProducts(data);
			setError(null);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error as AdminError);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return {
		products,
		isLoading,
		error,
		refetch: fetchProducts,
	};
};

export default useInventory;
