export const createActivity = async (title: string, category: string) => {
  try {
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category }),
    });

    if (!response.ok) {
      throw new Error("Erro ao inserir atividade");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}; 
