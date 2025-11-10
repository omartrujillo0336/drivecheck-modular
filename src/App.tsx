import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { Dashboard } from "./components/Dashboard";

type Screen = "loading" | "login" | "register" | "forgot-password" | "dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("loading");

  // Prevenir zoom en iOS cuando se hace doble tap
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventDefault);
    };
  }, []);

  const handleLoadingComplete = () => {
    setCurrentScreen("login");
  };

  const handleLogin = () => {
    setCurrentScreen("dashboard");
  };

  const handleRegister = () => {
    setCurrentScreen("dashboard");
  };

  const handleGoToRegister = () => {
    setCurrentScreen("register");
  };

  const handleGoToForgotPassword = () => {
    setCurrentScreen("forgot-password");
  };

  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
  };

  return (
    <div className="size-full">
      {currentScreen === "loading" && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      {currentScreen === "login" && (
        <LoginScreen 
          onLogin={handleLogin}
          onGoToRegister={handleGoToRegister}
          onGoToForgotPassword={handleGoToForgotPassword}
        />
      )}
      {currentScreen === "register" && (
        <RegisterScreen 
          onRegister={handleRegister}
          onBackToLogin={handleBackToLogin}
        />
      )}
      {currentScreen === "forgot-password" && (
        <ForgotPasswordScreen 
          onBackToLogin={handleBackToLogin}
        />
      )}
      {currentScreen === "dashboard" && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
