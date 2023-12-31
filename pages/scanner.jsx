import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const socket = io("https://link.imc.co.tz/");
import HeadPoint from "@/components/headpoint";
export default function Qrcode() {
  const videoRef = useRef();
  const [state, setState] = useState(false);

  useEffect(() => {}, []);
  return (
    <>
      {/* <HeadPoint /> */}
      <div className="w-screen h-screen flex bg-white bg-opacity-50 ">
        <div
          className=" bg-black m-auto"
          onTouchStartCapture={(e) => {
            e.preventDefault();
            setTimeout(() => {
              videoRef.current.play();
            }, 5000);
          }}
        >
          <video
            src="/scan2.mp4"
            ref={videoRef}
            onEnded={() => {
              socket.emit("message", "message");
            }}
            preload="auto"
          ></video>
        </div>
      </div>
    </>
  );
}
