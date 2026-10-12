const BASE_URL =
  "https://se-register-api.en.tripleten-services.com/v1";

type AuthData = {
  email: string;
  password: string;
};

async function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

// Function to register a new user
export async function register({
  email,
  password,
}: AuthData) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return checkResponse(res);
}

// Function to log in a user and receive a token
type SigninResponse = {
  token: string;
};

export async function login({
  email,
  password,
}: AuthData): Promise<SigninResponse> {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return checkResponse<SigninResponse>(res);
}


// Function to check the validity of a token and get user data
type CheckTokenResponse = {
  data: {
    _id: string;
    email: string;
  };
};

export async function checkToken(
  token: string
): Promise<CheckTokenResponse> {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse<CheckTokenResponse>(res);
}