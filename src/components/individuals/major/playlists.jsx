import { useEffect, useState } from "react";
import { useCreatePlaylist } from "../../../hooks/playlistHooks/useCreatePlaylist";
import { useDeletePlaylist } from "../../../hooks/playlistHooks/useDeletePlaylist";
import { useRenamePlaylist } from "../../../hooks/playlistHooks/useRenamePlaylist";
import { useFetchPlaylists } from "../../../hooks/playlistHooks/useFetchPlaylist";
import { NewPlaylistModal } from "../../modals/newPlaylistModal";
import { PlaylistModal } from "../../mainUI/playlistModal";
import { RenameModal } from "../../modals/renameModal";
import { DelModal } from "../../modals/delModal";

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
        <div className="border-4 border-red-400 p-4">
            <p className="font-bold text-2xl pb-2">Playlists</p>
            <div className="flex items-center h-[80px]">
                <button className="h-full aspect-square cursor-pointer bg-gray-900 hover:bg-red-400" onClick={() => setNewPLModal(true)}><img className="m-auto w-[30px] h-[30px]" src="../src/assets/libraryAssets/playlist.png"/></button>
                <div className="h-full max-w-full overflow-x-auto flex gap-4 ml-2">
                    {playlists.map((playlist) => (
                        <div className="border-2 h-full border-red-400 flex items-center justify-between">
                            <p className="whitespace-nowrap p-1 text-2xl font-bold w-[200px] overflow-x-auto">{playlist.name}</p>
                            <button className="h-full aspect-square cursor-pointer bg-gray-900 hover:bg-red-400" onClick={() => setDelPLModal(playlist.name)}><img className="mx-auto w-[30px] h-[30px]" src="../src/assets/libraryAssets/delete.png"/></button>
                            <button className="h-full aspect-square cursor-pointer bg-gray-900 hover:bg-red-400" onClick={() => setRenamePLModal(playlist.name)}><img className="mx-auto w-[30px] h-[30px]" src="../src/assets/libraryAssets/edit.png"/></button>
                            <button className="h-full aspect-square cursor-pointer bg-gray-900 hover:bg-red-400" onClick={() => setPlaylist(playlist.name)}><img className="mx-auto w-[30px] h-[30px]" src="../src/assets/libraryAssets/openPlaylist.png"/></button>
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