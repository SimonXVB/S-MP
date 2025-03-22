import { useEffect, useRef, useState } from "react";
import { PlayerButton } from "../individuals/minor/playerButton";

export function VideoPlayer({ src }) {
    const videoRef = useRef();
    const seekerRef = useRef();
    const audioRef = useRef();
    const fullscreenRef = useRef();
    const controlsRef = useRef();
    const intervalRef = useRef();
    const timeoutRef = useRef();
    const playerRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(Number);

    const [source, setSource] = useState(src[1]);
    const [metadata, setMetadata] = useState(false);
 
    function play() {
        if(videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);

            intervalRef.current = setInterval(() => {
                updateTime();
            }, 100);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
            clearInterval(intervalRef.current);
        };
    };

    function toggleFullscreen() {
        if(isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            fullscreenRef.current.requestFullscreen();
            setIsFullscreen(true);
        };
    };

    function updateTime() {
        seekerRef.current.value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setCurrentTime(videoRef.current.currentTime);
    };

    function seek() {
        videoRef.current.currentTime = videoRef.current.duration * (seekerRef.current.value / 100);
        setCurrentTime(videoRef.current.currentTime);
    };

    function changeAudio() {
        videoRef.current.volume = audioRef.current.value;
        videoRef.current.muted = false;
        setIsMuted(false);
    };

    function mute() {
        if(isMuted) {
            videoRef.current.muted = false;
            setIsMuted(false);
        } else {
            videoRef.current.muted = true;
            setIsMuted(true);
        };
    };

    function displayControls() {
        clearTimeout(timeoutRef.current);

        controlsRef.current.style.display = "flex";

        timeoutRef.current = setTimeout(() => {
            controlsRef.current.style.display = "none";
        }, 3000);
    };

    function next() {
        if((src[2].indexOf(source) + 1) < src[2].length) {
            setSource(src[2][src[2].indexOf(source) + 1]);
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setMetadata(false);
            setCurrentTime(0);
            videoRef.current.pause();
            seekerRef.current.value = 0;
        };
    };

    function prev() {
        if((src[2].indexOf(source) - 1) >= 0) {
            setSource(src[2][src[2].indexOf(source) - 1]);
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setMetadata(false);
            setCurrentTime(0);
            videoRef.current.pause();
            seekerRef.current.value = 0;
        };
    };

    function spacePause(e) {
        if(videoRef.current && e.code === "Space") {
            play();
        };
    };

    useEffect(() => {
        document.addEventListener("keydown", spacePause);

        return () =>  {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
            document.removeEventListener("keydown", spacePause);
        };
    }, []);
    
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center pt-14 pl-14 pr-7 pb-7 relative" ref={playerRef}>
            <h1 className="absolute top-0 right-0 flex items-center w-full min-h-[50px] py-2 text-xl bg-red-400 text-white font-semibold"></h1>
            <div className="max-h-[90%] relative flex flex-col items-center justify-center" ref={fullscreenRef} onMouseMove={displayControls}>
                <video ref={videoRef} onEnded={() => {clearInterval(intervalRef.current); setIsPlaying(false);}} onLoadedMetadata={() => setMetadata(true)} onClick={play} src={src[0] + source} className="max-h-full"/>
                {metadata && 
                    <div ref={controlsRef} className="w-full overflow-auto">
                        <div className="w-full absolute top-0 text-white text-2xl font-bold m-2 max-w-[95%] overflow-x-auto whitespace-nowrap">{source}</div>
                        <div className="flex flex-col w-full absolute bottom-0">
                            <input type="range" ref={seekerRef} defaultValue={0} step={1} min={0} max={100} onChange={seek} id="videoSlider"/>
                            <div className="flex justify-between w-full bg-gray-900">
                                <div className="flex w-full">
                                    <PlayerButton text={<img className="h-[24px]" src="../src/assets/playerAssets/prev.png"/>} onclick={prev}/>
                                    <PlayerButton text={<img className="h-[24px]" src={isPlaying ? "../src/assets/playerAssets/pause.png" : "../src/assets/playerAssets/play.png"}/>} onclick={play}/>
                                    <PlayerButton text={<img className="h-[24px]" src="../src/assets/playerAssets/next.png"/>} onclick={next}/>
                                    <div className="flex items-center justify-center text-white py-1 max-w-24 w-full bg-gray-900 font-bold">
                                        <div>{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</div>
                                        <div>/{Math.floor(videoRef.current.duration / 60) + ":" + ("0" + Math.floor(videoRef.current.duration % 60)).slice(-2)}</div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <PlayerButton text={<img className="h-[24px]" src={isMuted ? "../src/assets/playerAssets/muted.png": "../src/assets/playerAssets/volume.png"}/>} onclick={mute}/>
                                        <input type="range" ref={audioRef} defaultValue={0.3} step={0.01} min={0} max={1} onChange={changeAudio} id="audioSlider"/>
                                    </div>
                                </div>
                                <PlayerButton text={<img className="h-[24px]" src="../src/assets/playerAssets/fullscreen.png"/>} onclick={toggleFullscreen}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};