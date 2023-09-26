import client from "@/util/database";

export default async function handler(req, res){
  const parentId = JSON.parse(req.body).parentId
  const db = await client.db('last_dance');
  const result = await db.collection('comments').find({parentId: parentId}).toArray();
  return res.status(200).json(result)
}