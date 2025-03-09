import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Input } from "./components/ui/input";
import SearchSvg from "./assets/search.svg?react";
import FolderSvg from "./assets/folder.svg?react";
import FileSvg from "./assets/file.svg?react";

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
        <TableRow key={index} className="cursor-pointer" onClick={onClick}>
          <TableCell>
            <FolderSvg className="fill-current size-6" />
          </TableCell>
          <TableCell>{handle.name}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={index}>
          <TableCell>
            <FileSvg className="fill-current size-6" />
          </TableCell>
          <TableCell>{handle.name}</TableCell>
        </TableRow>
      );
    }
  });
	
  return (
    <Table>
      <TableCaption>{props.directory.name}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell />
          <TableCell className="flex flex-row space-x-1">
            <Input id="dirSearch" type="search" placeholder="Search" defaultValue={search} onKeyDown={onKeyDown} onChange={onChange}/>
            <Button onClick={onSearch}>
              <SearchSvg className="size-5 stroke-current stroke-3"/>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableItems}
      </TableBody>
    </Table>
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
