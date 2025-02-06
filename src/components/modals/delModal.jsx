export function DelModal({name, setModal, del}) {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300/50">
            <div className="top-[50%] left-[50%] bg-blue-500 p-10">
                <p>Delete {name}?</p>
                <button onClick={del}>Yes</button>
                <button onClick={setModal}>No</button>
            </div>
        </div>
    );
};