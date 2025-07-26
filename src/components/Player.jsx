import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
} from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformPlayer = forwardRef(({ url, darkMode = false, onFinish}, ref) => {
  const containerRef  = useRef(null);
  const waveSurferRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    waveSurferRef.current?.destroy();

    const ws = WaveSurfer.create({
      container:     containerRef.current,
      waveColor:     darkMode ? "#90caf9" : "#4a90e2",
      progressColor: darkMode ? "#42a5f5" : "#357ABD",
      cursorColor:   darkMode ? "#42a5f5" : "#357ABD",
      height:        20,
      responsive:    true,
    });

    waveSurferRef.current = ws;
    setIsLoading(true);

    ws.load(url);

    ws.on("ready", () => setIsLoading(false));
    ws.on("play",  () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => {
      setIsPlaying(false);
      onFinish?.();
    });

    return () => ws.destroy();
  }, [url]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws) return;

    const options = {
      waveColor:     darkMode ? "#90caf9" : "#4a90e2",
      progressColor: darkMode ? "#42a5f5" : "#357ABD",
      cursorColor:   darkMode ? "#42a5f5" : "#357ABD",
    };

    if (typeof ws.setOptions === "function") {
      ws.setOptions(options);
    } else {
      Object.assign(ws.params, options);
      ws.drawBuffer();
    }
  }, [darkMode]);

  useImperativeHandle(ref, () => ({
    play() {
      const ws = waveSurferRef.current;
      if (!ws) return;

      const tryPlay = () => ws.play();

      if (ws.isReady) {
        tryPlay();
      } else {
        const onceReady = () => {
          ws.un("ready", onceReady);
          tryPlay();
        };
        ws.on("ready", onceReady);
      }
    },

    togglePlay() {
      const ws = waveSurferRef.current;
      if (!ws) return;
      ws.isPlaying() ? ws.pause() : this.play();
    },

    seekTo(p) {
      const ws = waveSurferRef.current;
      if (!ws || !ws.isReady) return;
      ws.seekTo(p);
    },
  }));

  return (
    <div>
      {isLoading && (
        <div style={{ color: "blue", marginBottom: 5 }}>در حال بارگذاری…</div>
      )}
      <div ref={containerRef} />
    </div>
  );
});

export default WaveformPlayer;
