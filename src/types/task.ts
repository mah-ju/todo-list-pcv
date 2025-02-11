export type Task = {
    title: string;
    category: "estudos" | "trabalho" | "pessoal";
    checked?: boolean;
    id?: string;
  
}