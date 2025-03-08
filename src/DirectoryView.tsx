import { KeyboardEvent, useEffect, useMemo, useState } from "react";

type DirectoryViewProps = {
	directory: FileSystemDirectoryHandle;
}

export default function DirectoryView(props: DirectoryViewProps) {
  //----- State -----
	const [ items, setItems ] = useState<FileSystemHandle[]>([]);
	const [ search, setSearch ] = useState("");

  //----- Effects -----
  useEffect(() => {
    async function fetchItems() {
      const fetched = await getItems(props.directory);
      setItems(fetched);
    }
    fetchItems();
  });

  //----- Memos -----
  const filteredItems = useMemo(
    () => [ ...items.sort((a, b) => asNumber(a.kind) - asNumber(b.kind)).entries() ],
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
  const tableItems = filteredItems.map(([index, handle]) => (
    <tr key={index}>
      <td>
        {handle.kind === "directory" ? (
          <i className="bi bi-folder" />
        ) : (
          <i className="bi bi-file-earmark-fill"></i>
        )}
      </td>
      <td>{handle.name}</td>
    </tr>
  ));
	
  return (
		<table className="table table-striped">
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