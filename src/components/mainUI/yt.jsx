export function YT() {
    return (
        <div className="w-full flex flex-col items-center h-screen">
            <div className="text-3xl pl-4 font-bold flex items-center min-h-[100px] w-full bg-gray-900 text-white">YT</div>
            <div className="flex justify-center items-center min-h-[400px] h-full w-full overflow-auto text-white px-4">
                <input type="text" className="border-4 p-3 text-[16px] font-bold outline-0 border-white max-w-[60%] w-full" />
                <button className="border-4 p-3 border-red-400 cursor-pointer font-bold hover:bg-red-400">Watch</button>
            </div>
        </div>
    );
};