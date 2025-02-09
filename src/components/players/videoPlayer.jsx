export function VideoPlayer({ src }) {
    return (
        <div className="w-full flex items-center justify-center">
            <video className="p-8" src={src} controls />
        </div>
    );
};