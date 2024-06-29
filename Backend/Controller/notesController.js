import Notes from "../model/Notes.js";

export const fetchedAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId });
    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const addNotes = async (req, res) => {
  try {
    const { title, tags, description } = req.body;
    if (title && tags && description) {
      const newNotes = await Notes({
        title,
        tags,
        description,
        user: req.userId,
      });
      const savedNotes = await newNotes.save();
      res.status(200).json({ message: "Add Notes Successfully", savedNotes });
    } else {
      return res.status(400).json({ message: "All Fields are required !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !" });
  }
};

export const updateNotes = async (req, res) => {
  const { title, tags, description } = req.body;
  const { id } = req.params;
  try {
    const notes = await Notes.findById({ _id: id });
    if (!notes) {
      return res.status(400).json({ message: "Not Found" });
    }
    // console.log(notes.user.toString() !== req.userId);
    if (notes.user.toString() !== req.userId) {
      return res.status(400).json({ message: "Not Allowed " });
    }
    const updateNotes = await Notes.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          description,
          tags,
        },
      },
      {
        new: true,
      }
    );
    res.json({ updateNotes, message: "Update Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    let notes = await Notes.findById({ _id: id });
    if (!notes) {
      return res.status(400).json({ message: "Not Found" });
    }
    if (notes.user.toString() !== req.userId) {
      return res.status(400).json({ message: "Not Allowed " });
    }
    notes = await Notes.findByIdAndDelete({ _id: id });
    res.json({ message: "Deleted Notes Successfully!", notes });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getOneNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Notes.findById({ _id: id });
    if (notes) {
      res
        .status(200)
        .json({ message: "Fetched One Notes Successfully !!", notes });
    } else {
      return res.status(400).json({ message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
