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

export const uploadSubmission = async (
  competitionId: string,
  email: string,
  file: {
    uri: string;
    name: string;
    type: string;
  },
) => {
  const formData = new FormData();

  formData.append('email', email);

  formData.append('submission', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);

  // Note: Do not set Content-Type header manually for multipart/form-data so React Native generates proper boundary
  const response = await fetch(
    `${API_BASE_URL}/competitions/${competitionId}/submission`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Submission upload failed');
  }

  return result;
};
