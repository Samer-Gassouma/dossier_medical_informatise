import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const medicalHistory = {
      PatientID: req.body.PatientID,
      DoctorID: req.body.DoctorID,
      Note: req.body.Note,
    };

    const [rows, fields] = await connection.execute(
      'INSERT INTO extraoral_exam (`PatientID`, `DoctorID`, `Note`) VALUES (?, ?, ?)',
      [medicalHistory.PatientID, medicalHistory.DoctorID, medicalHistory.Note]
    );
    

    await connection.end();

    if (rows.length === 0) {
      res.status(404).json({ message: 'Medical history not found' });
      return;
    }

    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

