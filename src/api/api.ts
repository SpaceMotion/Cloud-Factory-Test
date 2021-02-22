export enum RequestMethodType {
  GET = 'GET',
}

interface RequestConfig {
  method: RequestMethodType;
}

export function fetchAPI(url: string, config: RequestConfig) {
  const defaultConfig = getDefaultConfig();

  return fetch(url, {
    ...defaultConfig,
    method: config.method,
  }).then((response) => {
    return response.json();
  });
}

function getDefaultConfig(): RequestInit {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
