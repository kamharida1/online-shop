import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Auth } from "aws-amplify";
import { useFocusEffect, useRouter, useSegments } from "expo-router";
import { Platform } from "react-native";

interface AuthContextType {
  user: any;
  setUser: any;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useFocusEffect(useCallback(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) { 
      // Redirect to the sign-in page.

      if (Platform.OS === 'ios') {
        setTimeout(() => {
          router.replace("/(auth)/sign_in");
        }, 1)
      } else {
        setImmediate(() => {
          router.replace("/(auth)/sign_in");
        })
      }
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      if (Platform.OS === "ios") {
        setTimeout(() => {
          router.replace("/");
        }, 1)
      } else {
        setImmediate(() => {
          router.replace("/");
        });
      }
    }
  }, [user, segments,]));
  
}

export const Provider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useProtectedRoute(user);

  const checkUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await Auth.signIn(username, password);
      checkUser();
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await Auth.signOut();
      setUser(null);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    loading,
    error,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
