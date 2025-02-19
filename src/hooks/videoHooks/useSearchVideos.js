import { useState } from "react";

export function useSearchVideos() {
    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState([]);

    function search(input, videos) {
        setFiltered(videos.filter((video) => {
            if(video.toLowerCase().includes(input.toLowerCase())) {
                return video;
            };
        }));
    };

    return { search, setSearchInput, searchInput, setFiltered, filtered }
};