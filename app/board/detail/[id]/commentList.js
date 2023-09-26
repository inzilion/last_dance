'use client'
import { useEffect, useState, useRef } from "react"

export default function CommentList({parentId}){
  const comRef = useRef();
  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState([])
  const getCommentList = () => {
    fetch('/api/comment/list',
      { method: "POST",
        body: JSON.stringify({ parentId: parentId })}
    )
    .then(res=>res.json())
    .then(result=>setCommentList(result))
  }

  const onClickHandler = () => {
    comRef.current.value="";
    fetch('/api/comment/new',
      {
        method: "POST",
        body: JSON.stringify({ comment: comment, parentId: parentId })
      }
    )
    .then(res=>res.json())
    .then(result=>getCommentList())
  }

  const onChangeHandler = (e) => setComment(e.target.value);
  useEffect(getCommentList, [])

  return (
    <>
      { commentList.map((item, i)=><div key={i}>{item.comment}</div>)}
      <input ref={comRef} onChange={onChangeHandler} name="comment" type="text"/>
      <button onClick={onClickHandler}>추가</button>
    </>
  )
}
