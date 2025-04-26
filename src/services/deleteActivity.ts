export const deleteActivity = async (id: number) => {
  try {
    const response = await fetch(
      `/api/activities/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar atividade");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
