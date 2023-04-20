const DiaryItem = ({ author, contents, createDttm, emotion, id }) => {
  console.log()
  return (
    <ul className="DiaryItem">
      <li>{author}의 일기</li>
      <li><span>{contents}</span></li>
      <li>작성일자 : {new Date(createDttm).toLocaleString()}</li>
      <li>감정점수 : {emotion} </li>
      <li><button tyle="button" onClick={() => console.log(id)}>삭제하기</button></li>
    </ul>
  )
}
export default DiaryItem;