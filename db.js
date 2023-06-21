import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://fbua1:Universidad.2021@cluster0.lzyczz0.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  // Try
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;
