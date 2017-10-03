export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg: string;
  taskListIds?: string[]; // 任务列表id
  memberIds?: string[]; // 成员id
}
