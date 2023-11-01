import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
export default function Player() {
  const socket = io("https://link.imc.co.tz");
  const videoRef = useRef();
  useEffect(() => {
    socket.on("message", (msg) => {
      videoRef.current.play();
    });
  }, []);

  return (
    <>
      <div>
        <video src="/reveal.mp4" ref={videoRef} preload="auto"></video>
      </div>
    </>
  );
}
