import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  const db = await client.db('last_dance');
  const result = await db.collection('player').updateOne({_id:new ObjectId(req.body.id)},
  {$set:{
    name: req.body.name,
    subject: req.body.subject,
    career: req.body.career,
    img: req.body.img,
  }}
  )
  res.redirect(302, `/board/detail/${req.body.id}`);
}