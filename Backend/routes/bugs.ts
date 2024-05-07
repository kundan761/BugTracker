import express from "express";
import { Bug } from "../model/bugModel";

const bugRouter = express.Router();

// Create a bug
bugRouter.post("/bugs", async (req, res) => {
  try {
    const newBug = new Bug(req.body);
    await newBug.save();
    res.status(201).json("A new bug is Added");
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bugs
bugRouter.get("/bugs", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get bug details by ID
bugRouter.get("/bugs/:id", async (req, res) => {
  const bugId = req.params.id;

  try {
    const bug = await Bug.findById(bugId);
    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }
    res.status(200).json({ bug });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update bug details by ID
bugRouter.put('/bugs/:id', async (req, res) => {
    const bugId = req.params.id;
    const { title, description, source, severity } = req.body;
  
    try {
      const bug = await Bug.findByIdAndUpdate(bugId,{ title, description, source, severity },{ new: true });
  
      if (!bug) {
        return res.status(404).json({ error: 'Bug not found' });
      }
  
      res.status(200).json( `BUG with this id ${bugId} is updated` );
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete bug by ID
bugRouter.delete('/bugs/:id', async (req, res) => {
    const bugId = req.params.id;
  
    try {
      const bug = await Bug.findByIdAndDelete(bugId);
  
      if (!bug) {
        return res.status(404).json({ error: 'Bug not found' });
      }
  
      res.status(200).json(`Bug deleted successfully with bug id ${bugId}` );
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default bugRouter;
