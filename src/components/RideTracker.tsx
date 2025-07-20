import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Shield, 
  Phone, 
  MessageCircle,
  AlertTriangle,
  Star,
  CheckCircle
} from "lucide-react"

interface RideTrackerProps {
  isActive: boolean
  driverName: string
  driverRating: number
  vehicleInfo: string
  plateNumber: string
  estimatedArrival: number
  onEmergency?: () => void
}

const RideTracker = ({ 
  isActive, 
  driverName, 
  driverRating, 
  vehicleInfo, 
  plateNumber, 
  estimatedArrival, 
  onEmergency 
}: RideTrackerProps) => {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState("Driver en route")
  const [rideStage, setRideStage] = useState<"pickup" | "journey" | "arrived">("pickup")

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        
        if (newProgress >= 100) {
          if (rideStage === "pickup") {
            setRideStage("journey")
            setCurrentStatus("In transit to destination")
            return 0
          } else if (rideStage === "journey") {
            setRideStage("arrived")
            setCurrentStatus("Arrived at destination")
            return 100
          }
        }
        
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, rideStage])

  useEffect(() => {
    switch (rideStage) {
      case "pickup":
        setCurrentStatus("Driver en route to pickup")
        break
      case "journey":
        setCurrentStatus("In transit to destination")
        break
      case "arrived":
        setCurrentStatus("Trip completed - Have a safe day!")
        break
    }
  }, [rideStage])

  if (!isActive) return null

  const getStageIcon = () => {
    switch (rideStage) {
      case "pickup":
        return <MapPin className="h-5 w-5 text-primary" />
      case "journey":
        return <Navigation className="h-5 w-5 text-success" />
      case "arrived":
        return <CheckCircle className="h-5 w-5 text-success" />
    }
  }

  const getProgressColor = () => {
    switch (rideStage) {
      case "pickup":
        return "bg-primary"
      case "journey":
        return "bg-success"
      case "arrived":
        return "bg-success"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-elegant">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {getStageIcon()}
            <span className="ml-2">Live Tracking</span>
          </div>
          <Badge variant={rideStage === "arrived" ? "default" : "secondary"} className="text-xs">
            {rideStage === "pickup" ? "Pickup" : rideStage === "journey" ? "En Route" : "Completed"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{currentStatus}</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className={`h-3 ${getProgressColor()}`}
          />
        </div>

        {/* Driver Info */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{driverName}</h3>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                <span className="text-sm text-foreground">{driverRating}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">ETA</p>
              <p className="font-medium text-foreground">
                {rideStage === "arrived" ? "Arrived" : `${estimatedArrival} min`}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground mr-2">Vehicle:</span>
              <span className="text-foreground">{vehicleInfo}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground mr-2">Plate:</span>
              <span className="text-foreground font-mono">{plateNumber}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" size="sm" className="flex-col h-16 p-2">
            <Phone className="h-4 w-4 mb-1" />
            <span className="text-xs">Call</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col h-16 p-2">
            <MessageCircle className="h-4 w-4 mb-1" />
            <span className="text-xs">Message</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-col h-16 p-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={onEmergency}
          >
            <AlertTriangle className="h-4 w-4 mb-1" />
            <span className="text-xs">SOS</span>
          </Button>
        </div>

        {/* Safety Features */}
        <div className="bg-success/10 p-3 rounded-lg">
          <div className="flex items-center mb-2">
            <Shield className="h-4 w-4 text-success mr-2" />
            <span className="text-sm font-medium text-success">Safety Features Active</span>
          </div>
          <ul className="text-xs text-success space-y-1">
            <li>• Real-time GPS tracking</li>
            <li>• Emergency contacts notified</li>
            <li>• 24/7 safety monitoring</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default RideTracker