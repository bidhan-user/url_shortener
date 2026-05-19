import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: "longUrl is required" });
    }

    const shortId = nanoid(6);
    const urlDoc = await Url.create({ longUrl, shortId });

    return res.status(201).json({
      message: "Short URL created successfully",
      shortUrl: `${process.env.BASE_URL}/${urlDoc.shortId}`,
      data: urlDoc
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to shorten URL", error: error.message });
  }
});

router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).json({ message: "URL not found" });
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.longUrl);
  } catch (error) {
    return res.status(500).json({ message: "Redirect failed", error: error.message });
  }
});

export default router;
