import { useState } from "react";

export function useSearchFiles() {
    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState([]);

    function searchMedia(input, media) {
        setFiltered(media.filter((file) => {
            if(file.toLowerCase().includes(input.toLowerCase())) {
                return file;
            };
        }));
    };

    return { searchMedia, setSearchInput, searchInput, setFiltered, filtered }
};