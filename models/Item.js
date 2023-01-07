// DEPENDENCIES
const mongoose = require("mongoose");


// ITEM SCHEMA
const itemSchema = new mongoose.Schema({
	
	name: {
		type: String,
		required: [true, "Item Name is required."]
	},

	description: {
		type: String,
		required: [true, "Item Descripion is required."]
	},

	reason: {
		type: String,
		required: [true, "Item reason is required."]
	},

	targetDate: {
		type: String,
		required: [true, "Item target date is required."]
	},

	completedDate: {
		type: String,
		required: [true, "Item completed date is required."]
	}
});


// EXPORT ITEM SCHEMA
module.exports = mongoose.model("Item", itemSchema);