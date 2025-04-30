export const updateEmergencyContacts = async (req, res) => {
    try {
      const userId = req.user._id;
      const { emergencyContacts } = req.body;
  
      if (!Array.isArray(emergencyContacts)) {
        return res.status(400).json({ message: "Contacts should be an array" });
      }
  
      const user = await user.findByIdAndUpdate(
        userId,
        { emergencyContacts },
        { new: true }
      );
  
      res.status(200).json({
        message: "Emergency contacts updated",
        contacts: user.emergencyContacts
      });
    } catch (error) {
      console.error("Update contacts error:", error);
      res.status(500).json({ message: "Server error updating contacts" });
    }
  };
  