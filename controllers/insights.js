const express = require("express");
const Insight = require("../models/insights");
const multer = require('multer');
const {uploadFile} = require("../services/uploadFile");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const insightRouter = express.Router();

insightRouter.post("/", upload.single("insight-image"), async (req, res) => {
    try {
        const {question, answers} = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({message: "Image is required"});
        }

        const imageUrl = await uploadFile(file.buffer);

        const newInsight = await Insight.create({question, image: imageUrl, answers});
        res.status(201).json(newInsight);
    } catch (error) {
        console.error("Error creating insight:", error.message);
        res.status(500).json({message: "Failed to create insight", error: error.message});
    }
});

insightRouter.get("/", async (req, res) => {
    try {
        const insights = await Insight.find();
        res.status(200).json(insights);
    } catch (error) {
        console.error("Error fetching insights:", error.message);
        res.status(500).json({message: "Failed to fetch insights", error: error.message});
    }
});

insightRouter.get("/:id", async (req, res) => {
    try {
        const insight = await Insight.findById(req.params.id);
        if (!insight) {
            return res.status(404).json({message: "Insight not found"});
        }
        res.status(200).json(insight);
    } catch (error) {
        console.error("Error fetching insight:", error.message);
        res.status(500).json({message: "Failed to fetch insight", error: error.message});
    }
});

insightRouter.put("/:id", upload.single("insight-image"), async (req, res) => {
    try {
        const {question, answers} = req.body;
        const image = req.body["insight-image"];
        const file = req.file;
        let updatedFields = {question, answers};

        if (file) {
            const imageUrl = await uploadFile(file.buffer);
            updatedFields.image = imageUrl;
        } else if (image) {
            updatedFields.image = image;
        }

        const updatedInsight = await Insight.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            {new: true}
        );

        if (!updatedInsight) {
            return res.status(404).json({message: "Insight not found"});
        }

        res.status(200).json(updatedInsight);
    } catch (error) {
        console.error("Error updating insight:", error.message);
        res.status(500).json({message: "Failed to update insight", error: error.message});
    }
});

insightRouter.delete("/:id", async (req, res) => {
    try {
        const deletedInsight = await Insight.findByIdAndDelete(req.params.id);
        if (!deletedInsight) {
            return res.status(404).json({message: "Insight not found"});
        }
        res.status(200).json({message: "Insight deleted successfully"});
    } catch (error) {
        console.error("Error deleting insight:", error.message);
        res.status(500).json({message: "Failed to delete insight", error: error.message});
    }
});

module.exports = insightRouter;
