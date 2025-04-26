export type Task = {
    title: string;
    category: "estudos" | "trabalho" | "pessoal";
    activity_status?: "fazer" | "feita";
    id?: number;
  
}