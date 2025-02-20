import { useState } from "react";

export function useRename() {
    const [renameModal, setRenameModal] = useState([false, ""]);
    const [renameInput, setRenameInput] = useState("");

    async function renameMedia(oldName, newName, media) {
        if(media === "video") {
            await window.FS.renameVideoFile(oldName, newName);
        } else if(media === "audio") {
            await window.FS.renameAudioFile(oldName, newName);
        }
        setRenameModal([false, ""]);
        setRenameInput("");
    };

    return { renameMedia, setRenameModal, renameModal, setRenameInput, renameInput }
};