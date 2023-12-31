import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  req.body.author = session.user;
  const db = await client.db('last_dance');
  const result = await db.collection('player').insertOne(req.body)
  res.redirect(302, "/board/list");
}