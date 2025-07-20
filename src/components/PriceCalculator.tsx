import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  MapPin, 
  Zap, 
  Shield, 
  Star,
  TrendingUp,
  Navigation
} from "lucide-react"

interface PriceCalculatorProps {
  pickup: string
  destination: string
  rideType: "standard" | "premium" | "women-only" | "accessible"
}

interface PriceBreakdown {
  basePrice: number
  distancePrice: number
  timePrice: number
  surgeMultiplier: number
  safetyFee: number
  totalPrice: number
  estimatedTime: number
  distance: number
}

const PriceCalculator = ({ pickup, destination, rideType }: PriceCalculatorProps) => {
  const [priceData, setPriceData] = useState<PriceBreakdown | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (!pickup || !destination) {
      setPriceData(null)
      return
    }

    setIsCalculating(true)

    // Simulate price calculation with realistic delay
    const calculatePrice = () => {
      // Mock distance calculation (5-30 km)
      const distance = Math.random() * 25 + 5
      
      // Base prices by ride type
      const basePrices = {
        standard: 8,
        premium: 15,
        "women-only": 10,
        accessible: 12
      }

      const basePrice = basePrices[rideType]
      const distancePrice = distance * 0.8
      const timePrice = (distance / 30) * 60 * 0.2 // Time-based pricing
      const surgeMultiplier = Math.random() > 0.7 ? 1.5 : 1.0 // 30% chance of surge
      const safetyFee = 2.5 // Fixed safety fee
      
      const subtotal = basePrice + distancePrice + timePrice + safetyFee
      const totalPrice = subtotal * surgeMultiplier
      const estimatedTime = Math.ceil(distance * 2.5) // Minutes

      return {
        basePrice,
        distancePrice: Number(distancePrice.toFixed(2)),
        timePrice: Number(timePrice.toFixed(2)),
        surgeMultiplier,
        safetyFee,
        totalPrice: Number(totalPrice.toFixed(2)),
        estimatedTime,
        distance: Number(distance.toFixed(1))
      }
    }

    const timeoutId = setTimeout(() => {
      setPriceData(calculatePrice())
      setIsCalculating(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [pickup, destination, rideType])

  if (!pickup || !destination) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Enter pickup and destination to see pricing</p>
        </CardContent>
      </Card>
    )
  }

  if (isCalculating) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating best route and pricing...</p>
        </CardContent>
      </Card>
    )
  }

  if (!priceData) return null

  const getRideTypeInfo = () => {
    switch (rideType) {
      case "standard":
        return { icon: <Star className="h-4 w-4" />, color: "bg-muted", label: "Standard" }
      case "premium":
        return { icon: <Zap className="h-4 w-4" />, color: "bg-primary", label: "Premium" }
      case "women-only":
        return { icon: <Shield className="h-4 w-4" />, color: "bg-safety", label: "Women-Only" }
      case "accessible":
        return { icon: <Shield className="h-4 w-4" />, color: "bg-success", label: "Accessible" }
    }
  }

  const rideInfo = getRideTypeInfo()

  return (
    <Card className="w-full max-w-md shadow-elegant">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Navigation className="h-5 w-5 text-primary mr-2" />
            Price Estimate
          </div>
          <Badge variant="secondary" className={`${rideInfo.color} text-white`}>
            {rideInfo.icon}
            <span className="ml-1">{rideInfo.label}</span>
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Price */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            ${priceData.totalPrice}
            {priceData.surgeMultiplier > 1 && (
              <span className="text-base text-safety ml-2">
                {priceData.surgeMultiplier}x surge
              </span>
            )}
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {priceData.estimatedTime} min
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {priceData.distance} km
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Price Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base fare</span>
              <span className="text-foreground">${priceData.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance ({priceData.distance} km)</span>
              <span className="text-foreground">${priceData.distancePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time estimate</span>
              <span className="text-foreground">${priceData.timePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Safety fee
              </span>
              <span className="text-foreground">${priceData.safetyFee}</span>
            </div>
            {priceData.surgeMultiplier > 1 && (
              <div className="flex justify-between text-safety">
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Surge pricing ({priceData.surgeMultiplier}x)
                </span>
                <span>+${(priceData.totalPrice - (priceData.basePrice + priceData.distancePrice + priceData.timePrice + priceData.safetyFee)).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${priceData.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Features Included */}
        <div className="bg-muted/30 p-3 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2 text-sm">Included Features</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Real-time GPS tracking</li>
            <li>• Emergency SOS button</li>
            <li>• Driver background check</li>
            <li>• 24/7 safety monitoring</li>
            {rideType === "premium" && <li>• Premium vehicle comfort</li>}
            {rideType === "women-only" && <li>• Female driver guarantee</li>}
            {rideType === "accessible" && <li>• Wheelchair accessibility</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceCalculator