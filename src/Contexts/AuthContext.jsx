import { createContext, useEffect } from "react";
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useReducer } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "AUTH_READY":
      return { ...state, authReady: true };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  let [state, dispatch] = useReducer(
    AuthReducer,{ user: null, authReady: false },
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_READY" });
      if (user) {
        dispatch({ type: "LOG_IN", payload: user });
      } else {
        dispatch({ type: "LOG_OUT" });
      }
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };
