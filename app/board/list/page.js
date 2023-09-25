import client from "@/util/database"
import Link from "next/link";

export default async function Board(){
  const db = await client.db('last_dance');
  const list = await db.collection('player').find().toArray();
  console.log(list);
  return(
    <div>
      <h3>Board <Link href="/board/new">New</Link></h3>
      {
        list.map((item, i) => 
        <div key={i}>
          <Link href={`/board/detail/${item._id.toString()}`}>{item.name}</Link>
        </div>)
      }
    </div>
  ) 
}