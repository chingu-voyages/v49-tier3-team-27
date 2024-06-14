"use client";
import { useChat } from "ai/react";

export default function ChatComponent() {
  //   const { input, handleInputChange, handleSubmit, isLoading, messages } =
  //     useChat({
  //       api: "/api/chat",
  //     });

  return (
    <></>
    // <div>
    //   {messages.map((message) => {
    //     return (
    //       <div key={message.id}>
    //         {/* Name of user */}
    //         {message.role === "assistant" ? (
    //           <h3 className="text-lg font-semibold mt-2">GPT-4 Assistant</h3>
    //         ) : (
    //           <h3 className="text-lg font-semibold mt-2">User</h3>
    //         )}

    //         {/* Formatted message */}
    //         <div>
    //           <p>{message.content}</p>
    //         </div>
    //       </div>
    //     );
    //   })}
    //   <form className="mt-12" onSubmit={handleSubmit}>
    //     <p>Message</p>
    //     <textarea
    //       className="mt-2 w-full bg-white bg-opacity-20 p-2"
    //       placeholder="What is Netling ?"
    //       value={input}
    //       onChange={handleInputChange}
    //     />
    //     <button className="rounded-md bg-interactive-green p-2 mt-2">
    //       Send message
    //     </button>
    //   </form>
    // </div>
  );
}
