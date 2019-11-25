const express = require("express");
const router = express.Router();
const controller = require("./controller/controller.js")
//GET
router.get("/", controller.home);
router.get("/scrape", controller.scrape);
router.get("/article/:id", controller.getOne);
router.get("/saved", controller.saved);
router.get("/clear", controller.clear);
router.get("/notearchive", controller.notearchive)
router.get("/notearchive/:id", controller.getoldnotes)

//POST
router.post("/postnote/:id", controller.postNote);
router.post("/save/:id", controller.save);
router.post("/delete/:id", controller.delete);
router.post("/clearnotes/:id", controller.clearNotes)


module.exports = router;    