import { useEffect, useRef, useState, useContext } from "react";
import { mainContext } from "../../Context/context";
import { PlayerButton } from "./Individuals/PlayerButton";
import { Loading } from "../Loading";

export function VideoPlayer() {
    const { mediaData } = useContext(mainContext);

    const videoRef = useRef();
    const seekerRef = useRef();
    const audioRef = useRef();
    const volumeRef = useRef(0.3);
    const fullscreenRef = useRef();
    const intervalRef = useRef();
    const controlsTimeoutRef = useRef();
    
    const [sourceIndex, setSourceIndex] = useState(mediaData.sourceIndex);
    const [metaDataLoaded, setMetaDataLoaded] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [controls, setControls] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
 
    function play() {
        if(videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);

            intervalRef.current = setInterval(() => {
                seekerRef.current.value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                setCurrentTime(videoRef.current.currentTime);
            }, 100);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
            clearInterval(intervalRef.current);
        };
    };

    function toggleFullscreen() {
        if(document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            fullscreenRef.current.requestFullscreen();
        };
    };

    function seek() {
        videoRef.current.currentTime = videoRef.current.duration * (seekerRef.current.value / 100);
        setCurrentTime(videoRef.current.currentTime);
    };

    function changeAudio() {
        videoRef.current.volume = audioRef.current.value;
        videoRef.current.muted = false;
        volumeRef.current = audioRef.current.value;
        setIsMuted(false);
    };

    function mute() {
        if(isMuted) {
            videoRef.current.muted = false;
            audioRef.current.value = volumeRef.current;
            setIsMuted(false);
        } else {
            videoRef.current.muted = true;
            audioRef.current.value = 0;
            setIsMuted(true);
        };
    };

    function displayControls() {
        clearTimeout(controlsTimeoutRef.current);

        setControls(true);

        controlsTimeoutRef.current = setTimeout(() => {
            setControls(false);
        }, 3000);
    };

    function next() {
        if(sourceIndex + 1 < mediaData.sources.length) {
            setSourceIndex(sourceIndex + 1);
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setMetaDataLoaded(false);
            setCurrentTime(0);
            videoRef.current.pause();
            seekerRef.current.value = 0;
        } else {
            setSourceIndex(0);
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setMetaDataLoaded(false);
            setCurrentTime(0);
            videoRef.current.pause();
            seekerRef.current.value = 0;
        };
    };

    function prev() {
        if(sourceIndex - 1 >= 0) {
            setSourceIndex(sourceIndex - 1);
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setMetaDataLoaded(false);
            setCurrentTime(0);
            videoRef.current.pause();
            seekerRef.current.value = 0;
        } else {
            setSourceIndex(mediaData.sources.length - 1);
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setMetaDataLoaded(false);
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

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(controlsTimeoutRef.current);
            document.removeEventListener("keydown", spacePause);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="relative h-[calc(100vh-53px)] w-full bg-gray-950 flex flex-col items-center justify-center">
            <div className="relative h-full flex flex-col items-center justify-center" ref={fullscreenRef} onMouseMove={displayControls}>
                {!metaDataLoaded && <Loading/>}
                <video ref={videoRef} 
                    onDoubleClick={toggleFullscreen} 
                    onEnded={() => {clearInterval(intervalRef.current); setIsPlaying(false)}} 
                    onLoadedMetadata={() => setMetaDataLoaded(true)} 
                    onClick={play} 
                    src={mediaData.sources[sourceIndex].source} 
                    className={`h-full ${!metaDataLoaded && "hidden"}`}
                />
                {metaDataLoaded &&
                    <div className={`w-full ${!controls && "hidden"}`}>
                        <div className="w-full absolute top-0 text-white text-2xl font-medium m-2 overflow-hidden whitespace-nowrap">{mediaData.sources[sourceIndex].name}</div>
                        <div className="flex flex-col w-full absolute bottom-0">
                            <input type="range" ref={seekerRef} defaultValue={0} step={0.1} min={0} max={100} onChange={seek} id="videoSlider"/>
                            <div className="relative flex justify-between w-full bg-gray-900">
                                <div className="flex">
                                    <div className="flex items-center justify-center text-white font-medium mx-2">
                                        <div>{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</div>
                                        <div>/{Math.floor(videoRef.current.duration / 60) + ":" + ("0" + Math.floor(videoRef.current.duration % 60)).slice(-2)}</div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <PlayerButton img={<img className="h-[28px]" src={isMuted ? "../src/assets/playerAssets/muted.png": "../src/assets/playerAssets/volume.png"}/>} onclick={mute}/>
                                        <input type="range" ref={audioRef} defaultValue={0.3} step={0.01} min={0} max={1} onChange={changeAudio} id="audioSlider"/>
                                    </div>
                                </div>
                                <div className="flex absolute left-[50%] -translate-x-[50%]">
                                    <PlayerButton img={<img className="h-[28px]" src="../src/assets/playerAssets/prev.png"/>} onclick={prev}/>
                                    <PlayerButton img={<img className="h-[28px]" src={isPlaying ? "../src/assets/playerAssets/pause.png" : "../src/assets/playerAssets/play.png"}/>} onclick={play}/>
                                    <PlayerButton img={<img className="h-[28px]" src="../src/assets/playerAssets/next.png"/>} onclick={next}/>
                                </div>
                                <PlayerButton img={<img className="h-[28px]" src="../src/assets/playerAssets/fullscreen.png"/>} onclick={toggleFullscreen}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};