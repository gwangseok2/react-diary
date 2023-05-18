import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE': {
      const createDttm = new Date().getTime();
      const newItem = {
        ...action.data,
        createDttm
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((el) => el.id !== action.targetId);
    }
    case 'UPDATE': {
      return state.map((el) => el.id === action.targetId ? { ...el, contents: action.newContents } : el)
    }
    case 'LOCALSTORAGE': {
      return [...action.data];
    }
    default: return state;
  }
}

// context 독립 필요
export const DiaryStateContext = React.createContext();

// 재랜더방지
export const DiaryDispatchContext = React.createContext();

function App() {
  const darkModeCheck = JSON.parse(localStorage.getItem('darkmode'));

  // 다크모드 관련 스테이트
  const [isDarkMode, setDarkMode] = React.useState(darkModeCheck ? true : false);
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkmode', JSON.stringify(checked));
  };


  const [data, dispatch] = useReducer(reducer, []);

  const testData = JSON.parse(localStorage.getItem("data"));
  let dataId = useRef(0);
  dataId = testData ? Math.max.apply(Math, testData.map(function (o) { return o.id; })) + 1 : dataId;
  // 함수를 전달해서 프롭으로 내려서 이벤트처리
  const onCreate = useCallback(
    (author, contents, emotion) => {

      if (testData) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dataId += 1;
        dispatch({ type: 'CREATE', data: { author, contents, emotion, id: dataId } })
      } else {
        dataId.current += 1;
        dispatch({ type: 'CREATE', data: { author, contents, emotion, id: dataId.current } })
      }
    }, []);



  // 딜리트
  const onRemove = useCallback((targetId) => {

    dispatch({ type: "REMOVE", targetId })
    const newDiaryList = data.filter((el) => el.id !== targetId);
    const checkData = localStorage.getItem("data");
    if (checkData) {
      localStorage.removeItem("data");
    }

    if (newDiaryList.length) {
      localStorage.setItem("data", JSON.stringify(newDiaryList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 수정하기
  const onUpdate = useCallback((targetId, newContents) => {
    dispatch({ type: "UPDATE", targetId, newContents })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // data state변경 시 로컬스토리지 값도 변경
  useEffect(() => {
    if (data.length === 0) {
      return
    }
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data))
  }, [data])

  // mouted localstorage 값 체크
  useEffect(() => {
    const localListData = localStorage.getItem("data");
    if (localListData) {
      dispatch({ type: "LOCALSTORAGE", data: JSON.parse(localListData) })
    }
  }, [])

  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((el) => el.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      const diaryLength = data.length;
      return { goodCount, badCount, goodRatio, diaryLength };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length]
  );

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onUpdate }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const diaryAnalysis = getDiaryAnalysis;
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className={isDarkMode ? 'App dark' : 'App'} >
          <DiaryEditor />
          {data.length > 0 && <DiaryList diaryAnalysis={diaryAnalysis} />}
          <DarkModeSwitch
            style={{ marginBottom: '2rem', position: 'fixed', left: '1.333%', top: '20px' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={80}
          />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;