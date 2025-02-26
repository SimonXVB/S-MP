import { HeaderButton } from "../minor/headerButton";

export function Header({name, search, toggleSelect, isSelect, deleteModal, openFolder, searchValue}) {
    return (
        <h1 className="text-3xl px-4 font-bold flex items-center justify-between min-h-[100px] w-full bg-gray-900 text-white sticky top-0">
            <div>{name}</div>
            <div className="flex items-center gap-2">
                <HeaderButton onclick={openFolder} src={"../src/assets/libraryAssets/folder.png"}/>
                {isSelect && <HeaderButton onclick={deleteModal} src={"../src/assets/libraryAssets/delete.png"}/>}
                <HeaderButton onclick={toggleSelect} src={isSelect ? "../src/assets/libraryAssets/cancel.png" : "../src/assets/libraryAssets/select.png"}/>
                <div className="flex items-center">
                    <img src="../src/assets/libraryAssets/search.png" className="h-6"/>
                    <input type="text" className="text-[14px] p-1 border-2 border-white outline-0 focus:border-red-400" onChange={search} value={searchValue}/>
                </div>
            </div>
        </h1>
    );
};