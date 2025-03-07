enum WellKnownDirectory {
	desktop = "desktop",
	documents = "documents",
	downloads = "downloads",
	music = "music",
	pictures = "pictures",
	videos = "videos",
}

type StartInDirectory = WellKnownDirectory | FileSystemHandle;

interface FilePickerAcceptType {
	description?: string;
	accept: Record<string, string | string[]>;
}

interface FilePickerOptions {
	types?: FilePickerAcceptType[];
	excludeAcceptAppOption?: boolean;
	id?: string;
	startIn?: StartInDirectory;
}

interface OpenFilePickerOptions extends FilePickerOptions {
	multiple?: boolean;
}

interface SaveFilePickerOptions extends FilePickerOptions {
	suggestedName?: string | null;
}

type FileSystemPermissionMode = "read" | "readwrite";

interface DirectoryPickerOptions {
	id?: string;
	startIn?: StartInDirectory;
	mode?: FileSystemPermissionMode;
}

declare global {
	interface Window {
		showOpenFilePicker?: (options?: OpenFilePickerOptions) => Promise<FileSystemFileHandle[]>;
		showSaveFilePicker?: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
		showDirectoryPicker?: (options?: DirectoryPickerOptions) => Promise<FileSystemDirectoryHandle>;
	}
	
	interface FileSystemDirectoryHandle {
		[Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
	}
}