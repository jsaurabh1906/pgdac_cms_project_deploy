import userModel from "../models/userModel.js";

export const addUserController = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new userModel(user);

    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crreating user",
    });
  }
};

// Get all users
export const getUsers = async (request, response) => {
  try {
    const users = await userModel.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get a user by id
export const getUserById = async (request, response) => {
  try {
    const user = await userModel.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Save data of edited user in the database
export const editUser = async (request, response) => {
  let user = request.body;

  const editUser = new userModel(user);
  try {
    await userModel.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// deleting data of user from the database
export const deleteUser = async (request, response) => {
  try {
    await userModel.deleteOne({ _id: request.params.id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

///// ADD dELIVERYvALET cONTROLLER
export const addDriverController = async (req, res) => {
  try {
    const driver = req.body;
    const newDriver = new userModel(driver);

    await newDriver.save();
    res.status(201).send({
      success: true,
      message: "Driver Created Successfully",
      newDriver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crreating Driver",
    });
  }
};

//get all drivers/deliveryValets
export const getDriversController = async (request, response) => {
  try {
    const drivers = await userModel.find({ role: "deliveryValet" });
    response.status(200).json(drivers);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//getDriverByIdController
export const getDriverByIdController = async (request, response) => {
  try {
    const driver = await userModel.findById(request.params.id);
    response.status(200).json(driver);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//deleteDriverController
export const deleteDriverController = async (request, response) => {
  try {
    await userModel.deleteOne({ _id: request.params.id });
    response.status(201).json("Driver deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

//editDriverController
export const editDriverController = async (request, response) => {
  let driver = request.body;

  const editDriver = new userModel(driver);
  try {
    await userModel.updateOne({ _id: request.params.id }, editDriver);
    response.status(201).json(editDriver);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
