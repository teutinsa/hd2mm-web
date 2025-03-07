import { useState } from "react";
import DemoFileUI from "./DemoFileUI";

export default function App() {
  //----- State -----
  const [acknowledged, setAcknowledged] = useState(false);

  //----- Events -----
  function onOkClick() {
    setAcknowledged(true);
  }

  //----- View -----
  const supported = "showOpenFilePicker" in window;
  if (!supported) {
    return (
      <div className="position-relative vw-100 vh-100">
        <div className="position-absolute top-50 start-50 translate-middle border rounded-1 mw-50 p-3 bg-body-tertiary shadow-lg">
          <span className="text-center text-danger">
            This browser does not support Chromes File System API.
          </span>
        </div>
      </div>
    );
  }

  if (acknowledged) {
    return <DemoFileUI />;
  } else {
    return (
      <div className="position-relative vw-100 vh-100">
        <div className="vstack gap-3 position-absolute top-50 start-50 translate-middle border rounded-1 mw-50 p-3">
          <h3 className="text-center">
            This Web-App uses Chromes File System API to access files on your system.
          </h3>
          <span>
            Don't worry. This app will only have access to parts of your file system that you gave it explicit permission to.
          </span>
          <button className="btn btn-primary" onClick={onOkClick}>{"OK"}</button>
        </div>
      </div>
    );
  }
}
