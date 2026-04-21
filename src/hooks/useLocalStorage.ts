const useLocalStorage = () => {
	const getItem = (key: string): string | null => {
		if (!window) return null;
		return localStorage.getItem(key);
	};

	const setItem = (key: string, value: string) => {
		if (!window) return null;
		localStorage.setItem(key, value);
	};

	return { getItem, setItem };
};

export default useLocalStorage;
