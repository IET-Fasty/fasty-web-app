import { FileSearch } from 'lucide-react';

const NoOrders = () => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4 py-20 text-center">
			<div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
				<FileSearch className="h-7 w-7 text-muted-foreground" />
			</div>

			<div className="space-y-1">
				<h3 className="text-lg font-semibold">No Orders Found</h3>
			</div>
		</div>
	);
};

export default NoOrders;
