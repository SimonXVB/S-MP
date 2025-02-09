export function DelModal({name, setModal, del}) {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300/50">
            <div className="top-[50%] left-[50%] max-w-[400px] w-full aspect-video bg-gray-700 p-10 text-[1.3rem] text-white font-bold flex flex-col justify-center">
                <p className="mb-8 font-normal">Delete <span className="font-bold">{name}</span> ?</p>
                <div>
                    <button onClick={del} className="cursor-pointer px-4 py-2 max-w-20 w-full bg-green-400 hover:bg-green-400/50">Yes</button>
                    <button onClick={setModal} className="cursor-pointer px-4 py-2 max-w-20 w-full bg-red-400 hover:bg-red-400/50">No</button>
                </div>
            </div>
        </div>
    );
};