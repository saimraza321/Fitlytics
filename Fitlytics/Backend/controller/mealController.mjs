import Meal from "../models/mealModel.mjs";
export const createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    const savedMeal = await meal.save();

    res.status(201).json({
      success: true,
      message: "Meal added successfully",
      meal: savedMeal,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get meals by user
export const getUserMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.params.userId });
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update meal (general)
export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update meal status only
export const updateMealStatus = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal)
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });

    // Prevent changing status if already completed
    if (meal.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot change status of a completed meal",
      });
    }

    meal.status = req.body.status;
    await meal.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: meal,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a meal
export const deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
