import {Platform} from 'react-native';

// Android Emulator connects to localhost via 10.0.2.2; iOS Simulator uses localhost
export const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000/api'
    : 'http://localhost:5000/api';

export const getCompetition = async (competitionId: string) => {
  const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch competition: status ${response.status}`);
  }

  return response.json();
};

export const registerCompetition = async (
  competitionId: string,
  userData: {name: string; email: string},
) => {
  const response = await fetch(
    `${API_BASE_URL}/competitions/${competitionId}/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  );

  return response.json();
};
