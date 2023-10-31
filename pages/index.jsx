import Image from "next/image";
import { Inter } from "next/font/google";
import * as htmlToImage from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import download from "downloadjs";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import validator from "validator";

import HeadPoint from "@/components/headpoint";
function DownloadPhoto({ user }) {
  const cat = useRef();
  return (
    <>
      <HeadPoint />
      <div className="flex flex-col items-center bg-white bg-opacity-60">
        <div className=" justify-center items-center m-10 mb-0">
          <div className="flex relative w-full max-w-sm  " ref={cat}>
            <nav
              className="absolute text-white font-bold text-2xl text-center w-full  px-8"
              style={{
                top: "27%",
              }}
            >
              {user.fullName}
            </nav>
            <div
              className="absolute  w-full flex justify-center"
              style={{
                top: "43%",
              }}
            >
              <span
                className="bg-white p-2"
                style={{ transform: "scale(1.2)" }}
              >
                <QRCodeSVG
                  value={`https://golf.imc.co.tz/verify/${user.uid}`}
                />
              </span>
            </div>

            <img src="/backphoto1.svg" alt="" />
          </div>
        </div>
        <div className="flex justify-center m-5">
          <button
            className="bg-black p-2 px-8 border-2 text-white rounded-xl"
            onClick={() => {
              htmlToImage.toPng(cat.current).then(function (dataUrl) {
                download(dataUrl, "invitation.png");
              });
            }}
          >
            download
          </button>
        </div>
      </div>
    </>
  );
}

export function FormData({ setUser }) {
  const fullName = useRef();
  const phoneNumber = useRef();
  const designation = useRef();
  const company = useRef();

  const [fullNameStatus, setFullNameStatus] = useState(false);
  const [phoneNumberStatus, setPhoneNumberStatus] = useState(false);
  const [designationStatus, setDesignationStatus] = useState(false);
  const [companyStatus, setCompanyStatus] = useState(false);
  return (
    <>
      <div>
        <HeadPoint />
        <form
          action=""
          className="m-auto max-w-xl  flex flex-col space-y-10 font-bold p-5 py-10 bg-opacity-70 bg-blak text-white min-h-screen backg"
        >
          <nav className="flex flex-col space-y-2">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              className="bg-slate-200 p-2 rounded-l bg-white text-black"
              ref={fullName}
            />
            {fullNameStatus && (
              <nav className="text-center text-red-500">
                Full Name is required
              </nav>
            )}
          </nav>
          <nav className="flex flex-col space-y-2">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              className="bg-slate-200 p-2 rounded-l bg-white text-black"
              ref={phoneNumber}
            />
            {phoneNumberStatus && (
              <nav className="text-center text-red-500">
                Phone Number is required
              </nav>
            )}
          </nav>
          <nav className="flex flex-col space-y-2">
            <label htmlFor="">Designation</label>
            <input
              type="text"
              className="bg-slate-200 p-2 rounded-l bg-white text-black"
              ref={designation}
            />
            {designationStatus && (
              <nav className="text-center text-red-500">
                Designation is required
              </nav>
            )}
          </nav>
          <nav className="flex flex-col space-y-2">
            <label htmlFor="">Company</label>
            <input
              type="text"
              className="bg-slate-200 p-2 rounded-l text-black"
              bg-white
              ref={company}
            />
            {companyStatus && (
              <nav className="text-center text-red-500">
                Company is required
              </nav>
            )}
          </nav>
          <nav className="flex  m-auto">
            <button
              className="bg-black text-white p-2 px-20 rounded-xl bg-opacity-80"
              onClick={(e) => {
                e.preventDefault();

                const user = {
                  fullName: fullName.current.value,
                  phoneNumber: phoneNumber.current.value,
                  designation: designation.current.value,
                  company: company.current.value,
                };
                //let ucounter = 0; counter not needed, return upon error
                if (user.fullName.length == 0) {
                  //enter username please
                  setFullNameStatus(true);
                } else {
                  setFullNameStatus(false);
                }
                if (user.company.length == 0) {
                  //username too short
                  setCompanyStatus(true);
                } else {
                  setCompanyStatus(false);
                }
                if (user.designation.length == 0) {
                  //username too long
                  setDesignationStatus(true);
                } else {
                  setDesignationStatus(false);
                }
                if (user.phoneNumber.length == 0) {
                  setPhoneNumberStatus(true);
                  //enter phone number please
                } else {
                  setPhoneNumberStatus(false);
                }
                axios.post("/api/register", user).then(({ data }) => {
                  console.log(data.uid);
                  setUser({
                    ...user,
                    uid: data.uid,
                  });
                });
              }}
            >
              Register
            </button>
          </nav>
        </form>
      </div>
    </>
  );
}
export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      setState(true);
    }
  }, [user]);
  const [state, setState] = useState(false);
  if (state) {
    return <DownloadPhoto user={user} />;
  } else {
    return <FormData setUser={setUser} />;
  }
}
