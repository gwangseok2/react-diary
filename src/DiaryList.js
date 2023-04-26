import DiaryItem from "./DiaryItem"
const DiaryList = ({ onRemove, diaryList, onUpdate }) => {
  return (
    <div className="diary-list">
      <h2>일기 목록</h2>
      <h4>작성하신 일기가 {diaryList.length}개가 있습니다.</h4>
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