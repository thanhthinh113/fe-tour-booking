import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userProfile");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        const success = await fetchUserProfile(token);
        if (!success) logout();
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [token]);

  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch(
        "http://tour.phamhuuthuan.io.vn:8080/customer/profile",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("userProfile", JSON.stringify(userData)); // Lưu user vào localStorage
        setIsAuthenticated(true);
        return true;
      } else {
        console.warn("Invalid token during fetch profile");
        return false;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return false;
    }
  };

  const login = async (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    const success = await fetchUserProfile(newToken);
    if (!success) {
      logout();
      return false;
    }
    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfile"); // Xóa user khi logout
  };

  const checkAuth = async () => {
    const savedToken = localStorage.getItem("accessToken");
    if (!savedToken) {
      logout();
      return false;
    }
    const valid = await fetchUserProfile(savedToken);
    if (!valid) {
      logout();
      return false;
    }
    return true;
  };

  const value = {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
