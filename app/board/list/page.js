import client from "@/util/database"
import Link from "next/link";
import DelBtn from "./delBtn";

export default async function Board(){
  const db = await client.db('last_dance');
  const list = await db.collection('player').find().toArray();
  return(
    <div>
      <h3>Board <Link href="/board/new">New</Link></h3>
      {
        list.map((item, i) => 
        <div key={i}>
          <Link href={`/board/detail/${item._id.toString()}`}>
            {item.name}
          </Link>
          <DelBtn id={item._id.toString()}/>
        </div>)
      }
    </div>
  ) 
}