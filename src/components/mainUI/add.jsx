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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M286-139v-682l537 341-537 341Zm126-341Zm0 111 175-111-175-111v222Z"/></svg>
                    <p className="text-2xl font-bold">Add Video</p>
                </button>
                <button className="border-4 border-red-400 max-w-[250px] aspect-square w-full flex flex-col justify-center items-center cursor-pointer hover:bg-red-400" onClick={audioFile}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M389-82q-75.49 0-129.24-53.76Q206-189.51 206-265q0-75.49 53.76-129.24Q313.51-448 389-448q15.95 0 29.48 2.5Q432-443 446-438v-440h309v206H572v407q0 75.49-53.76 129.24Q464.49-82 389-82Z"/></svg>
                    <p className="text-2xl font-bold">Add Audio</p>
                </button>
            </div>
        </section>
    );
};