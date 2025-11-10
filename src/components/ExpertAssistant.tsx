import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import {
  Bot,
  Send,
  User,
  Wrench,
  AlertCircle,
  Settings,
  Zap,
  Droplet,
  Wind,
  Gauge,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  helpful?: boolean;
}

const quickQuestions = [
  {
    icon: Wrench,
    text: "Mi auto hace un ruido extraño",
    category: "Diagnóstico"
  },
  {
    icon: AlertCircle,
    text: "Luz de check engine encendida",
    category: "Alertas"
  },
  {
    icon: Droplet,
    text: "Pérdida de líquido bajo el auto",
    category: "Fugas"
  },
  {
    icon: Wind,
    text: "Aire acondicionado no enfría",
    category: "Climatización"
  }
];

const initialMessages: Message[] = [
  {
    id: "1",
    text: "¡Hola! Soy tu asistente experto en mecánica automotriz. Puedo ayudarte con diagnósticos, consejos de mantenimiento y solución de problemas.\n\n¿En qué puedo asistirte hoy? Aquí hay algunas consultas frecuentes:",
    sender: "assistant",
    timestamp: new Date()
  }
];

export function ExpertAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll al final cuando hay nuevos mensajes
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAssistantResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respuestas contextuales basadas en palabras clave
    if (lowerMessage.includes("ruido") || lowerMessage.includes("sonido")) {
      return "Los ruidos extraños pueden indicar varios problemas:\n\n• **Ruido metálico al frenar**: Posiblemente las pastillas de freno están desgastadas\n• **Ruido de golpeteo en el motor**: Podría ser bajo nivel de aceite o problemas con las válvulas\n• **Chirrido de correa**: Las correas pueden estar desgastadas o flojas\n\n¿Puedes describir más detalladamente el tipo de ruido y cuándo ocurre?";
    }
    
    if (lowerMessage.includes("check engine") || lowerMessage.includes("testigo")) {
      return "La luz de check engine puede activarse por múltiples razones:\n\n1. **Revisa primero**: Asegúrate de que la tapa del tanque de gasolina esté bien cerrada\n2. **Escanea el código**: Te recomiendo usar un escáner OBD-II para conocer el código de error específico\n3. **Causas comunes**:\n   • Sensor de oxígeno defectuoso\n   • Catalizador deteriorado\n   • Bujías en mal estado\n\n¿Notas algún otro síntoma como pérdida de potencia o consumo excesivo de combustible?";
    }
    
    if (lowerMessage.includes("aceite") || lowerMessage.includes("lubricante")) {
      return "El aceite es vital para tu motor. Aquí algunos puntos clave:\n\n• **Cambio recomendado**: Cada 5,000-7,500 km o según el fabricante\n• **Nivel correcto**: Debe estar entre MIN y MAX en la varilla\n• **Color normal**: Ámbar dorado; si está negro muy oscuro, necesita cambio\n• **Tipos**: Sintético (mejor protección), Semi-sintético, Mineral\n\n¿Necesitas ayuda con un cambio de aceite o tienes alguna duda específica?";
    }
    
    if (lowerMessage.includes("fuga") || lowerMessage.includes("goteo") || lowerMessage.includes("líquido")) {
      return "Identificar el líquido es importante:\n\n🔴 **Rojo/Rosa**: Líquido de transmisión o dirección hidráulica\n🟢 **Verde/Naranja**: Anticongelante del radiador\n🟡 **Amarillo claro**: Líquido de frenos (¡prioridad alta!)\n⚫ **Negro/Marrón**: Aceite de motor\n🔵 **Azul transparente**: Líquido limpiaparabrisas (no es problema)\n\n¿De qué color es el líquido que ves bajo tu vehículo?";
    }
    
    if (lowerMessage.includes("aire") || lowerMessage.includes("clima") || lowerMessage.includes("enfría")) {
      return "Si el aire acondicionado no enfría bien:\n\n1. **Revisa el nivel de gas refrigerante** (requiere equipo especial)\n2. **Verifica el compresor**: Debe activarse cuando enciendes el A/C\n3. **Filtro de cabina**: Si está sucio, reduce el flujo de aire\n4. **Condensador**: Puede estar obstruido con suciedad\n\n💡 **Consejo**: Primero verifica el filtro de cabina, es lo más sencillo y económico. ¿El ventilador funciona pero solo sale aire caliente?";
    }
    
    if (lowerMessage.includes("batería") || lowerMessage.includes("arranca") || lowerMessage.includes("enciende")) {
      return "Problemas de arranque suelen relacionarse con:\n\n🔋 **Batería**:\n• Vida útil: 3-5 años\n• Revisa los bornes: deben estar limpios y ajustados\n• Voltaje: debe ser ~12.6V con motor apagado\n\n⚡ **Alternador**: Si el auto arranca con cables pero se apaga después\n\n🔧 **Motor de arranque**: Si solo escuchas un 'click' al girar la llave\n\n¿El motor intenta arrancar o no pasa nada al girar la llave?";
    }
    
    if (lowerMessage.includes("freno") || lowerMessage.includes("detiene")) {
      return "Los frenos son críticos para tu seguridad:\n\n⚠️ **Señales de alerta**:\n• Ruido metálico: pastillas desgastadas\n• Vibración al frenar: discos deformados\n• Pedal esponjoso: posible aire en el sistema\n• Mayor recorrido del pedal: líquido bajo o pastillas gastadas\n\n🔧 **Mantenimiento**:\n• Revisar pastillas cada 20,000 km\n• Cambiar líquido cada 2 años\n• Discos: inspeccionar con cada cambio de pastillas\n\n¿Qué síntoma específico notas en tus frenos?";
    }
    
    // Respuesta por defecto
    return "Entiendo tu consulta. Como asistente experto, puedo ayudarte con:\n\n• 🔍 **Diagnóstico de problemas**: Ruidos, vibraciones, olores extraños\n• 🛠️ **Mantenimiento preventivo**: Cuándo y cómo hacer cada servicio\n• ⚙️ **Componentes del vehículo**: Funcionamiento y cuidados\n• 💡 **Consejos prácticos**: Tips para el cuidado diario\n\n¿Podrías darme más detalles sobre tu problema específico? Por ejemplo:\n- ¿Qué síntomas notas?\n- ¿Cuándo comenzó el problema?\n- ¿Qué tipo de vehículo tienes?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAssistantResponse(inputValue),
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsHelpful = (messageId: string, helpful: boolean) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-900 to-green-600">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">Asistente Experto</h2>
              <p className="text-white/90 text-sm">
                Consulta problemas mecánicos y recibe asesoría profesional
              </p>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Chat Area */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <ScrollArea className="h-[450px] sm:h-[500px] p-4 sm:p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-blue-900 to-green-600"
                        : "bg-gradient-to-br from-green-600 to-blue-900"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`flex-1 max-w-[85%] sm:max-w-[75%] ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-900 to-green-600 text-white rounded-tr-sm"
                          : "bg-slate-100 text-slate-900 rounded-tl-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm sm:text-base">
                        {message.text}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>

                    {/* Sugerencias de preguntas (solo para el mensaje inicial) */}
                    {message.sender === "assistant" && message.id === "1" && messages.length === 1 && (
                      <div className="mt-3 space-y-2">
                        {quickQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickQuestion(question.text)}
                            className="w-full group flex items-center gap-3 p-3 bg-white hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all text-left active:scale-[0.98]"
                          >
                            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors flex-shrink-0">
                              <question.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-slate-900 text-sm">{question.text}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Feedback buttons (solo para mensajes del asistente) */}
                    {message.sender === "assistant" && message.id !== "1" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-7 px-2 ${
                            message.helpful === true
                              ? "bg-green-100 text-green-600"
                              : "text-slate-400 hover:text-green-600"
                          }`}
                          onClick={() => markAsHelpful(message.id, true)}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-7 px-2 ${
                            message.helpful === false
                              ? "bg-red-100 text-red-600"
                              : "text-slate-400 hover:text-red-600"
                          }`}
                          onClick={() => markAsHelpful(message.id, false)}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-600 to-blue-900 flex items-center justify-center">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Elemento invisible para scroll automático */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu pregunta sobre mecánica..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-slate-50 border-slate-200 focus:border-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-900 to-green-600 hover:from-blue-800 hover:to-green-500 text-white px-4 sm:px-6"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 px-1">
              💡 Tip: Sé específico con tu consulta para obtener mejor asesoría
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info card */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="pt-6 pb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-slate-900 text-sm mb-1">
                Información importante
              </p>
              <p className="text-slate-600 text-sm">
                Este asistente proporciona orientación general. Para problemas serios o de seguridad, 
                consulta siempre con un mecánico profesional certificado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
