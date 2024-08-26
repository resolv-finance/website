import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils/constants";
import { ICurrency, IMasterChain } from "../interfaces/apis/master-api";

export const useMasterData = () => {
  // state to store all the supported chains by Resolv protocol
  const [supportedChains, setSupportedChains] = useState<IMasterChain[]>([]);

  // state to store all the supported currencies by Resolv protocol
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  // fetches all supported chain by calling API
  const fetchSupportedChains = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/chain/master`);
      if (response.status === 200) {
        setSupportedChains(response.data.data);
      }
    } catch (error) {
      /* eslint-disable no-console */
      console.log("Failed to fetch supported chains : ", error);
    }
  };

  // fetches all currencies by calling API
  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/currency/master`);
      if (response.status === 200) {
        setCurrencies(response.data.data);
      }
    } catch (error) {
      /* eslint-disable no-console */
      console.log("Failed to fetch currencies : ", error);
    }
  };

  // loads all supported chains on page load
  useEffect(() => {
    fetchSupportedChains();
    fetchCurrencies();
  }, []);

  return {
    supportedChains,
    currencies,
  };
};
