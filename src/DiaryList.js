import DiaryInfo from "./DiaryInfo";
import DiaryItem from "./DiaryItem"
const DiaryList = ({ onRemove, diaryList, onUpdate, diaryAnalysis }) => {
  return (
    <div className="diary-list">
      <h2>일기 목록</h2>
      <div style={{ marginTop: 20 }}><DiaryInfo {...diaryAnalysis} /></div>
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