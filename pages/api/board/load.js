import client from "@/util/database"
import { ObjectId } from "mongodb";
export default async function Delete(req, res){
  const id = JSON.parse(req.body).id;
  const db = await client.db('last_dance');
  const result = await db.collection('player').findOne({_id: new ObjectId(id)})
  return res.status(200).json(result);
}