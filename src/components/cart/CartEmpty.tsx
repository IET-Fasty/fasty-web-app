import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartEmptyProps {
	closeSheet: () => void;
}

export default function CartEmpty({ closeSheet }: CartEmptyProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12 px-6 text-center">
			<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-5">
				<ShoppingBag className="w-6 h-6 text-muted-foreground" />
			</div>

			<p className="text-sm font-medium text-foreground mb-1.5">Your cart is empty</p>
			<p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-50">
				Add some stationery items to get started
			</p>

			<Button variant="outline" onClick={closeSheet}>
				Shop Now
			</Button>
		</div>
	);
}
