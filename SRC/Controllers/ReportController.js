// controllers/report/createReport.js

import Report from '../Models/ReportModel.js';

export const createReport = async (req, res) => {
  const { type, description, location, media, anonymous } = req.body;

  try {
    const report = await Report.create({
      user: anonymous ? null : req.user._id,
      type,
      description,
      location,
      media,
      anonymous
    });

    res.status(201).json({ message: 'Incident report submitted', report });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report', error });
  }
};
