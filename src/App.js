import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // 함수를 전달해서 프롭으로 내려서 이벤트처리
  const onCreate = (author, contents, emotion) => {
    const createDttm = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      contents,
      emotion,
      createDttm
    }
    dataId.current += 1;
    setData([newItem, ...data])
  };

  // 딜리트
  const onRemove = (targetId) => {
    console.log(targetId);
    const newDiaryList = data.filter((el) => el.id !== targetId);
    setData(newDiaryList);
  }

  // 수정하기
  const onUpdate = (targetId, newContents) => {
    console.log(targetId, newContents)
    setData(
      data.map((el) => el.id === targetId ? { ...el, contents: newContents } : el)
    )
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
}

export default App;