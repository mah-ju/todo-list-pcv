import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    if(req.method === "PATCH"){
        const { title, category, activity_status} = req.body;

        try{
            const updates = [];
            const values = [];
            let index = 1;
          
            if (title) {
              updates.push(`title = $${index}`);
              values.push(title);
              index++;
            }
          
            if (category) {
              updates.push(`category = $${index}`);
              values.push(category);
              index++;
            }
          
            if (activity_status) {
              updates.push(`activity_status = $${index}`);
              values.push(activity_status);
              index++;
            }

            const queryText = `UPDATE activity SET ${updates.join(
                ", "
              )}, updated_at = NOW() WHERE id = $${index} RETURNING *`;
              values.push(id);

        const { rows } = await pool.query(queryText, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Atividade não encontrada" });
          }

         return  res.status(200).json(rows[0]);
        } catch(error){
            console.error("Erro ao atualizar atividade:", error);
            return res.status(500).json({error: "Erro ao atualizar atividade"})
        }
    }


    if(req.method === "DELETE"){
        try{
            const { rows } = await pool.query(

                "DELETE FROM activity WHERE id = $1 RETURNING *", [id]
            );
            if(rows.length === 0){
                return res.status(404).json({error: "Atividade não encontrada"});
            }
            return res.status(200).json({message: "Atividade excluída com sucesso"})
        } catch(error){
            console.error("Erro ao excluir atividade:", error);
            return res.status(500).json({error: "Erro ao excluir atividade"})
        }
    }
    
};