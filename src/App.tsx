import { useState } from "react";
import DemoFileUI from "./DemoFileUI";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar";

export default function App() {
  const { t } = useTranslation();
  
  //----- State -----
  const [ acknowledged, setAcknowledged ] = useState(false);
  
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
          <span className="text-center text-danger">{t("app.unsupportedError")}</span>
        </div>
      </div>
    );
  }

  if (acknowledged) {
    return <DemoFileUI />;
  } else {
    return (
      <>
        <NavBar />
        <div className="position-relative vw-100 vh-100">
          <div className="vstack gap-3 position-absolute top-50 start-50 translate-middle border rounded-1 mw-50 p-3">
            <h3 className="text-center">{t("app.disclaimer.title")}</h3>
            <span>{t("app.disclaimer.content")}</span>
            <button className="btn btn-primary" onClick={onOkClick}>{t("app.disclaimer.button")}</button>
          </div>
        </div>
      </>
    );
  }
}
