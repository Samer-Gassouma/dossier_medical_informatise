import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const {
        patientCardNb,
        DoctorID,
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

    const [rows,fields] = await connection.execute(`
    INSERT INTO teeth (patient_id,tooth_number, tooth_condition) 
    VALUES 
        (?,1, ''), 
        (?,2, ''), 
        (?,3, ''), 
        (?,4, ''), 
        (?,5, ''), 
        (?,6, ''), 
        (?,7, ''), 
        (?,8, ''), 
        (?,9, ''), 
        (?,10, ''), 
        (?,11, ''), 
        (?,12, ''), 
        (?,13, ''), 
        (?,14, ''), 
        (?,15, ''), 
        (?,16, ''), 
        (?,17, ''), 
        (?,18, ''), 
        (?,19, ''), 
        (?,20, ''), 
        (?,21, ''), 
        (?,22, ''), 
        (?,23, ''), 
        (?,24, ''), 
        (?,25, ''), 
        (?,26, ''), 
        (?,27, ''), 
        (?,28, ''), 
        (?,29, ''), 
        (?,30, ''), 
        (?,31, ''), 
        (?,32, '');
`, Array(32).fill(patientCardNb));



    if (rows.affectedRows > 0)  {
        res.status(200).json({ message: 'Teeth Loged Added' });
        
    }
    
    await connection.end();
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
}
}