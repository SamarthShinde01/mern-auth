//@desc Auth user/set token
//route POST  api/users/auth
//@access Public
const authUser = async (req, res) => {
	res.status(200).json({ message: "Auth user" });
};

//@desc Register a new user
//route POST  api/users
//@access Public
const registerUser = async (req, res) => {
	res.status(200).json({ message: "Register user" });
};

//@desc Logout user
//route POST  api/users/logout
//@access Public
const logoutUsers = async (req, res) => {
	res.status(200).json({ message: "Logouts user" });
};

//@desc Get user profile
//route GET  api/users/profile
//@access Private
const getUserProfile = async (req, res) => {
	res.status(200).json({ message: "User Profile" });
};

//@desc Update user profile
//route PUT  api/users/profile
//@access Private
const updateUserProfile = async (req, res) => {
	res.status(200).json({ message: "Update User Profile" });
};

export {
	authUser,
	registerUser,
	logoutUsers,
	getUserProfile,
	updateUserProfile,
};
