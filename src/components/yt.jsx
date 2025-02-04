export function YT() {
    return (
        <div className="w-full bg-linear-to-b from-gray-800 to-gray-700 flex justify-center items-center h-dvh">
            <div className="max-w-[95%] max-h-[95%] h-full w-full">
                <div className="bg-gray-900 text-white text-3xl font-semibold p-4 flex items-center max-h-[8%] h-full">YT</div>


                <div className="max-h-[92%] h-full text-white py-4 flex flex-wrap flex-row overflow-auto justify-center items-center">
                    <input type="text" className="border-4 p-2 outline-0 border-red-400 max-w-[60%] w-full" />
                    <button className="border-4 p-2 border-white cursor-pointer">Watch</button>
                </div>
            </div>
        </div>
    );
};