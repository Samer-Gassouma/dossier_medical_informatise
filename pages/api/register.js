import mysql2 from 'mysql2/promise';

export default async function handler(req, res) {
    const {
        cin,
        FirstName,
        LastName,
        Phone,
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

    const [rows0] = await connection.execute('SELECT * FROM users WHERE cin  = ?',[cin]);
    if (rows0.length === 0) {
        const [rows , fields] = await connection.execute(
            "INSERT INTO users (cin,fname,lname,phone) VALUES (?,?,?,?)",
            [
                cin,
                FirstName,
                LastName,
                Phone
            ]
        )
        if (rows.affectedRows === 1) {
            res.status(200).json({ message: 'User Added' });
        }
    } else {
        res.status(401).json({ message: 'cin Already Exist' });
    }

    await connection.end();
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
}

}
