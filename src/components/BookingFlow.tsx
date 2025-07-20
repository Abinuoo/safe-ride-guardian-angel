import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle, 
  CreditCard,
  Star,
  Navigation,
  Phone,
  MessageCircle
} from "lucide-react"
import LocationInput from "./LocationInput"
import PriceCalculator from "./PriceCalculator"
import DriverSelection from "./DriverSelection"
import RideTracker from "./RideTracker"

interface BookingFlowProps {
  isOpen: boolean
  onClose: () => void
}

type BookingStage = "location" | "pricing" | "payment" | "driver" | "tracking" | "completed"
type RideType = "standard" | "premium" | "women-only" | "accessible"

const BookingFlow = ({ isOpen, onClose }: BookingFlowProps) => {
  const [currentStage, setCurrentStage] = useState<BookingStage>("location")
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [selectedRideType, setSelectedRideType] = useState<RideType>("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [bookingProgress, setBookingProgress] = useState(0)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  
  const { toast } = useToast()

  const stages = [
    { id: "location", label: "Location", icon: MapPin },
    { id: "pricing", label: "Pricing", icon: CreditCard },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "driver", label: "Driver", icon: Shield },
    { id: "tracking", label: "Tracking", icon: Navigation },
  ]

  const rideTypes = [
    { 
      id: "standard", 
      name: "Standard", 
      price: "$12-18", 
      eta: "5-8 min", 
      icon: Star,
      features: ["GPS Tracking", "Safety monitoring", "24/7 Support"]
    },
    { 
      id: "premium", 
      name: "Premium", 
      price: "$18-25", 
      eta: "3-6 min", 
      icon: Star,
      features: ["Priority pickup", "Premium vehicles", "Enhanced comfort"]
    },
    { 
      id: "women-only", 
      name: "Women-Only", 
      price: "$14-20", 
      eta: "5-10 min", 
      icon: Shield,
      features: ["Female drivers only", "Additional safety", "Women-friendly"]
    },
    { 
      id: "accessible", 
      name: "Accessible", 
      price: "$15-22", 
      eta: "8-12 min", 
      icon: Shield,
      features: ["Wheelchair accessible", "Special assistance", "Medical support"]
    }
  ]

  useEffect(() => {
    const stageIndex = stages.findIndex(stage => stage.id === currentStage)
    setBookingProgress(((stageIndex + 1) / stages.length) * 100)
  }, [currentStage])

  const handleNextStage = () => {
    const currentIndex = stages.findIndex(stage => stage.id === currentStage)
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1].id as BookingStage)
    }
  }

  const handleConfirmBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your driver has been notified and is on the way.",
    })
    setCurrentStage("tracking")
  }

  const renderLocationStage = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Where are you going?</h3>
        <div className="space-y-4">
          <LocationInput
            placeholder="Pickup location"
            value={pickup}
            onChange={setPickup}
            icon="pickup"
          />
          <LocationInput
            placeholder="Destination"
            value={destination}
            onChange={setDestination}
            icon="destination"
          />
        </div>
      </div>
      
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full"
        disabled={!pickup || !destination}
        onClick={handleNextStage}
      >
        Continue to Pricing
      </Button>
    </div>
  )

  const renderPricingStage = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Choose your ride type</h3>
      
      <div className="space-y-3">
        {rideTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedRideType === type.id 
                ? "ring-2 ring-primary bg-primary/5" 
                : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedRideType(type.id as RideType)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <type.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">{type.name}</h4>
                    <p className="text-sm text-muted-foreground">{type.eta}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{type.price}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {type.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <PriceCalculator 
          pickup={pickup}
          destination={destination}
          rideType={selectedRideType}
        />
      </div>
      
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full"
        onClick={handleNextStage}
      >
        Continue to Payment
      </Button>
    </div>
  )

  const renderPaymentStage = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Payment method</h3>
      
      <div className="space-y-3">
        {[
          { id: "card", name: "Credit/Debit Card", icon: CreditCard },
          { id: "wallet", name: "Digital Wallet", icon: Phone },
          { id: "cash", name: "Cash Payment", icon: CreditCard }
        ].map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all duration-200 ${
              paymentMethod === method.id 
                ? "ring-2 ring-primary bg-primary/5" 
                : "hover:bg-muted/50"
            }`}
            onClick={() => setPaymentMethod(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <method.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{method.name}</span>
                {paymentMethod === method.id && (
                  <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full"
        onClick={handleNextStage}
      >
        Find Driver
      </Button>
    </div>
  )

  const renderDriverStage = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Select your driver</h3>
      <DriverSelection 
        isOpen={true} 
        onClose={() => {}}
      />
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full"
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </Button>
    </div>
  )

  const renderTrackingStage = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Your ride is on the way!</h3>
      <RideTracker
        isActive={true}
        driverName="Sarah Johnson"
        driverRating={4.9}
        vehicleInfo="Honda Civic 2021"
        plateNumber="ABC-123"
        estimatedArrival={5}
      />
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span>Book Your Safe Ride</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </CardTitle>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {stages.findIndex(s => s.id === currentStage) + 1} of {stages.length}</span>
              <span>{Math.round(bookingProgress)}%</span>
            </div>
            <Progress value={bookingProgress} className="h-2" />
          </div>
          
          {/* Stage Indicators */}
          <div className="flex justify-between mt-4">
            {stages.map((stage, index) => {
              const isActive = stage.id === currentStage
              const isCompleted = stages.findIndex(s => s.id === currentStage) > index
              
              return (
                <div key={stage.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted 
                      ? "bg-success text-success-foreground" 
                      : isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <stage.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-xs mt-1 text-center">{stage.label}</span>
                </div>
              )
            })}
          </div>
        </CardHeader>
        
        <CardContent>
          {currentStage === "location" && renderLocationStage()}
          {currentStage === "pricing" && renderPricingStage()}
          {currentStage === "payment" && renderPaymentStage()}
          {currentStage === "driver" && renderDriverStage()}
          {currentStage === "tracking" && renderTrackingStage()}
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingFlow