import { createContext, useState } from "react";

const navCtx = createContext();

function NavContext({children}) {
    const [current, setCurrent] = useState("Videos");
    const [vidSrc, setVidSrc] = useState(["", []]);
    const [audioSrc, setAudioSrc] = useState(["", []]);

    return (
        <navCtx.Provider value={{setCurrent, current, setVidSrc, vidSrc, setAudioSrc, audioSrc}}>
            {children}
        </navCtx.Provider>
    );
};

export { navCtx, NavContext };