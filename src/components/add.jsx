export function Add() {

    async function videoFile() {
        const filePath = await window.FS.copyVideoFile();
    };

    async function audioFile() {
        const filePath = await window.FS.copyAudioFile();
    };
    
    return (
        <div className="w-full bg-linear-to-b from-gray-800 to-gray-700 flex justify-center items-center h-dvh">
            <div className="max-w-[95%] max-h-[95%] h-full w-full">
                <div className="bg-gray-900 text-white text-3xl font-semibold p-4 flex items-center max-h-[8%] h-full">Add</div>
                <div className="max-h-[92%] h-full text-white py-4 flex flex-wrap gap-2 flex-row overflow-auto justify-center items-center">
                    <button className="border-2 border-red-400 max-w-[250px] max-h-[250px] w-full h-full flex flex-col justify-center items-center cursor-pointer" onClick={videoFile}>
                        <div>+</div>
                        <p className="text-2xl">Add Vid</p>
                    </button>
                    <button className="border-2 border-red-400 max-w-[250px] max-h-[250px] w-full h-full flex flex-col justify-center items-center cursor-pointer" onClick={audioFile}>
                        <div>+</div>
                        <p className="text-2xl">Add Music</p>
                    </button>
                </div>
            </div>

        </div>
    );
};