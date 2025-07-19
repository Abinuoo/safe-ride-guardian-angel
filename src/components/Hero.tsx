import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Users, Shield, Star } from "lucide-react"
import heroImage from "@/assets/hero-transportation.jpg"

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("")
  const [destination, setDestination] = useState("")

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
              <Button variant="hero" size="xl" className="flex-1 sm:flex-none">
                Book Safe Ride
              </Button>
              <Button variant="outline" size="xl" className="bg-background/10 border-background/30 text-background hover:bg-background/20">
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
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                    <Input 
                      placeholder="Pickup location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-safety" />
                    <Input 
                      placeholder="Where to?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>

                  {/* Ride Options */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="flex-col h-16 p-2">
                      <Users className="h-4 w-4 mb-1" />
                      <span className="text-xs">Standard</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-col h-16 p-2 border-primary text-primary">
                      <Shield className="h-4 w-4 mb-1" />
                      <span className="text-xs">Women-Only</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-col h-16 p-2">
                      <Star className="h-4 w-4 mb-1" />
                      <span className="text-xs">Premium</span>
                    </Button>
                  </div>

                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={!pickupLocation || !destination}
                  >
                    Find Safe Ride
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
    </section>
  )
}

export default Hero