import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { 
  Shield, 
  Eye, 
  MessageSquare, 
  Phone, 
  Camera, 
  Heart,
  AlertTriangle,
  MapPin,
  Clock
} from "lucide-react"
import safetyDashboard from "@/assets/safety-dashboard.jpg"
import DriverSelection from "./DriverSelection"
import VoiceRecorder from "./VoiceRecorder"
import LiveTracking from "./LiveTracking"
import WomenDrivers from "./WomenDrivers"
import SafetyChatbot from "./SafetyChatbot"

const SafetyFeatures = () => {
  const features = [
    {
      icon: Eye,
      title: "Know Your Ride",
      description: "Complete driver profile, vehicle details, and real-time tracking before you step in.",
      color: "text-primary"
    },
    {
      icon: Camera,
      title: "Blackbox Driver Monitoring", 
      description: "Continuous driver behavior monitoring with AI-powered safety alerts and incident recording.",
      color: "text-safety"
    },
    {
      icon: Shield,
      title: "Guardian Angel Real-Time Safety",
      description: "24/7 monitoring with automatic emergency detection and instant response protocols.",
      color: "text-success"
    },
    {
      icon: Phone,
      title: "Smart SOS with Context",
      description: "One-touch emergency assistance that automatically shares your location and ride details.",
      color: "text-destructive"
    },
    {
      icon: Heart,
      title: "Women-Only Ride Option",
      description: "Dedicated female drivers for enhanced comfort and safety for women passengers.",
      color: "text-primary"
    },
    {
      icon: MessageSquare,
      title: "Safety Assistant Chatbot",
      description: "AI-powered assistant available 24/7 for safety questions and emergency guidance.",
      color: "text-safety"
    }
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Advanced Safety Technology
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Safety Features That Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive safety suite ensures your protection from booking to destination, 
            with cutting-edge technology and human oversight.
          </p>
        </div>

        {/* Main Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Real-Time Safety Dashboard
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Monitor every aspect of your journey with our advanced safety dashboard. 
                Track driver behavior, route optimization, and emergency services in real-time.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Live GPS tracking with route deviations alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-safety/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-safety" />
                  </div>
                  <span className="text-foreground">Instant alerts for unusual driving patterns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-foreground">24/7 emergency response team monitoring</span>
                </div>
              </div>

              <Button variant="hero" size="lg" className="mt-6">
                View Live Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={safetyDashboard}
              alt="Safety Dashboard"
              className="rounded-2xl shadow-elegant w-full"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-elegant hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
                {feature.title === "Know Your Ride" ? (
                  <DriverSelection>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-primary hover:text-primary-hover">
                      Learn more →
                    </Button>
                  </DriverSelection>
                ) : feature.title === "Blackbox Driver Monitoring" ? (
                  <VoiceRecorder>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-primary hover:text-primary-hover">
                      Learn more →
                    </Button>
                  </VoiceRecorder>
                ) : feature.title === "Guardian Angel Real-Time Safety" ? (
                  <LiveTracking>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-primary hover:text-primary-hover">
                      Learn more →
                    </Button>
                  </LiveTracking>
                ) : feature.title === "Women-Only Ride Option" ? (
                  <WomenDrivers>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-primary hover:text-primary-hover">
                      Learn more →
                    </Button>
                  </WomenDrivers>
                ) : feature.title === "Safety Assistant Chatbot" ? (
                  <SafetyChatbot>
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-primary hover:text-primary-hover">
                      Learn more →
                    </Button>
                  </SafetyChatbot>
                ) : (
                  <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-primary hover:text-primary-hover">
                    Learn more →
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-safety border-0 text-safety-foreground p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Emergency? Help is One Tap Away</h3>
                <p className="text-safety-foreground/80">
                  Our Smart SOS system instantly connects you with emergency services and shares your real-time location.
                </p>
              </div>
              <Button variant="sos" size="xl" className="bg-background/20 hover:bg-background/30 text-safety-foreground border border-background/30">
                <Phone className="h-5 w-5 mr-2" />
                Emergency SOS
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default SafetyFeatures