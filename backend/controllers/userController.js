import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user/set token
//route POST  api/users/auth
//@access Public
const authUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid Credentials" });
		}

		if (await user.matchPassword(password)) {
			generateToken(res, user._id);

			return res.status(201).json(user);
		} else {
			return res
				.status(403)
				.json({ message: "password does not match or try again" });
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "error occured", error });
	}
};

//@desc Register a new user
//route POST  api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email: email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({ name, email, password });

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({ user });
	} else {
		res.status(400);
		throw new Error("Invalid user Data");
	}
});

//@desc Logout user
//route POST  api/users/logout
//@access Public
const logoutUsers = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", { http: true, expires: new Date(0) });
	res.status(200).json({ message: "User logged out" });
});

//@desc Get user profile
//route GET  api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};
	res.status(200).json(user);
});

//@desc Update user profile
//route PUT  api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		return res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	authUser,
	registerUser,
	logoutUsers,
	getUserProfile,
	updateUserProfile,
};
