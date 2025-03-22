export function HeaderButton({ onclick, children }) {
    return (
        <button onClick={onclick} className="rounded-lg p-1 cursor-pointer *:fill-white hover:bg-white hover:*:fill-red-400">
            {children}
        </button>
    );
};