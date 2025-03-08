import { useState } from "react";
import DirectoryView from "./DirectoryView";
import NavBar, { NavItem } from "./NavBar";

export default function DemoFileUI() {
  //----- State -----
  const [ folder, setFolder ] = useState<FileSystemDirectoryHandle | null>(null);

  //----- Events -----
  async function onBrowse() {
    try {
      const result = await window.showDirectoryPicker!({ mode: "readwrite" });
      setFolder(result);
    } catch(e) {
      if (!(e instanceof DOMException))
        throw e;
    }
  }

  function onClick(dir: FileSystemDirectoryHandle) {
    setFolder(dir);
  }

  //----- View -----
  return (
    <>
      <NavBar>
        <NavItem>
          <button className="btn btn-dark" onClick={onBrowse}>Browse Test</button>
        </NavItem>
      </NavBar>
      {folder != null && <DirectoryView directory={folder} onBrowse={onClick} />}
    </>
  );
}