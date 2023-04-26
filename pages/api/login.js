import mysql2 from 'mysql2/promise';
import  { withIronSession  } from 'next-iron-session';


export default withIronSession(handler, {
    cookieName: "myapp_session",
    password: process.env.COOKIE_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
  
async function handler(req, res) {
    if (req.method === 'POST') {
        const { Cin } = req.body;
        const connection = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        const [rows] = await connection.execute('SELECT * FROM users WHERE cin = ?',[Cin]);
        await connection.end();
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = rows[0];
        
        req.session.set('user', user);
        await req.session.save();
        res.status(200).json(user);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}