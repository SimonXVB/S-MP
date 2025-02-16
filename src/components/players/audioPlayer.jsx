import { useEffect, useRef, useState } from "react";
import { PlayerButton } from "../individuals/playerButton";

export function AudioPlayer({ src }) {
    const audioRef = useRef();
    const seekerRef = useRef();
    const volumeRef = useRef();
    const controlsRef = useRef();
    const intervalRef = useRef();

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
 
    function play() {
        if(audioRef.current.paused) {
            audioRef.current.play();
            setPlaying(true);
            setDuration(audioRef.current.duration);
            intervalRef.current = setInterval(() => {
                updateTime();
            }, 150);
        } else {
            audioRef.current.pause();
            setPlaying(false);
            clearInterval(intervalRef.current);
        };
    };

    function plusFive() {
        audioRef.current.currentTime = audioRef.current.currentTime + 5;
        updateTime();
    };

    function minusFive() {
        audioRef.current.currentTime = audioRef.current.currentTime - 5;
        updateTime();
    };

    function updateTime() {
        seekerRef.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setCurrent(audioRef.current.currentTime);
    };

    function seek() {
        audioRef.current.currentTime = audioRef.current.duration * (seekerRef.current.value / 100);
        setCurrent(audioRef.current.currentTime);
    };

    function changeAudio() {
        audioRef.current.volume = volumeRef.current.value;
        audioRef.current.muted = false;
        setIsMuted(false);
    };

    function mute() {
        if(isMuted) {
            audioRef.current.muted = false;
            setIsMuted(false);
        } else {
            audioRef.current.muted = true;
            setIsMuted(true);
        };
    };

    useEffect(() => {
        seekerRef.current.value = 0;
        return () => clearInterval(intervalRef.current);
    }, []);
    
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center p-8">
            <div className="max-h-[90%] relative flex flex-col items-center justify-center max-w-[80%] w-full">
                <audio ref={audioRef} onEnded={() => {clearInterval(intervalRef.current); setPlaying(false)}} onClick={play} src={src} className="max-h-full"/>
                <div className="flex flex-col w-full absolute bottom-0" ref={controlsRef}>
                    <input type="range" ref={seekerRef} step={1} min={0} max={100} onChange={seek} id="videoSlider"/>
                    <div className="flex w-full bg-gray-900">
                        <PlayerButton text={"-5"} onclick={minusFive}/>
                        <PlayerButton text={playing ? <img className="h-[24px]" src="../src/assets/playerAssets/pause.png"/> : <img className="h-[24px]" src="../src/assets/playerAssets/play.png"/>} onclick={play}/>
                        <PlayerButton text={"+5"} onclick={plusFive}/>
                        <div className="flex items-center justify-center text-white py-1 max-w-24 w-full bg-gray-900 font-bold">
                            <div>{Math.floor(current / 60) + ":" + ("0" + Math.floor(current % 60)).slice(-2)}</div>
                            <div>/{Math.floor(duration / 60) + ":" + ("0" + Math.floor(duration % 60)).slice(-2)}</div>
                        </div>
                        <div className="flex items-center justify-center">
                            <PlayerButton text={isMuted ? <img className="h-[24px]" src="../src/assets/playerAssets/muted.png"/> : <img className="h-[24px]" src="../src/assets/playerAssets/volume.png"/>} onclick={mute}/>
                            <input type="range" ref={volumeRef} step={0.01} min={0} max={1} onChange={changeAudio} id="audioSlider"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};