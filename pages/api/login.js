// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("wendi");
  const users = db.collection("users");
  const id = req.body.id;

  console.log("user");
  try {
    const dbUser1 = await users.findOne({ _id: new ObjectId(id) });
    if (dbUser1) {
      if (dbUser1.sign) {
        res.status(200).json({ status: true, login: true, user: dbUser1 });
        console.log("sign");
      } else {
        try {
          const dbUser = await users.updateOne(
            { _id: new ObjectId(id) },
            { $set: { sign: true } }
          );
          console.log("sign out");

          res.status(200).json({ status: true, login: false, user: dbUser1 });
        } catch {
        } finally {
          res.status(200).json({ status: false });
        }
      }
    } else {
      res.status(200).json({ status: false });
    }
  } catch {
  } finally {
    res.status(200).json({ status: false });
  }
}
