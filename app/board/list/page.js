import client from "@/util/database"
import Link from "next/link";
import DelBtn from "./delBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Board(){
  const db = await client.db('last_dance');
  const list = await db.collection('player').find().toArray();
  const session = await getServerSession(authOptions);
  
  return(
    <div>
      <h3>Board {session ? <Link href="/board/new">New</Link> : ""}</h3>
      {
        list.map((item, i) => 
        <div key={i}>
          <Link href={`/board/detail/${item._id.toString()}`}>
            {item.name}
          </Link>
          { item.author?.email === session?.user.email ||
            session?.user.email === process.env.ADMIN
            ? <DelBtn id={item._id.toString()}/> : ""}
        </div>)
      }
    </div>
  ) 
}