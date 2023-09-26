'use client'

import RenderResult from "next/dist/server/render-result";
import { useState, useRef } from "react"

export default function CommentWriter({parentId}){
  const comRef = useRef();
  const [comment, setComment] = useState("")
  const onChangeHandler = (e) => setComment(e.target.value);
  const onClickHandler = () => {
    comRef.current.value="";
    fetch('/api/comment/new',
      {
        method: "POST",
        body: JSON.stringify({ comment: comment, parentId: parentId })
      }
    )
    .then(res=>res.json())
    .then(result=>console.log(result))
  }

  return (
    <>
      <input ref={comRef} onChange={onChangeHandler} name="comment" type="text"/>
      <button onClick={onClickHandler}>추가</button>
    </>
  )
}