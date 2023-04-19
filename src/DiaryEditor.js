import { useState } from "react"

const DiaryEditor = () => {

  // 동작이 비슷하면 하나로 묶어서 쓸 수 있다
  const [state, setState] = useState({
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
    console.log(state)
    alert("저장성공");
  }
  console.log(state)
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input name="author" value={state.author} type="text" placeholder="작성자" onChange={handleChange} />
      </div>
      <div>
        <textarea name="contents" value={state.contents} className="DiaryContents" onChange={handleChange} placeholder="내용을 입력해주세요." style={{ resize: "none" }} />
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

export default DiaryEditor