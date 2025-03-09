import { useState } from "react";
import DemoFileUI from "./DemoFileUI";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

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
      <div className="relative w-screen h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md shadow-lg">
          <span className="text-center text-destructive">{t("app.unsupportedError")}</span>
        </Card>
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
          <div className="fixed w-full h-full flex items-center justify-center">
            <Card className="p-6 max-w-md space-y-4">
              <h3 className="text-center text-xl font-semibold">{t("app.disclaimer.title")}</h3>
              <p className="text-muted-foreground">{t("app.disclaimer.content")}</p>
              <Button onClick={onOkClick}>{t("app.disclaimer.button")}</Button>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
