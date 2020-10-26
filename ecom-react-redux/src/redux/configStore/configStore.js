import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import myReducer from "../reducers/rootReducer";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const configStore = () => {
  const store = createStore(
    myReducer,
    composeWithDevTools(
      applyMiddleware(...middlewares)
      // other store enhancers if any
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configStore;
