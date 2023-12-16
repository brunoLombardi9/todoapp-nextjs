import AppContainer from "@/components/AppContainer";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthContext from "@/contexts/AuthContext";
import Theme from "@/contexts/ThemeContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  // const { pathname } = useRouter();
  // let needsAuth = true;
  // if (pathname === "/login" || pathname === "/signup") {
  //   needsAuth = false;
  // }

  return (
    <AuthContext>
      <Theme>
        <AppContainer>
          {/* <ProtectedRoute needsAuth={needsAuth}> */}
          <Component {...pageProps} />
          {/* </ProtectedRoute> */}
        </AppContainer>
      </Theme>
    </AuthContext>
  );
}
