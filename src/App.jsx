
// import { useState } from "react";
// import axios from "axios";

// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [inputMoved, setInputMoved] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const addMessage = async () => {
//     if (!text.trim()) return;
//     setMessages((prev) => [...prev, { role: "user", text }]);
//     const userText = text;
//     setText("");
//     setInputMoved(true);
//     setLoading(true);

//     try {
//       // Call backend
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/assist`,
//         { userText }
//       );
//       const reply = data.reply;

//       // Show assistant reply
//       setMessages((prev) => [...prev, { role: "assistant", text: reply }]);

//       // Speak reply
//       await speak(reply);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", text: "⚠️ Something went wrong — try again." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   async function speak(text) {
//   try {
//     const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/speak`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text }),
//     });

//     if (!resp.ok) {
//       console.error("Error generating voice:", await resp.text());
//       return;
//     }

//     const audioBlob = await resp.blob();
//     const url = URL.createObjectURL(new Blob([audioBlob], { type: "audio/mpeg" }));
//     const audio = new Audio(url);

//     await audio.play();
//   } catch (err) {
//     console.error("Speak failed:", err);
//   }
// }




//   const handleVoice = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("SpeechRecognition not supported");

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.onresult = (event) => {
//       const voiceText = event.results[0][0].transcript;
//       setText(voiceText);
//     };
//     recognition.start();
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-md shadow">
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="text-xl text-slate-700"
//         >
//           ☰
//         </button>
//         <h1 className="text-lg font-semibold text-slate-800">
//           Voice AI Assistant
//         </h1>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         {sidebarOpen && (
//           <div className="w-64 bg-teal-500 text-white p-4 overflow-y-auto">
//             <h2 className="text-lg font-bold mb-4">🕘 History</h2>
//             <ul>
//               <li className="mb-2">Welcome</li>
//             </ul>
//           </div>
//         )}

//         {/* Chat Area */}
//         <div className="flex flex-col flex-1 relative">
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {!inputMoved && (
//               <div className="text-center mt-20 text-xl font-semibold text-slate-700">
//                 Hey there.. How can we help?
//               </div>
//             )}
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`max-w-md p-3 rounded-lg shadow ${
//                   m.role === "user"
//                     ? "bg-blue-200 self-end"
//                     : "bg-green-200 self-start"
//                 }`}
//               >
//                 <strong>{m.role === "user" ? "You" : "Assistant"}:</strong>{" "}
//                 {m.text}
//               </div>
//             ))}
//             {loading && (
//               <div className="text-center text-slate-600">Thinking…</div>
//             )}
//           </div>

//           {/* Input Bar */}
//           <div
//             className={`w-full px-4 py-3 ${inputMoved ? "absolute bottom-0" : "mt-auto"} bg-gray-500`}
//           >
//             <div className="flex gap-2">
//               <input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && addMessage()}
//                 placeholder="Type your message..."
//                 className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-800"
//               />
//               <button
//                 onClick={addMessage}
//                 className="px-4 py-2 bg-sky-500 text-white rounded-lg"
//               >
//                 Send
//               </button>
//               <button
//                 onClick={handleVoice}
//                 className="px-4 py-2 bg-pink-400 text-white rounded-full animate-pulse"
//               >
//                 🎤
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [text, setText] = useState("");
  const [inputMoved, setInputMoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const addMessage = async () => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    const userText = text;
    setText("");
    setInputMoved(true);
    setLoading(true);

    try {
      // Call backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assist`,
        { userText }
      );
      const reply = data.reply;

      // Show assistant reply
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);

      // Speak reply
      await speak(reply);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Something went wrong — try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  async function speak(text) {
    const resp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    const audioBlob = await resp.blob();
    new Audio(URL.createObjectURL(audioBlob)).play();
  }

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("SpeechRecognition not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setText(voiceText);
    };
    recognition.start();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-md shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl text-slate-700"
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold text-slate-800">
         EchoMind
        </h1>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-teal-500 text-white p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">🕘 History</h2>
            <ul>
              <li className="mb-2">Welcome</li>
            </ul>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex flex-col flex-1 relative">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!inputMoved && (
              <div className="text-center mt-20 text-xl font-semibold text-slate-700">
                Hey there.. How can we help?
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-md p-3 rounded-lg shadow ${
                  m.role === "user"
                    ? "bg-blue-200 self-end ml-auto"
                    : "bg-green-200 self-start mr-auto"
                }`}
              >
                <strong>{m.role === "user" ? "You" : "Assistant"}:</strong>{" "}
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="text-center text-slate-600">Thinking…</div>
            )}
          </div>

          {/* Input Bar */}
          <div
            className={`w-full px-4 py-3 ${inputMoved ? "absolute bottom-0" : "mt-auto"} bg-gray-500`}
          >
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-800"
              />
              <button
                onClick={addMessage}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg"
              >
                Send
              </button>
              <button
                onClick={handleVoice}
                className="px-4 py-2 bg-pink-400 text-white rounded-full animate-pulse"
              >
                🎤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}