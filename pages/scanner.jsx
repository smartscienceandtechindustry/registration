import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
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
          onClick={(e) => {
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
