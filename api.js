const express = require("express");
const TodoItem = require("./Models/todo");
const router = express.Router();

// Create a new to-do item
router.post("/todos", async (req, res) => {
  console.log(req.body);
  try {
    const todo = new TodoItem(req.body);
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Could not create a new To-Do item.' });
  }
});

// Fetch all to-do items
router.get("/todos", async (req, res) => {
  try {
    const todos = await TodoItem.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve to-do items." });
  }
});

// Delete a to-do item
router.delete("/todos/:id", async (req, res) => {
  await TodoItem.deleteOne({ _id: req.params.id });
  res.json({ message: "To-do item deleted." });
});

module.exports = router;
