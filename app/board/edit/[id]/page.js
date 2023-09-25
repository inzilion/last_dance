'use client'
import { useEffect, useState } from "react"

export default function Edit(props){
  const [image, setImage] = useState('');
  const [profile, setProfile] = useState('');

  const imageLoadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
  }

  useEffect(()=>{
    fetch('/api/board/load',
    {
      method: "POST",
      body: JSON.stringify({id:props.params.id})
    })
    .then(res=>res.json())
    .then(result=>{
      setProfile(result);
      setImage(result.img);
    })  
  },[])

  return(
    <div>
      <h3>선수 수정</h3>
      <form action="/api/board/edit" method="POST">
        <div><img style={{width:"200px"}} src={image}/></div>
        <div><label>사진: </label><input type="file" onChange={imageLoadHandler}/></div>
        <div><label>이름: </label><input defaultValue={profile?.name} name="name" type="text"/></div>
        <div><label>종목: </label><input defaultValue={profile?.subject} name="subject" type="text"/></div>
        <div><label>경력: </label><input defaultValue={profile?.career} name="career" type="text"/></div>
        <input type="hidden" name="img" value={image}/>
        <input type="hidden" name="id" value={props.params.id}/>
        <div><button type="submit">수정완료</button></div>
      </form>
    </div>
  )
}