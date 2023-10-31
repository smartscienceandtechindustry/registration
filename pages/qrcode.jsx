import { useRouter } from "next/router";
import HeadPoint from "@/components/headpoint";
import { useEffect, useRef, useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";
import { debounce } from "lodash";
import axios from "axios";
export default function Page() {
  const [data, setData] = useState("No result");
  const [user, setUser] = useState(null);
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
    }, 4000);
  }, []);

  function login(id) {
    axios.post("/api/login", { id: id }).then(({ data }) => {
      console.log(data);
      if (data.status) {
        setUser(data.user);
      }
    });
  }

  return (
    <div>
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
          }, 300), // Adjust the debounce delay as needed
          []
        )}
      />

      <div className="min-h-screen">
        {user && (
          <>
            <nav className="text-center text-2xl text-green-500">
              Successful Login
            </nav>
            <div>welcome, {user.fullName}</div>
          </>
        )}
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
