import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  Star, 
  Clock, 
  Shield, 
  Car, 
  MapPin,
  ThumbsUp,
  Award,
  CheckCircle,
  Phone,
  MessageCircle,
  Navigation,
  Zap
} from "lucide-react"

const drivers = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.9,
    experience: "5 years",
    completedTrips: 2847,
    avatar: "/placeholder.svg",
    vehicle: "Honda Civic 2021",
    plateNumber: "ABC-123",
    specialties: ["Women-Only", "Accessible"],
    languages: ["English", "Spanish"],
    reviews: [
      { text: "Very professional and safe driver", rating: 5 },
      { text: "Always on time and courteous", rating: 5 }
    ],
    badges: ["Top Rated", "Safety Expert", "5K+ Rides"],
    estimatedArrival: 3,
    price: 12.50,
    currentLocation: "2.1 km away",
    safetyScore: 98,
    isOnline: true
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4.8,
    experience: "3 years",
    completedTrips: 1653,
    avatar: "/placeholder.svg",
    vehicle: "Toyota Camry 2020",
    plateNumber: "XYZ-789",
    specialties: ["Eco-Friendly", "Business"],
    languages: ["English", "Mandarin"],
    reviews: [
      { text: "Smooth ride and great conversation", rating: 5 },
      { text: "Clean car and punctual", rating: 4 }
    ],
    badges: ["Eco Driver", "Business Class"],
    estimatedArrival: 5,
    price: 11.75,
    currentLocation: "3.4 km away",
    safetyScore: 95,
    isOnline: true
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    rating: 4.7,
    experience: "2 years",
    completedTrips: 956,
    avatar: "/placeholder.svg",
    vehicle: "Nissan Sentra 2022",
    plateNumber: "DEF-456",
    specialties: ["Pet-Friendly", "Student"],
    languages: ["English", "Portuguese"],
    reviews: [
      { text: "Great with pets and very patient", rating: 5 },
      { text: "Affordable and reliable", rating: 4 }
    ],
    badges: ["Pet Lover", "New Driver"],
    estimatedArrival: 7,
    price: 10.25,
    currentLocation: "4.2 km away",
    safetyScore: 92,
    isOnline: true
  }
]

interface DriverSelectionProps {
  isOpen: boolean
  onClose: () => void
}

const DriverSelection = ({ isOpen, onClose }: DriverSelectionProps) => {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null)
  const [confirmingRide, setConfirmingRide] = useState(false)
  const [rideConfirmed, setRideConfirmed] = useState(false)
  const [arrivalProgress, setArrivalProgress] = useState(0)
  const { toast } = useToast()

  // Simulate real-time driver location updates
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      // Update estimated arrival times
      drivers.forEach(driver => {
        if (driver.estimatedArrival > 1) {
          driver.estimatedArrival -= 0.1
        }
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [isOpen])

  // Simulate arrival progress
  useEffect(() => {
    if (rideConfirmed) {
      const interval = setInterval(() => {
        setArrivalProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            toast({
              title: "Driver Arrived!",
              description: "Your driver is waiting outside.",
            })
            return 100
          }
          return prev + 2
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [rideConfirmed])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "text-primary fill-primary" 
            : "text-muted-foreground"
        }`}
      />
    ))
  }

  const handleConfirmRide = async () => {
    if (!selectedDriver) return

    setConfirmingRide(true)
    
    setTimeout(() => {
      setConfirmingRide(false)
      setRideConfirmed(true)
      toast({
        title: "Ride Confirmed!",
        description: "Your driver is on the way. You'll receive live updates.",
      })
    }, 2000)
  }

  const selectedDriverData = drivers.find(d => d.id === selectedDriver)

  if (rideConfirmed && selectedDriverData) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-foreground">
              Ride Confirmed!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={selectedDriverData.avatar} alt={selectedDriverData.name} />
                <AvatarFallback className="bg-primary/20 text-primary text-xl font-semibold">
                  {selectedDriverData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{selectedDriverData.name}</h3>
              <p className="text-muted-foreground">{selectedDriverData.vehicle}</p>
              <Badge variant="secondary" className="mt-2">{selectedDriverData.plateNumber}</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Driver Arrival</span>
                  <span className="text-sm font-medium">{arrivalProgress}%</span>
                </div>
                <Progress value={arrivalProgress} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" size="sm" className="flex-col h-16 p-2">
                  <Phone className="h-4 w-4 mb-1" />
                  <span className="text-xs">Call</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-16 p-2">
                  <MessageCircle className="h-4 w-4 mb-1" />
                  <span className="text-xs">Message</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-16 p-2">
                  <Navigation className="h-4 w-4 mb-1" />
                  <span className="text-xs">Track</span>
                </Button>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated Arrival</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.ceil(selectedDriverData.estimatedArrival)} min
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            Choose Your Driver
          </DialogTitle>
          <p className="text-muted-foreground">
            Select from our verified drivers with detailed profiles and real-time tracking
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {drivers.map((driver) => (
            <Card 
              key={driver.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elegant ${
                selectedDriver === driver.id 
                  ? "ring-2 ring-primary bg-primary/5" 
                  : "hover:bg-muted/30"
              }`}
              onClick={() => setSelectedDriver(driver.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={driver.avatar} alt={driver.name} />
                        <AvatarFallback className="bg-primary/20 text-primary text-lg font-semibold">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {driver.isOnline && (
                        <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
                          <div className="w-3 h-3 bg-background rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground flex items-center">
                        {driver.name}
                        {selectedDriver === driver.id && (
                          <CheckCircle className="h-5 w-5 text-primary ml-2" />
                        )}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {renderStars(driver.rating)}
                          <span className="ml-1 text-sm font-medium text-foreground">
                            {driver.rating}
                          </span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {driver.completedTrips.toLocaleString()} trips
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {driver.currentLocation}
                        </div>
                        <div className="flex items-center text-sm">
                          <Shield className="h-4 w-4 mr-1 text-success" />
                          <span className="text-foreground">{driver.safetyScore}% Safe</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {driver.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${driver.price}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {Math.ceil(driver.estimatedArrival)} min
                    </div>
                    {driver.estimatedArrival <= 3 && (
                      <Badge variant="outline" className="mt-1 text-xs border-success text-success">
                        <Zap className="h-3 w-3 mr-1" />
                        Fastest
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Driver Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Driver Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Shield className="h-4 w-4 text-success mr-2" />
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="ml-2 text-foreground">{driver.experience}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Car className="h-4 w-4 text-primary mr-2" />
                          <span className="text-muted-foreground">Vehicle:</span>
                          <span className="ml-2 text-foreground">{driver.vehicle}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 text-safety mr-2" />
                          <span className="text-muted-foreground">License:</span>
                          <span className="ml-2 text-foreground">{driver.plateNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {driver.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {driver.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Recent Reviews</h4>
                    <div className="space-y-3">
                      {driver.reviews.map((review, index) => (
                        <div key={index} className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-foreground italic">"{review.text}"</p>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        View all reviews
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {selectedDriver && (
            <div className="flex justify-center space-x-4 pt-4 border-t">
              <Button variant="outline" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Driver
              </Button>
              <Button 
                variant="hero" 
                size="lg" 
                className="bg-primary hover:bg-primary-hover"
                onClick={handleConfirmRide}
                disabled={confirmingRide}
              >
                {confirmingRide ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2"></div>
                    Confirming...
                  </>
                ) : (
                  "Confirm Selection"
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DriverSelection