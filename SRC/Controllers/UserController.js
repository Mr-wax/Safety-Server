import User from "../Models/UserModel.js";

export const updateEmergencyContacts = async (req, res) => {
    try {
      const userId = req.user._id;
      const { emergencyContacts } = req.body;
  
      if (!Array.isArray(emergencyContacts)) {
        return res.status(400).json({ message: "Contacts should be an array" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { emergencyContacts },
        { new: true, runValidators: true }
      ).select("-password");
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Emergency contacts updated",
        contacts: updatedUser.emergencyContacts
      });
    } catch (error) {
      console.error("Update contacts error:", error);
      res.status(500).json({ message: "Server error updating contacts" });
    }
  };

export const getCurrentUser = async (req, res) => {
  try {
    // req.user is populated by protectRoute
    const currentUser = await User.findById(req.user._id).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: currentUser });
  } catch (error) {
    console.error("Fetch current user error:", error);
    res.status(500).json({ message: "Server error fetching user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch user by id error:", error);
    res.status(500).json({ message: "Server error fetching user" });
  }
};
  