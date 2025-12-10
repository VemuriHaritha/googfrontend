// export default function ChatWindow({ messages = [] }) {
//   return (
//     <div className="chat-window">
//       {messages.map((m, i) => (
//         <div key={i} className={`message ${m.role}`}>
//           <strong>{m.role === "user" ? "You" : "Assistant"}:</strong> {m.text}
//         </div>
//       ))}
//     </div>
//   );
// }
export default function ChatWindow({ messages = [] }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div key={i} className={`message ${m.role}`}>
          <strong>{m.role === "user" ? "You" : "Assistant"}:</strong> {m.text}
        </div>
      ))}
    </div>
  );
}
