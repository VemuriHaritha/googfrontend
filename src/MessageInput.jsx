// import { useState } from "react";
// import axios from "axios";

// export default function MessageInput({ onSend }) {
//   const [text, setText] = useState("");

//   const handleSend = async () => {
//     if (!text.trim()) return;
//     onSend({ role: "user", text });
//     setText("");

//     const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/assist`, { userText: text });
//     onSend({ role: "assistant", text: data.reply });

//     const resp = await fetch(
//       `https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`,
//       {
//         method: "POST",
//         headers: {
//           "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: data.reply }),
//       }
//     );
//     const audioBlob = await resp.blob();
//     const url = URL.createObjectURL(audioBlob);
//     new Audio(url).play();
//   };

//   const handleVoice = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
//     <div className="message-input">
//       <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message..." />
//       <button onClick={handleSend}>Send</button>
//       <button className="voice-button" onClick={handleVoice}>🎤</button>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    // Send user message to UI
    onSend({ role: "user", text });

    // Clear input
    setText("");

    try {
      // Call backend AI
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assist`,
        { userText: text }
      );

      // Display assistant reply
      onSend({ role: "assistant", text: data.reply });

      // Convert reply to speech using ElevenLabs
      const resp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: data.reply }),
        }
      );

      const audioBlob = await resp.blob();
      const url = URL.createObjectURL(audioBlob);
      new Audio(url).play();
    } catch (err) {
      console.error("API Error:", err);
      onSend({
        role: "assistant",
        text: "⚠️ Something went wrong. Please try again.",
      });
    }
  };

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition)
      return alert("Speech Recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      const voiceText = e.results[0][0].transcript;
      setText(voiceText);
    };

    recognition.start();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    
    <div className="message-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
      />

      <button onClick={handleSend}>Send</button>

      <button className="voice-button" onClick={handleVoice}>
        🎤
      </button>
    </div>
    
  );
}
import { useState } from "react";
import axios from "axios";

export default function MessageInput({ onSend, inputMoved, setInputMoved }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    // Move input bar to bottom permanently on first send
    setInputMoved(true);

    // Send user message
    onSend({ role: "user", text });
    setText("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/assist`,
        { userText: text }
      );

      onSend({ role: "assistant", text: data.reply });

      // ElevenLabs TTS
      const resp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: data.reply }),
        }
      );

      const audioBlob = await resp.blob();
      new Audio(URL.createObjectURL(audioBlob)).play();
    } catch (err) {
      console.error(err);
      onSend({
        role: "assistant",
        text: "⚠️ Something went wrong — try again.",
      });
    }
  };

  return (
    <div className={`message-input-wrapper ${inputMoved ? "at-bottom" : "center"}`}>
      <div className="message-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
        <button className="voice-button">🎤</button>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import axios from "axios";

// export default function MessageInput({ onSend, inputMoved, setInputMoved }) {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!text.trim()) return;

//     // Move input bar to bottom permanently on first send
//     setInputMoved(true);

//     // Send user message
//     onSend({ role: "user", text });
//     const userText = text;
//     setText("");
//     setLoading(true);

//     try {
//       // Backend call
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/assist`,
//         { userText }
//       );

//       // Show assistant reply
//       onSend({ role: "assistant", text: data.reply });

//       // ElevenLabs TTS
//       const resp = await fetch(
//         `https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`,
//         {
//           method: "POST",
//           headers: {
//             "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ text: data.reply }),
//         }
//       );

//       const audioBlob = await resp.blob();
//       new Audio(URL.createObjectURL(audioBlob)).play();
//     } catch (err) {
//       console.error(err);
//       onSend({
//         role: "assistant",
//         text: "⚠️ Something went wrong — try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

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
//     <div
//       className={`transition-all duration-300 ${
//         inputMoved
//           ? "absolute bottom-0 w-full px-4 py-3 bg-gray-100"
//           : "flex justify-center items-center flex-col flex-grow"
//       }`}
//     >
//       <div className="flex gap-2 w-full max-w-xl">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type your message..."
//           className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-800"
//         />
//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className={`px-4 py-2 rounded-lg text-white ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
//           }`}
//         >
//           {loading ? "..." : "Send"}
//         </button>
//         <button
//           onClick={handleVoice}
//           className="px-4 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 animate-pulse"
//         >
//           🎤
//         </button>
//       </div>
//     </div>
//   );
// }