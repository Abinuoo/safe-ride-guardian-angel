import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Bot, User, Shield, Phone, AlertTriangle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface SafetyChatbotProps {
  children: React.ReactNode
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'emergency' | 'info' | 'warning'
}

const SafetyChatbot = ({ children }: SafetyChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Safety Assistant. I'm here 24/7 to help with any safety concerns or questions during your ride. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'info'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickResponses = [
    "I feel unsafe",
    "Driver behavior concern",
    "Route deviation",
    "Emergency contact",
    "Cancel ride",
    "Share location"
  ]

  const getBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Emergency keywords
    if (lowerMessage.includes('unsafe') || lowerMessage.includes('danger') || lowerMessage.includes('help') || lowerMessage.includes('emergency')) {
      return {
        id: Date.now(),
        text: "🚨 I understand you feel unsafe. I'm immediately alerting your emergency contacts and sharing your live location. Stay calm. Emergency services are being notified. Would you like me to call emergency services directly?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'emergency'
      }
    }
    
    // Driver behavior
    if (lowerMessage.includes('driver') || lowerMessage.includes('behavior')) {
      return {
        id: Date.now(),
        text: "I'm sorry to hear about your driver concerns. I've documented this issue and alerted our safety team. Your ride is being monitored in real-time. If you feel immediately unsafe, say 'emergency' and I'll take immediate action.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'warning'
      }
    }
    
    // Route issues
    if (lowerMessage.includes('route') || lowerMessage.includes('lost') || lowerMessage.includes('wrong')) {
      return {
        id: Date.now(),
        text: "I see there might be a route concern. I'm tracking your location and the planned route. If the driver has deviated without explanation, this could be a safety concern. Would you like me to contact the driver or alert your emergency contacts?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'warning'
      }
    }
    
    // Location sharing
    if (lowerMessage.includes('location') || lowerMessage.includes('share')) {
      return {
        id: Date.now(),
        text: "I'm immediately sharing your live location with your trusted contacts. They can see your real-time position and ride details. Your location is also being monitored by our safety team.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'info'
      }
    }
    
    // Cancel ride
    if (lowerMessage.includes('cancel') || lowerMessage.includes('stop')) {
      return {
        id: Date.now(),
        text: "I can help you safely exit this ride. I'm alerting the driver to find a safe, public location to stop. Your emergency contacts are being notified of the ride cancellation. Do you need me to arrange alternative transportation?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'warning'
      }
    }
    
    // Default helpful response
    return {
      id: Date.now(),
      text: "I'm here to help with any safety concerns. I can assist with route monitoring, emergency alerts, driver issues, or connecting you with help. Is there a specific safety concern I can help you with?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'info'
    }
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)
    
    // Check for emergency keywords and show toast
    const lowerText = text.toLowerCase()
    if (lowerText.includes('unsafe') || lowerText.includes('danger') || lowerText.includes('help') || lowerText.includes('emergency')) {
      toast({
        title: "🚨 Emergency Protocol Activated",
        description: "Your safety team has been alerted and your location is being shared",
        variant: "destructive"
      })
    }
    
    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputText)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Safety Assistant Chatbot</span>
            <div className="flex items-center space-x-1 ml-auto">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Online 24/7</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          {/* Quick Response Buttons */}
          <div className="flex-shrink-0">
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => sendMessage(response)}
                      className="justify-start text-left h-auto py-2 px-3"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : message.type === 'emergency'
                      ? 'bg-destructive/10 border border-destructive/20 text-destructive'
                      : message.type === 'warning'
                      ? 'bg-safety/10 border border-safety/20 text-safety'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className={`mt-1 ${
                        message.type === 'emergency' ? 'text-destructive' : 
                        message.type === 'warning' ? 'text-safety' : 'text-primary'
                      }`}>
                        {message.type === 'emergency' ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : message.type === 'warning' ? (
                          <Shield className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 mt-1 text-primary-foreground" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about any safety concerns..."
                className="flex-1"
              />
              <Button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim()}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Emergency Button */}
            <div className="mt-2 text-center">
              <Button
                onClick={() => sendMessage("EMERGENCY - I need immediate help")}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency Help Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SafetyChatbot