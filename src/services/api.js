import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getAuthenticated(route, onSuccess, onError) {
  const token = localStorage.getItem("token");
  try {
    const data = await axios.get(`${API_URL}/${route}`, {
      Authorization: `Bearer ${token}`,
    });
    if (onSuccess) onSuccess(data);
  } catch (error) {
    if (onError) onError(error);
  }
}

export async function postAuthenticated(route, payload, onSuccess, onError) {
  const token = localStorage.getItem("token");
  try {
    const data = await axios.post(`${API_URL}/${route}`, payload, {
      Authorization: `Bearer ${token}`,
    });
    if (onSuccess) onSuccess(data);
  } catch (error) {
    if (onError) onError(error);
  }
}

export async function signIn(credentials, onSuccess, onError) {
  try {
    const token = await axios.post(`${API_URL}/sign-in`, credentials);
    localStorage.setItem("token", token);
    if (onSuccess) onSuccess();
  } catch (error) {
    if (onError) {
      if (error.response) onError(error.response.data);
      else onError(error);
    }
  }
}

export async function signUp(userInfo, onSuccess, onError) {
  try {
    const token = await axios.post(`${API_URL}/sign-up`, userInfo);
    if (onSuccess) onSuccess();
  } catch (error) {
    if (onError) {
      if (error.response) onError(error.response.data);
      else onError(error);
    }
  }
}
