export function DelModal({name, setModal, del}) {
    return (
        <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-gray-400/40" id="transition">
            <div className="top-[50%] left-[50%] rounded-2xl max-w-[300px] w-full aspect-video bg-gray-700 p-10 text-[20px] text-white font-bold flex flex-col justify-center">
                <p className="mb-8 font-normal break-all">Delete <span className="font-bold">{name}</span> ?</p>
                <div className="*:rounded-2xl flex gap-2">
                    <button onClick={del} className="cursor-pointer px-4 py-2 max-w-20 w-full bg-green-400 hover:bg-green-400/50">Yes</button>
                    <button onClick={setModal} className="cursor-pointer px-4 py-2 max-w-20 w-full bg-red-400 hover:bg-red-400/50">No</button>
                </div>
            </div>
        </div>
    );
};