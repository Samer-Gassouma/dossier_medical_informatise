import mysql2 from "mysql2/promise";

export default async (req, res) => {
  const  searchQuery  = req.body.searchQuery;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  res.setHeader("Content-Type", "application/json");
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [rows,fields] = await connection.execute(
      "SELECT * FROM users WHERE cin  = ?",
      [searchQuery]
    );

    
      res.status(200).json(rows);
    
    await connection.end();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
