import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../api/userApi";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    getUser()
      .then((res) => {
        console.log("Fetched user:", res);
        setUser(res);
      })
      .catch((err) => {
        console.error("User fetch failed", err);
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
