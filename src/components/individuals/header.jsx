export function Header({name, onChange, refresh}) {
    return (
        <h1 className="text-3xl px-4 font-bold flex items-center justify-between min-h-[100px] w-full bg-gray-900 text-white">
            <div>{name}</div>
            <div className="flex items-center gap-2">
                <button onClick={refresh} className="w-[30px] h-[30px] cursor-pointer hover:bg-red-400 rounded-full">
                    <img src="../src/assets/libraryAssets/refresh.png"/>
                </button>
                <div className="flex items-center">
                    <img src="../src/assets/libraryAssets/search.png" className="w-[30px] h-[30px]"/>
                    <input type="text" className="text-[14px] p-1 border-2 border-white outline-0" onChange={onChange}/>
                </div>
            </div>
        </h1>
    );
};