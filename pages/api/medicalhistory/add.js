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
          PatientID: req.body.PatientID ,
          DoctorID: req.body.DoctorID ,
          MedicalCondition: req.body.MedicalCondition ,
          Notes: req.body.Notes ,
        };
        console.log(medicalHistory);
        
        const [rows, fields] = await connection.execute(
          'INSERT INTO medicalhistory (`PatientID`, `DoctorID`, `MedicalCondition`, `Notes`) VALUES (?, ?, ?, ?)',
          [medicalHistory.PatientID, medicalHistory.DoctorID, medicalHistory.MedicalCondition, medicalHistory.Notes]
        );
        
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