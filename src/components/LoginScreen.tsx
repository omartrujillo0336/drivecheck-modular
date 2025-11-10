import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { User, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "figma:asset/3093bb845f485984ff57f69a77a069fed95267c8.png";

interface LoginScreenProps {
  onLogin: () => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onGoToRegister, onGoToForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos login exitoso
    onLogin();
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1581028337168-887b61f494e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjBtZWNoYW5pY3xlbnwxfHx8fDE3NjA3NTgwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="DriveCheck Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-blue-900/90"></div>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 sm:gap-8 items-center relative z-10">
        {/* Panel izquierdo - Información */}
        <div className="hidden md:flex flex-col gap-6 p-8">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="DriveCheck Logo" className="h-10 sm:h-12 w-auto" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-white">Verificación Inteligente de Vehículos</h2>
            <p className="text-slate-200">
              Accede a tutoriales interactivos, recordatorios de mantenimiento preventivo
              y mantén tu vehículo en perfectas condiciones.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1637640125496-31852f042a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMHRvb2xzfGVufDF8fHx8MTc2MDcwMjk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Herramientas mecánicas"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-green-400 mb-1">500+</div>
              <div className="text-slate-200 text-sm">Tutoriales</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-blue-400 mb-1">10K+</div>
              <div className="text-slate-200 text-sm">Usuarios</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-green-400 mb-1">24/7</div>
              <div className="text-slate-200 text-sm">Soporte</div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Login */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-2xl border border-white/20 bg-white/95 backdrop-blur-md">
            <CardHeader className="space-y-3 pb-6">
              <div className="md:hidden flex items-center justify-center mb-4">
                <img src={logoImage} alt="DriveCheck Logo" className="h-12 sm:h-14 w-auto" />
              </div>
              <CardTitle className="text-center md:text-left">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center md:text-left">
                Ingresa tus credenciales para acceder
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-input-background h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-input-background h-12"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4" />
                    <span className="text-slate-600">Recordarme</span>
                  </label>
                  <button 
                    type="button"
                    onClick={onGoToForgotPassword}
                    className="text-blue-600 hover:underline active:text-blue-800"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-900 to-green-600 hover:from-blue-800 hover:to-green-500 h-12 shadow-md">
                  Iniciar Sesión
                </Button>

                <div className="text-center text-sm text-slate-600">
                  ¿No tienes cuenta?{" "}
                  <button 
                    type="button"
                    onClick={onGoToRegister} 
                    className="text-blue-600 hover:underline active:text-blue-800"
                  >
                    Regístrate gratis
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
