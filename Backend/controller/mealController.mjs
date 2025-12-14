import Meal from "../models/mealModel.mjs";

// Create Meal - WITH USER
export const createMeal = async (req, res) => {
  try {
    // ✅ Logged-in user ki ID
    const userId = req.user.checkUser?._id || req.user._id;

    console.log("🍽️ Creating meal for user:", userId);

    const meal = new Meal({
      ...req.body,
      user: userId, // ✅ User ID add karo
    });

    const savedMeal = await meal.save();

    res.status(201).json({
      success: true,
      message: "Meal added successfully",
      meal: savedMeal,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all meals - ONLY USER'S MEALS
export const getAllMeals = async (req, res) => {
  try {
    // ✅ Sirf logged-in user ke meals
    const userId = req.user.checkUser?._id || req.user._id;

    console.log("🔍 Fetching meals for user:", userId);

    const meals = await Meal.find({ user: userId }).sort({ date: -1 });

    console.log("✅ Found meals:", meals.length);

    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get meals by user - Ab ye function redundant hai, but keep kar sakte ho
export const getUserMeals = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    const meals = await Meal.find({ user: userId }).sort({ date: -1 });

    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single meal - WITH SECURITY
export const getMeal = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna meal get ho
    const meal = await Meal.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!meal)
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });

    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update meal - WITH SECURITY
export const updateMeal = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna meal update ho
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!meal)
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });

    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update meal status - WITH SECURITY
export const updateMealStatus = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna meal ka status update ho
    const meal = await Meal.findOne({
      _id: req.params.id,
      user: userId,
    });

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

// Delete meal - WITH SECURITY
export const deleteMeal = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna meal delete ho
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!meal)
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });

    res
      .status(200)
      .json({ success: true, message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
