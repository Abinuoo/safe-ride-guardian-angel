import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation } from "lucide-react"

interface LocationInputProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  icon?: "pickup" | "destination"
}

const indianCities = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Surat, Gujarat",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Patna, Bihar",
  "Indore, Madhya Pradesh",
  "Thane, Maharashtra",
  "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh",
  "Vadodara, Gujarat",
  "Firozabad, Uttar Pradesh",
  "Ludhiana, Punjab",
  "Rajkot, Gujarat",
  "Agra, Uttar Pradesh",
  "Siliguri, West Bengal",
  "Nashik, Maharashtra",
  "Faridabad, Haryana",
  "Patiala, Punjab",
  "Meerut, Uttar Pradesh",
  "Kalyan-Dombivali, Maharashtra",
  "Vasai-Virar, Maharashtra",
  "Varanasi, Uttar Pradesh",
  "Srinagar, Jammu and Kashmir",
  "Dhanbad, Jharkhand",
  "Jodhpur, Rajasthan",
  "Amritsar, Punjab",
  "Raipur, Chhattisgarh",
  "Allahabad, Uttar Pradesh",
  "Coimbatore, Tamil Nadu",
  "Jabalpur, Madhya Pradesh",
  "Gwalior, Madhya Pradesh",
  "Vijayawada, Andhra Pradesh",
  "Madurai, Tamil Nadu",
  "Guwahati, Assam",
  "Chandigarh, Chandigarh",
  "Hubli-Dharwad, Karnataka",
  "Amroha, Uttar Pradesh",
  "Moradabad, Uttar Pradesh",
  "Gurgaon, Haryana",
  "Aligarh, Uttar Pradesh",
  "Solapur, Maharashtra",
  "Ranchi, Jharkhand",
  "Jalandhar, Punjab",
  "Tiruchirappalli, Tamil Nadu",
  "Bhubaneswar, Odisha"
]

const LocationInput = ({ placeholder, value, onChange, className, icon = "pickup" }: LocationInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length > 2) {
      setIsLoading(true)
      
      // Simulate API delay for realistic experience
      const timeoutId = setTimeout(() => {
        const filtered = indianCities.filter(city =>
          city.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5)
        setSuggestions(filtered)
        setShowSuggestions(true)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setIsLoading(false)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        suggestionsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
  }

  const IconComponent = icon === "pickup" ? MapPin : Navigation

  return (
    <div className="relative">
      <IconComponent className={`absolute left-3 top-3 h-5 w-5 ${icon === "pickup" ? "text-primary" : "text-safety"}`} />
      <Input 
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        className={`pl-10 pr-10 h-12 ${className}`}
      />
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-elegant mt-1 z-50 max-h-60 overflow-y-auto animate-fade-in"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors duration-200 flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
              <div>
                <div className="font-medium text-foreground">{suggestion}</div>
                <div className="text-xs text-muted-foreground">India</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationInput