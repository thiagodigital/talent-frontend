// src/types/global.d.ts
import type { IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable;
    Dropzone;

    // FlyonUI
    HSStaticMethods: IStaticMethods;
  }
  // Exemplo: interface global para o usuário autenticado
  interface UserType {
    id: string;
  name: string;
  email: string;
}

interface CollaboratorType {
  id: string?;
  name: string?;
  email: string?;
  phone: string?;
  role_id: string|number;
  profile_category: ProfileCategoryType[]?;
}
interface CollaboratorFormType {
  name: string?;
  email: string?;
  phone: string?;
  role_id: string|number;
}

interface AuthResponse {
  token: string;
  user: UserType;
}

interface ProfileCategoryType {
  id: string;
  name: string;
  color: string;
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

interface ExamDiskType {
  line: number;
  options: ExamDiskOptionType[];

}

interface ExamDiskOptionType {
  id: string;
  category: string;
  color: string;
  name: string[];
}
}

export {};