import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accessibility, Star, MapPin, Clock, Heart, User, HelpCircle } from "lucide-react"

interface AccessibleRideBookingProps {
  isOpen: boolean
  onClose: () => void
}

interface AccessibleVehicle {
  id: string
  driverName: string
  rating: number
  distance: string
  eta: string
  vehicle: string
  accessibilityFeatures: string[]
  specialTraining: string[]
  photo: string
}

const accessibleVehicles: AccessibleVehicle[] = [
  {
    id: "1",
    driverName: "Rajesh Kumar",
    rating: 4.9,
    distance: "1.2 km",
    eta: "5 mins",
    vehicle: "Toyota Innova - DL 4C 5678 (Wheelchair Accessible)",
    accessibilityFeatures: [
      "Wheelchair ramp",
      "Tie-down system",
      "Audio assistance",
      "Lowered floor",
      "Wide doors"
    ],
    specialTraining: [
      "Disability awareness",
      "Wheelchair assistance",
      "Medical emergency response",
      "Patient transfer certified"
    ],
    photo: ""
  },
  {
    id: "2",
    driverName: "Sunita Yadav",
    rating: 4.8,
    distance: "2.1 km",
    eta: "7 mins",
    vehicle: "Maruti Ertiga - HR 26 9012 (Modified for Accessibility)",
    accessibilityFeatures: [
      "Swivel seats",
      "Hand controls available",
      "Service animal space",
      "Voice navigation",
      "Emergency button"
    ],
    specialTraining: [
      "Visual impairment assistance",
      "Hearing impairment support",
      "Mobility assistance",
      "First aid certified"
    ],
    photo: ""
  }
]

const AccessibleRideBooking = ({ isOpen, onClose }: AccessibleRideBookingProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<AccessibleVehicle | null>(null)
  const [showGuideOptions, setShowGuideOptions] = useState(false)
  const [needsGuide, setNeedsGuide] = useState(false)
  const [selectedAssistance, setSelectedAssistance] = useState<string[]>([])
  const [showAccessibilityGuide, setShowAccessibilityGuide] = useState(false)

  const assistanceOptions = [
    "Wheelchair assistance",
    "Visual guidance",
    "Hearing assistance",
    "Boarding help",
    "Luggage assistance",
    "Service animal accommodation",
    "Medical equipment transport",
    "Personal care assistant"
  ]

  const handleVehicleSelect = (vehicle: AccessibleVehicle) => {
    setSelectedVehicle(vehicle)
  }

  const handleAssistanceChange = (assistance: string, checked: boolean) => {
    if (checked) {
      setSelectedAssistance([...selectedAssistance, assistance])
    } else {
      setSelectedAssistance(selectedAssistance.filter(a => a !== assistance))
    }
  }

  if (showAccessibilityGuide) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <span>Accessibility Guide</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Accessibility className="h-4 w-4 mr-2 text-success" />
                  Available Accessibility Features
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-medium text-primary">Mobility Assistance</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Wheelchair accessible vehicles with ramps</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Tie-down systems for wheelchair security</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Swivel seats for easy transfer</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Wide doors and lowered floors</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium text-primary">Sensory Support</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Audio navigation and announcements</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Visual indicators and displays</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Service animal accommodation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Emergency assistance buttons</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4">Do You Need a Personal Guide?</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="needsGuide" 
                      checked={needsGuide}
                      onCheckedChange={(checked) => setNeedsGuide(checked as boolean)}
                    />
                    <label htmlFor="needsGuide" className="text-sm font-medium">
                      Yes, I would like a trained accessibility guide to accompany me
                    </label>
                  </div>
                  
                  {needsGuide && (
                    <div className="ml-6 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Our trained accessibility guides can provide:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>Personal assistance during the journey</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>Help with boarding and alighting</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>Emergency support and communication</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>Assistance with personal belongings</span>
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        *Additional charges may apply for guide services
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button 
                variant="hero" 
                onClick={() => setShowAccessibilityGuide(false)}
                className="flex-1"
              >
                Continue Booking
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Accessibility className="h-6 w-6 text-success" />
            <span>Accessible Rides Available</span>
            <Badge variant="secondary" className="bg-success/10 text-success">
              {accessibleVehicles.length} vehicles nearby
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assistance Requirements */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">What assistance do you need?</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {assistanceOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option}
                      checked={selectedAssistance.includes(option)}
                      onCheckedChange={(checked) => handleAssistanceChange(option, checked as boolean)}
                    />
                    <label htmlFor={option} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Vehicles */}
          <div className="space-y-4">
            <h4 className="font-semibold">Available Accessible Vehicles</h4>
            {accessibleVehicles.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedVehicle?.id === vehicle.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleVehicleSelect(vehicle)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={vehicle.photo} />
                      <AvatarFallback className="bg-success/20 text-success font-semibold">
                        {vehicle.driverName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-semibold text-lg">{vehicle.driverName}</h5>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{vehicle.rating}</span>
                            </div>
                            <span>Accessibility Certified</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{vehicle.distance}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-success">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {vehicle.eta}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Vehicle: </span>
                        <span className="font-medium">{vehicle.vehicle}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-success">Accessibility Features:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {vehicle.accessibilityFeatures.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-success/10 text-success">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-primary">Special Training:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {vehicle.specialTraining.map((training, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {training}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="hero" 
              disabled={!selectedVehicle}
              className="flex-1"
            >
              Book Accessible Ride
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAccessibilityGuide(true)}
            >
              Accessibility Guide
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AccessibleRideBooking