const express = require("express");
const router = express.Router();
const search = require("../utils/search");

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/result", async function (req, res) {
  const q = req.body.query;
  if (!q) return res.status(400).json({ error: "empty query sent" });

  // replace all 3 types of line breaks with a dot
  // Replace all multiple white spaces with single space
  // Replace all multiple dots with single dot
  // separate all sentences of the paragraph
  // split into array of all sentences of paragraph
  const tosearch = q
    .replace(/(\r\n|\n|\r)/gm, ".")
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|");
  console.log("\n\n", tosearch);

  var length = tosearch.length;
  if (length > 100) {
    return res.status(400).json({ error: "Max sentences limit crossed!" });
  }
  // contains all results
  var result = [];
  // count of total number of sentences, and of plagiarsed ones
  var count = {
    total: length,
    plagiarised: 0,
  };

  // iterate over every sentence, find its source, and push to results array
  for (let i = 0; i < length; i++) {
    const currQuery = tosearch[i];
    const a = await search(currQuery);
    if (a.length > 0) {
      result.push({ text: currQuery, url: a[0].url });
      count.plagiarised += 1;
    } else result.push({ text: currQuery, url: null });
  }
  // render result page with found results and counts
  res.render("result", { result: result, count: count });
});

module.exports = router;
