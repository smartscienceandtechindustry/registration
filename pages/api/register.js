// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("wendi");
  const users = db.collection("users");
  const user = req.body;
  console.log(user);
  const dbUser = await users.insertOne({ ...user, sign: false });

  res.status(200).json({ uid: dbUser.insertedId });
}
