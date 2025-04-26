export const updateActivity = async (id: number, updates: object) => {
  try {
    const response = await fetch(
      `/api/activities/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar atividade");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
