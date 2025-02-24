import { ModalError } from "../individuals/minor/modalError";

export function RenameModal({name, setModal, rename, onChange, error}) {

    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300/50">
            <div className="top-[50%] left-[50%] max-w-[400px] w-full aspect-video bg-gray-700 p-10 text-[20px] text-white font-bold">
                <p className="font-normal break-all">Rename <span className="font-bold">{name}</span></p>
                <input type="text" className="my-8 bg-gray-400 outline-white p-1 w-full" onChange={onChange}/>
                <button onClick={rename} className="cursor-pointer px-4 py-2 max-w-32 w-full bg-green-400 hover:bg-green-400/50">Confirm</button>
                <button onClick={setModal} className="cursor-pointer px-4 py-2 max-w-32 w-full bg-red-400 hover:bg-red-400/50">Cancel</button>
                {String(error).endsWith("empty") && <ModalError name={"Field cannot be empty"}/>}
                {String(error).endsWith("exists") && <ModalError name={"A file/folder with this name already exists"}/>}
                {String(error).includes("EINVAL") && <ModalError name={"Name cannot contain special characters e.g. <>:/\|?*"}/>}
            </div>
        </div>
    );
};