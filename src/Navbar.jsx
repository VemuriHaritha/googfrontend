// // export default function Navbar({ toggleSidebar, toggleTheme, darkMode }) {
// //   return (
// //     <div className="navbar">
// //       <button className="menu-btn" onClick={toggleSidebar}>☰</button>

// //       <h1 className="nav-title">ChatBot</h1>

// //       <button className="theme-btn" onClick={toggleTheme}>
// //         {darkMode ? "🌞" : "🌙"}
// //       </button>
// //     </div>
// //   );
// // }
// import React from "react";
// import "./styles/main.css";

// export default function Navbar({ toggleSidebar, toggleTheme, darkMode }) {
//   return (
//     <nav className="navbar">
//       {/* Sidebar Toggle Button */}
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         ☰
//       </button>

//       <h1 className="logo">Chat App</h1>

//       {/* Theme Toggle Button */}
//       <button className="theme-btn" onClick={toggleTheme}>
//         {darkMode ? "🌙" : "☀️"}
//       </button>
//     </nav>
//   );
// }
import React from "react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-md shadow">
      {/* Sidebar Toggle Button */}
      <button
        className="text-2xl text-slate-700 hover:text-sky-600 transition"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Logo */}
      <h1 className="text-lg font-semibold text-slate-800">Chat App</h1>

      {/* Placeholder for future actions (settings/profile) */}
      <button className="px-3 py-1 text-sm bg-sky-500 text-white rounded hover:bg-sky-600 transition">
        Settings
      </button>
    </nav>
  );
}
