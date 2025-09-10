export type Task = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string | null;
  isCompleted: boolean;
  isAdding: boolean;
  isEditing: boolean;
  isDeleting: boolean;
};

export type initialTask = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string | null;
  isCompleted: boolean;
};

export type TechStack = {
  src: string;
  title: string;
  subText?: string[];
};
