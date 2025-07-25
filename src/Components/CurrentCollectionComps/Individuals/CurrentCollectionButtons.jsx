import { useContext } from "react"
import { mainContext } from "../../../Context/context"

export function CurrentCollectionButtons({ getCurrentCollection }) {
    const { setTabInfo, tabInfo, setError } = useContext(mainContext);

    async function copyToCollection() {
        const res = await window.files.copyToCollection({
            targetDir: tabInfo.currentDir,
            targetCol: tabInfo.currentCollection
        });

        if(res === "copied") {
            await getCurrentCollection();
        } else {
            setError(res);
        };
    };

    function back() {
        setTabInfo(prev => ({
            ...prev,
            currentTab: "collectionsTab",
            currentCollection: ""
        }));
    };

    return (
        <div className="flex">
            <button onClick={back} className="relative flex flex-col justify-center items-center rounded-l-md text-white font-medium cursor-pointer w-25 h-50 hover:*:fill-white hover:bg-red-400">
                <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
                <p className="mt-2">Back</p>
            </button>
            <button onClick={copyToCollection} className="relative flex flex-col justify-center items-center rounded-r-md text-white font-medium cursor-pointer w-25 h-50 hover:*:fill-white hover:bg-red-400">
                <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" viewBox="0 0 16 16">
                    <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                    <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
                </svg>
                <p className="mt-2">Add</p>
            </button>
        </div>
    )
};