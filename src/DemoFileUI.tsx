import { useState } from "react";
import DirectoryView from "./DirectoryView";

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

  //----- View -----
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">
            Helldivers 2 Mod Manager - Web
          </span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-dark" onClick={onBrowse}>
                Browse Test
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {folder != null && <DirectoryView directory={folder} />}
    </>
  );
}