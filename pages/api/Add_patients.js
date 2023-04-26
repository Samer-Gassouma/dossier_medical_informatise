import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const {
        patientCardNb,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phone,
    } = req.body
    if(req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    try{ 
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }); 
    const [rows0] = await connection.execute('SELECT * FROM patient WHERE PatientID  = ?',[patientCardNb]);
    if (rows0.length === 0) {
        const [rows , fields] = await connection.execute(
            "INSERT INTO patient (PatientID,FirstName,LastName,DateOfBirth,Gender,Address,PhoneNumber) VALUES (?,?,?,?,?,?,?)",
            [
                patientCardNb,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                address,
                phone
            ]
        )
        if (rows.affectedRows === 1) {
            
            res.status(200).json({ message: 'Patient Added' });
        }
        
    } else {
        res.status(401).json({ message: 'patientCardNb Already Exist' });
    }
    await connection.end();

} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
}
  

}
