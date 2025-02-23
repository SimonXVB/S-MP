export function HeaderButton({ onclick, src }) {
    return (
        <button onClick={onclick} className="hover:bg-red-400 rounded-full p-1 cursor-pointer"><img src={src} className="h-6"/></button>
    );
};