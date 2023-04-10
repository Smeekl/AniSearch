import axios from "axios";

const config = {
  api: "https://api.jikan.moe/v4/",
};

export const httpGet = async (endpoint: string, body: any) => {
  const response = await axios.get(`${config.api}${endpoint}`, {
    params: body,
  });
  return handleResponse(response);
};

const handleResponse = (response: any) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw Error(response.message);
  }
};
