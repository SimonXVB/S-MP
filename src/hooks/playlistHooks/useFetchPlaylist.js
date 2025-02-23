import { useState } from "react";

export function useFetchPlaylists() {
    const [playlists, setPlaylists] = useState([]);

    async function fetchPlaylists(dir) {
        const data = await window.Playlist.returnPlaylist(dir);
        setPlaylists(data);
    };

    return { fetchPlaylists, setPlaylists, playlists }
};