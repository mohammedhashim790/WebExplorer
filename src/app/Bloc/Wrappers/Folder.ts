

export interface Folder{
  Id:string;
  Name:string;
  Path:string;
  subFolders:Array<Folder>;
  files:Array<File>;
  parentId:string;
}

export interface File{
  Id:string;
  Name:string;
  Path:string;
  Size:number;
  parentFolderId:string;
}

