import { useState } from "react";

export function useDelete() {
    const [delModal, setDelModal] = useState([false, ""]);
    const [delMultipleModal, setDelMultipleModal] = useState(false);

    async function deleteMedia(array, media) {
        if(media === "video") {
            await window.FS.delVideoFile(array);
        } else if(media === "audio") {
            await window.FS.delAudioFile(array);
        };
        setDelModal([false, ""]);
    };

    return { deleteMedia, setDelModal, delModal, setDelMultipleModal, delMultipleModal }
};