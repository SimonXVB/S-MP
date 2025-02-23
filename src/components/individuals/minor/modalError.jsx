export function ModalError({ name }) {
    return (
        <div className="bg-red-600 mt-2 p-2 w-fit">
            <p className="text-white font-bold text-[16px]">{name}</p>
        </div>
    );
};