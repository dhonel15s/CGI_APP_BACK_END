// DEPENDENCIES: Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// DEPENDENCIES: ROUTES
const userRoutes = require("./routes/userRoutes.js")
const itemRoutes = require("./routes/itemRoutes.js")


// CREATE APPLICATION
const app = express();

// MONGO-DB CONNECTION
mongoose.connect("mongodb+srv://admin:admin1234@cgi-app.ag7w1il.mongodb.net/CGI-APP-API?retryWrites=true&w=majority", {
	useNewUrlParser:true, 
	useUnifiedTopology:true
});

//PROMPT MESSAGE: DB Connection is successful
mongoose.connection.once("open", () => 
	console.log(`Now connected to MongoDB: CGI-APP-API`));

// ADDITIONAL SETTINGS
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use("/users", userRoutes);
app.use("/items", itemRoutes);



// APP LISTENER
app.listen(process.env.PORT || 4000, () =>{
	console.log(`API is now online on port ${process.env.PORT || 4000}`)
}); 
