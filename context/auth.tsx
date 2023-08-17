// AuthContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter, useSegments } from "expo-router";
import { StackActions, useNavigation } from "@react-navigation/core";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";


interface User {
  user: CognitoUser;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useProtectedRoute(user) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const nav = useNavigation();
  React.useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      rootSegment !== "(auth)"
    ) {
      // nav.dispatch(
      //   StackActions.replace("(auth)/sign-in", {
      //     // user: 'jane',
      //   })
      // );
      // Redirect to the sign-in page.
      router.replace("/sign_in");
    } else if (user && rootSegment !== "(app)") {
      // Redirect away from the sign-in page.
      router.replace("/");
      // router.replace("/compose");
      // nav.dispatch(
      //   StackActions.replace("(app)", {
      //     // user: 'jane',
      //   })
      // );
    }
  }, [user, rootSegment]);
}


// function useProtectedRoute(user: User) {
//   const segments = useSegments();
//   const router = useRouter();

//   useFocusEffect(useCallback(() => {
//     const inAuthGroup = segments[0] === '(auth)';
//     if (
//       // If the user is not signed in and the initial segment is not anything in the auth group.
//       !user &&
//       !inAuthGroup
//     ) {
//       // Redirect to the sign-in page.
//       router.replace("/sign_in");
//     } else if (user && inAuthGroup) {
//       // Redirect away from the sign-in page.
//       router.replace('/');
//     }
//   }, [user, segments]));
  
// }


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  useProtectedRoute(user);

  const loadUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      if (userData) {
        setUser(userData);
      }
      setLoading(false);
    } catch (error) {
      setUser(null);
      console.error("Error loading user ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{user, setUser, loading}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
