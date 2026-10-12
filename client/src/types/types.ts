export type PopupConfig = {
  title?: string;
  children: React.ReactNode;
};

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface CurrentUserContextType {
  currentUser: UserData | null; 
  handleUpdateUser: (
    name: string, 
    about: string
  ) => Promise<void>;
  handleUpdateAvatar: (
    avatarUrl: string
  ) => Promise<void>;
  handleAddPlaceSubmit: (
    name: string, 
    link: string
  ) => Promise<void>;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner : string;
  createdAt: string;
  isLiked: boolean;
}