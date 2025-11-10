import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  Car,
  Shield,
  Zap
} from "lucide-react";
import logoImage from "figma:asset/3093bb845f485984ff57f69a77a069fed95267c8.png";

interface RegisterScreenProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de validación
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }
    onRegister();
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
            <h2 className="text-white">Únete a DriveCheck</h2>
            <p className="text-slate-200">
              Crea tu cuenta y accede a todas las herramientas para mantener
              tu vehículo en perfectas condiciones.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Tutoriales Interactivos</h4>
                <p className="text-slate-600 text-sm">
                  Aprende a realizar mantenimientos con guías paso a paso
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Recordatorios Inteligentes</h4>
                <p className="text-slate-600 text-sm">
                  Nunca olvides un mantenimiento importante
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Estadísticas Detalladas</h4>
                <p className="text-slate-600 text-sm">
                  Monitorea el estado de tu vehículo en tiempo real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Registro */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-2xl border border-white/20 bg-white/95 backdrop-blur-md">
            <CardHeader className="space-y-3 pb-6">
              <div className="md:hidden flex items-center justify-center mb-4">
                <img src={logoImage} alt="DriveCheck Logo" className="h-12 sm:h-14 w-auto" />
              </div>
              <CardTitle className="text-center md:text-left">Crear Cuenta</CardTitle>
              <CardDescription className="text-center md:text-left">
                Completa tus datos para empezar
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Juan Pérez"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-input-background h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Mínimo 8 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-input-background h-12"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-slate-600 leading-relaxed cursor-pointer"
                  >
                    Acepto los{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      términos y condiciones
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      política de privacidad
                    </a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-900 to-green-600 hover:from-blue-800 hover:to-green-500 h-12 shadow-md"
                >
                  Crear Cuenta
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-4 px-4 sm:px-6 pb-6">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    ¿Ya tienes cuenta?
                  </span>
                </div>
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full h-12"
                onClick={onBackToLogin}
              >
                Iniciar Sesión
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
