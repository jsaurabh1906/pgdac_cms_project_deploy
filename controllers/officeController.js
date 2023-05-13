import officeModel from "../models/officeModel.js";
// add office
export const addOfficeController = async (req, res) => {
  try {
    const office = req.body;
    const newOffice = new officeModel(office);

    await newOffice.save();
    res.status(201).send({
      success: true,
      message: "Office Created Successfully",
      newOffice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Office",
    });
  }
};

//getOfficesController
export const getOfficesController = async (request, response) => {
  try {
    const offices = await officeModel.find();
    response.status(200).json(offices);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//get office by id
export const getOfficeByIdController = async (request, response) => {
  try {
    const office = await officeModel.findById(request.params.id);
    response.status(200).json(office);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//delete office id

export const deleteOfficeController = async (request, response) => {
  try {
    await officeModel.deleteOne({ _id: request.params.id });
    response.status(201).json("Office deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const updateOfficeController = async (request, response) => {
  let office = request.body;

  const updateOffice = new officeModel(office);
  try {
    await officeModel.updateOne({ _id: request.params.id }, updateOffice);
    response.status(201).json(updateOffice);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
