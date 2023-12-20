import React, { useState, useEffect } from "react";
import routeAuth from "../middleware/authMiddleware";

const TaskCard = ({ task }) => {
  const date = new Date(task?.due);
  const dateOnly = date.toLocaleDateString();

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col p-4 my-6 bg-gray-200 rounded-lg">
      <div>
        <h1 className="text-lg font-bold">{task?.task}</h1>
      </div>

      <div className="flex">
        <h1>Description : </h1>
        <h1 className="font-semibold">{task?.desc}</h1>
      </div>

      <div className="flex">
        <h1>Due on : </h1>
        <h1 className="font-semibold ">{dateOnly}</h1>
      </div>

      <div className="flex justify-center">
        <button
          //   type="sumbit"
          className="flex items-center justify-center h-10 font-bold text-white bg-green-600 border rounded-full w-36"
          onClick={handleShow}
        >
          Update
        </button>
      </div>

      {show && (
        <div>
          <UpdateCard task={task} handleUpdate={handleUpdate} />
        </div>
      )}

      <div>
        <button onClick={() => handleDelete(task?._id)}>Delete</button>
      </div>
    </div>
  );
};

const FormCard = () => {
  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <label>Task :</label>
      <input type="text" id="service" name="task" required />
      <label>Desc :</label>
      <input type="textarea" id="servilce" name="desc" />

      <div className="flex flex-col">
        <label className="font-bold">Due date :</label>
        <input
          type="date"
          htmlFor="due"
          id="due"
          // value="date"
          name="due"
          className="block w-full h-10 p-4 border border-gray-300 rounded-md shadow-sm"
          placeholder="due"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="sumbit"
          className="flex items-center justify-center w-3/4 h-10 font-bold text-white bg-green-600 border rounded-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const UpdateCard = ({ task, handleUpdate }) => {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => handleUpdate(event, task._id)}
    >
      <label>Uodate Task :</label>
      <input type="text" id="service" name="task" required />
      <label> Update Desc :</label>
      <input type="textarea" id="servilce" name="desc" />

      <div className="flex flex-col">
        <label className="font-bold">Update Due date :</label>
        <input
          type="date"
          htmlFor="due"
          id="due"
          // value="date"
          name="due"
          className="block w-full h-10 p-4 border border-gray-300 rounded-md shadow-sm"
          placeholder="due"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="sumbit"
          className="flex items-center justify-center w-3/4 h-10 font-bold text-white bg-green-600 border rounded-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const submit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const task = e.target.task.value;
  const desc = e.target.desc.value;
  const due = e.target.due.value;

  const response = await fetch("http://localhost:8000/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ location, task, desc, due }),
  });

  const data = await response.json;

  console.log(data);

  if (data.error) {
    console.log(data.error);
  }

  if (data.token) {
    console.log(data.token);
    // Save the token to local storage
    localStorage.setItem("token", data.token);
  }
  window.location.href = "/";
};

const handleDelete = async (taskId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8000/task/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
  window.location.reload();
};

const handleUpdate = async (event, taskId) => {
  event.preventDefault();
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8000/task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: event.target.task.value,
      desc: event.target.desc.value,
      due: event.target.due.value,
    }),
  });

  const data = await response.json();
  console.log(data);
  window.location.reload();
};

const Task = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTask = async () => {
      const response = await fetch(`http://localhost:8000/task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setTasks(data);
    };
    fetchTask();
  }, []);
  console.log(tasks);

  return (
    <div className="my-12">
      <div className="flex flex-wrap justify-center mb-20">
        {tasks?.map((task) => {
          return <TaskCard task={task} key={task._id} />;
        })}

        <div>
          <FormCard />
        </div>
      </div>
    </div>
  );
};

export default routeAuth(Task);
