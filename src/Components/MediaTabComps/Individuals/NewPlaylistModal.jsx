export function NewPlaylistModal({ setPlaylistModal }) {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-400/20">
            <div className="relative bg-gray-950 p-5 flex flex-col justify-between rounded-md">
                <button className="absolute top-0 right-0 p-3 cursor-pointer hover:*:fill-red-400" onClick={() => setPlaylistModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
                <form onSubmit={e => e.preventDefault()} className="flex justify-center gap-8">
                    <div className="relative w-[300px] h-[300px]">
                        <p className="absolute text-white top-[50%] left-[50%] -translate-[50%] font-bold text-4xl">Cover</p>
                        <img className="border-2 border-red-400 p-4 max-w-[300px] max-h-[300px] w-full h-full bg-red-400"/>
                    </div>
                    <div className="flex flex-col justify-between items-stretch mt-6">
                        <div className="flex flex-col gap-4">
                            <fieldset className="border-2 border-red-400">
                                <legend className="ml-1 px-1 font-bold text-red-400">Name</legend>
                                <input className="outline-0 px-2 p-1 pt-0 font-bold text-white" type="text"/>
                            </fieldset>
                            <button className="relative flex justify-center items-center h-[44px] bg-red-400 text-white w-full font-bold border-2 border-red-400 hover:bg-white hover:*:fill-red-400 hover:text-red-400">
                                <p className="mr-2">Select Cover</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                                </svg>
                                <label htmlFor="file" className="absolute top-0 left-0 w-full h-full cursor-pointer"></label>
                                <input type="file" id="file" className="hidden"/>
                            </button>
                        </div>
                        <button className="flex justify-center items-center bg-green-400 border-2 border-green-400 cursor-pointer hover:bg-white hover:*:fill-green-400 hover:*:text-green-400" type="submit">
                            <p className="font-bold text-white">New</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};