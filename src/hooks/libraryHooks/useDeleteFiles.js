import { useState } from "react";

export function useDeleteFiles() {
    const [delModal, setDelModal] = useState([]);

    async function deleteMedia(files, dir) {
        await window.FS.delFile(files, dir);
        setDelModal([]);
    };

    return { deleteMedia, setDelModal, delModal }
};