export function LibraryButton({ onclick, children }) {
    return (
        <button className="h-full flex justify-center p-1 items-center cursor-pointer rounded-lg *:fill-white hover:bg-white hover:*:fill-red-400" onClick={onclick}>
            {children}
        </button>
    )
};