// DEPENDENCIES: Modules
const express = require("express");
const router = express.Router();

// DEPENDENCIES: Local
const Item =  require("../models/Item.js");
const itemController =  require("../controllers/itemController.js");

// ROUTES--------------------------------------------------------------

// ITEM CREATION
router.post("/add",  (request, response) => {
	itemController.addItem(request.body)
	.then(resultFromController => response.send(resultFromController));
});

// GET ALL ITEMS
router.get("/all", (request, response) => {
	itemController.getItems()
	.then(resultFromController => response.send(resultFromController));
});

// UPDATE ITEM
router.put("/update/:itemId", (request, response) => {
	itemController.updateItem(request.params.itemId, request.body)
	.then(resultFromController => response.send(resultFromController));
});


// DELETE ITEM
router.delete("/delete/:itemId", (request, response) => {
	itemController.deleteItem(request.params.itemId, request.body)
	.then(resultFromController => response.send(resultFromController));
});


// EXPORT ITEM ROUTES
module.exports = router;
