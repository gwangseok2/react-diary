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

  const onDelete = (targetId) => {
    console.log(targetId);
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;