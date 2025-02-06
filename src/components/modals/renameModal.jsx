export function RenameModal({name, setModal, rename, onChange}) {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300/50">
            <div className="top-[50%] left-[50%] bg-blue-500 p-10">
                <p>Renaming {name}</p>
                <input type="text" onChange={onChange}/>
                <button onClick={rename}>Confirm</button>
                <button onClick={setModal}>Cancel</button>
            </div>
        </div>
    );
};