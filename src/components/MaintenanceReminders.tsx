import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { 
  Bell,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Wrench,
  Droplet,
  Wind,
  Battery,
  Car
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  category: string;
  status: "pending" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  lastService?: Date;
  nextService: Date;
  icon: string;
}

export function MaintenanceReminders() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDateReminders, setSelectedDateReminders] = useState<Reminder[]>([]);

  const reminders: Reminder[] = [
    {
      id: "1",
      title: "Cambio de Aceite",
      description: "Cambiar aceite y filtro del motor",
      dueDate: new Date(2025, 9, 25),
      category: "Motor",
      status: "overdue",
      priority: "high",
      lastService: new Date(2025, 3, 20),
      nextService: new Date(2025, 9, 25),
      icon: "droplet"
    },
    {
      id: "2",
      title: "Rotación de Neumáticos",
      description: "Rotar neumáticos y verificar presión",
      dueDate: new Date(2025, 9, 30),
      category: "Neumáticos",
      status: "pending",
      priority: "medium",
      lastService: new Date(2025, 4, 15),
      nextService: new Date(2025, 9, 30),
      icon: "car"
    },
    {
      id: "3",
      title: "Revisión de Frenos",
      description: "Inspeccionar pastillas y discos de freno",
      dueDate: new Date(2025, 10, 5),
      category: "Frenos",
      status: "pending",
      priority: "high",
      lastService: new Date(2025, 4, 10),
      nextService: new Date(2025, 10, 5),
      icon: "wrench"
    },
    {
      id: "4",
      title: "Cambio de Filtro de Aire",
      description: "Reemplazar filtro de aire del motor",
      dueDate: new Date(2025, 10, 15),
      category: "Filtros",
      status: "pending",
      priority: "low",
      lastService: new Date(2025, 3, 15),
      nextService: new Date(2025, 10, 15),
      icon: "wind"
    },
    {
      id: "5",
      title: "Revisión de Batería",
      description: "Verificar carga y terminales de batería",
      dueDate: new Date(2025, 9, 28),
      category: "Eléctrico",
      status: "pending",
      priority: "medium",
      lastService: new Date(2025, 6, 1),
      nextService: new Date(2025, 9, 28),
      icon: "battery"
    },
    {
      id: "6",
      title: "Cambio de Líquido de Frenos",
      description: "Reemplazar líquido de frenos completo",
      dueDate: new Date(2025, 9, 22),
      category: "Frenos",
      status: "completed",
      priority: "medium",
      lastService: new Date(2025, 9, 22),
      nextService: new Date(2026, 9, 22),
      icon: "droplet"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "droplet":
        return <Droplet className="w-5 h-5" />;
      case "car":
        return <Car className="w-5 h-5" />;
      case "wrench":
        return <Wrench className="w-5 h-5" />;
      case "wind":
        return <Wind className="w-5 h-5" />;
      case "battery":
        return <Battery className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "pending":
        return "Pendiente";
      case "overdue":
        return "Vencido";
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingReminders = reminders.filter(r => r.status === "pending" || r.status === "overdue");
  const completedReminders = reminders.filter(r => r.status === "completed");

  // Función para verificar si una fecha tiene recordatorios
  const hasReminders = (checkDate: Date) => {
    return reminders.filter(reminder => {
      const reminderDate = reminder.nextService;
      return reminderDate.getDate() === checkDate.getDate() &&
             reminderDate.getMonth() === checkDate.getMonth() &&
             reminderDate.getFullYear() === checkDate.getFullYear();
    });
  };

  // Manejar selección de fecha
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const dateReminders = hasReminders(selectedDate);
      setSelectedDateReminders(dateReminders);
    } else {
      setSelectedDateReminders([]);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-slate-900 mb-2">Recordatorios de Mantenimiento</h2>
          <p className="text-slate-600">
            Mantén tu vehículo en óptimas condiciones con recordatorios programados
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Recordatorio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Recordatorio</DialogTitle>
              <DialogDescription>
                Agrega un nuevo recordatorio de mantenimiento para tu vehículo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-title">Título</Label>
                <Input id="reminder-title" placeholder="Ej: Cambio de aceite" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-category">Categoría</Label>
                <Select>
                  <SelectTrigger id="reminder-category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motor">Motor</SelectItem>
                    <SelectItem value="frenos">Frenos</SelectItem>
                    <SelectItem value="neumaticos">Neumáticos</SelectItem>
                    <SelectItem value="filtros">Filtros</SelectItem>
                    <SelectItem value="electrico">Eléctrico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-priority">Prioridad</Label>
                <Select>
                  <SelectTrigger id="reminder-priority">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-date">Fecha de vencimiento</Label>
                <Input id="reminder-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-description">Descripción</Label>
                <Input id="reminder-description" placeholder="Detalles del mantenimiento" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsDialogOpen(false)}>
                Crear Recordatorio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total</p>
                <p className="text-slate-900 mt-1">{reminders.length}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg shadow-sm">
                <Bell className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Pendientes</p>
                <p className="text-slate-900 mt-1">
                  {reminders.filter(r => r.status === "pending").length}
                </p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Vencidos</p>
                <p className="text-slate-900 mt-1">
                  {reminders.filter(r => r.status === "overdue").length}
                </p>
              </div>
              <div className="bg-red-600 p-3 rounded-lg shadow-sm">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completados</p>
                <p className="text-slate-900 mt-1">
                  {reminders.filter(r => r.status === "completed").length}
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-[1fr,380px] gap-6">
        {/* Lista de recordatorios */}
        <div className="space-y-6 order-2 lg:order-1">
          {/* Recordatorios próximos y vencidos */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>Próximos y Vencidos</CardTitle>
              <CardDescription>
                Tareas de mantenimiento que requieren tu atención
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReminders.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <p>¡Todo al día! No hay recordatorios pendientes</p>
                </div>
              ) : (
                upcomingReminders.map((reminder) => {
                  const daysUntil = getDaysUntil(reminder.nextService);
                  const isOverdue = reminder.status === "overdue";
                  return (
                    <div
                      key={reminder.id}
                      className={`flex flex-col sm:flex-row sm:items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-all ${
                        isOverdue ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className={`p-3 rounded-lg shadow-sm ${
                        isOverdue ? "bg-red-600" : "bg-blue-600"
                      }`}>
                        <div className="text-white">
                          {getIcon(reminder.icon)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <h4 className="text-slate-900">{reminder.title}</h4>
                          <Badge className={getStatusColor(reminder.status)}>
                            {getStatusText(reminder.status)}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{reminder.description}</p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(reminder.nextService)}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 ${getPriorityColor(reminder.priority)}`}>
                            <AlertCircle className="w-4 h-4" />
                            <span>{reminder.priority === "high" ? "Alta" : reminder.priority === "medium" ? "Media" : "Baja"}</span>
                          </div>
                          {daysUntil < 0 ? (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 rounded text-red-700">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Vencido hace {Math.abs(daysUntil)} días</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-100 rounded text-blue-700">
                              <Clock className="w-3.5 h-3.5" />
                              <span>En {daysUntil} días</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto hover:bg-green-50 hover:text-green-700 hover:border-green-300">
                        <CheckCircle2 className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Completar</span>
                      </Button>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Recordatorios completados */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>Completados Recientemente</CardTitle>
              <CardDescription>
                Historial de mantenimientos realizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedReminders.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                  <p>No hay tareas completadas recientemente</p>
                </div>
              ) : (
                completedReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 border border-green-200 rounded-lg bg-gradient-to-r from-green-50/50 to-white"
                  >
                    <div className="p-3 rounded-lg bg-green-600 shadow-sm">
                      <div className="text-white">
                        {getIcon(reminder.icon)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h4 className="text-slate-900">{reminder.title}</h4>
                        <Badge className={getStatusColor(reminder.status)}>
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {getStatusText(reminder.status)}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{reminder.description}</p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Realizado: {formatDate(reminder.lastService!)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="w-4 h-4 text-blue-600" />
                          <span>Próximo: {formatDate(reminder.nextService)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Calendario e Información */}
        <div className="space-y-6 order-1 lg:order-2">
          {/* Calendario */}
          <Card className="shadow-md border-blue-200 bg-gradient-to-br from-blue-50/50 to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Calendario de Mantenimiento</CardTitle>
                  <CardDescription className="text-xs">Selecciona una fecha</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="w-full"
                  modifiers={{
                    overdue: (date) => {
                      const dateReminders = hasReminders(date);
                      return dateReminders.some(r => r.status === "overdue");
                    },
                    pending: (date) => {
                      const dateReminders = hasReminders(date);
                      return dateReminders.some(r => r.status === "pending") && 
                             !dateReminders.some(r => r.status === "overdue");
                    },
                    completed: (date) => {
                      const dateReminders = hasReminders(date);
                      return dateReminders.length > 0 && 
                             dateReminders.every(r => r.status === "completed");
                    }
                  }}
                  modifiersStyles={{
                    overdue: { 
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      fontWeight: 'bold',
                      border: '2px solid #dc2626'
                    },
                    pending: { 
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      fontWeight: 'bold',
                      border: '2px solid #3b82f6'
                    },
                    completed: { 
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </div>

              {/* Leyenda */}
              <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                <p className="text-slate-700 text-xs mb-2">Leyenda:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-red-600 bg-red-100"></div>
                    <span className="text-xs text-slate-600">Vencido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-100"></div>
                    <span className="text-xs text-slate-600">Pendiente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100"></div>
                    <span className="text-xs text-slate-600">Completado</span>
                  </div>
                </div>
              </div>

              {/* Recordatorios de la fecha seleccionada */}
              {selectedDateReminders.length > 0 && (
                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                  <p className="text-slate-900 text-sm mb-2">
                    {formatDate(date!)}
                  </p>
                  <div className="space-y-2">
                    {selectedDateReminders.map((reminder) => (
                      <div 
                        key={reminder.id}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          reminder.status === "overdue" ? "bg-red-50 border border-red-200" :
                          reminder.status === "pending" ? "bg-blue-50 border border-blue-200" :
                          "bg-green-50 border border-green-200"
                        }`}
                      >
                        <div className={`p-1.5 rounded ${
                          reminder.status === "overdue" ? "bg-red-600" :
                          reminder.status === "pending" ? "bg-blue-600" :
                          "bg-green-600"
                        }`}>
                          <div className="text-white">
                            {getIcon(reminder.icon)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-900 truncate">{reminder.title}</p>
                          <Badge className={`${getStatusColor(reminder.status)} text-xs px-1.5 py-0 h-auto mt-1`}>
                            {getStatusText(reminder.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Intervalos Recomendados */}
          <Card className="shadow-sm border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wrench className="w-4 h-4 text-green-600" />
                </div>
                <CardTitle className="text-base">Intervalos Recomendados</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">Aceite</span>
                </div>
                <span className="text-slate-900 text-sm">5,000 km</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">Filtro aire</span>
                </div>
                <span className="text-slate-900 text-sm">15,000 km</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">Frenos</span>
                </div>
                <span className="text-slate-900 text-sm">20,000 km</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">Neumáticos</span>
                </div>
                <span className="text-slate-900 text-sm">10,000 km</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 text-sm">Batería</span>
                </div>
                <span className="text-slate-900 text-sm">3 años</span>
              </div>
            </CardContent>
          </Card>

          {/* Consejos de Mantenimiento */}
          <Card className="shadow-sm border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-base">Consejos Útiles</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-sm">
                <p className="text-slate-700 text-sm leading-relaxed">
                  💡 Revisa el nivel de aceite cada 2 semanas para detectar posibles fugas temprano.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-green-200 shadow-sm">
                <p className="text-slate-700 text-sm leading-relaxed">
                  🔧 La presión correcta de neumáticos mejora el rendimiento y la seguridad.
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm">
                <p className="text-slate-700 text-sm leading-relaxed">
                  ⚠️ No ignores las luces del tablero, pueden indicar problemas serios.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
