import { useContext } from "react";
import DiaryInfo from "./DiaryInfo";
import DiaryItem from "./DiaryItem"
import { DiaryStateContext } from "./App";
const DiaryList = ({ diaryAnalysis }) => {

  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="diary-list">
      <h2>일기 목록</h2>
      <div style={{ marginTop: 20 }}><DiaryInfo {...diaryAnalysis} /></div>
      <div>
        {diaryList.map((el) =>
          <DiaryItem key={el.id} {...el} />
        )}
      </div>
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: []
}
export default DiaryList;