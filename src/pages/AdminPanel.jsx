// import { useEffect, useState } from "react";
// import API from "../api/api";

// function AdminPanel() {
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [selectedUserTasks, setSelectedUserTasks] = useState([]);
//   const [selectedUserName, setSelectedUserName] = useState("");

//   useEffect(() => {
//     fetchUsers();
//     fetchTasks();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get("/admin/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users", err);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/all-tasks");
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Error fetching tasks", err);
//     }
//   };

//   const fetchTasksForUser = async (userId,email) => {
//     try {
//       const res = await API.get(`/users/${userId}/tasks`);
//       setSelectedUserTasks(res.data);
//       setSelectedUserName(email);
//       console.log('this is the error')
//     } catch (err) {
//       console.error("Error fetching selected user's tasks", err);
//     }
//   };

//   const toggleUserStatus = async (id, isActive) => {
//     const route = isActive ? "deactivate" : "activate";
//     try {
//       await API.put(`/users/${id}/${route}`);
//       fetchUsers(); // refresh users
//     } catch (err) {
//       console.error("Error updating user status", err);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Admin Panel</h2>

//       {/* USERS LIST */}
//       <h4 className="mt-4">👥 Users</h4>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Email (click to view tasks)</th>
//             <th>Username</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Toggle</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>
//                 <button
//                   className="btn btn-link p-0"
//                   onClick={() => fetchTasksForUser(user._id, user.email)}
//                 >
//                   {user.email}
//                 </button>
//               </td>
//               <td>{user.username}</td>
//               <td>{user.role}</td>
//               <td>{user.isActive ? "✅ Active" : "❌ Blocked"}</td>
//               <td>
//                 <button
//                   className={`btn btn-sm ${user.isActive ? "btn-danger" : "btn-success"}`}
//                   onClick={() => toggleUserStatus(user._id, user.isActive)}
//                 >
//                   {user.isActive ? "Deactivate" : "Activate"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ALL TASKS */}
//       <h4 className="mt-4"> All Tasks</h4>
//       <ul className="list-group">
//         {tasks.map((task) => (
//           <li key={task._id} className="list-group-item">
//             <strong>{task.taskName}</strong> ({task.category}) — assigned by <code>{task.userId?.email || task.userId}</code>
//           </li>
//         ))}
//       </ul>

//       {/* SELECTED USER TASKS */}
//       {selectedUserTasks.length > 0 && (
//         <div className="mt-4">
//           <h4>Tasks for: <span className="text-primary">{selectedUserName}</span></h4>
//           <ul className="list-group">
//             {selectedUserTasks.map((task) => (
//               <li key={task._id} className="list-group-item">
//                 <strong>{task.taskName}</strong> ({task.category}) — <em>{task.status}</em>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminPanel;


import { useEffect, useState } from "react";
import API from "../api/api";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUserTasks, setSelectedUserTasks] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Error fetching users", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/admin/all-tasks"); // ✅ Corrected path
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks", err);
    }
  };

  const fetchTasksForUser = async (userId, username) => {
    try {
      const res = await API.get(`/admin/users/${userId}/tasks`); // ✅ Corrected path
      setSelectedUserTasks(res.data);
      setSelectedUserName(username);
    } catch (err) {
      console.error("❌ Error fetching selected user's tasks", err);
    }
  };

  const toggleUserStatus = async (id, isActive) => {
    const route = isActive ? "deactivate" : "activate";
    try {
      await API.put(`/admin/users/${id}/${route}`);
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error("❌ Error updating user status", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2> Admin Panel</h2>

      {/* USERS LIST */}
      <h4 className="mt-4">👥 Users</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email (click to view tasks)</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <button
                  className="btn btn-link p-0"
                  onClick={() => fetchTasksForUser(user._id, user.username)}
                >
                  {user.email}
                </button>
              </td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "✅ Active" : "❌ Blocked"}</td>
              <td>
                <button
                  className={`btn btn-sm ${user.isActive ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleUserStatus(user._id, user.isActive)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ALL TASKS */}
      <h4 className="mt-4">📋 All Tasks</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            <strong>{task.taskName}</strong> ({task.category}) — assigned by{" "}
            <code>{task.userId?.email || task.userId}</code>
          </li>
        ))}
      </ul>

      {/* SELECTED USER TASKS */}
      {selectedUserTasks.length > 0 && (
        <div className="mt-4">
          <h4>
            📌 Tasks for: <span className="text-primary">{selectedUserName}</span>
          </h4>
          <ul className="list-group">
            {selectedUserTasks.map((task) => (
              <li key={task._id} className="list-group-item">
                <strong>{task.taskName}</strong> ({task.category}) —{" "}
                <em>{task.status}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
