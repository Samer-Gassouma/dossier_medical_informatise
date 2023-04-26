import mysql2 from 'mysql2/promise';

export default async (req, res) => {
    const { PatientID } = req.body;
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    res.setHeader('Content-Type', 'application/json');
    try{ 
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    const [rows] = await connection.execute('SELECT * FROM teeth WHERE patient_id  = ?', [PatientID]);
    await connection.end();

    if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }else{

        res.status(200).json(rows);
    }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};



