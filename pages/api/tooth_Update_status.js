import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({ message: 'Method not allowed' });
            return;
        }

        const connection = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        const {
            teeth,
            condition,
            patientID
        }
        = req.body;


        if (!teeth || !condition || !patientID) {
            res.status(400).json({ message: 'Missing parameters' });
            return;
        }

        teeth.forEach(async (t) => {
            const [rows,fields] = await connection.execute('UPDATE teeth SET tooth_condition = ? WHERE patient_id = ? AND tooth_number = ?',[condition,patientID,t]);
            res.status(200).json(rows);
        });
        await connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}