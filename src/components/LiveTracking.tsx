import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, AlertTriangle, Users, Clock, Route } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface LiveTrackingProps {
  children: React.ReactNode
}

const LiveTracking = ({ children }: LiveTrackingProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 })
  const [originalRoute, setOriginalRoute] = useState([
    { lat: 40.7128, lng: -74.0060, name: "Pickup Location" },
    { lat: 40.7589, lng: -73.9851, name: "Destination" }
  ])
  const [routeDeviation, setRouteDeviation] = useState(false)
  const [trackingActive, setTrackingActive] = useState(false)
  const { toast } = useToast()

  const startTracking = () => {
    setTrackingActive(true)
    // Simulate real-time location updates
    simulateLocationTracking()
    
    toast({
      title: "Live Tracking Started",
      description: "Your location is now being monitored and shared with trusted contacts",
    })
  }

  const simulateLocationTracking = () => {
    const interval = setInterval(() => {
      if (!trackingActive) {
        clearInterval(interval)
        return
      }
      
      // Simulate location changes
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }))
      
      // Randomly trigger route deviation alert
      if (Math.random() < 0.1 && !routeDeviation) {
        triggerRouteDeviation()
      }
    }, 2000)
  }

  const triggerRouteDeviation = () => {
    setRouteDeviation(true)
    
    const alertData = {
      currentLocation,
      originalRoute,
      driverDetails: {
        name: "John Smith",
        license: "DL123456",
        vehicle: "Toyota Camry - ABC123",
        phone: "+1234567892"
      },
      timestamp: new Date().toISOString(),
      deviationType: "Unauthorized route change"
    }
    
    // Send alerts to trusted contacts
    sendRouteDeviationAlert(alertData)
    
    toast({
      title: "🚨 ROUTE DEVIATION DETECTED",
      description: "Driver has deviated from planned route. Trusted contacts notified.",
      variant: "destructive"
    })
  }

  const sendRouteDeviationAlert = (data: any) => {
    console.log("Route deviation alert sent:", data)
    // In real implementation, send SMS/notifications to trusted contacts
  }

  const stopTracking = () => {
    setTrackingActive(false)
    setRouteDeviation(false)
    
    toast({
      title: "Tracking Stopped",
      description: "Live location monitoring has been disabled",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-primary" />
            <span>Guardian Angel - Real-Time Safety</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Live Map Simulation */}
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-safety/20 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Live Location</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
                      </div>
                      {routeDeviation && (
                        <div className="bg-destructive/20 text-destructive px-3 py-1 rounded-full text-xs font-medium">
                          Route Deviation Detected!
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Simulated route line */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-primary/50 transform rotate-45"></div>
                  
                  {/* Route markers */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                </div>
                
                <Button
                  onClick={trackingActive ? stopTracking : startTracking}
                  variant={trackingActive ? "destructive" : "default"}
                  size="lg"
                  className="w-full"
                >
                  {trackingActive ? 'Stop Live Tracking' : 'Start Live Tracking'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Route Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-success" />
                  <h4 className="font-semibold">Pickup Location</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Times Square, NYC<br/>
                  40.7128, -74.0060
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Route className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Current Status</h4>
                </div>
                <p className="text-sm">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    routeDeviation ? 'bg-destructive' : 'bg-success'
                  }`}></span>
                  {routeDeviation ? 'Route Deviation' : 'On Planned Route'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Destination</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Central Park, NYC<br/>
                  40.7589, -73.9851
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trusted Contacts & Alerts */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Trusted Contacts</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Emergency Contact 1</span>
                    <span className={`w-2 h-2 rounded-full ${trackingActive ? 'bg-success' : 'bg-muted'}`}></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Emergency Contact 2</span>
                    <span className={`w-2 h-2 rounded-full ${trackingActive ? 'bg-success' : 'bg-muted'}`}></span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {trackingActive ? 'Receiving live location updates' : 'Not receiving updates'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-safety" />
                  <h4 className="font-semibold">Alert Settings</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked readOnly className="rounded" />
                    <span>Route deviation alerts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked readOnly className="rounded" />
                    <span>Extended stop alerts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked readOnly className="rounded" />
                    <span>Speed limit alerts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Protocol */}
          <Card className="bg-safety/10 border-safety/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-safety" />
                <div>
                  <h4 className="font-semibold text-safety">24/7 Monitoring Active</h4>
                  <p className="text-sm text-safety/80">
                    Your live location is monitored continuously. Any route deviations without permission 
                    will instantly alert your trusted contacts and emergency services.
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

export default LiveTracking