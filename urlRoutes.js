import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/url.js";

const router = express.Router();

// create short url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  const shortId = nanoid(6);

  const newUrl = await Url.create({
    longUrl,
    shortId,
  });

  res.json({
    shortUrl: `${process.env.BASE_URL}/${shortId}`,
  });
});

// redirect short URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const urlDoc = await Url.findOne({ shortId });

  if (!urlDoc) return res.status(404).json({ message: "URL not found" });

  urlDoc.clicks++;
  await urlDoc.save();

  res.redirect(urlDoc.longUrl);
});

export default router;
