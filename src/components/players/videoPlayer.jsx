import { useEffect, useRef, useState } from "react";
import { PlayerButton } from "../individuals/playerButton";

export function VideoPlayer({ src }) {
    const videoRef = useRef();
    const seekerRef = useRef();
    const audioRef = useRef();
    const fullscreenRef = useRef();
    const controlsRef = useRef();
    const intervalRef = useRef();
    const timeoutRef = useRef();

    const [playing, setPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [source, setSource] = useState(src[0]);
 
    function play() {
        if(videoRef.current.paused) {
            videoRef.current.play();
            setDuration(videoRef.current.duration);
            setPlaying(true);

            intervalRef.current = setInterval(() => {
                updateTime();
            }, 150);
        } else {
            videoRef.current.pause();
            setPlaying(false);
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
        setCurrent(videoRef.current.currentTime);
    };

    function seek() {
        videoRef.current.currentTime = videoRef.current.duration * (seekerRef.current.value / 100);
        setCurrent(videoRef.current.currentTime);
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
        clearInterval(intervalRef.current);
        setPlaying(false);

        if((src[1].indexOf(source) + 1) < src[1].length) {
            setSource(src[1][src[1].indexOf(source) + 1]);
            clearInterval(intervalRef.current);
            seekerRef.current.value = 0;
            setCurrent(0);
        };
    };

    function prev() {
        if((src[1].indexOf(source) - 1) >= 0) {
            setSource(src[1][src[1].indexOf(source) - 1]);
            clearInterval(intervalRef.current);
            seekerRef.current.value = 0;
            setCurrent(0);
        };
    };

    useEffect(() => {
        seekerRef.current.value = 0;
        audioRef.current.value = 0.5;
        return () =>  {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, []);
    
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center p-8">
            <div className="max-h-[90%] relative flex flex-col items-center justify-center" ref={fullscreenRef} onMouseMove={displayControls}>
                <video ref={videoRef} onEnded={() => {clearInterval(intervalRef.current); setPlaying(false);}} onClick={play} src={".././devTemp/videos/" + source} className="max-h-full"/>
                <div ref={controlsRef} className="w-full overflow-auto">
                    <div className="w-full absolute top-0 text-white text-2xl font-bold m-2 max-w-[95%] overflow-x-auto whitespace-nowrap">{source}</div>
                    <div className="flex flex-col w-full absolute bottom-0">
                        <input type="range" ref={seekerRef} step={1} min={0} max={100} onChange={seek} id="videoSlider"/>
                        <div className="flex justify-between">
                            <div className="flex w-full bg-gray-900">
                                <PlayerButton text={<img className="h-[24px]" src="../src/assets/playerAssets/prev.png"/>} onclick={prev}/>
                                <PlayerButton text={<img className="h-[24px]" src={playing ? "../src/assets/playerAssets/pause.png" : "../src/assets/playerAssets/play.png"}/>} onclick={play}/>
                                <PlayerButton text={<img className="h-[24px]" src="../src/assets/playerAssets/next.png"/>} onclick={next}/>
                                <div className="flex items-center justify-center text-white py-1 max-w-24 w-full bg-gray-900 font-bold">
                                    <div>{Math.floor(current / 60) + ":" + ("0" + Math.floor(current % 60)).slice(-2)}</div>
                                    <div>/{Math.floor(duration / 60) + ":" + ("0" + Math.floor(duration % 60)).slice(-2)}</div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <PlayerButton text={<img className="h-[24px]" src={isMuted ? "../src/assets/playerAssets/muted.png": "../src/assets/playerAssets/volume.png"}/>} onclick={mute}/>
                                    <input type="range" ref={audioRef} step={0.01} min={0} max={1} onChange={changeAudio} id="audioSlider"/>
                                </div>
                            </div>
                            <PlayerButton text={<img className="h-[24px]" src="../src/assets/playerAssets/fullscreen.png"/>} onclick={toggleFullscreen}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};