import { useContext } from "react";
import { Navbar } from "./components/navbar";
import { navCtx } from "./context/navContext";
import { Videos } from "./components/videos";
import { Music } from "./components/music";
import { YT } from "./components/yt";
import { Add } from "./components/add";

export function Main() {
    const { current } = useContext(navCtx);

    return (
        <>
            <Navbar />
            {current === "Videos" && <Videos />}
            {current === "Music" && <Music />}
            {current === "YT" && <YT />}
            {current === "Add" && <Add />}
        </>
    );
};