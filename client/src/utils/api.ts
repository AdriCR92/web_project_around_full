import type { CardData, UserData } from "../types/types";

type ApiOptions = {
  baseUrl: string;
  headers: HeadersInit;
};

class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private async _checkResponse<T>(res: Response): Promise<T>{
    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }

  //methods for user data
  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return this._checkResponse<UserData>(res);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });

    return this._checkResponse<CardData[]>(res);
  }

  async updateUserProfile(
    name: string, 
    about: string
  ): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });

    return this._checkResponse<UserData>(res);
  }

  async addCard(name: string, link: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });

    return this._checkResponse<CardData>(res);
  }

  async deleteCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._checkResponse<CardData>(res);
  }

  async addLike(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });

    return this._checkResponse<CardData>(res);
  }

  async removeLike(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._checkResponse<CardData>(res);
  }

  async updateAvatar(avatar: string): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });

    return this._checkResponse<UserData>(res);
  }
}

// Configuration for the API instance
const apiConfig = {
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);

export default api;