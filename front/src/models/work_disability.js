import { API_URL } from '../config';

export const allDiseases = () => (
  fetch(`${API_URL}/all-diseases`).then(r => r.json())
)

export const allAgeRage = () => (
  fetch(`${API_URL}/all-age-rage`).then(r => r.json())
)

export const allGenderRage = () => (
  fetch(`${API_URL}/all-gender-rage`).then(r => r.json())
)

export const allOcupation = () => (
  fetch(`${API_URL}/all-ocupation`).then(r => r.json())
)

export const submitOptimalTime = async (formData) => {
  const response = await fetch(`${API_URL}/optimal-time`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }
  const json = await response.json();
  return json.result;
};
