import axios from "axios";
import { useCallback } from "react";

const useViaCep = () => {
  const fetchAddress = useCallback(async (cep: string) => {
    if (!cep || cep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

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
