import { useEffect } from "react";

export function ResModal({ setRes, res }){

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRes("");
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`absolute top-3 right-3 rounded-2xl flex justify-center items-center p-2 ${res === "success" ? "bg-green-600" : "bg-red-600"}`} id="transition">
            {String(res).endsWith("exists") && <p className="font-bold text-white">A file with this name already exists!</p>}
            {String(res).endsWith("format") && <p className="font-bold text-white">File format not supported!</p>}
            {String(res).endsWith("canceled") && <p className="font-bold text-white">Add canceled!</p>}
            {res === "success" && <p className="font-bold text-white">Media added!</p>}
        </div>
    );
};