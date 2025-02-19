import { useState } from "react";

export function useDelVideos() {
    const [delModal, setDelModal] = useState([false, ""]);
    const [delMultipleModal, setDelMultipleModal] = useState(false);

    async function delVideos(array) {
        await window.FS.delVideoFile(array);
        setDelModal([false, ""]);
    };

    return { delVideos, setDelModal, delModal, setDelMultipleModal, delMultipleModal }
};