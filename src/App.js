import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import * as React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// https://jsonplaceholder.typicode.com/comments

function App() {
  const darkModeCheck = JSON.parse(localStorage.getItem('darkmode'));

  // const getData = async () => {
  //   const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
  //   console.log(res);
  //   const initData = res.slice(0, 20).map((el) => {
  //     return {
  //       auhotr: el.email,
  //       contents: el.body,
  //       emotion: Math.floor(Math.random() * 5) + 1,
  //     }
  //   })
  //   console.log(initData, 'dasd');
  // }

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
  const onCreate = useCallback(
    (author, contents, emotion) => {
      const createDttm = new Date().getTime();
      const newItem = {
        id: testData ? dataId : dataId.current,
        author,
        contents,
        emotion,
        createDttm
      }
      if (testData) {
        dataId += 1
      } else {
        dataId.current += 1;
      }
      setData((data) => [newItem, ...data])
    }, []);



  // 딜리트
  const onRemove = (targetId) => {
    const newDiaryList = data.filter((el) => el.id !== targetId);
    const checkData = localStorage.getItem("data");
    if (checkData) {
      localStorage.removeItem("data");
    }

    if (newDiaryList.length) {
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
    // getData();
    const localListData = localStorage.getItem("data");
    if (localListData) {
      const loadLocalStorage = () => {
        setData(JSON.parse(localListData))
      }
      loadLocalStorage()
    }
  }, [])

  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((el) => el.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      const diaryLength = data.length;
      return { goodCount, badCount, goodRatio, diaryLength };
    }, [data.length]);

  const diaryAnalysis = getDiaryAnalysis;
  return (
    <div className={isDarkMode ? 'App dark' : 'App'} >
      <DiaryEditor onCreate={onCreate} />
      {data.length > 0 && <DiaryList diaryList={data} onRemove={onRemove} onUpdate={onUpdate} diaryAnalysis={diaryAnalysis} />}
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