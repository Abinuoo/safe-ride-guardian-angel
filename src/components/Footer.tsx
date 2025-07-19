import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Accessibility
} from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">SafeRide</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Your safety is our priority. Experience transportation with advanced safety features, 
              real-time monitoring, and 24/7 protection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-background/80 hover:text-background transition-colors">Safety Features</a></li>
              <li><a href="#women-only" className="text-background/80 hover:text-background transition-colors">Women-Only Rides</a></li>
              <li><a href="#accessibility" className="text-background/80 hover:text-background transition-colors">Accessibility</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Driver Application</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Safety Center</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Community</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Legal</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Emergency */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact & Emergency</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-background/60" />
                <span className="text-background/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-background/60" />
                <span className="text-background/80">support@saferide.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-background/60" />
                <span className="text-background/80">Available in 50+ cities</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button variant="sos" size="sm" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Hotline
              </Button>
              <Button variant="outline" size="sm" className="w-full bg-background/10 border-background/30 text-background hover:bg-background/20">
                Safety Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Stay Updated on Safety</h3>
            <p className="text-background/80 mb-4">
              Get the latest safety updates, new features, and transportation tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 bg-background/10 border-background/30 text-background placeholder:text-background/60"
              />
              <Button variant="hero" size="default">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-background/60 text-sm">
              <span>© 2024 SafeRide. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-safety" />
                <span>Women-Safe</span>
              </div>
              <div className="flex items-center space-x-1">
                <Accessibility className="h-4 w-4 text-success" />
                <span>Accessible</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-background/60 text-sm">
              <a href="#" className="hover:text-background transition-colors">Privacy</a>
              <a href="#" className="hover:text-background transition-colors">Terms</a>
              <a href="#" className="hover:text-background transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer