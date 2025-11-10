import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  Shield,
  Clock
} from "lucide-react";
import logoImage from "figma:asset/3093bb845f485984ff57f69a77a069fed95267c8.png";

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el email de recuperación
    setEmailSent(true);
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
            <h2 className="text-white">Recupera tu Acceso</h2>
            <p className="text-slate-200">
              No te preocupes, te ayudaremos a recuperar el acceso a tu cuenta
              de forma rápida y segura.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Verificación por Email</h4>
                <p className="text-slate-600 text-sm">
                  Recibirás un enlace seguro en tu correo electrónico
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Proceso Seguro</h4>
                <p className="text-slate-600 text-sm">
                  Tu información está protegida con encriptación
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-slate-900 mb-1">Rápido y Fácil</h4>
                <p className="text-slate-600 text-sm">
                  El proceso toma menos de 2 minutos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Recuperación de contraseña */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-2xl border border-white/20 bg-white/95 backdrop-blur-md">
            <CardHeader className="space-y-3 pb-6">
              <div className="md:hidden flex items-center justify-center mb-4">
                <img src={logoImage} alt="DriveCheck Logo" className="h-12 sm:h-14 w-auto" />
              </div>
              
              {!emailSent ? (
                <>
                  <CardTitle className="text-center md:text-left">
                    ¿Olvidaste tu Contraseña?
                  </CardTitle>
                  <CardDescription className="text-center md:text-left">
                    Ingresa tu correo electrónico y te enviaremos instrucciones
                    para restablecer tu contraseña
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-center">
                    ¡Email Enviado!
                  </CardTitle>
                  <CardDescription className="text-center">
                    Revisa tu bandeja de entrada y sigue las instrucciones
                    para restablecer tu contraseña
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="px-4 sm:px-6 space-y-5">
              {!emailSent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                    <p className="text-xs text-slate-500 mt-2">
                      Te enviaremos un enlace de recuperación a este correo
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-900 to-green-600 hover:from-blue-800 hover:to-green-500 h-12 shadow-md"
                  >
                    Enviar Instrucciones
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 text-center">
                      Si no recibes el correo en unos minutos, revisa tu carpeta
                      de spam o correo no deseado.
                    </p>
                  </div>
                  
                  <Button 
                    type="button"
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full h-12"
                  >
                    Enviar Nuevamente
                  </Button>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    ¿Ya recordaste?
                  </span>
                </div>
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full h-12"
                onClick={onBackToLogin}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
