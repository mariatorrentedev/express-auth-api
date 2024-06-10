export type BlogPost = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
};
