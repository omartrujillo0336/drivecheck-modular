import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Home,
  BookOpen,
  Bell,
  Settings,
  User,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Crown,
  ChevronDown,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TutorialsModule } from "./TutorialsModule";
import { MaintenanceReminders } from "./MaintenanceReminders";
import { ExpertAssistant } from "./ExpertAssistant";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImage from "figma:asset/3093bb845f485984ff57f69a77a069fed95267c8.png";

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<"home" | "tutorials" | "expert" | "maintenance">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    {
      title: "Tutoriales Completados",
      value: "12",
      total: "45",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Mantenimientos al Día",
      value: "8",
      total: "10",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Recordatorios Pendientes",
      value: "4",
      total: "",
      icon: Bell,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Horas de Aprendizaje",
      value: "28",
      total: "",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const recentActivity = [
    {
      id: "1",
      title: "Completaste: Cambio de Aceite del Motor",
      time: "Hace 2 horas",
      type: "tutorial"
    },
    {
      id: "2",
      title: "Nuevo recordatorio: Revisión de Frenos",
      time: "Hace 5 horas",
      type: "reminder"
    },
    {
      id: "3",
      title: "Completaste: Diagnóstico de Batería",
      time: "Hace 1 día",
      type: "tutorial"
    },
    {
      id: "4",
      title: "Mantenimiento realizado: Cambio de Líquido de Frenos",
      time: "Hace 2 días",
      type: "maintenance"
    }
  ];

  const menuItems = [
    { id: "home", label: "Inicio", icon: Home, badge: null },
    { id: "tutorials", label: "Tutoriales", icon: BookOpen, badge: "3" },
    { id: "expert", label: "Asistente", icon: MessageCircle, badge: null },
    { id: "maintenance", label: "Recordatorios", icon: Bell, badge: "4" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-green-600 border-b border-white/10 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded-lg p-1.5 sm:p-2">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#16a34a" />
                    <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="#1e3a8a" />
                    <path d="M12 12V22" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white leading-none">DriveCheck</span>
                  <span className="hidden sm:block text-white/70 text-xs leading-none">Smart Vehicle Verification</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm" className="relative bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  4
                </span>
              </Button>
              <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                <div className="text-right">
                  <p className="text-white text-sm">Juan Pérez</p>
                  <p className="text-white/70 text-xs">Inspector de Vehículos</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                      <User className="w-5 h-5 mx-auto" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Crown className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>Premium</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setActiveModule("settings")}>
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={onLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative p-2 text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  4
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-3 py-3 space-y-1">
            {/* User info en móvil */}
            <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-green-600 flex items-center justify-center text-white">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-900">Juan Pérez</p>
                <p className="text-slate-500 text-xs">Inspector de Vehículos</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Perfil</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">Premium</span>
            </button>
            <button
              onClick={() => {
                setActiveModule("settings");
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configuración</span>
            </button>
            <div className="border-t pt-2 mt-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="space-y-6 sticky top-24">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveModule(item.id as any)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                          activeModule === item.id
                            ? "bg-gradient-to-r from-blue-900 to-green-600 text-white shadow-md"
                            : "text-slate-600 hover:bg-slate-50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge 
                            variant={activeModule === item.id ? "secondary" : "default"}
                            className={activeModule === item.id ? "bg-white/20 text-white border-white/30" : ""}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Mini card informativa */}
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-900 text-sm">Tu Progreso</p>
                      <p className="text-slate-600 text-xs">26.7% completado</p>
                    </div>
                  </div>
                  <Progress value={26.7} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-6">
            {activeModule === "home" && (
              <div className="space-y-4 sm:space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-900 to-green-600 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-white text-center">
                  <h2 className="text-white mb-2">
                    ¡Bienvenido, Juan!
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    Gestiona el mantenimiento de tu vehículo de manera inteligente
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-sm">
                      <CardContent className="p-4 sm:pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                          <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} w-fit`}>
                            <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                          </div>
                          {stat.total && (
                            <Badge variant="outline" className="text-xs w-fit">
                              {stat.value}/{stat.total}
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm mb-1 line-clamp-2">{stat.title}</p>
                        <p className="text-slate-900 text-lg sm:text-2xl">{stat.value}</p>
                        {stat.total && (
                          <Progress
                            value={(parseInt(stat.value) / parseInt(stat.total)) * 100}
                            className="mt-2 sm:mt-3 h-1.5 sm:h-2"
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Progreso de Aprendizaje */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Progreso de Aprendizaje</CardTitle>
                      <CardDescription>
                        Tu avance en los tutoriales disponibles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-600">Nivel Básico</span>
                          <span className="text-slate-900">8/10</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-600">Nivel Intermedio</span>
                          <span className="text-slate-900">3/20</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-600">Nivel Avanzado</span>
                          <span className="text-slate-900">1/15</span>
                        </div>
                        <Progress value={6.67} className="h-2" />
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="text-slate-900">Progreso Total</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-slate-900">26.7%</span>
                          <span className="text-green-600 text-sm">+5% esta semana</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actividad Reciente */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Actividad Reciente</CardTitle>
                      <CardDescription>
                        Tus últimas acciones en la plataforma
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              activity.type === "tutorial"
                                ? "bg-blue-500"
                                : activity.type === "reminder"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-slate-900 text-sm">{activity.title}</p>
                              <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alertas importantes */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-900 mb-1">Mantenimiento Vencido</h3>
                        <p className="text-slate-600 mb-4">
                          El cambio de aceite de tu vehículo está vencido desde hace 7 días.
                          Te recomendamos realizarlo lo antes posible.
                        </p>
                        <Button
                          size="sm"
                          className="bg-yellow-600 hover:bg-yellow-700"
                          onClick={() => setActiveModule("maintenance")}
                        >
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Acceso rápido */}
                <div className="mt-6">
                  <h3 className="text-slate-900 mb-4">Acceso Rápido</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <button
                      onClick={() => setActiveModule("tutorials")}
                      className="group p-4 sm:p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all active:scale-95"
                    >
                      <div className="p-3 bg-blue-100 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors w-fit">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-slate-900 text-sm">Tutoriales</p>
                    </button>
                    
                    <button
                      onClick={() => setActiveModule("maintenance")}
                      className="group p-4 sm:p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-green-300 hover:shadow-lg transition-all active:scale-95"
                    >
                      <div className="p-3 bg-green-100 rounded-xl mb-3 group-hover:bg-green-200 transition-colors w-fit">
                        <Bell className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-slate-900 text-sm">Recordatorios</p>
                    </button>
                    
                    <button
                      onClick={() => setActiveModule("settings")}
                      className="group p-4 sm:p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-purple-300 hover:shadow-lg transition-all active:scale-95"
                    >
                      <div className="p-3 bg-purple-100 rounded-xl mb-3 group-hover:bg-purple-200 transition-colors w-fit">
                        <Settings className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-slate-900 text-sm">Configuración</p>
                    </button>
                    
                    <button className="group p-4 sm:p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-orange-300 hover:shadow-lg transition-all active:scale-95">
                      <div className="p-3 bg-orange-100 rounded-xl mb-3 group-hover:bg-orange-200 transition-colors w-fit">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-slate-900 text-sm">Mi Perfil</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "tutorials" && <TutorialsModule />}
            {activeModule === "expert" && <ExpertAssistant />}
            {activeModule === "maintenance" && <MaintenanceReminders />}
            {activeModule === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                  <CardDescription>
                    Personaliza tu experiencia en MechanicPro
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Panel de configuración próximamente disponible
                  </p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-4 h-16">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as any)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
                activeModule === item.id
                  ? "text-blue-600"
                  : "text-slate-500"
              }`}
            >
              {item.badge && (
                <span className="absolute top-2 right-1/4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${activeModule === item.id ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs">{item.label}</span>
              {activeModule === item.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-900 to-green-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
