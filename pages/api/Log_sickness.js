import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const {
        patientCardNb,
        sickness,
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

    sickness.forEach(async (sickness) => {
        if(sickness !== "other"){
            const [rows,fields] = await connection.execute(`Insert into patient_sickness (sickness, PatientID) values (?,?)`, [sickness, patientCardNb]);
        }
    });


        res.status(200).json({ message: 'Teeth Loged Added' });
        
    
    
    await connection.end();
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
}
}