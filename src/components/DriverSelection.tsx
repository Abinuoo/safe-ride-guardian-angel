import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Star, 
  Clock, 
  Shield, 
  Car, 
  MapPin,
  ThumbsUp,
  Award,
  CheckCircle
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
    estimatedArrival: "3 min",
    price: "$12.50"
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
    estimatedArrival: "5 min",
    price: "$11.75"
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
    estimatedArrival: "7 min",
    price: "$10.25"
  }
]

interface DriverSelectionProps {
  children: React.ReactNode
}

const DriverSelection = ({ children }: DriverSelectionProps) => {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null)

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            Choose Your Driver
          </DialogTitle>
          <p className="text-muted-foreground">
            Select from our verified drivers with detailed profiles and reviews
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
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={driver.avatar} alt={driver.name} />
                      <AvatarFallback className="bg-primary/20 text-primary text-lg font-semibold">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
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
                    <div className="text-2xl font-bold text-primary">{driver.price}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {driver.estimatedArrival}
                    </div>
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
                Message Driver
              </Button>
              <Button variant="hero" size="lg" className="bg-primary hover:bg-primary-hover">
                Confirm Selection
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DriverSelection