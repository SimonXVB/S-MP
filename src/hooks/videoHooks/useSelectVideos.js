import { useState } from "react";

export function useSelectVideos() {
    const [isSelect, setIsSelect] = useState(false);
    const [selectedEntries, setSelectedEntries] = useState([]);

    function isChecked(event, video) {
        if(!event.target.checked) {
            setSelectedEntries(selectedEntries.filter((e) => e !== video));
        } else {
            setSelectedEntries([...selectedEntries, video]);
        };
    };

    function toggleSelect() {
        if(isSelect) {
            setIsSelect(false);
            setSelectedEntries([]);
        } else {
            setIsSelect(true);
        };
    };

    return { isChecked, toggleSelect, setIsSelect, isSelect, setSelectedEntries, selectedEntries }
};