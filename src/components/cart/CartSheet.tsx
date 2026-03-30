'use client';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import CartItemsGrid from './CartItemsGrid';
import CartSummary from './CartSummary';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export default function SheetSide() {
	return (
		<div className="flex flex-wrap gap-2" style={{ backgroundColor: 'grey' }}>
			{SHEET_SIDES.map((side) => (
				<Sheet key={side}>
					<SheetTrigger asChild>
						<Button variant="outline" className="capitalize">
							{side}
						</Button>
					</SheetTrigger>
					<SheetContent
						side={side}
						className="p-0 data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
					>
						<SheetHeader>
							<SheetTitle>My Cart</SheetTitle>
							<SheetDescription>Your cart items</SheetDescription>
						</SheetHeader>

						<CartItemsGrid />

						<SheetFooter>
							<CartSummary />
						</SheetFooter>
					</SheetContent>
				</Sheet>
			))}
		</div>
	);
}
