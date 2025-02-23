import { createContext, useState } from "react";

const navCtx = createContext();

function NavContext({children}) {
    const [current, setCurrent] = useState("Videos");
    const [mediaSrc, setMediaSrc] = useState(["", [], ""]);

    return (
        <navCtx.Provider value={{setCurrent, current, setMediaSrc, mediaSrc}}>
            {children}
        </navCtx.Provider>
    );
};

export { navCtx, NavContext };