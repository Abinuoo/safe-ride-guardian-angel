import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Star, MapPin, Clock, Shield, Phone } from "lucide-react"

interface WomenOnlyBookingProps {
  isOpen: boolean
  onClose: () => void
}

interface Driver {
  id: string
  name: string
  rating: number
  experience: number
  distance: string
  eta: string
  vehicle: string
  photo: string
  specializations: string[]
  completedRides: number
  languages: string[]
}

const femaleDrivers: Driver[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 4.9,
    experience: 5,
    distance: "0.8 km",
    eta: "3 mins",
    vehicle: "Maruti Swift - DL 8C 1234",
    photo: "",
    specializations: ["Night rides", "Airport transfers", "Women safety trained"],
    completedRides: 2847,
    languages: ["Hindi", "English", "Punjabi"]
  },
  {
    id: "2",
    name: "Anita Reddy",
    rating: 4.8,
    experience: 3,
    distance: "1.2 km",
    eta: "5 mins",
    vehicle: "Hyundai i20 - TN 09 5678",
    photo: "",
    specializations: ["Long distance", "Student friendly", "Emergency certified"],
    completedRides: 1923,
    languages: ["Tamil", "English", "Telugu"]
  },
  {
    id: "3",
    name: "Meera Singh",
    rating: 4.7,
    experience: 4,
    distance: "1.5 km",
    eta: "6 mins",
    vehicle: "Honda City - HR 26 9012",
    photo: "",
    specializations: ["Corporate rides", "Medical emergencies", "Senior citizen friendly"],
    completedRides: 2156,
    languages: ["Hindi", "English"]
  }
]

const WomenOnlyBooking = ({ isOpen, onClose }: WomenOnlyBookingProps) => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [showDriverDetails, setShowDriverDetails] = useState(false)

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver)
  }

  const handleLearnMore = () => {
    setShowDriverDetails(true)
  }

  if (showDriverDetails) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Heart className="h-6 w-6 text-safety" />
              <span>Women-Only Rides</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-success" />
                  Why Choose Women-Only Rides?
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>All female drivers are specially trained in women's safety protocols</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Enhanced background verification and safety checks</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Direct line to women-only customer support team</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Real-time family sharing and safety updates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Emergency contact alerts with women safety cell</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Safe drop-off verification for late night rides</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              variant="hero" 
              onClick={() => setShowDriverDetails(false)}
              className="w-full"
            >
              View Available Drivers
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-safety" />
            <span>Women-Only Drivers Available</span>
            <Badge variant="secondary" className="bg-safety/10 text-safety">
              {femaleDrivers.length} drivers nearby
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {femaleDrivers.map((driver) => (
            <Card 
              key={driver.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedDriver?.id === driver.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleDriverSelect(driver)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={driver.photo} />
                    <AvatarFallback className="bg-safety/20 text-safety font-semibold">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{driver.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{driver.rating}</span>
                          </div>
                          <span>{driver.experience} years experience</span>
                          <span>{driver.completedRides} rides</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{driver.distance}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-success">
                          <Clock className="h-4 w-4" />
                          <span>ETA: {driver.eta}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Vehicle: </span>
                        <span className="font-medium">{driver.vehicle}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {driver.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Languages: </span>
                        <span className="font-medium">{driver.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex space-x-3 pt-4">
            <Button 
              variant="hero" 
              disabled={!selectedDriver}
              className="flex-1"
            >
              Book {selectedDriver?.name || 'Selected Driver'}
            </Button>
            <Button variant="outline" onClick={handleLearnMore}>
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WomenOnlyBooking