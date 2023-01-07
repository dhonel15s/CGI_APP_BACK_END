// DEPENDENCIES: Modules
const bcrypt = require("bcrypt");
const auth = require("../auth.js");


// DEPENDENCIES: Local
const User = require("../models/User.js");

// FUNCTIONS------------------------------------------------------------------------
// USER REGISTRATION
module.exports.registerUser = async (requestBody) => {

	let existingAccount = await User.find({email : requestBody.email});

	if (existingAccount.length === 0) {

		let newUser = new User({
			email : requestBody.email,
			password : bcrypt.hashSync(requestBody.password, 10),
		})

		return newUser.save()
		.then((newUser, error) => {
			if(error){
				return {
					status: false,
					message: `Error occurred while registering new user.`
				}
			}else{
				return {
					status: true,
					message: `New user successfully registered.`
				};
			}
		});
	}else{
		return {
			status: false,
			isExisting: true,
			message: `Sorry, the email (${requestBody.email}) is already used in an existing account.`
		};

	}

};


// USER LOGIN
module.exports.loginUser = (requestBody) =>{

	return User.findOne({email : requestBody.email})
	.then(result => {

		if (result == null) {
			return {
				status: false,
				message: `Sorry. User not found. Please register first.`
			};
		}else{
			const isPasswordCorrect = bcrypt.compareSync(requestBody.password, result.password)

			if(isPasswordCorrect){
				
				
				// CREATE ACCESS TOKEN
				let access = auth.createAccessToken(result);
				return {
					status: true,
					message: `Welcome to Dhonel Almero's resume.`,
					userId: result.id,
					accessToken: access
				};
			}else{
				return {
					status: false,
					message: `Sorry. Email and Password does not match.`
				};
			}
		}
	});

};


// USER DETAILS: SINGLE
module.exports.getUserDetails = (userId) => {

	// CHECK PARAMS ID IF VALID
	if(userId.length === 24){

		// IF VALID, SEARCH IN DATABASE
		return User.findById(userId)
		.then(result => {
			// IF ID HAS NO MATCH
			if (result === null) {
				return {
					status: false,
					message: `User not found.`
				};
			// IF ID HAS A MATCH
			}else{
				result.password = ``;
				return {
					status: true,
					message: `Account Details found:`,
					details: result
				}
			}
		});
	// IF PARAMS ID IS INVALID
	}else{
		let message = Promise.resolve(`The userID in url is invalid.`);

		return message.then((value) => {
			return {
				status: false,
				message: value
			};
		});

	}

};