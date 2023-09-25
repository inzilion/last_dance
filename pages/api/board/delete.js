import client from "@/util/database"
import { ObjectId } from "mongodb";
import { redirect } from "next/dist/server/api-utils";
export default async function Delete(req, res){
  
  const id = req.method === "POST" ? JSON.parse(req.body).id : req.query.id
  const db = await client.db('last_dance');
  const result = await db.collection('player').deleteOne({_id: new ObjectId(id)})
  
  if(req.method === "POST")
    return res.status(200).json("OK");
  else
    return res.redirect(302, '/board/list');
}