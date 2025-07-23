import { useContext, useState } from "react";
import { mainContext } from "../Context/context";

export function Navbar() {
    const { setTabInfo, tabInfo, setSearchValue, searchValue } = useContext(mainContext);
    const [inputFocused, setInputFocused] = useState(false);

    function openFolder() {
        window.utils.openFolder(tabInfo.currentDir);
    };

    function changeTab(dir) {
        setSearchValue("");
        setTabInfo({
            currentTab: "collectionsTab",
            currentDir: dir,
            currentCollection: ""
        });
    };
 
    return (
        <nav className="flex justify-between bg-gray-950 border-b-[1px] border-red-400 py-1 px-3">
            <div className="flex">
                <button className={`flex items-center cursor-pointer px-2.5 py-2 text-white transition-transform duration-100 hover:text-red-400/70 hover:*:fill-red-400/70 ${tabInfo.currentDir === "videos" && "!text-red-400 *:!fill-red-400 scale-105"}`} onClick={() => changeTab("videos")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
                    <p className="text-xl ml-1.5 font-bold">Videos</p>
                </button>
                <button className={`flex items-center cursor-pointer px-2.5 text-white transition-transform duration-100 hover:text-red-400/70 hover:*:fill-red-400/70 ${tabInfo.currentDir === "music" && "!text-red-400 *:!fill-red-400 scale-105"}`} onClick={() => changeTab("music")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></svg>
                    <p className="text-xl ml-1.5 font-bold">Audio</p>
                </button>
            </div>
            {!tabInfo.currentTab.endsWith("Player") &&
                <div className="flex items-center gap-2">
                    <button className="flex items-center cursor-pointer px-2.5 hover:*:fill-red-400" onClick={openFolder}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/></svg>
                    </button>
                    <div className={`flex items-center gap-1 border-b-2 border-white ${inputFocused && "*:fill-red-400 !border-red-400"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                        <input type="text" className="text-[14px] p-1 outline-0 text-white font-semibold" onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
                    </div>
                </div>
            }
        </nav>
    );
};