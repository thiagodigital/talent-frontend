// src/types/global.d.ts

// Exemplo: interface global para o usuário autenticado
interface UserType {
  id: string;
  name: string;
  email: string;
}

interface CollaboratorType {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_category: ProfileCategoryType[];
}

interface AuthResponse {
  token: string;
  user: UserType;
}

interface ProfileCategoryType {
  id: string;
  name: string;
  traits: ProfileTraitType[];
}

interface ProfileTraitType {
  id: string;
  name: string;
  score: number;
}

// Variáveis de ambiente tipadas
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
