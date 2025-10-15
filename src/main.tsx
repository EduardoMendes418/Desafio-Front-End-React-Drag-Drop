import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { store } from "./store/board/slices/index.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="flex items-center justify-center w-full h-screen">Loading...</div>}>
    <Provider store={store}>
      <BrowserRouter>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </StyleSheetManager>
      </BrowserRouter>
    </Provider>
  </Suspense>
);