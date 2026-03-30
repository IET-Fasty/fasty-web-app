import React, { useState } from 'react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteProduct } from '@/services/admin/inventory.services';

interface ConfirmDeleteDialogProps {
	children: React.ReactNode;
	productId: string;
}

const ConfirmDeleteDialog = ({ children, productId }: ConfirmDeleteDialogProps) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const handleClick = async () => {
		setIsDeleting(true);
		await deleteProduct(productId);
		setIsDeleting(false);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this product from
						the inventory.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleClick} disabled={isDeleting}>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</AlertDialogAction>
					{/* // TODO: After deletion, the rows should be refetched again... */}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmDeleteDialog;
