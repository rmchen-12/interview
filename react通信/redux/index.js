import { reducer } from './reducer';
export const createStore = (reducer, heightener) => {
  // heightener是一个高阶函数,用于增强createStore
  //如果存在heightener,则执行增强后的createStore
  if (heightener) {
    return heightener(createStore)(reducer);
  }
  let currentState = {};
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
  }
  function subscribe() {}
  dispatch({ type: '@@REDUX_INIT' }); //初始化store数据
  return { getState, subscribe, dispatch };
};

const store = createStore(reducer); //创建store
store.dispatch({ type: 'plus' }); //执行加法操作,给count加1
console.log(store.getState()); //获取state
