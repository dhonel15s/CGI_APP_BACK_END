// DEPENDENCIES: Modules
const bcrypt = require("bcrypt");
const auth = require("../auth.js");


// DEPENDENCIES: Local
const Item = require("../models/Item.js");


// FUNCTIONS-----------------------------------------------------------------------

// ITEM CREATION: ADMIN ONLY
module.exports.addItem = async (requestBody) => {

	let newItem = new Item({
		name: requestBody.name,
		description: requestBody.description,
		reason: requestBody.reason,
		targetDate: requestBody.targetDate,
		completedDate: requestBody.completedDate
	})

	return newItem.save()
	.then((newItem, error) => {
		if (error) {
			return {
				status: false,
				message: `Error encountered during adding of item.`
			}
		}else{
			return {
				status: true,
				message: `Item successfully added.`,
				details: newItem
			}
		}
	});
	
};


// GET ALL ITEMS
module.exports.getItems = () => {

	return Item.find({})
	.then(result => {
		return {
			itemList: result
		}
	})

};

// GET SPECIFIC ITEM
module.exports.getItemDetails = (itemId) => {

	return Item.findById(itemId)
	.then(result => {
		if(result == null){
			return {
				status: false,
				message: `Item not found.`,
				details: result
			}
		}else{
			return {
				status: true,
				message: `Item found.`,
				details: result
			}
		}
	});
};


// UPDATE ITEM
module.exports.updateItem = (itemId, newData) => {

	return Item.findByIdAndUpdate(itemId, {
		name: newData.name,
		description: newData.description,
		reason: newData.reason,
		targetDate: newData.targetDate,
		completedDate: newData.completedDate
	})
	.then((updatedItem, error) => {
		if (error) {
			return {
				status: false,
				message:`Failed to update item.`
			}
		}else{
			return {
				status: true,
				message: `Item successfully updated.`
			}
		}
	})

};


// DELETE ITEM
module.exports.deleteItem = (itemId) => {

	return Item.findByIdAndDelete(itemId)
	.then((deletedItem, error) => {
		if (error) {
			return {
				status: false,
				message:`Failed to delete item.`
			}
		}else{
			return {
				status: true,
				message: `Item successfully deleted.`
			}
		}
	})

};