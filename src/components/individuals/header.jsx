export function Header({name, onChange, toggleSelect, isSelect, delMultipleModal}) {
    return (
        <h1 className="text-3xl px-4 font-bold flex items-center justify-between min-h-[100px] w-full bg-gray-900 text-white sticky top-0">
            <div>{name}</div>
            <div className="flex items-center gap-2">
                {isSelect && <button onClick={delMultipleModal} className="hover:bg-red-400 rounded-full p-1 cursor-pointer"><img src="../src/assets/libraryAssets/delete.png" className="h-6"/></button>}
                <button onClick={toggleSelect} className="hover:bg-red-400 rounded-full p-1 cursor-pointer"><img src={isSelect ? "../src/assets/libraryAssets/cancel.png" : "../src/assets/libraryAssets/select.png"} className="h-6"/></button>
                <div className="flex items-center">
                    <img src="../src/assets/libraryAssets/search.png" className="h-6"/>
                    <input type="text" className="text-[14px] p-1 border-2 border-white outline-0 focus:border-red-400" onChange={onChange}/>
                </div>
            </div>
        </h1>
    );
};