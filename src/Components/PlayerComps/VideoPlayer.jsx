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

    function resetPlayer(index) {
        setSourceIndex(index);
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setMetaDataLoaded(false);
        setCurrentTime(0);
        videoRef.current.pause();
        seekerRef.current.value = 0;
    };

    function next() {
        if(sourceIndex + 1 < mediaData.sources.length) {
            resetPlayer(sourceIndex + 1);
        } else {
            resetPlayer(0);
        };
    };

    function prev() {
        if(sourceIndex - 1 >= 0) {
            resetPlayer(sourceIndex - 1)
        } else {
            resetPlayer(mediaData.sources.length - 1);
        };
    };

    function onVideoEnd() {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setControls(true);
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
        <div className="relative h-[calc(100vh-53px)] w-full bg-gray-950 flex flex-col items-center">
            <div className="relative h-full flex flex-col items-center justify-center" ref={fullscreenRef} onMouseMove={displayControls}>
                {!metaDataLoaded && <Loading/>}
                <video 
                    ref={videoRef} 
                    onDoubleClick={toggleFullscreen} 
                    onEnded={onVideoEnd} 
                    onLoadedMetadata={() => setMetaDataLoaded(true)} 
                    onClick={play} 
                    src={mediaData.sources[sourceIndex].source} 
                    className={`h-full ${!metaDataLoaded && "hidden"}`}
                />
                {metaDataLoaded &&
                    <div className={`w-full ${!controls && "hidden"}`}>
                        <div className="w-[95%] left-[50%] -translate-x-[50%] absolute top-0 text-white text-2xl font-medium mt-2.5 overflow-hidden whitespace-nowrap">{mediaData.sources[sourceIndex].name}</div>
                        <div className="w-[95%] left-[50%] -translate-x-[50%] absolute bottom-0 flex flex-col mb-2.5">
                            <input type="range" ref={seekerRef} defaultValue={0} step={0.1} min={0} max={100} onChange={seek} id="videoSlider"/>
                            <div className="relative flex justify-between w-full mt-5">
                                <div className="flex">
                                    <div className="flex items-center text-white font-medium w-20">
                                        <div>{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</div>
                                        <div>/{Math.floor(videoRef.current.duration / 60) + ":" + ("0" + Math.floor(videoRef.current.duration % 60)).slice(-2)}</div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <PlayerButton style={"mx-2"} img={isMuted ? "../src/assets/playerAssets/muted.svg" : "../src/assets/playerAssets/volume.svg"} onclick={mute}/>
                                        <input type="range" ref={audioRef} defaultValue={0.3} step={0.01} min={0} max={1} onChange={changeAudio} id="audioSlider"/>
                                    </div>
                                </div>
                                <div className="flex absolute left-[50%] -translate-x-[50%]">
                                    <PlayerButton img={"../src/assets/playerAssets/prev.svg"} onclick={prev}/>
                                    <PlayerButton img={isPlaying ? "../src/assets/playerAssets/pause.svg" : "../src/assets/playerAssets/play.svg"} onclick={play}/>
                                    <PlayerButton img={"../src/assets/playerAssets/next.svg"} onclick={next}/>
                                </div>
                                <PlayerButton img={"../src/assets/playerAssets/fullscreen.svg"} onclick={toggleFullscreen}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};