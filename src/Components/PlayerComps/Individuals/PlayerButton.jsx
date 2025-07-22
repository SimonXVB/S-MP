export function PlayerButton({ onclick, img, style }) {
    return(
        <button 
            className={`${style} flex justify-center items-center cursor-pointer py-2 w-14 text-white hover:bg-red-400`}
            onClick={onclick}>
            {img}
        </button>
    );
};