import { useRef, useState, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


function App() {
  const [data, setData] = useState([]);
  const testData = JSON.parse(localStorage.getItem("data"));
  let dataId = useRef(0);
  dataId = testData ? Math.max.apply(Math, testData.map(function (o) { return o.id; })) + 1 : dataId;

  // 함수를 전달해서 프롭으로 내려서 이벤트처리
  const onCreate = (author, contents, emotion) => {

    const createDttm = new Date().getTime();
    const newItem = {
      id: testData ? dataId : dataId.current,
      author,
      contents,
      emotion,
      createDttm
    }
    dataId += 1;
    setData([newItem, ...data])
  };



  // 딜리트
  const onRemove = (targetId) => {
    const newDiaryList = data.filter((el) => el.id !== targetId);
    setData(newDiaryList);
  }

  // 수정하기
  const onUpdate = (targetId, newContents) => {
    setData(
      data.map((el) => el.id === targetId ? { ...el, contents: newContents } : el)
    )
  }


  useEffect(() => {
    if (data.length === 0) {
      return
    }
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data))
  }, [data])

  useEffect(() => {
    const localListData = localStorage.getItem("data");
    if (localListData) {
      const loadLocalStorage = () => {
        setData(JSON.parse(localListData))

      }
      loadLocalStorage()
    }
  }, [])

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      {data.length < 1 ? <></> : <DiaryList diaryList={data} onRemove={onRemove} onUpdate={onUpdate} />}
    </div>
  );
}

export default App;