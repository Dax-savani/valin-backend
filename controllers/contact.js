const express = require("express");
const Contact = require("../models/contact");
const contactRouter = express.Router();

contactRouter.post("/", async (req, res) => {
    try {
        const {name, surname, contact, company, email, request, your_message} = req.body;

        const savedRequest = await Contact.create({name, surname, contact, company, email, request, your_message});

        res.status(201).json(savedRequest);
    } catch (error) {
        console.error("Error creating request:", error.message);
        res.status(500).json({message: "Failed to create request", error: error.message});
    }
});

contactRouter.get("/", async (req, res) => {
    try {
        const requests = await Contact.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error.message);
        res.status(500).json({message: "Failed to fetch requests", error: error.message});
    }
});

contactRouter.get("/:id", async (req, res) => {
    try {
        const request = await Contact.findById(req.params.id);
        if (!request) {
            return res.status(404).json({message: "Request not found"});
        }
        res.status(200).json(request);
    } catch (error) {
        console.error("Error fetching request:", error.message);
        res.status(500).json({message: "Failed to fetch request", error: error.message});
    }
});

contactRouter.put("/:id", async (req, res) => {
    try {
        const updatedRequest = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedRequest) {
            return res.status(404).json({message: "Request not found"});
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error("Error updating request:", error.message);
        res.status(500).json({message: "Failed to update request", error: error.message});
    }
});

contactRouter.delete("/:id", async (req, res) => {
    try {
        const deletedRequest = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({message: "Request not found"});
        }
        res.status(200).json({message: "Request deleted successfully"});
    } catch (error) {
        console.error("Error deleting request:", error.message);
        res.status(500).json({message: "Failed to delete request", error: error.message});
    }
});

module.exports = contactRouter;
