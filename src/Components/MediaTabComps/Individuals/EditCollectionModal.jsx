import { useRef, useState, useContext } from "react";
import { mainContext } from "../../../Context/context";
import { CollectionModalError } from "../Individuals/CollectionModalError";

export function EditCollectionModal({ setEditModal, getCollection, collectionName, img }) {
    const { current } = useContext(mainContext);

    const [error, setError] = useState("");

    console.log(collectionName)

    const coverRef = useRef();
    const editDataRef = useRef({
        oldName: collectionName,
        newName: collectionName,
        img: img,
        targetDir: current
    });

    function setCoverData(e) {
        e.preventDefault();
        const file = e.target.files[0];

        if(file.type === "image/jpeg" || file.type === "image/png") {
            const reader = new FileReader();
            reader.onload = () => {
                editDataRef.current.img = reader.result;
                coverRef.current.src = reader.result;
            };
            reader.readAsDataURL(file);
        };
    };

    async function editCollection(e) {
        e.preventDefault();
        const res = await window.collection.editCollection(editDataRef.current);

        if(res === "edited") {
            setEditModal({});
            getCollection();
        } else {
            setError(res);
        };
    };

    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-400/20">
            <div className="relative bg-gray-950 p-5 flex flex-col justify-between rounded-md">
                <button className="absolute top-0 right-0 p-3 cursor-pointer hover:*:fill-red-400" onClick={() => setEditModal({})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
                <form onSubmit={e => editCollection(e)} className="flex justify-center gap-8">
                    <div className="flex justify-center items-center w-[300px] h-[300px] bg-red-400">
                        <img ref={coverRef} src={img} className="max-w-[300px]"/>
                    </div>
                    <div className="flex flex-col justify-between items-stretch mt-6">
                        <div className="flex flex-col gap-4">
                            <fieldset className="border-2 border-red-400">
                                <legend className="ml-1 px-1 font-bold text-red-400">Name</legend>
                                <input className="outline-0 px-2 p-1 pt-0 font-bold text-white" type="text" defaultValue={collectionName} onChange={e => editDataRef.current.newName = e.target.value}/>
                            </fieldset>
                            <button type="button" className="relative flex justify-center items-center h-[44px] bg-red-400 text-white w-full font-bold border-2 border-red-400 hover:bg-white hover:*:fill-red-400 hover:text-red-400">
                                <p className="mr-2">Select Cover</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                                </svg>
                                <label htmlFor="file" className="absolute top-0 left-0 w-full h-full cursor-pointer"></label>
                                <input type="file" id="file" className="hidden" onChange={e => setCoverData(e)}/>
                            </button>
                        </div>
                        <button type="submit" className="flex justify-center items-center bg-green-400 border-2 border-green-400 cursor-pointer hover:bg-white hover:*:fill-green-400 hover:*:text-green-400">
                            <p className="font-bold text-white">Edit</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                        </button>
                    </div>
                </form>
                {error && <CollectionModalError error={error} setError={setError}/>}
            </div>
        </div>
    )
};