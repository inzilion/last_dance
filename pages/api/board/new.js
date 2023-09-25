import client from "@/util/database";
export default async function handler(req, res){
  const db = await client.db('last_dance');
  const result = await db.collection('player').insertOne(req.body)
  res.redirect(302, "/board/list");
}