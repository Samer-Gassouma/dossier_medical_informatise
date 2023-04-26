import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    try {
        const connection = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        }); 
        
        const  patient_id  = req.query.p_id;
        if (!patient_id) {
            res.status(400).json({ message: 'patient_id is missing' });
            return;
        }
                  
        const [rows,fields] = await connection.execute('SELECT * FROM teeth WHERE patient_id = ?',[patient_id]);

        res.status(200).json(rows);
        await connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
