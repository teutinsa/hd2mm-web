import { useState } from "react";
import DemoFileUI from "./DemoFileUI";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar";
import { Button } from "./components/ui/button";

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
      <div>
        <div>
          <span>{t("app.unsupportedError")}</span>
        </div>
      </div>
    );
  }
  
  return (
    <>
    <title>{t("app.title")}</title>
    {acknowledged ? (
      <DemoFileUI />
    ) : (
      <>
        <NavBar />
        <div>
          <div>
            <h3>{t("app.disclaimer.title")}</h3>
            <span>{t("app.disclaimer.content")}</span>
            <Button onClick={onOkClick}>{t("app.disclaimer.button")}</Button>
          </div>
        </div>
      </>
    )}
    </>
  );
}
