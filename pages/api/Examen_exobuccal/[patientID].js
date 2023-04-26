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

    const [rows, fields] = await connection.execute(
        "SELECT extraoral_exam.*, users.fname AS DoctorFirstName , users.lname AS DoctorLastName FROM extraoral_exam INNER JOIN users ON extraoral_exam.DoctorID = users.cin WHERE extraoral_exam.PatientID = ? ORDER BY extraoral_exam.DiagnosisDate DESC",
      [patientID]
    );

    await connection.end();

    if (rows.length === 0) {
      res.status(404).json({ message: ' extraoral exam not found' });
      return;
    }

    // Otherwise, return the medical history data
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}
