import React, { useRef, useState } from "react"

const DiaryEditor = ({ onCreate }) => {


  // react에서의 dom조작
  const authorInput = useRef();
  const contentsArea = useRef();

  // 동작이 비슷하면 하나로 묶어서 쓸 수 있다
  const [state, setState] = useState({
    id: 0,
    author: "",
    contents: "",
    emotion: 1,
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const saveDiary = () => {
    // console.log(state)
    if (state.author.length < 1) {
      alert("작성자는 최소 1글자 이상 입력해주세요.");
      // react current프로퍼티로 불러와서 사용가능.
      authorInput.current.focus();
      return
    }

    if (state.contents.length < 5) {
      alert("본문은 최소 5글자 이상 입력해주세요.");
      contentsArea.current.focus();
      return
    }

    alert("저장완료");
    onCreate(state.author, state.contents, state.emotion);
    setState({
      author: '',
      contents: '',
      emotion: 1,
    })

  }
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input ref={authorInput} name="author" value={state.author} type="text" placeholder="작성자" onChange={handleChange} />
      </div>
      <div>
        <textarea ref={contentsArea} name="contents" value={state.contents} className="DiaryContents" onChange={handleChange} placeholder="내용을 입력해주세요." style={{ resize: "none" }} />
      </div>
      <div>
        <h3>오늘의 감정점수:</h3>
        <select name="emotion" onChange={handleChange} value={state.emotion}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button type="button" onClick={saveDiary}>일기 저장하기</button>
    </div>
  )
}

export default React.memo(DiaryEditor)