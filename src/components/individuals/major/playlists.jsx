import { useEffect, useState } from "react";
import { useCreatePlaylist } from "../../../hooks/playlistHooks/useCreatePlaylist";
import { useDeletePlaylist } from "../../../hooks/playlistHooks/useDeletePlaylist";
import { useRenamePlaylist } from "../../../hooks/playlistHooks/useRenamePlaylist";
import { useFetchPlaylists } from "../../../hooks/playlistHooks/useFetchPlaylist";
import { NewPlaylistModal } from "../../modals/newPlaylistModal";
import { PlaylistModal } from "../../mainUI/playlistModal";
import { RenameModal } from "../../modals/renameModal";
import { DelModal } from "../../modals/delModal";
import { PlaylistButton } from "../minor/playlistButton";

export function Playlists({ dir }) {
    const { renamePlaylist, closeRenameModal, setRenamePLModal, renamePLModal, setRenamePLInput, renamePLInput, renamePLError } = useRenamePlaylist();
    const { newPL, closeNewPLModal, setNewPLModal, newPLModal, setNewPLName, newPLName, newPLError }= useCreatePlaylist();
    const { deletePlaylist, setDelPLModal, delPLModal } = useDeletePlaylist();
    const { fetchPlaylists, playlists } = useFetchPlaylists();

    const [playlist, setPlaylist] = useState("");

    function newPlaylist() {
        newPL(dir, newPLName);
        fetchPlaylists(dir);
    };

    function delPlaylist(name) {
        deletePlaylist(dir, name);
        fetchPlaylists(dir);
    };

    function editPlaylist(oldName, newName) {
        renamePlaylist(oldName, newName, dir);
        fetchPlaylists(dir);
    };

    useEffect(() => {
        fetchPlaylists(dir);
    }, []);

    return (
        <div className="bg-red-400 p-4 rounded-2xl">
            <p className="font-bold text-xl pb-2">Playlists</p>
            <div className="flex items-center h-[50px]">
                <button className="h-full flex justify-center items-center aspect-square cursor-pointer border-2 border-white rounded-lg hover:bg-white hover:*:fill-red-400" onClick={() => setNewPLModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>
                </button>
                <div className="h-full max-w-full overflow-x-auto flex gap-4 ml-2">
                    {playlists.map((playlist) => (
                        <div className="border-2 h-full bg-white text-red-400 rounded-lg flex items-center justify-between px-2">
                            <p className="whitespace-nowrap p-1 text-2xl font-bold w-[200px] overflow-x-auto">{playlist.name}</p>
                            <div className="flex">
                                <PlaylistButton onclick={() => setDelPLModal(playlist.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </PlaylistButton>
                                <PlaylistButton onclick={() => setRenamePLModal(playlist.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                </PlaylistButton>
                                <PlaylistButton onclick={() => setPlaylist(playlist.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z"/></svg>
                                </PlaylistButton>
                            </div>
                        </div>
                    ))}
                </div>
                {playlist && <PlaylistModal setModal={() => setPlaylist("")} dir={`${dir}/${playlist}`}/>}
                {newPLModal && <NewPlaylistModal onChange={(e) => setNewPLName(e.target.value)} setModal={closeNewPLModal} create={newPlaylist} error={newPLError}/>}
                {delPLModal && <DelModal name={delPLModal} setModal={() => setDelPLModal("")} del={() => delPlaylist(delPLModal)}/>}
                {renamePLModal && <RenameModal name={renamePLModal} setModal={closeRenameModal} rename={() => editPlaylist(renamePLModal, renamePLInput)} onChange={(e) => setRenamePLInput(e.target.value)} error={renamePLError}/>}
            </div>
        </div>
    );
};