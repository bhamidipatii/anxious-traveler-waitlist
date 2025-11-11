import { useState, useEffect, useRef } from 'react'
import airportsData from '../assets/data/airports.json'
import type { Airport } from '../dataTypes/airport'
import '../styles/AirportAutocomplete.css'

interface Props {
  value: Airport | null
  onChange: (airport: Airport | null) => void
  placeholder?: string
}

function AirportAutocomplete({ value, onChange, placeholder = "Search airports..." }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Airport[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  console.log(value)

  // Search airports when user types
  useEffect(() => {
    // Don't search if less than 1 character
    if (searchTerm.length < 1) {
      setResults([])
      return
    }

    const query = searchTerm.toLowerCase().trim()
    

    // Search by: IATA code, ICAO code, airport name, city, country
    const filtered = airportsData.filter((airport: Airport) => {
      const iataMatch = airport.iata.toLowerCase().includes(query)
      const icaoMatch = airport.icao?.toLowerCase().includes(query)
      const nameMatch = airport.name.toLowerCase().includes(query)
      const cityMatch = airport.city.toLowerCase().includes(query)
      const countryMatch = airport.country.toLowerCase().includes(query)
      
      return iataMatch || icaoMatch || nameMatch || cityMatch || countryMatch
    })
    
    // Limit to top 10 results
    setResults(filtered.slice(0, 10))
    setSelectedIndex(-1)
  }, [searchTerm])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleSelect = (airport: Airport) => {
    setSearchTerm(`${airport.city} - ${airport.name} (${airport.iata})`)
    onChange(airport)
    setIsOpen(false)
    setResults([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setIsOpen(true)
    }
  }

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text

    return (
      <>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + query.length)}</strong>
        {text.substring(index + query.length)}
      </>
    )
  }

  return (
    <div ref={wrapperRef} className="airport-autocomplete">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="airport-input"
        autoComplete="off"
      />

      {isOpen && results.length > 0 && (
        <div className="airport-dropdown">
          {results.map((airport, index) => (
            <div
              key={airport.id}
              className={`airport-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(airport)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="airport-icon">✈️</div>
              <div className="airport-details">
                <div className="airport-name">
                  {highlightMatch(airport.name, searchTerm)}
                </div>
                <div className="airport-location">
                  {highlightMatch(airport.city, searchTerm)}, {highlightMatch(airport.country, searchTerm)}
                </div>
              </div>
              <div className="airport-code">{airport.iata}</div>
            </div>
          ))}
        </div>
      )}

      {isOpen && searchTerm.length > 0 && results.length === 0 && (
        <div className="airport-dropdown">
          <div className="no-results">No airports found</div>
        </div>
      )}
    </div>
  )
}

export default AirportAutocomplete