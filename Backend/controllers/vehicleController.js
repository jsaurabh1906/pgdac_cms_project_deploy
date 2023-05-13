import vehicleModel from "../models/vehicleModel.js";
import slugify from "slugify";

export const createVehicleController = async (req, res) => {
  try {
    const { vehicleType, model, chassisNumber, plateNumber } = req.fields;

    //alidation
    switch (true) {
      case !vehicleType:
        return res.status(500).send({ error: "vehicleType is Required" });
      case !model:
        return res.status(500).send({ error: "model is Required" });
      case !chassisNumber:
        return res.status(500).send({ error: "chassisNumber is Required" });
      case !plateNumber:
        return res.status(500).send({ error: "plateNumber is Required" });
    }

    const vehicles = new vehicleModel({
      ...req.fields,
      slug: slugify(plateNumber),
    });

    await vehicles.save();
    res.status(201).send({
      success: true,
      message: "vehicle Created Successfully",
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing vehicle",
    });
  }
};

//get all vehicles

export const getVehicleController = async (req, res) => {
  try {
    const vehicles = await vehicleModel
      .find({})

      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: vehicles.length,
      message: "ALlvehicles ",
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting vehicles",
      error: error.message,
    });
  }
};

// get single vehicle
export const getSingleVehicleController = async (req, res) => {
  try {
    const vehicle = await vehicleModel.findOne({
      //plateNumber: req.params.plateNumber,
      _id: req.params._id,
    });

    res.status(200).send({
      success: true,
      message: "Single vehicle Fetched",
      vehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single vehicle",
      error,
    });
  }
};

//delete controller
export const deleteVehicleController = async (req, res) => {
  try {
    await vehicleModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "vehicle Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting vehicle",
      error,
    });
  }
};

//upate vehiclea
export const updateVehicleController = async (req, res) => {
  try {
    const { vehicleType, model, color, chassisNumber, plateNumber } =
      req.fields;

    //alidation
    switch (true) {
      case !vehicleType:
        return res.status(500).send({ error: "vehicleType is Required" });
      case !model:
        return res.status(500).send({ error: "model is Required" });
      case !color:
        return res.status(500).send({ error: "color is Required" });
      case !chassisNumber:
        return res.status(500).send({ error: "chassisNumber is Required" });
      case !plateNumber:
        return res.status(500).send({ error: "plateNumber is Required" });
    }

    const vehicles = await vehicleModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(plateNumber) },
      { new: true }
    );

    await vehicles.save();
    res.status(201).send({
      success: true,
      message: "vehicle Updated Successfully",
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update vehicle",
    });
  }
};
