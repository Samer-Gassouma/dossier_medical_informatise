
export default function handler(req, res) {
    const { action, patientID } = req.body;

    console.log(`Action: ${action}, Patient ID: ${patientID}`);

    res.status(200).send("Log received");
  }
  