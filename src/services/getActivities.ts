export const getActivities = async () => {
  try {
    const response = await fetch("/api/activities");
    if (!response.ok) {
      throw new Error("Erro ao buscar atividade");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
