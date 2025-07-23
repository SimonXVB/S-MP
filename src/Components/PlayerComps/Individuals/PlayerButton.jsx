export function PlayerButton({ onclick, img, style }) {
    return(
        <button 
            className={`flex justify-center items-center cursor-pointer rounded-md py-2 w-14 text-white hover:bg-gray-400/20 ${style}`}
            onClick={onclick}>
            <img src={img} className={`h-[28px]`}/>
        </button>
    );
};