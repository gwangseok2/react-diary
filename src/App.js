import { useRef, useState, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import * as React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';


function App() {
  const darkModeCheck = JSON.parse(localStorage.getItem('darkmode'));

  // 다크모드 관련 스테이트
  const [isDarkMode, setDarkMode] = React.useState(darkModeCheck ? true : false);
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkmode', JSON.stringify(checked));
  };

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
    if (testData) {
      localStorage.removeItem("data");
      localStorage.setItem("data", JSON.stringify(newDiaryList));
    }
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
    <div className={isDarkMode ? 'App dark' : 'App'} >
      <DiaryEditor onCreate={onCreate} />
      {data.length < 1 ? <></> : <DiaryList diaryList={data} onRemove={onRemove} onUpdate={onUpdate} />}
      <DarkModeSwitch
        style={{ marginBottom: '2rem', position: 'fixed', left: '1.333%', top: '20px' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={80}
      />
    </div >
  );
}

export default App;