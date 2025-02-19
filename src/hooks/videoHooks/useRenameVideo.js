import { useState } from "react";

export function useRenameVideo() {
    const [renameModal, setRenameModal] = useState([false, ""]);
    const [renameInput, setRenameInput] = useState("");

    async function renameVideo(oldName, newName) {
        await window.FS.renameVideoFile(oldName, newName);
        setRenameModal([false, ""]);
        setRenameInput("");
    };

    return { renameVideo, setRenameModal, renameModal, setRenameInput, renameInput }
};