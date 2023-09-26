import client from "@/util/database"
import CommentWriter from "./commentWriter";


export default async function CommentList({parentId}){
  const db = await client.db('last_dance');
  const list = db.collection('comments').find({parentId: parentId}).toArray();
  return (
    <>
      이미 작성된 댓글 리스트<br/>
      <CommentWriter parentId={parentId}/>
    </>

  )
}