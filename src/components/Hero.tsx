import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Shield, Star, Heart, Accessibility, Navigation, Phone, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import heroImage from "@/assets/hero-transportation.jpg"
import LocationInput from "./LocationInput"
import RideOptionModal from "./RideOptionModal"
import LiveDemo from "./LiveDemo"
import EmergencySOS from "./EmergencySOS"
import WomenOnlyBooking from "./WomenOnlyBooking"
import AccessibleRideBooking from "./AccessibleRideBooking"
import DriverSelection from "./DriverSelection"

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("")
  const [destination, setDestination] = useState("")
  const [showRideModal, setShowRideModal] = useState(false)
  const [selectedRideType, setSelectedRideType] = useState<"standard" | "premium" | "women-only" | "accessible">("standard")
  const [showLiveDemo, setShowLiveDemo] = useState(false)
  const [showEmergencySOS, setShowEmergencySOS] = useState(false)
  const [showWomenBooking, setShowWomenBooking] = useState(false)
  const [showAccessibleBooking, setShowAccessibleBooking] = useState(false)
  const [showDriverSelection, setShowDriverSelection] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [rideBooked, setRideBooked] = useState(false)
  
  const { toast } = useToast()

  // Calculate estimated price and time based on locations
  useEffect(() => {
    if (pickupLocation && destination) {
      // Simulate price and time calculation
      const basePrice = 10
      const distance = Math.random() * 20 + 5 // 5-25 km
      const price = (basePrice + distance * 0.8).toFixed(2)
      const time = Math.floor(distance * 2 + 5) // estimate in minutes
      
      setEstimatedPrice(`$${price}`)
      setEstimatedTime(`${time} min`)
    } else {
      setEstimatedPrice("")
      setEstimatedTime("")
    }
  }, [pickupLocation, destination])

  const handleBookRide = async () => {
    if (!pickupLocation || !destination) {
      toast({
        title: "Missing Information",
        description: "Please enter both pickup and destination locations.",
        variant: "destructive"
      })
      return
    }

    setIsBooking(true)
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      setRideBooked(true)
      setShowDriverSelection(true)
      toast({
        title: "Ride Booked Successfully!",
        description: "Looking for the best driver for you...",
      })
    }, 2000)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4 inline mr-2" />
                Safety First Platform
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-background mb-6 leading-tight">
              Your
              <span className="text-background/90"> Safest </span>
              Ride is Just a 
              <span className="text-background/90"> Tap Away</span>
            </h1>
            
            <p className="text-xl text-background/80 mb-8 max-w-lg">
              Experience transportation with advanced safety features, real-time monitoring, 
              and 24/7 protection for every journey.
            </p>

            {/* Safety Features Quick List */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
              <div className="flex items-center text-background/90">
                <Shield className="h-5 w-5 mr-2 text-success" />
                <span>Real-time Safety</span>
              </div>
              <div className="flex items-center text-background/90">
                <Star className="h-5 w-5 mr-2 text-success" />
                <span>Verified Drivers</span>
              </div>
              <div className="flex items-center text-background/90">
                <Users className="h-5 w-5 mr-2 text-success" />
                <span>Women-Only Option</span>
              </div>
              <div className="flex items-center text-background/90">
                <Clock className="h-5 w-5 mr-2 text-success" />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="flex-1 sm:flex-none"
                onClick={() => {
                  setSelectedRideType("standard")
                  setShowRideModal(true)
                }}
              >
                Book Safe Ride
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="bg-background/10 border-background/30 text-background hover:bg-background/20"
                onClick={() => setShowLiveDemo(true)}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="flex justify-center md:justify-end">
            <Card className="w-full max-w-md bg-background/95 backdrop-blur-sm shadow-elegant border-0 p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Book Your Ride</h3>
                  <p className="text-muted-foreground">Safe, secure, and reliable</p>
                </div>

                <div className="space-y-4">
                  {/* Pickup Location */}
                  <LocationInput
                    placeholder="Pickup location"
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    icon="pickup"
                  />

                  {/* Destination */}
                  <LocationInput
                    placeholder="Where to?"
                    value={destination}
                    onChange={setDestination}
                    icon="destination"
                  />

                  {/* Ride Options */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-16 p-2"
                      onClick={() => {
                        setSelectedRideType("standard")
                        setShowRideModal(true)
                      }}
                    >
                      <Users className="h-4 w-4 mb-1" />
                      <span className="text-xs">Standard</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-16 p-2"
                      onClick={() => {
                        setSelectedRideType("premium")
                        setShowRideModal(true)
                      }}
                    >
                      <Star className="h-4 w-4 mb-1" />
                      <span className="text-xs">Premium</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-16 p-2 border-safety text-safety"
                      onClick={() => setShowWomenBooking(true)}
                    >
                      <Heart className="h-4 w-4 mb-1" />
                      <span className="text-xs">Women-Only</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-col h-16 p-2 border-success text-success"
                      onClick={() => setShowAccessibleBooking(true)}
                    >
                      <Accessibility className="h-4 w-4 mb-1" />
                      <span className="text-xs">Accessible</span>
                    </Button>
                  </div>

                  {/* Price and Time Estimate */}
                  {estimatedPrice && estimatedTime && (
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Estimated:</span>
                        <div className="font-medium text-foreground">{estimatedPrice}</div>
                      </div>
                      <div className="text-sm text-right">
                        <span className="text-muted-foreground">ETA:</span>
                        <div className="font-medium text-foreground">{estimatedTime}</div>
                      </div>
                    </div>
                  )}

                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={!pickupLocation || !destination || isBooking}
                    onClick={handleBookRide}
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2"></div>
                        Booking Ride...
                      </>
                    ) : rideBooked ? (
                      "Ride Booked! Select Driver"
                    ) : (
                      "Find Safe Ride"
                    )}
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  All rides include real-time safety monitoring
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RideOptionModal
        isOpen={showRideModal}
        onClose={() => setShowRideModal(false)}
        rideType={selectedRideType}
      />
      
      <LiveDemo
        isOpen={showLiveDemo}
        onClose={() => setShowLiveDemo(false)}
      />
      
      <EmergencySOS
        isOpen={showEmergencySOS}
        onClose={() => setShowEmergencySOS(false)}
      />
      
      <WomenOnlyBooking
        isOpen={showWomenBooking}
        onClose={() => setShowWomenBooking(false)}
      />
      
      <AccessibleRideBooking
        isOpen={showAccessibleBooking}
        onClose={() => setShowAccessibleBooking(false)}
      />
      
      <DriverSelection isOpen={showDriverSelection} onClose={() => setShowDriverSelection(false)} />
    </section>
  )
}

export default Hero