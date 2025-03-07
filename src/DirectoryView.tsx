import { useEffect, useState } from "react";

type DirectoryViewProps = {
	directory: FileSystemDirectoryHandle;
}

export default function DirectoryView(props: DirectoryViewProps) {
  //----- State -----
	const [ items, setItems ] = useState<FileSystemHandle[]>([]);

  //----- Effects -----
  useEffect(() => {
    async function fetchItems() {
      const fetched = await getItems(props.directory);
      setItems(fetched);
    }
    fetchItems();
  });

  //----- View -----
  const tableItems = [...items.sort((a, b) => asNumber(a.kind) - asNumber(b.kind)).entries()].map(([index, handle]) =>
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
  );
	
  return (
		<table className="table table-striped">
			<thead>
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