import { createContext, useState } from "react";

const navCtx = createContext();

function NavContext({children}) {
    const [current, setCurrent] = useState("Videos");

    return (
        <navCtx.Provider value={{setCurrent, current}}>
            {children}
        </navCtx.Provider>
    );
};

export { navCtx, NavContext };