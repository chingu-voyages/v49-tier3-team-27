"use client";

import ChatComponent from "@/components/ui/chat-component";
import { useState } from "react";

const Chatbot = () => {
  const [chatbot, setChatbot] = useState(false);

  const toggleChatbot = () => {
    setChatbot(!chatbot);
  };

  return (
    <>
      {chatbot && (
        <div className="bg-figma-brown w-[330px] absolute bottom-[1px] max-md:bottom-14 right-2 p-2 rounded-md text-white z-20">
          <div className="flex justify-between">
            <h2 className="text-xl">Nestring Chatbot</h2>

            <button onClick={toggleChatbot}>
              <svg
                width="25px"
                height="25px"
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M11.5 4.25H6.5C5.43913 4.25 4.42178 4.67142 3.67163 5.42157C2.92149 6.17172 2.5 7.18913 2.5 8.25V18.25C2.5 19.3109 2.92149 20.3283 3.67163 21.0784C4.42178 21.8286 5.43913 22.25 6.5 22.25H16.5C17.5609 22.25 18.5783 21.8286 19.3284 21.0784C20.0786 20.3283 20.5 19.3109 20.5 18.25V13.25"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M21.4998 3.28998L12.0098 12.78"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M17.1396 13.37H13.4297C12.8993 13.37 12.3905 13.1593 12.0154 12.7842C11.6404 12.4092 11.4297 11.9004 11.4297 11.37V7.65997"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </div>
          {/* <ChatComponent /> */}
          <section className="w-full p-10 border rounded-lg outline-dashed -outline-offset-8 bg-white flex flex-col items-center justify-center outline-figma-brown">
            <span className="font-bold text-md text-figma-orange">
              This feature is still in development
            </span>
          </section>
        </div>
      )}

      <div className="absolute bottom-[1px] max-md:bottom-14 right-2 p-2">
        <button onClick={toggleChatbot}>
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.48 4h4l.5.5v2.03h.52l.5.5V8l-.5.5h-.52v3l-.5.5H9.36l-2.5 2.76L6 14.4V12H3.5l-.5-.64V8.5h-.5L2 8v-.97l.5-.5H3V4.36L3.53 4h4V2.86A1 1 0 0 1 7 2a1 1 0 0 1 2 0 1 1 0 0 1-.52.83V4zM12 8V5H4v5.86l2.5.14H7v2.19l1.8-2.04.35-.15H12V8zm-2.12.51a2.71 2.71 0 0 1-1.37.74v-.01a2.71 2.71 0 0 1-2.42-.74l-.7.71c.34.34.745.608 1.19.79.45.188.932.286 1.42.29a3.7 3.7 0 0 0 2.58-1.07l-.7-.71zM6.49 6.5h-1v1h1v-1zm3 0h1v1h-1v-1z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Chatbot;
