const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize Express App
const app = express();

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "assets")));

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read tasks from tasks.json
const readTasks = () => {
  const data = fs.readFileSync("./tasks.json", "utf-8");
  return JSON.parse(data);
};

// Write tasks to tasks.json
const writeTasks = (tasks) => {
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));
};

// Routes
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks); // Return tasks as JSON
});

app.post("/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1, // Incremental ID
    title: req.body.title,
    description: req.body.description || "",
    status: "pending",
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask); // Respond with the created task
});

app.get("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.put("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body, // Update fields
    };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});
app.delete('/delete', (req, res) => {
    writeTasks([]); // Clear all tasks
    res.json({ message: "All tasks deleted successfully" }); // Respond with confirmation
  });

app.get("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const updatedTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  if (updatedTasks.length !== tasks.length) {
    writeTasks(updatedTasks);
    res.status(204).end(); // No content
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Serve HTML for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
