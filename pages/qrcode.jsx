import { useRouter } from "next/router";
import HeadPoint from "@/components/headpoint";
import { useEffect, useRef, useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";
import { debounce } from "lodash";
import axios from "axios";
export default function Page() {
  const [data, setData] = useState("No result");
  const [user, setUser] = useState(null);
  const [login1, setLogin1] = useState(false);
  const router = useRouter();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
    setInterval(() => {
      if (inputRef) {
        inputRef.current.focus();
      }
    }, 10000);
  }, []);

  function login(id) {
    axios.post("/api/login", { id: id }).then(({ data }) => {
      console.log(data);
      if (data.login) {
        setLogin1(data.login);
      } else {
        setLogin1(data.login);
      }
      if (data.status) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    });
  }

  return (
    <div className="h-screen overflow-hidden">
      <HeadPoint />
      <input
        type="text"
        autoFocus={true}
        ref={inputRef}
        className="bg-white bg-opacity-0 text-xs border-0"
        style={{
          transform: "translateX(-200%)",
        }}
        onChange={useCallback(
          debounce((value) => {
            // Perform your function here, e.g., call an API, etc.
            // Update the result in the state
            login(inputRef.current.value);
            inputRef.current.value = "";
          }, 100), // Adjust the debounce delay as needed
          []
        )}
      />

      <div className="min-h-screen  mt-60">
        {!login1 && user && (
          <>
            <nav className="text-center text-5xl text-white text-bold text-3xl">
              Welcome
            </nav>
            <div className="text-center mt-10 text-5xl  ">
              <span className="">{user.fullName}</span>
            </div>
          </>
        )}

        {login1 && user && (
          <>
            <nav className="text-center text-5xl text-white text-bold text-3xl">
              you have already scan
            </nav>
            <div className="text-center mt-10 text-5xl  ">
              <span className="">welcome, {user.fullName}</span>
            </div>
          </>
        )}

        {}
      </div>
      <>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              login(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{data}</p>
      </>
    </div>
  );
}
