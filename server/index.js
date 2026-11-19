const express = require("express");
const app = express();
const PORT = 3000;

const notes = [
  { id: 1, title: "First note", content: "Hello", folder_id: 1 },
  { id: 2, title: "Second note", content: "World", folder_id: 1 },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a Server for Scribble!");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const note = notes.find((note) => note.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(note);
});

app.post("/notes", (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
    folder_id: req.body.folder_id,
  };

  notes.push(newNote);
  
  res.status(201).json({ message: "New note created.", note: newNote });
});

app.patch("/notes/:id", (req, res) => {
    const note = notes.find((note) => note.id === Number(req.params.id));

    if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

    note.title = req.body.title;
    note.content =req.body.content;

    res.json(note);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
