import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { rows } = await pool.query("SELECT * FROM activity");
      return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      return res.status(500).json({ error: "Erro ao buscar atividades" });
    }
  }

  if (req.method === "POST") {
    const { title, category } = req.body;
    try {
      const { rows } = await pool.query(
        `INSERT INTO activity (title, category, created_at, updated_at)
     VALUES($1, $2, NOW(), NOW()) RETURNING *`,
        [title, category]
      );
      return res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Erro ao criar atividade:", error);
        return res.status(500).json({ error: "Erro ao criar atividade" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
