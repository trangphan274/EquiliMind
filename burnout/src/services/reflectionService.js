const API_URL = 'http://127.0.0.1:8000';

export async function getReflections() {
  const token = localStorage.getItem('access_token');

  const response = await fetch(
    `${API_URL}/api/reflections`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to fetch reflections.');
  }

  return data;
}


export async function createReflection(content, tag = null) {
  const token = localStorage.getItem('access_token');

  const response = await fetch(
    `${API_URL}/api/reflections`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        tag,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to save reflection.');
  }

  return data;
}