import React from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthBar() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="auth-badge">
        <span className="dot red" />
        Guest
      </div>
    );
  }

  return (
//     <div className="auth-wrap">
//       <div className="auth-badge">
//         <span className="dot green" />
//         {user.name} · {user.role}
//       </div>
//       {/* <button className="btn" onClick={logout}>Logout</button> */}
//       <div className="flex">
//   <button className="btn ml-auto" onClick={logout}>
//     Logout
//   </button>
// </div>
//     </div>
//   );
<div className="auth-wrap flex items-center justify-between w-full px-4 py-2
                bg-white/70 dark:bg-slate-900/60 backdrop-blur-md
                border-b border-slate-200 dark:border-slate-700">
  {/* Badge */}
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-slate-100 dark:bg-slate-800
                  text-sm font-medium text-slate-700 dark:text-slate-200
                  shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
    {user.name} · {user.role}
  </div>

  {/* Logout */}
  <button
    onClick={logout}
    className="btn bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg
               shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
  >
    Logout
  </button>
</div>
  )
}
