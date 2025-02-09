export function AudioPlayer({ src }) {
    return (
        <div className="w-full flex items-center justify-center">
            <audio className="w-[80%] m-8" src={src} controls />
        </div>
    );
};