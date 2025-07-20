import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, Star, Clock, Wifi, Car, Accessibility, Heart } from "lucide-react"

interface RideOptionModalProps {
  isOpen: boolean
  onClose: () => void
  rideType: "standard" | "premium" | "women-only" | "accessible"
}

const rideOptions = {
  standard: {
    title: "Standard Ride",
    description: "Comfortable and affordable rides with safety features",
    features: [
      "Real-time GPS tracking",
      "Driver background verification",
      "In-app emergency button",
      "Route optimization",
      "24/7 customer support"
    ],
    icon: Users,
    color: "text-primary"
  },
  premium: {
    title: "Premium Ride",
    description: "Luxury vehicles with enhanced comfort and safety",
    features: [
      "All Standard features included",
      "Premium vehicle categories",
      "Priority booking",
      "Professional chauffeurs",
      "Complimentary refreshments",
      "Wi-Fi connectivity",
      "Advanced safety monitoring"
    ],
    icon: Star,
    color: "text-accent"
  },
  "women-only": {
    title: "Women-Only Ride",
    description: "Female drivers for enhanced safety and comfort",
    features: [
      "Verified female drivers only",
      "Enhanced safety protocols",
      "Women-only customer support",
      "Real-time family sharing",
      "Emergency contact alerts",
      "Safe drop-off verification"
    ],
    icon: Heart,
    color: "text-safety"
  },
  accessible: {
    title: "Accessible Ride",
    description: "Specially equipped vehicles for accessibility needs",
    features: [
      "Wheelchair accessible vehicles",
      "Trained accessibility drivers",
      "Assistance with boarding",
      "Service animal accommodation",
      "Audio assistance features",
      "Extended pickup time"
    ],
    icon: Accessibility,
    color: "text-success"
  }
}

const RideOptionModal = ({ isOpen, onClose, rideType }: RideOptionModalProps) => {
  const option = rideOptions[rideType]
  const IconComponent = option.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center`}>
              <IconComponent className={`h-5 w-5 text-primary-foreground`} />
            </div>
            <span>{option.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground">{option.description}</p>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-success" />
                Features Included
              </h4>
              <ul className="space-y-3">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="hero" className="flex-1">
              Book {option.title}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RideOptionModal