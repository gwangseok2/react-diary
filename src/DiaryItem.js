import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({ author, contents, createDttm, emotion, id, onRemove, onUpdate }) => {

  useEffect(() => console.log(`${id}번 째 아이탬 랜더`));

  const [localContent, setLocalContent] = useState(contents);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  }

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
    setTimeout(() => {
      localContentInput.current.focus();
    })
  }

  const cancleEdit = () => {
    setIsEdit(false);
    setLocalContent(contents);
  }


  const handleUpdate = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm('일기를 수정 하시겠습니까?')) {
      onUpdate(id, localContent)
      setIsEdit(false);
    }
  }


  return (
    <ul className="DiaryItem">
      <li>{author}의 일기</li>
      <li><span>{isEdit ? <textarea ref={localContentInput} value={localContent} onChange={(e) => { setLocalContent(e.target.value) }} placeholder="수정 할 텍스트를 입력해주세요." /> : contents}</span></li>
      <li>작성일자 : {new Date(createDttm).toLocaleString()}</li>
      <li>감정점수 : {emotion} </li>
      <li>
        {isEdit ? (<><button type="button" onClick={cancleEdit}>수정취소</button><button type="button" onClick={handleUpdate} style={{ marginLeft: "6px" }}>수정완료</button></>)
          : (
            <>
              <button type="button" onClick={handleRemove}>삭제하기</button>
              <button type="button" style={{ marginLeft: "6px" }} onClick={toggleIsEdit}>수정하기</button>
            </>
          )
        }
      </li>
    </ul >
  )
}
export default React.memo(DiaryItem);