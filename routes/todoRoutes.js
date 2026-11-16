import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

// CREATE TODO
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.create({
            title,
            description
        });

        res.status(201).json(todo);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// GET ALL TODOS
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();

        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// GET SINGLE TODO
router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);

    } catch (error) {
        res.status(400).json({
            message: "Invalid Todo ID"
        });
    }
});


// UPDATE TODO
router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE ALL TODOS
router.delete("/delete-all", async (req, res) => {
  try {
    await Todo.deleteMany({});

    res.status(200).json({
      message: "All todos deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// DELETE TODO BY ID
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Todo deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


export default router;