export function PlayerButton({ onclick, text }) {
    return(
        <button className="max-w-12 w-full bg-gray-900 cursor-pointer hover:bg-red-400 text-white font-bold py-1 flex justify-center items-center" onClick={onclick}>{text}</button>
    );
};