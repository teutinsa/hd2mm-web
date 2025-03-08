import { KeyboardEvent, useEffect, useMemo, useState } from "react";

type DirectoryViewProps = {
	directory: FileSystemDirectoryHandle;
  onBrowse: (dir: FileSystemDirectoryHandle) => void;
}

export default function DirectoryView(props: DirectoryViewProps) {
  //----- State -----
	const [ items, setItems ] = useState<FileSystemHandle[]>([]);
	const [ search, setSearch ] = useState("");

  //----- Effects -----
  useEffect(
    () => {
      async function fetchItems() {
        const fetched = await getItems(props.directory);
        setItems(fetched);
      }
      fetchItems();
    },
    [ props.directory ]
  );

  //----- Memos -----
  const filteredItems = useMemo(
    () => [ ...items.filter((h) => h.name.includes(search)).sort((a, b) => asNumber(a.kind) - asNumber(b.kind)).entries() ],
    [ items, search ]
  );
	
  //----- Events -----
  function onSearch() {
    const text = (document.getElementById("dirSearch") as HTMLInputElement).value;
    setSearch(text);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch();
    }
  }

  function onChange() {
    const text = (document.getElementById("dirSearch") as HTMLInputElement).value;
    if (text === "")
      setSearch("");
  }

  //----- View -----
  const tableItems = filteredItems.map(([index, handle]) => {
    if (handle.kind === "directory") {
      const onClick = () => {
        const [, handle] = filteredItems[index];
        props.onBrowse(handle as FileSystemDirectoryHandle);
      };

      return (
        <tr key={index} style={{ cursor: "pointer" }} onClick={onClick}>
          <td>
            <i className="bi bi-folder" />
          </td>
          <td>{handle.name}</td>
        </tr>
      );
    } else {
      return (
        <tr key={index}>
          <td>
            <i className="bi bi-file-earmark-fill" />
          </td>
          <td>{handle.name}</td>
        </tr>
      );
    }
  });
	
  return (
		<table className="table table-hover user-select-none">
			<thead>
				<tr>
					<th />
					<td className="d-flex">
            <input id="dirSearch" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" defaultValue={search} onKeyDown={onKeyDown} onChange={onChange}/>
            <button className="btn btn-outline-primary" onClick={onSearch}>
              <i className="bi bi-search" />
            </button>
          </td>
				</tr>
				<tr>
					<th>Type</th>
					<th>Name</th>
				</tr>
			</thead>
      <tbody>
        {tableItems}
      </tbody>
		</table>
	);
}

async function getItems(dir: FileSystemDirectoryHandle): Promise<FileSystemHandle[]> {
	const items = [];
	for await (const [, handle] of dir) {
		items.push(handle);
	}
	return items;
}

function asNumber(kind: FileSystemHandleKind): number {
  if (kind === "directory") {
    return 0;
  } else if (kind === "file") {
    return 1;
  } else {
    throw new Error("Unknown file system handle kind.");
  }
}