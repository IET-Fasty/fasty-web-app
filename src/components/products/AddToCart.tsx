'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AddToCartProps {
	stock: number;
}

export default function AddToCart({ stock }: AddToCartProps) {
	const [quantity, setQuantity] = useState(0);

	const increase = () => {
		if (quantity < stock) {
			setQuantity((prev) => prev + 1);
		}
	};

	const decrease = () => {
		setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
	};

	if (quantity === 0) {
		return <Button onClick={increase}>ADD</Button>;
	}

	return (
		<div className="flex items-center gap-2">
			<Button onClick={decrease} variant="outline">
				-
			</Button>

			<span className="w-6 text-center">{quantity}</span>

			<Button onClick={increase} variant="outline" disabled={quantity >= stock}>
				+
			</Button>
		</div>
	);
}
