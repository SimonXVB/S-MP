export function PlaylistButton({ onclick, children }) {
    return (
        <button className="h-full flex justify-center p-1 items-center cursor-pointer rounded-lg *:fill-red-400 hover:bg-red-400 hover:*:fill-white" onClick={onclick}>
            {children}
        </button>
    )
};