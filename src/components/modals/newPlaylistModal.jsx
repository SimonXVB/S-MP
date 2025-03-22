import { ModalError } from "../individuals/minor/modalError";

export function NewPlaylistModal({setModal, create, onChange, error}) {

    return (
        <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-gray-400/40" id="transition">
            <div className="top-[50%] left-[50%] max-w-[400px] rounded-2xl w-full aspect-video bg-gray-700 p-10 text-[20px] text-white font-bold">
                <p className="font-semibold">New Playlist</p>
                <input type="text" className="mb-8 mt-4 px-2 rounded-2xl bg-gray-400 outline-white p-1 w-full" onChange={onChange}/>
                <div className="*:rounded-2xl *:cursor-pointer *:px-4 *:py-2 *:max-w-32 *:w-full flex gap-2">
                    <button onClick={create} className="bg-green-400 hover:bg-green-400/50">Create</button>
                    <button onClick={setModal} className=" bg-red-400 hover:bg-red-400/50">Cancel</button>
                </div>
                {String(error).endsWith("empty") && <ModalError name={"Field cannot be empty"}/>}
                {String(error).endsWith("exists") && <ModalError name={"A playlist with this name already exists"}/>}
                {String(error).includes("EINVAL") && <ModalError name={"Name cannot contain special characters e.g. <>:/\|?*"}/>}
            </div>
        </div>
    );
};