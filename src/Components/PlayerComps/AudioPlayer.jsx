import { useEffect, useRef, useState, useContext } from "react";
import { mainContext } from "../../Context/context";
import { PlayerButton } from "./Individuals/PlayerButton";

import mutedSVG from "../../Assets/PlayerAssets/muted.svg";
import nextSVG from "../../Assets/PlayerAssets/next.svg";
import pauseSVG from "../../Assets/PlayerAssets/pause.svg";
import playSVG from "../../Assets/PlayerAssets/play.svg";
import prevSVG from "../../Assets/PlayerAssets/prev.svg";
import volumeSVG from "../../Assets/PlayerAssets/volume.svg";

export function AudioPlayer() {
    const { mediaData } = useContext(mainContext);

    const musicRef = useRef();
    const seekerRef = useRef();
    const intervalRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const [sourceIndex, setSourceIndex] = useState(mediaData.sourceIndex);
    const [metaDataLoaded, setMetaDataLoaded] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.3);

    function play() {
        if(musicRef.current.paused) {
            musicRef.current.play();
            setIsPlaying(true);

            intervalRef.current = setInterval(() => {
                seekerRef.current.value = (musicRef.current.currentTime / musicRef.current.duration) * 100;
                setCurrentTime(musicRef.current.currentTime);
            }, 100);
        } else {
            musicRef.current.pause();
            setIsPlaying(false);
            clearInterval(intervalRef.current);
        };
    };

    function seek() {
        musicRef.current.currentTime = musicRef.current.duration * (seekerRef.current.value / 100);
        setCurrentTime(musicRef.current.currentTime);
    };

    function changeVolume(e) {
        musicRef.current.volume = e.target.value;
        musicRef.current.muted = false;

        setVolume(e.target.value);

        e.target.value == 0 ? setIsMuted(true) : setIsMuted(false);
    };

    function mute() {
        if(isMuted) {
            musicRef.current.muted = false;
            setIsMuted(false);
        } else {
            musicRef.current.muted = true;
            setIsMuted(true);
        };
    };

    function resetPlayer(index) {
        setSourceIndex(index);
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setMetaDataLoaded(false);
        setCurrentTime(0);
        musicRef.current.pause();
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

    function autoPlay() {
        if(sourceIndex + 1 < mediaData.sources.length) {
            next();

            setTimeout(() => {
                musicRef.current.load();
                play();
            }, 0);
        } else {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
        };
    };
 
    function spacePause(e) {
        if(musicRef.current && e.code === "Space") {
            play();
        };
    };

    useEffect(() => {
        document.addEventListener("keydown", spacePause);

        return () => {
            clearInterval(intervalRef.current);
            document.removeEventListener("keydown", spacePause);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="min-h-[calc(100vh-53px)] w-full bg-gray-950 flex flex-col items-center justify-center">
            <audio
                ref={musicRef}
                onEnded={autoPlay}
                src={mediaData.sources[sourceIndex].source}
                onLoadedMetadata={() => setMetaDataLoaded(true)}
            />
            <div className="flex flex-col max-w-[600px] w-full bg-gray-800 rounded-md p-2.5 my-4">
                <p className="text-white text-xl font-medium p-2 pl-0 overflow-x-auto whitespace-nowrap">{mediaData.sources[sourceIndex].name}</p>
                <div className="w-full">
                    <input type="range" ref={seekerRef} defaultValue={0} step={0.1} min={0} max={100} onChange={seek} id="musicSlider"/>
                    <div className="flex items-center text-white w-full font-medium text-sm h-[2ch]">
                        {metaDataLoaded &&
                            <>
                                <div>{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</div>
                                <div>/{Math.floor(musicRef.current.duration / 60) + ":" + ("0" + Math.floor(musicRef.current.duration % 60)).slice(-2)}</div>
                            </>
                        }
                    </div>
                </div>
                <div className="flex justify-center gap-5 w-full">
                    <PlayerButton img={prevSVG} onclick={prev}/>
                    <PlayerButton img={isPlaying ? pauseSVG : playSVG} onclick={metaDataLoaded && play}/>
                    <PlayerButton img={nextSVG} onclick={next}/>
                </div>
                <div className="relative flex items-center justify-center gap-2 py-5">
                    <PlayerButton style={"absolute right-[71%]"} img={isMuted ? mutedSVG : volumeSVG} onclick={mute}/>
                    <input type="range" value={isMuted ? 0 : volume} step={0.01} min={0} max={1} onChange={changeVolume} id="volumeSlider"/>
                </div>
            </div>
        </div>
    );
};