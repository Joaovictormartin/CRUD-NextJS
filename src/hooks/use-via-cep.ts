import axios from "axios";
import { useCallback } from "react";

const useViaCep = () => {
  const fetchAddress = useCallback(async (cep: string) => {
    const cepFormatted = cep.replace(/\D/g, "");

    if (!cepFormatted || cepFormatted.length !== 8) return;

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepFormatted}/json/`,
      );

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP", error);
    }
  }, []);

  return { fetchAddress };
};

export default useViaCep;
