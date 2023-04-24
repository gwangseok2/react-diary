const DiaryItem = ({ author, contents, createDttm, emotion, id, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  }
  return (
    <ul className="DiaryItem">
      <li>{author}의 일기</li>
      <li><span>{contents}</span></li>
      <li>작성일자 : {new Date(createDttm).toLocaleString()}</li>
      <li>감정점수 : {emotion} </li>
      <li>
        <button tyle="button" onClick={handleRemove}>삭제하기</button>
        <button type="button" style={{ marginLeft: "10px" }}>수정하기</button>
      </li>
    </ul >
  )
}
export default DiaryItem;