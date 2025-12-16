export type IThemeType = "light" | "dark" 

export type IStateType = {
  token: string;
  theme: "light" | "dark";
  permissions: string[];
  apiBaseUrl: string;
};

export type IStateActionsType = {
  set: (state: Partial<IStateType>) => void;
  reset: (state?: Partial<IStateType>) => void;
  logout: () => void;
};

export type IGlobalStateType = IStateType & {
  actions: IStateActionsType;
};
