import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Users, AlertTriangle, Phone } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface VoiceRecorderProps {
  children: React.ReactNode
}

const VoiceRecorder = ({ children }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcript, setTranscript] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const { toast } = useToast()

  // Emergency keywords that trigger alerts
  const emergencyKeywords = ['help', 'emergency', 'danger', 'stop', 'police', 'unsafe']

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        shareToTrustedContacts(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
      
      // Simulate speech recognition for emergency keywords
      simulateSpeechRecognition()
      
      toast({
        title: "Recording Started",
        description: "Voice recording is now active and being shared with trusted contacts",
      })
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone",
        variant: "destructive"
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      
      toast({
        title: "Recording Stopped",
        description: "Recording saved and shared with trusted contacts",
      })
    }
  }

  const simulateSpeechRecognition = () => {
    // Simulate speech recognition checking for emergency keywords
    const interval = setInterval(() => {
      if (!isRecording) {
        clearInterval(interval)
        return
      }
      
      // Simulate detecting emergency keywords
      const randomText = ['normal conversation', 'help me please', 'everything is fine', 'this is dangerous']
      const detectedText = randomText[Math.floor(Math.random() * randomText.length)]
      setTranscript(prev => prev + ' ' + detectedText)
      
      // Check for emergency keywords
      const hasEmergencyKeyword = emergencyKeywords.some(keyword => 
        detectedText.toLowerCase().includes(keyword)
      )
      
      if (hasEmergencyKeyword) {
        triggerEmergencyAlert(detectedText)
      }
    }, 3000)
  }

  const triggerEmergencyAlert = (detectedText: string) => {
    // Emergency protocol triggered
    const emergencyData = {
      location: { lat: 40.7128, lng: -74.0060 }, // Current location
      driverDetails: {
        name: "John Smith",
        license: "DL123456",
        vehicle: "Toyota Camry - ABC123"
      },
      detectedPhrase: detectedText,
      timestamp: new Date().toISOString()
    }
    
    // Share with trusted contacts and police
    shareEmergencyAlert(emergencyData)
    
    toast({
      title: "🚨 EMERGENCY ALERT TRIGGERED",
      description: "Live location and driver details shared with trusted contacts and police",
      variant: "destructive"
    })
  }

  const shareToTrustedContacts = (audioBlob: Blob) => {
    // Simulate sharing audio to trusted contacts
    const trustedContacts = [
      { name: "Emergency Contact 1", phone: "+1234567890" },
      { name: "Emergency Contact 2", phone: "+1234567891" }
    ]
    
    trustedContacts.forEach(contact => {
      // In real implementation, send audio blob to contact
      console.log(`Sharing audio with ${contact.name} at ${contact.phone}`)
    })
  }

  const shareEmergencyAlert = (data: any) => {
    // Share with trusted contacts
    console.log("Emergency alert sent to trusted contacts:", data)
    // Share with nearest police station
    console.log("Emergency alert sent to police station:", data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5 text-primary" />
            <span>Blackbox Driver Monitoring</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-destructive animate-pulse' : 'bg-primary'
                }`}>
                  {isRecording ? (
                    <MicOff className="h-8 w-8 text-destructive-foreground" />
                  ) : (
                    <Mic className="h-8 w-8 text-primary-foreground" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {isRecording ? 'Recording Active' : 'Voice Monitoring Ready'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRecording ? 'Your conversation is being monitored for safety' : 'Click to start voice monitoring'}
                  </p>
                </div>
                
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                  className="w-full"
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Trusted Contacts</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emergency Contact 1</span>
                    <span className="text-muted-foreground">+1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Contact 2</span>
                    <span className="text-muted-foreground">+1234567891</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-safety" />
                  <h4 className="font-semibold">Emergency Keywords</h4>
                </div>
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">
                    Monitoring for: help, emergency, danger, stop, police, unsafe
                  </p>
                  {transcript && (
                    <div className="mt-2 p-2 bg-muted rounded text-xs">
                      <strong>Detected:</strong> {transcript}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-safety/10 border-safety/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-safety" />
                <div>
                  <h4 className="font-semibold text-safety">Emergency Protocol Active</h4>
                  <p className="text-sm text-safety/80">
                    Voice recordings are automatically shared with trusted contacts. 
                    Emergency keywords trigger instant alerts with live location.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VoiceRecorder