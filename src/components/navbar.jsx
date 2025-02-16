import { useContext } from "react";
import { navCtx } from "../context/navContext";
import pfp from "../assets/smallerPFP.jpg";

export function Navbar() {
    const { setCurrent, current } = useContext(navCtx);

    return (
        <nav className="flex flex-col min-w-[250px] h-screen">
            <div className="w-full min-h-[100px] flex justify-center items-center bg-gray-900 border-r-4 border-red-400">
                <img src={pfp} className="max-w-[75px] aspect-square"/>
            </div>
            <div className="w-full min-h-[325px] h-full flex flex-col items-center py-4">
                <button className={`flex justify-center items-center w-full cursor-pointer ${current === "Videos" && "border-r-4 border-red-400"}`} onClick={() => setCurrent("Videos")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M286-139v-682l537 341-537 341Zm126-341Zm0 111 175-111-175-111v222Z"/></svg>
                    <div className="text-3xl font-semibold py-1 px-3 max-w-[75%] w-full my-2 text-white">Video</div>
                </button>
                <button className={`flex justify-center items-center w-full cursor-pointer ${current === "Music" && "border-r-4 border-red-400"}`} onClick={() => setCurrent("Music")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M389-82q-75.49 0-129.24-53.76Q206-189.51 206-265q0-75.49 53.76-129.24Q313.51-448 389-448q15.95 0 29.48 2.5Q432-443 446-438v-440h309v206H572v407q0 75.49-53.76 129.24Q464.49-82 389-82Z"/></svg>
                    <div className="text-3xl font-semibold py-1 px-3 max-w-[75%] w-full my-2 text-white">Audio</div>
                </button>
            </div>
            <div className="flex items-center w-full min-h-[75px] bg-gray-900">
                <button className={`text-3xl px-3 py-3 h-full w-full font-bold flex justify-center items-center cursor-pointer ${current === "Add" && "bg-red-400"} hover:bg-red-400`} onClick={() => setCurrent("Add")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff"><path d="M427.67-427.67H172v-104.66h255.67v-256.34h104.66v256.34h256.34v104.66H532.33V-172H427.67v-255.67Z"/></svg>
                </button>
            </div>
        </nav>
    );
};