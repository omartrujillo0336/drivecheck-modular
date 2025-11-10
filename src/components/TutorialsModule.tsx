import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Search, 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock,
  Wrench,
  Zap,
  Settings,
  AlertTriangle,
  Star
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  duration: string;
  steps: number;
  completed: boolean;
  rating: number;
  image: string;
}

export function TutorialsModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "Cambio de Aceite del Motor",
      description: "Aprende a cambiar el aceite de tu vehículo de manera profesional",
      category: "Mantenimiento",
      difficulty: "Básico",
      duration: "30 min",
      steps: 8,
      completed: true,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1758189414325-2fffb2ecb2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZW5naW5lfGVufDF8fHx8MTc2MDc1MTUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      title: "Reemplazo de Pastillas de Freno",
      description: "Guía paso a paso para cambiar las pastillas de freno de forma segura",
      category: "Frenos",
      difficulty: "Intermedio",
      duration: "45 min",
      steps: 12,
      completed: false,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtYWludGVuYW5jZXxlbnwxfHx8fDE3NjA3Mjc1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      title: "Diagnóstico de Batería",
      description: "Cómo verificar y mantener la batería de tu automóvil",
      category: "Eléctrico",
      difficulty: "Básico",
      duration: "20 min",
      steps: 6,
      completed: false,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1637640125496-31852f042a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMHRvb2xzfGVufDF8fHx8MTc2MDcwMjk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "4",
      title: "Sincronización de Motor",
      description: "Tutorial avanzado para sincronizar el motor correctamente",
      category: "Motor",
      difficulty: "Avanzado",
      duration: "90 min",
      steps: 15,
      completed: false,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1758189414325-2fffb2ecb2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZW5naW5lfGVufDF8fHx8MTc2MDc1MTUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "5",
      title: "Revisión de Neumáticos",
      description: "Inspección y mantenimiento correcto de los neumáticos",
      category: "Mantenimiento",
      difficulty: "Básico",
      duration: "15 min",
      steps: 5,
      completed: true,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtYWludGVuYW5jZXxlbnwxfHx8fDE3NjA3Mjc1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "6",
      title: "Solución de Problemas del Sistema de Enfriamiento",
      description: "Identifica y resuelve problemas comunes del sistema de refrigeración",
      category: "Motor",
      difficulty: "Intermedio",
      duration: "60 min",
      steps: 10,
      completed: false,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1758189414325-2fffb2ecb2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwZW5naW5lfGVufDF8fHx8MTc2MDc1MTUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const tutorialSteps = [
    {
      number: 1,
      title: "Preparación del Área de Trabajo",
      content: "Estaciona el vehículo en una superficie nivelada y asegúrate de tener todas las herramientas necesarias.",
      completed: true
    },
    {
      number: 2,
      title: "Seguridad Primero",
      content: "Usa guantes de protección y gafas. Asegúrate de que el motor esté frío antes de comenzar.",
      completed: true
    },
    {
      number: 3,
      title: "Localiza el Tapón de Drenaje",
      content: "Ubica el tapón de drenaje del aceite en la parte inferior del cárter. Consulta el manual si es necesario.",
      completed: false
    },
    {
      number: 4,
      title: "Drena el Aceite Usado",
      content: "Coloca el recipiente debajo y afloja el tapón. Deja que el aceite drene completamente.",
      completed: false
    },
    {
      number: 5,
      title: "Reemplaza el Filtro",
      content: "Retira el filtro de aceite viejo y instala uno nuevo. Aplica una capa fina de aceite nuevo al sello.",
      completed: false
    },
    {
      number: 6,
      title: "Agrega Aceite Nuevo",
      content: "Vierte la cantidad recomendada de aceite nuevo. Verifica el nivel con la varilla medidora.",
      completed: false
    },
    {
      number: 7,
      title: "Verifica Fugas",
      content: "Enciende el motor y déjalo funcionar por 1-2 minutos. Inspecciona si hay fugas.",
      completed: false
    },
    {
      number: 8,
      title: "Finalización",
      content: "Apaga el motor, verifica el nivel de aceite nuevamente y registra el cambio en tu historial.",
      completed: false
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico": return "bg-green-100 text-green-700 border-green-200";
      case "Intermedio": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Avanzado": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mantenimiento": return <Wrench className="w-4 h-4" />;
      case "Eléctrico": return <Zap className="w-4 h-4" />;
      case "Motor": return <Settings className="w-4 h-4" />;
      case "Frenos": return <AlertTriangle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  if (selectedTutorial) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedTutorial(null)}
            className="shrink-0 h-10 px-3"
          >
            ← Volver
          </Button>
          <div className="min-w-0">
            <h2 className="text-slate-900 truncate">{selectedTutorial.title}</h2>
            <p className="text-slate-600 text-sm sm:text-base line-clamp-2">{selectedTutorial.description}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Área principal del tutorial */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-200 overflow-hidden">
                  <ImageWithFallback
                    src={selectedTutorial.image}
                    alt={selectedTutorial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                      <Badge className={getDifficultyColor(selectedTutorial.difficulty)}>
                        {selectedTutorial.difficulty}
                      </Badge>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{selectedTutorial.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedTutorial.rating}</span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-900 to-green-600 hover:from-blue-800 hover:to-green-500 h-10 sm:h-auto w-full sm:w-auto">
                      <Play className="w-4 h-4 mr-2" />
                      Ver Video
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-slate-900">Pasos del Tutorial</h3>
                      <span className="text-slate-600">
                        Paso {currentStep + 1} de {tutorialSteps.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tutorialSteps.map((step, index) => (
                        <div
                          key={step.number}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            index === currentStep
                              ? "border-blue-500 bg-blue-50"
                              : step.completed
                              ? "border-green-200 bg-green-50"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                          onClick={() => setCurrentStep(index)}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              {step.completed ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  index === currentStep ? "border-blue-600 text-blue-600" : "border-slate-300 text-slate-400"
                                }`}>
                                  {step.number}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-slate-900">{step.title}</h4>
                              {index === currentStep && (
                                <p className="text-slate-600 mt-2">{step.content}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 sm:gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-11"
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep(currentStep - 1)}
                      >
                        Anterior
                      </Button>
                      <Button
                        className="flex-1 h-11 bg-gradient-to-r from-blue-900 to-green-600 hover:from-blue-800 hover:to-green-500"
                        disabled={currentStep === tutorialSteps.length - 1}
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con información adicional */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Herramientas Necesarias</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Llave de tubo
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Recipiente para aceite
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Filtro de aceite nuevo
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Aceite de motor (4-5 litros)
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Guantes de protección
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Gafas de seguridad
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consejos de Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm">
                    Siempre trabaja con el motor frío para evitar quemaduras.
                  </p>
                </div>
                <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm">
                    Usa gatos y soportes adecuados, nunca trabajes solo con el gato.
                  </p>
                </div>
                <div className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm">
                    Desecha el aceite usado en un centro de reciclaje autorizado.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progreso General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Completado</span>
                    <span className="text-blue-600">
                      {tutorialSteps.filter(s => s.completed).length}/{tutorialSteps.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(tutorialSteps.filter(s => s.completed).length / tutorialSteps.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Marcar como Completado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Tutoriales Interactivos</h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Aprende a realizar mantenimientos y reparaciones con guías paso a paso
        </p>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Buscar tutoriales..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white h-11 sm:h-10"
        />
      </div>

      {/* Pestañas de categorías */}
      <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-slate-100 w-full sm:w-auto flex-wrap h-auto p-1">
          <TabsTrigger value="all" className="flex-1 sm:flex-initial text-xs sm:text-sm">Todos</TabsTrigger>
          <TabsTrigger value="mantenimiento" className="flex-1 sm:flex-initial text-xs sm:text-sm">Mantenimiento</TabsTrigger>
          <TabsTrigger value="motor" className="flex-1 sm:flex-initial text-xs sm:text-sm">Motor</TabsTrigger>
          <TabsTrigger value="electrico">Eléctrico</TabsTrigger>
          <TabsTrigger value="frenos">Frenos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedTutorial(tutorial)}
              >
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <ImageWithFallback
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  {tutorial.completed && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Completado</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(tutorial.category)}
                      {tutorial.category}
                    </Badge>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1">{tutorial.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {tutorial.rating}
                    </div>
                    <div>{tutorial.steps} pasos</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mantenimiento">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials
              .filter(t => t.category === "Mantenimiento")
              .map((tutorial) => (
                <Card
                  key={tutorial.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTutorial(tutorial)}
                >
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <ImageWithFallback
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                    />
                    {tutorial.completed && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Completado</span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-1">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {tutorial.rating}
                      </div>
                      <div>{tutorial.steps} pasos</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Otros TabsContent para las demás categorías */}
        <TabsContent value="motor">
          {filteredTutorials.filter(t => t.category === "Motor").length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials
                .filter(t => t.category === "Motor")
                .map((tutorial) => (
                  <Card
                    key={tutorial.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedTutorial(tutorial)}
                  >
                    <div className="aspect-video bg-slate-200 relative overflow-hidden">
                      <ImageWithFallback
                        src={tutorial.image}
                        alt={tutorial.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                      <CardTitle className="line-clamp-1">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No hay tutoriales en esta categoría
            </div>
          )}
        </TabsContent>

        <TabsContent value="electrico">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials
              .filter(t => t.category === "Eléctrico")
              .map((tutorial) => (
                <Card
                  key={tutorial.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTutorial(tutorial)}
                >
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <ImageWithFallback
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                    <CardTitle className="line-clamp-1">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="frenos">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials
              .filter(t => t.category === "Frenos")
              .map((tutorial) => (
                <Card
                  key={tutorial.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTutorial(tutorial)}
                >
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <ImageWithFallback
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                    <CardTitle className="line-clamp-1">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
