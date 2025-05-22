import { createContext } from "react";

type UserContextType = {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
};

const AuthContextIntialValue = {
  setUserName: () => {},
  userName: "",
};

export const AuthContext = createContext<UserContextType>(
  AuthContextIntialValue
);
