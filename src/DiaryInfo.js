const DiaryInfo = ({ goodCount, badCount, goodRatio, diaryLength }) => {
  return (
    <div className="DiaryInfo">
      <ul>
        <li>전체 일기 개수: {diaryLength}</li>
        <li>기분 좋은 일기 개수: {goodCount}</li>
        <li>기분 나쁜 일기 개수: {badCount}</li>
        <li>기분 좋은 일기 비율: {Math.round(goodRatio)}%</li>
      </ul>
    </div>
  );
}

export default DiaryInfo;