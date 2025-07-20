import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, AlertTriangle, Phone, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LiveDemoProps {
  isOpen: boolean
  onClose: () => void
}

const LiveDemo = ({ isOpen, onClose }: LiveDemoProps) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.6139, lng: 77.2090 }) // Delhi
  const [driverLocation, setDriverLocation] = useState({ lat: 28.6129, lng: 77.2095 })
  const [routeDeviation, setRouteDeviation] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const { toast } = useToast()

  // Simulate live tracking
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }))

      // Simulate route deviation every 10 seconds
      if (Math.random() < 0.3) {
        setRouteDeviation(true)
        toast({
          title: "Route Deviation Alert",
          description: "Driver has deviated from the planned route. Trusted contacts have been notified.",
          variant: "destructive"
        })
        
        setTimeout(() => setRouteDeviation(false), 5000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isOpen, toast])

  const handleEmergencyAlert = () => {
    setEmergencyMode(true)
    toast({
      title: "Emergency Alert Sent",
      description: "Your location and driver details have been shared with trusted contacts and nearby police.",
      variant: "destructive"
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-primary" />
            <span>Live Safety Dashboard</span>
            <Badge variant={emergencyMode ? "destructive" : routeDeviation ? "secondary" : "default"}>
              {emergencyMode ? "EMERGENCY" : routeDeviation ? "ROUTE ALERT" : "ACTIVE"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Live Map Simulation */}
          <Card className={`${emergencyMode ? "border-destructive" : routeDeviation ? "border-warning" : "border-success"}`}>
            <CardContent className="pt-6">
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10"></div>
                <div className="text-center z-10">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Live Route Tracking</h4>
                  <p className="text-sm text-muted-foreground">Real-time GPS monitoring active</p>
                </div>
                
                {/* Simulated route indicators */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Your Location</span>
                </div>
                
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Driver Location</span>
                </div>

                {routeDeviation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <AlertTriangle className="h-8 w-8 text-warning animate-bounce" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Navigation className="h-4 w-4 mr-2 text-primary" />
                  Trip Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Driver Name:</span>
                    <span className="font-medium">Priya Sharma</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-medium">Maruti Swift DL 8C 1234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="font-medium">12 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">5.2 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-success" />
                  Safety Status
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">GPS Tracking Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Emergency Contacts Notified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${routeDeviation ? "bg-warning" : "bg-success"}`}></div>
                    <span className="text-sm">Route Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Driver Behavior Normal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert Messages */}
          {routeDeviation && (
            <Card className="border-warning bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  <div>
                    <h4 className="font-semibold text-warning">Route Deviation Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      Driver has deviated from the planned route. Trusted contacts and emergency services have been automatically notified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {emergencyMode && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-destructive" />
                  <div>
                    <h4 className="font-semibold text-destructive">Emergency Mode Active</h4>
                    <p className="text-sm text-muted-foreground">
                      Emergency alert sent to all trusted contacts and nearby police stations with your live location and driver details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="destructive" 
              onClick={handleEmergencyAlert}
              disabled={emergencyMode}
              className="flex-1"
            >
              <Phone className="h-4 w-4 mr-2" />
              Emergency Alert
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LiveDemo