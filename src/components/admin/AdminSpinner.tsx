import { Spinner } from '@/components/ui/spinner';

const AdminSpinner = () => {
	return (
		<div className="px-4 h-[50vh] flex items-center justify-center">
			<Spinner className="size-6" />
		</div>
	);
};

export default AdminSpinner;
