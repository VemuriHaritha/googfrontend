// export default function Sidebar({ history = [], sidebarOpen, closeSidebar }) {
//   return (
//     <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//       <h2>🕘 History</h2>

//       <ul>
//         {history.length === 0 ? (
//           <li>No history yet</li>
//         ) : (
//           history.map((h, i) => <li key={i}>{h}</li>)
//         )}
//       </ul>
//     </div>
//   );
// }
export default function Sidebar({ history = [], sidebarOpen, closeSidebar }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <h2>🕘 History</h2>

      <ul>
        {history.length === 0 ? (
          <li>No history yet</li>
        ) : (
          history.map((h, i) => <li key={i}>{h}</li>)
        )}
      </ul>
    </div>
  );
}

