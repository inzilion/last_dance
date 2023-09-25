import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail({params}){
  const db = await client.db('last_dance');
  const profile = await db.collection('player').findOne({_id: new ObjectId(params.id)})
  console.log(profile.name)
  return(
    <>
      <div><img style={{width:"200px"}} src={profile.img ?? "https://w7.pngwing.com/pngs/188/501/png-transparent-computer-icons-anonymous-anonymity-anonymous-face-monochrome-head-thumbnail.png" }/></div>
      <div>이름 : {profile.name} </div>
      <div>종목 : {profile.subject} </div>
      <div>경력 : {profile.career ?? ""} </div>
    </>
  )
}