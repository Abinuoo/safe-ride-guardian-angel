import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Shield, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EmergencySOSProps {
  isOpen: boolean
  onClose: () => void
}

const EmergencySOS = ({ isOpen, onClose }: EmergencySOSProps) => {
  const [emergencyActivated, setEmergencyActivated] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const { toast } = useToast()

  const activateEmergency = () => {
    setEmergencyActivated(true)
    
    // Simulate countdown
    let count = 5
    const timer = setInterval(() => {
      count--
      setCountdown(count)
      
      if (count === 0) {
        clearInterval(timer)
        sendEmergencyAlert()
      }
    }, 1000)
  }

  const sendEmergencyAlert = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your location and details have been shared with trusted contacts and police.",
      variant: "destructive"
    })
  }

  const trustedContacts = [
    { name: "Mom - Sunita", phone: "+91 98765 43210" },
    { name: "Dad - Rajesh", phone: "+91 98765 43211" },
    { name: "Emergency Contact", phone: "+91 98765 43212" }
  ]

  const nearbyPoliceStations = [
    { name: "Central Police Station", distance: "1.2 km", phone: "100" },
    { name: "Sector 14 Police Post", distance: "2.1 km", phone: "+91 11 2345 6789" },
    { name: "Women's Safety Cell", distance: "1.8 km", phone: "+91 11 2345 6790" }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
              <Phone className="h-5 w-5 text-destructive-foreground" />
            </div>
            <span>Emergency SOS</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!emergencyActivated ? (
            <>
              <Card className="border-destructive/50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
                    <h3 className="text-2xl font-bold text-destructive">Emergency Assistance</h3>
                    <p className="text-muted-foreground">
                      Press the button below to immediately alert your trusted contacts and nearby police stations with your current location and trip details.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      Trusted Contacts
                    </h4>
                    <div className="space-y-3">
                      {trustedContacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{contact.name}</span>
                          <span className="text-xs text-muted-foreground">{contact.phone}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-success" />
                      Nearby Police Stations
                    </h4>
                    <div className="space-y-3">
                      {nearbyPoliceStations.map((station, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{station.name}</span>
                            <span className="text-xs text-success">{station.distance}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{station.phone}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-safety" />
                    Information That Will Be Shared
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Location:</span>
                        <span className="font-medium">Connaught Place, Delhi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Driver Name:</span>
                        <span className="font-medium">Priya Sharma</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicle Number:</span>
                        <span className="font-medium">DL 8C 1234</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trip ID:</span>
                        <span className="font-medium">#RD123456789</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Route:</span>
                        <span className="font-medium">CP to Airport</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button 
                  variant="destructive" 
                  size="xl"
                  onClick={activateEmergency}
                  className="flex-1"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  ACTIVATE EMERGENCY SOS
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              {countdown > 0 ? (
                <>
                  <div className="text-6xl font-bold text-destructive">{countdown}</div>
                  <p className="text-lg">Sending emergency alert in...</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEmergencyActivated(false)
                      setCountdown(5)
                    }}
                  >
                    Cancel Emergency
                  </Button>
                </>
              ) : (
                <>
                  <CheckCircle className="h-16 w-16 text-success mx-auto" />
                  <h3 className="text-2xl font-bold text-success">Emergency Alert Sent!</h3>
                  <p className="text-muted-foreground">
                    Your trusted contacts and nearby police stations have been notified with your location and trip details.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-success">✓ Message sent to 3 trusted contacts</p>
                    <p className="text-sm text-success">✓ Alert sent to 3 nearby police stations</p>
                    <p className="text-sm text-success">✓ Live location sharing activated</p>
                  </div>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmergencySOS