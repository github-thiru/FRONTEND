import { useState, useEffect } from "react";
import TasksCard from "../components/TaskCard";
import API from "../api/api";
import axios from "axios"; // ⬅️ fix your immediate error
import { useNavigate } from "react-router-dom";



function DashboardPage() {
  const navigate = useNavigate();

    const [userName, setUserName] = useState("");

  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    category: "",
    dueDate: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

useEffect(() => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.username) {
      setUserName(storedUser.username);
    }
  fetchTasks(); // use the correct function once
}, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await API.put(`/tasks/${editingTaskId}`, formData);
      } else {
        await API.post("/tasks", formData);
      }
      fetchTasks();
      setFormData({ taskName: "", description: "", category: "", dueDate: "" });
      setEditingTaskId(null);
    } catch (err) {
      console.error("❌ Error saving task:", err);
    }
  };

 const handleUpdate = async (taskId, newText) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { text: newText }, config);
    await API.delete(`/tasks/${taskId}`, config);

    alert("✏️ Task updated!");
  } catch (error) {
    console.error("❌ Error updating task:", error);
  }
};

// 👇 ADD THIS FUNCTION
const handleEdit = (task) => {
  setFormData({
    taskName: task.taskName,
    description: task.description,
    category: task.category,
    dueDate: task.dueDate?.slice(0, 10),
  });
  setEditingTaskId(task._id);
};


const handleDelete = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await API.delete(`/tasks/${taskId}`, config);
    alert("🗑 Task deleted!");


    // ✅ Remove from UI
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  } catch (error) {
    console.error("❌ Error deleting task:", error);
  }
};



const handleComplete = async (task) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

     await API.put(`/tasks/complete/${task._id}`);
    alert("✅ Task marked as completed!");
    fetchTasks(); // refresh UI
    // Refresh task list if needed
  } catch (error) {
    console.error("❌ Error marking complete:", error); ///---------------
  }
};


  return (
    <>
  
    <div className="container mt-4">
        
         <div className="container mt-4">
      <h2><center>Welcome {userName} !</center> </h2>

      {/* Your dashboard content here */}
    </div>

      {/* <h2>📋 Your Tasks</h2> */}

      <h2 className="mb-4">
   Your Tasks <span className="badge bg-primary ms-2">{tasks.length}</span>
  {/* <span className="ms-3 text-success">➕ Add a task below</span> */}
</h2>

{/* //profile */}
{/* <div className="d-flex justify-content-end align-items-center mb-3">
 <img
  src={user.profileImage || "/images/default-avatar.png"}
  alt="Profile"
    className="rounded-circle"
    style={{ width: "50px", height: "50px", objectFit: "cover", border: "2px solidrgb(203, 211, 223)" }}
  />
</div> */}


      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col">
            <input
              name="taskName"
              className="form-control"
              placeholder="Task Name"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              name="category"
              className="form-control"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="dueDate"
              type="date"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <textarea
          name="description"
          className="form-control mt-2"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-primary mt-2 w-100">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul className="list-group">
        {[...tasks].reverse().map((task) => (
          <TasksCard
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))}
      </ul>
    </div>
      </>
  );
}

export default DashboardPage;
