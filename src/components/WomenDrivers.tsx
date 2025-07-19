import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Car, Clock, Heart, CheckCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface WomenDriversProps {
  children: React.ReactNode
}

const WomenDrivers = ({ children }: WomenDriversProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null)
  const { toast } = useToast()

  const womenDrivers = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 4.9,
      totalRides: 1247,
      experience: "5 years",
      vehicle: "Honda Civic 2021",
      licensePlate: "WD001",
      specializations: ["Night Safety", "Airport Transfers"],
      image: "/placeholder.svg",
      safetyFeatures: ["Verified Female Driver", "Safety Training Certified", "Emergency Response Trained"],
      availability: "Available Now",
      location: "2.3 km away"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rating: 4.8,
      totalRides: 892,
      experience: "3 years",
      vehicle: "Toyota Prius 2020",
      licensePlate: "WD002",
      specializations: ["Women-Only Service", "Late Night Rides"],
      image: "/placeholder.svg",
      safetyFeatures: ["Women's Safety Advocate", "Defensive Driving Certified", "First Aid Trained"],
      availability: "Available Now",
      location: "1.8 km away"
    },
    {
      id: 3,
      name: "Jennifer Kim",
      rating: 4.9,
      totalRides: 1564,
      experience: "6 years",
      vehicle: "Hyundai Elantra 2022",
      licensePlate: "WD003",
      specializations: ["Business Travel", "Medical Appointments"],
      image: "/placeholder.svg",
      safetyFeatures: ["Background Verified", "Safety Equipment Equipped", "Emergency Contact System"],
      availability: "Available in 5 mins",
      location: "3.1 km away"
    }
  ]

  const selectDriver = (driverId: number) => {
    setSelectedDriver(driverId)
    const driver = womenDrivers.find(d => d.id === driverId)
    
    toast({
      title: "Driver Selected",
      description: `${driver?.name} has been selected for your women-only ride`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Women-Only Ride Service</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="bg-gradient-primary border-0 text-primary-foreground">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Verified Female Drivers Available</h3>
                <p className="text-primary-foreground/80">
                  All drivers are thoroughly background-checked and safety-trained for your peace of mind
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Driver Selection Grid */}
          <div className="grid gap-6">
            {womenDrivers.map((driver) => (
              <Card 
                key={driver.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  selectedDriver === driver.id ? 'ring-2 ring-primary shadow-primary/20' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Driver Info */}
                    <div className="md:col-span-1">
                      <div className="text-center space-y-3">
                        <Avatar className="w-20 h-20 mx-auto border-4 border-primary/20">
                          <AvatarImage src={driver.image} alt={driver.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            {driver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h4 className="font-semibold text-lg text-foreground">{driver.name}</h4>
                          <div className="flex items-center justify-center space-x-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{driver.rating}</span>
                            <span className="text-muted-foreground">({driver.totalRides} rides)</span>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          {driver.availability}
                        </Badge>
                      </div>
                    </div>

                    {/* Experience & Vehicle */}
                    <div className="md:col-span-1 space-y-4">
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">Experience</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{driver.experience} driving</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-primary" />
                            <span>{driver.vehicle}</span>
                          </div>
                          <div className="text-muted-foreground">{driver.location}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">Specializations</h5>
                        <div className="space-y-1">
                          {driver.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Safety Features */}
                    <div className="md:col-span-1 space-y-4">
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">Safety Features</h5>
                        <div className="space-y-2">
                          {driver.safetyFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Shield className="h-4 w-4 text-success" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="md:col-span-1 flex flex-col justify-center">
                      <Button
                        onClick={() => selectDriver(driver.id)}
                        variant={selectedDriver === driver.id ? "default" : "outline"}
                        size="lg"
                        className="w-full"
                      >
                        {selectedDriver === driver.id ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select Driver'
                        )}
                      </Button>
                      
                      {selectedDriver === driver.id && (
                        <div className="text-center mt-3">
                          <Button variant="hero" size="sm" className="w-full">
                            Confirm Booking
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Safety Information */}
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Shield className="h-8 w-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Background Verified</h4>
                  <p className="text-sm text-muted-foreground">
                    All female drivers undergo comprehensive background checks
                  </p>
                </div>
                <div className="space-y-2">
                  <Heart className="h-8 w-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Safety Trained</h4>
                  <p className="text-sm text-muted-foreground">
                    Specialized training in women's safety and emergency response
                  </p>
                </div>
                <div className="space-y-2">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                  <h4 className="font-semibold">24/7 Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Continuous monitoring for added safety and peace of mind
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

export default WomenDrivers