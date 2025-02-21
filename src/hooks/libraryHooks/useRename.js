import { useState } from "react";

export function useRename() {
    const [renameModal, setRenameModal] = useState([false, ""]);
    const [renameInput, setRenameInput] = useState("");
    const [renameError, setRenameError] = useState("");

    async function renameMedia(oldName, newName, media) {
        if(media === "video") {
            try {
                await window.FS.renameVideoFile(oldName, newName);
                setRenameModal([false, ""]);
                setRenameInput("");
                setRenameError("");
            } catch (error) {
                setRenameError(error);
            };
        } else if(media === "audio") {
            try {
                await window.FS.renameAudioFile(oldName, newName);
                setRenameModal([false, ""]);
                setRenameInput("");
                setRenameError("");
            } catch (error) {
                setRenameError(error);
            };
        };
    };

    function closeRenameModal() {
        setRenameModal([false, ""]);
        setRenameError("");
    };

    return { renameMedia, closeRenameModal, setRenameModal, renameModal, setRenameInput, renameInput, setRenameError, renameError }
};