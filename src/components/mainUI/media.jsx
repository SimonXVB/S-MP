import { useEffect, useContext } from "react";
import { mainContext } from "../../context/context";
import { useFetchFiles } from "../../hooks/libraryHooks/useFetchFiles";
import { useDeleteFiles } from "../../hooks/libraryHooks/useDeleteFiles";
import { useSearchFiles } from "../../hooks/libraryHooks/useSearchFiles";
import { Entry } from "../individuals/major/entry";
import { useGetAppPath } from "../../hooks/useGetAppPath";

export function Media() {
    const { setCurrent, current, setMediaSrc } = useContext(mainContext);

    const { searchMedia, setSearchInput, searchInput, filtered } = useSearchFiles();
    const { deleteMedia, setDelModal, delModal } = useDeleteFiles();
    const { fetchMedia, media } = useFetchFiles();
    const { getAppPath, appPath } = useGetAppPath();

    function playMedia(file) {
        setCurrent(current === "videos" ? "playingVideo" : "playingAudio");
        setMediaSrc([`${appPath}/swan-media-player/${current}/`, file, media]);
    };

    function searchFiles(e) {
        setSearchInput(e.target.value);
        searchMedia(e.target.value, media);
    };

    function filter() {
        return searchInput !== "" ? filtered : media;
    };

    function renameFile(oldName, newName) {
        renameMedia(oldName, newName, current);
        fetchMedia(current);
    };

    function deleteFiles(array) {
        if(searchInput !== "") {
            setSearchInput("");
        };

        deleteMedia(array, current);
        fetchMedia(current);
    };

    useEffect(() => {
        fetchMedia(current);
        getAppPath();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="flex flex-col items-center w-full h-screen overflow-x-auto">
            {filter().map((file, i) => (
                <Entry
                    media={file}
                    play={() => playMedia(file)}
                    key={i}
                />
            ))}
        </section>
    );
};