import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    
  const patientID = req.query.patientID;
    
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Query the database for the medical history of the given patient ID
    const [rows, fields] = await connection.execute(
        "SELECT medicalhistory.*, users.fname AS DoctorFirstName , users.lname AS DoctorLastName FROM medicalhistory INNER JOIN users ON medicalhistory.DoctorID = users.cin WHERE medicalhistory.PatientID = ? ORDER BY medicalhistory.DiagnosisDate DESC",
      [patientID]
    );

    // Close the database connection
    await connection.end();

    // If no medical history is found, return a 404 error
    if (rows.length === 0) {
      res.status(404).json({ message: 'Medical history not found' });
      return;
    }

    // Otherwise, return the medical history data
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}
