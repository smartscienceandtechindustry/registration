// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("wendi");
  const users = db.collection("users");
  const id = req.body.id;

  const dbUser1 = await users.findOne({ _id: new ObjectId(id) });

  if (dbUser1) {
    const dbUser = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { sign: true } }
    );

    res.status(200).json({ status: true, user: dbUser1 });
  }
  res.status(200).json({ status: false });
}
