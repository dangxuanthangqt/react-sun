import React from "react";
import "./styles/styles.scss";
import ProductList from "./views/ProductList/ProductList";
import { Provider } from "react-redux";
import configStore from "./redux/configStore/configStore";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";
const store = configStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GlobalLoading></GlobalLoading>
        <ProductList></ProductList>
      </div>
    </Provider>
  );
}

export default App;
