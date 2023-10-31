import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
const socket = io("https://link.imc.co.tz/");
import HeadPoint from "@/components/headpoint";
export default function Qrcode() {
  const videoRef = useRef();
  useEffect(() => {}, []);
  return (
    <>
      {/* <HeadPoint /> */}
      <div className="w-screen h-screen flex bg-white bg-opacity-50 ">
        <div
          className=" bg-black m-auto"
          onTouchStartCapture={(e) => {
            e.preventDefault();
            videoRef.current.play();
          }}
        >
          <video
            src="/scan.mp4"
            ref={videoRef}
            onEnded={() => {
              socket.emit("message", "message");
            }}
          ></video>
        </div>
      </div>
    </>
  );
}
