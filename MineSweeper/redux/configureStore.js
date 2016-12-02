import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
//使用 Redux 提供的 createStore 方法即可,thunk 提供了异步功能有兴趣的可以了解一下，这里不准备深入
const createStoreWithMiddleware = applyMiddleware(
    thunk
) (createStore);

//initialState 可以设置初始状态，可以用于把服务器端生成的 state 转变后传给应用
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
