import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Shield, Menu, X, Phone } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SafeRide</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Safety Features
            </a>
            <a href="#accessibility" className="text-foreground hover:text-primary transition-colors">
              Accessibility
            </a>
            <a href="#women-only" className="text-foreground hover:text-primary transition-colors">
              Women-Only Rides
            </a>
            <a href="#support" className="text-foreground hover:text-primary transition-colors">
              Support
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="default">
              Sign In
            </Button>
            <Button variant="hero" size="default">
              Get Started
            </Button>
            <Button variant="sos" size="default" className="ml-2">
              <Phone className="h-4 w-4 mr-2" />
              Emergency
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Safety Features
              </a>
              <a href="#accessibility" className="text-foreground hover:text-primary transition-colors">
                Accessibility
              </a>
              <a href="#women-only" className="text-foreground hover:text-primary transition-colors">
                Women-Only Rides
              </a>
              <a href="#support" className="text-foreground hover:text-primary transition-colors">
                Support
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" size="default">
                  Sign In
                </Button>
                <Button variant="hero" size="default">
                  Get Started
                </Button>
                <Button variant="sos" size="default">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header