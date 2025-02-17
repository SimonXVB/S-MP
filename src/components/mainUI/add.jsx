export function Add() {
    async function videoFile() {
        await window.FS.copyVideoFile();
    };

    async function audioFile() {
        await window.FS.copyAudioFile();
    };
    
    return (
        <section className="w-full flex flex-col h-screen">
            <h1 className="bg-gray-900 pl-4 text-white text-3xl font-bold flex items-center min-h-[100px]">Add</h1>
            <div className="flex justify-center items-center gap-2 min-h-[400px] h-full overflow-auto text-white px-4">
                <button className="border-4 border-red-400 max-w-[250px] aspect-square w-full flex flex-col justify-center items-center cursor-pointer hover:bg-red-400" onClick={videoFile}>
                    <img src="../src/assets/addAssets/movie.png"/>
                    <p className="text-2xl font-bold">Add Video</p>
                </button>
                <button className="border-4 border-red-400 max-w-[250px] aspect-square w-full flex flex-col justify-center items-center cursor-pointer hover:bg-red-400" onClick={audioFile}>
                    <img src="../src/assets/addAssets/music.png"/>
                    <p className="text-2xl font-bold">Add Audio</p>
                </button>
            </div>
        </section>
    );
};