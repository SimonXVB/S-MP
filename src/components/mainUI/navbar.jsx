import { useContext } from "react";
import { navCtx } from "../../context/navContext";

export function Navbar() {
    const { setCurrent, current } = useContext(navCtx);

    return (
        <nav className="flex flex-col items-center min-w-[200px] box-border h-screen font-semibold bg-red-400 px-4 text-white relative" id="navbar">
            <h1 className="w-full flex items-center min-h-[50px] font-logo py-2 mb-2 text-center text-3xl border-b-2 border-white">Swan</h1>
            <div className="w-full min-h-[325px] h-full flex flex-col items-center">
                <button className={`flex items-center justify-center rounded-2xl my-1 w-full cursor-pointer ${current === "Videos" && "bg-white text-red-400 *:fill-red-400"} hover:bg-white/40`} onClick={() => setCurrent("Videos")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
                    <p className="text-2xl py-1 ml-2 my-2 min-w-[100px]">Videos</p>
                </button>
                <button className={`flex items-center justify-center rounded-2xl my-1 w-full cursor-pointer ${current === "Audio" && "bg-white text-red-400 *:fill-red-400"} hover:bg-white/40`} onClick={() => setCurrent("Audio")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></svg>
                    <p className="text-2xl py-1 ml-2 my-2 min-w-[100px]">Audio</p>
                </button>
            </div>
            <div className="flex items-center justify-center w-full min-h-[75px] py-4 border-t-2 border-white">
                <button className={`flex items-center justify-center rounded-2xl my-1 w-full cursor-pointer ${current === "Add" && "bg-white text-red-400 *:fill-red-400"} hover:bg-white/40`} onClick={() => setCurrent("Add")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    <p className="text-2xl py-1 ml-2 my-2 min-w-[100px]">Add</p>
                </button>
            </div>
        </nav>
    );
};