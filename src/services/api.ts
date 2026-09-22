import {Platform} from 'react-native';

// Android Emulator connects to localhost via 10.0.2.2; iOS Simulator or physical device uses localhost/IP
export const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000/api'
    : 'http://localhost:5000/api';

export const getCompetition = async (competitionId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/competitions/${competitionId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch competition');
  }

  return response.json();
};

export const registerCompetition = async (
  competitionId: string,
  nameOrData: string | {name: string; email: string},
  emailParam?: string,
) => {
  const name =
    typeof nameOrData === 'object' ? nameOrData.name : nameOrData;
  const email =
    typeof nameOrData === 'object' ? nameOrData.email : emailParam;

  const response = await fetch(
    `${API_BASE_URL}/competitions/${competitionId}/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
};

export const getParticipation = async (
  competitionId: string,
  email: string,
) => {
  const response = await fetch(
    `${API_BASE_URL}/competitions/${competitionId}/participation?email=${encodeURIComponent(
      email,
    )}`,
  );

  if (!response.ok) {
    throw new Error('Failed to check participation');
  }

  return response.json();
};
