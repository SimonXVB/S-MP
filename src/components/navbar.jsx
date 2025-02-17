import { useContext } from "react";
import { navCtx } from "../context/navContext";

export function Navbar() {
    const { setCurrent, current } = useContext(navCtx);

    return (
        <nav className="flex flex-col min-w-[250px] h-screen">
            <div className="w-full min-h-[100px] flex justify-center items-center bg-gray-900 border-r-4 border-red-400">
                <img src="" className="max-w-[75px] aspect-square"/>
            </div>
            <div className="w-full min-h-[325px] h-full flex flex-col items-center py-4">
                <button className={`flex justify-center items-center w-full cursor-pointer ${current === "Videos" && "border-r-4 border-red-400"}`} onClick={() => setCurrent("Videos")}>
                    <img src="../src/assets/navbarAssets/movie.png" className="w-[24px] h-[24px]"/>
                    <div className="text-3xl font-semibold py-1 px-3 max-w-[75%] w-full my-2 text-white">Videos</div>
                </button>
                <button className={`flex justify-center items-center w-full cursor-pointer ${current === "Music" && "border-r-4 border-red-400"}`} onClick={() => setCurrent("Music")}>
                    <img src="../src/assets/navbarAssets/music.png" className="w-[24px] h-[24px]"/>
                    <div className="text-3xl font-semibold py-1 px-3 max-w-[75%] w-full my-2 text-white">Audio</div>
                </button>
            </div>
            <div className="flex items-center w-full min-h-[75px] bg-gray-900">
                <button className={`text-3xl px-3 py-3 h-full w-full font-bold flex justify-center items-center cursor-pointer ${current === "Add" && "bg-red-400"} hover:bg-red-400`} onClick={() => setCurrent("Add")}>
                    <img src="../src/assets/navbarAssets/add.png" className="w-[24px] h-[24px]"/>
                </button>
            </div>
        </nav>
    );
};