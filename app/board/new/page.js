'use client'
import { useState } from "react"

export default function New(){
  const [image, setImage] = useState(null);

  const imageLoadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
  }


  return(
    <div>
      <h3>새로운 선수 추가</h3>
      <form action="/api/board/new" method="POST">
        <div><img style={{width:"200px"}} src={image}/></div>
        <div><label>사진: </label><input type="file" onChange={imageLoadHandler}></input></div>
        <div><label>이름: </label><input name="name" type="text"></input></div>
        <div><label>종목: </label><input name="subject" type="text"></input></div>
        <div><label>경력: </label><input name="career" type="text"></input></div>
        <input type="hidden" name="img" value={image}/>
        <div><button type="submit">추가</button></div>
      </form>
    </div>
  )
}