import DiaryItem from "./DiaryItem"
const DiaryList = ({ onRemove, diaryList, onUpdate }) => {
  console.log(diaryList, '프롭테스트')
  return (
    <div className="diary-list">
      <h2>일기 리스트</h2>
      <h4>다이어리 리스트{diaryList.length}개가 있다.</h4>
      <div>
        {diaryList.map((el) =>
          <DiaryItem key={el.id} {...el} onRemove={onRemove} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: []
}
export default DiaryList;