import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Accessibility, 
  Volume2, 
  Navigation, 
  Eye,
  HandHeart,
  UserCheck,
  ShieldCheck
} from "lucide-react"
import womenOnlyRide from "@/assets/women-only-ride.jpg"
import accessibilityFeatures from "@/assets/accessibility-features.jpg"

const SpecialFeatures = () => {
  const accessibilityFeatures_list = [
    {
      icon: Accessibility,
      title: "Wheelchair Accessible Vehicles",
      description: "Fleet of specially equipped vehicles with wheelchair ramps and secure positioning systems."
    },
    {
      icon: Volume2,
      title: "Audio Navigation Assistance",
      description: "Voice-guided navigation and audio descriptions for visually impaired passengers."
    },
    {
      icon: Navigation,
      title: "Easy Access Booking",
      description: "Simplified booking interface with large buttons and screen reader compatibility."
    },
    {
      icon: HandHeart,
      title: "Trained Support Drivers",
      description: "Drivers specially trained to assist passengers with various disabilities and mobility needs."
    }
  ]

  const womenSafetyFeatures = [
    {
      icon: UserCheck,
      title: "Verified Female Drivers",
      description: "Thoroughly background-checked female drivers for your peace of mind."
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Safety Protocols",
      description: "Additional safety measures including real-time monitoring and check-ins."
    },
    {
      icon: Eye,
      title: "Route Optimization",
      description: "Safe route selection prioritizing well-lit and populated areas."
    },
    {
      icon: Heart,
      title: "24/7 Women Support Line",
      description: "Dedicated support line staffed by trained female safety specialists."
    }
  ]

  return (
    <div className="space-y-20">
      {/* Women-Only Rides Section */}
      <section id="women-only" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={womenOnlyRide}
                alt="Women-Only Ride Option"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Women's Safety First
                </Badge>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Heart className="h-4 w-4 mr-2" />
                  Women-Only Transportation
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Safe Rides by Women, for Women
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our women-only ride option connects female passengers with verified female drivers, 
                  creating a comfortable and secure transportation environment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {womenSafetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg">
                  Book Women-Only Ride
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features Section */}
      <section id="accessibility" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <div className="inline-flex items-center bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Accessibility className="h-4 w-4 mr-2" />
                  Inclusive Transportation
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Transportation for Everyone
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe transportation should be accessible to all. Our comprehensive accessibility 
                  features ensure comfortable and dignified travel for passengers with disabilities.
                </p>
              </div>

              <div className="space-y-6">
                {accessibilityFeatures_list.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm bg-background/80">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="success" size="lg">
                  Book Accessible Ride
                </Button>
                <Button variant="outline" size="lg">
                  Accessibility Guide
                </Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <img 
                src={accessibilityFeatures}
                alt="Accessibility Features"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-success text-success-foreground px-3 py-1">
                  <Accessibility className="h-4 w-4 mr-2" />
                  Fully Accessible
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpecialFeatures