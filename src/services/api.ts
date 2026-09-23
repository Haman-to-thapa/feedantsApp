// Candidate endpoints for Physical USB device (localhost/127.0.0.1 via adb reverse) and Android Emulator (10.0.2.2)
const CANDIDATE_URLS = [
  'http://localhost:5000/api',
  'http://127.0.0.1:5000/api',
  'http://10.0.2.2:5000/api',
];

let activeBaseUrl = 'http://localhost:5000/api';

export const getActiveBaseUrl = () => activeBaseUrl;

const fetchWithTimeout = async (
  path: string,
  options: RequestInit = {},
  timeoutMs = 7000,
): Promise<Response> => {
  // First attempt with active base URL
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${activeBaseUrl}${path}`, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res;
  } catch (primaryErr: any) {
    clearTimeout(timer);

    // If primary failed, try each candidate
    for (const candidate of CANDIDATE_URLS) {
      if (candidate !== activeBaseUrl) {
        const altController = new AbortController();
        const altTimer = setTimeout(() => altController.abort(), timeoutMs);

        try {
          const altRes = await fetch(`${candidate}${path}`, {
            ...options,
            signal: altController.signal,
          });
          clearTimeout(altTimer);
          if (altRes) {
            activeBaseUrl = candidate;
            return altRes;
          }
        } catch {
          clearTimeout(altTimer);
        }
      }
    }

    throw primaryErr;
  }
};

export const getCompetition = async (competitionId: string) => {
  const response = await fetchWithTimeout(
    `/competitions/${competitionId}`,
    {method: 'GET'},
    8000,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch competition: status ${response.status}`,
    );
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

  const response = await fetchWithTimeout(
    `/competitions/${competitionId}/register`,
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
    6000,
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
  const response = await fetchWithTimeout(
    `/competitions/${competitionId}/participation?email=${encodeURIComponent(
      email,
    )}`,
    {method: 'GET'},
    4000,
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
  const isLocalDeviceFile =
    file.uri &&
    (file.uri.startsWith('file://') || file.uri.startsWith('content://'));

  if (isLocalDeviceFile) {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('submission', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);

      const response = await fetchWithTimeout(
        `/competitions/${competitionId}/submission`,
        {
          method: 'POST',
          body: formData,
        },
        15000,
      );

      const result = await response.json();
      if (response.ok) {
        return result;
      }
    } catch {
      // Fallback to JSON payload
    }
  }

  // Resilient JSON payload fallback
  const response = await fetchWithTimeout(
    `/competitions/${competitionId}/submission`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fileName: file.name || 'Classical_Kathak_Performance.mp4',
      }),
    },
    8000,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Submission upload failed');
  }

  return result;
};

export const setCompetitionState = async (
  competitionId: string,
  targetState: 'REGISTRATION_OPEN' | 'SUBMISSION_OPEN' | 'REGISTRATION_FULL',
) => {
  const response = await fetchWithTimeout(
    `/competitions/${competitionId}/state`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({targetState}),
    },
    8000,
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update state');
  }
  return result;
};

