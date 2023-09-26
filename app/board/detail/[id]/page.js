import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";
import CommentList from "./commentList";

export default async function Detail({params}){
  const db = await client.db('last_dance');
  const profile = await db.collection('player').findOne({_id: new ObjectId(params.id)})
  const session = await getServerSession(authOptions);
  return(
    <>
      <div><img style={{width:"200px"}} src={profile.img ?? "https://w7.pngwing.com/pngs/188/501/png-transparent-computer-icons-anonymous-anonymity-anonymous-face-monochrome-head-thumbnail.png"}/></div>
      <div>작성자 : {profile.author?.name} </div>
      <div>이름 : {profile.name} </div>
      <div>종목 : {profile.subject} </div>
      <div>경력 : {profile.career ?? ""} </div>
      {
        session && (profile.author?.email === session?.user.email)
        ?
        <div>
          <Link href={`/board/edit/${params.id}`}><button> 수정 </button></Link>
          <Link href={`/api/board/delete/?id=${params.id}`}><button> 삭제 </button></Link>
        </div>
        : ""
      }
      {
        <CommentList parentId={params.id}/>
      }
    </>
  )
}