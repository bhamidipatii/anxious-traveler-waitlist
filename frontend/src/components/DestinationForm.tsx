import { useState } from 'react'
import '../styles/DestinationForm.css'
import AirportAutocomplete from './AirportAutocomplete'
import type { Airport } from '../dataTypes/airport'
import { HiOutlineLocationMarker, HiLocationMarker } from 'react-icons/hi'
import { HiOutlineArrowRight, HiArrowRight } from 'react-icons/hi'
import { HiOutlineCalendar, HiCalendar } from 'react-icons/hi'
import { HiLightBulb } from 'react-icons/hi'

function DestinationForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    from: null as Airport | null,
    to: null as Airport | null,
    startDate: '',
    endDate: ''
  })

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle date input changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle airport selection
  const handleFromAirportChange = (airport: Airport | null) => {
    setFormData(prev => ({
      ...prev,
      from: airport
    }))
  }

  const handleToAirportChange = (airport: Airport | null) => {
    setFormData(prev => ({
      ...prev,
      to: airport
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent page reload
    
    // Validation
    if (!formData.from || !formData.to) {
      alert('Please select both departure and destination airports')
      return
    }
    
    if (!formData.startDate || !formData.endDate) {
      alert('Please select travel dates')
      return
    }

    // Check if end date is after start date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert('End date must be after start date')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare data for backend
      const travelData = {
        from: {
          airport: formData.from.name,
          code: formData.from.iata,
          city: formData.from.city,
          country: formData.from.country
        },
        to: {
          airport: formData.to.name,
          code: formData.to.iata,
          city: formData.to.city,
          country: formData.to.country
        },
        dates: {
          start: formData.startDate,
          end: formData.endDate
        }
      }

      console.log('Form submitted:', travelData)
      
      alert('Travel insights request submitted!')

    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="destination-form" className="destination-section">
      <div className="destination-container">
        <h2 className="destination-title">Pick Your Destination</h2>
        <p className="destination-subtitle">Discover insights for your perfect trip</p>
        
        <form className="form-card" onSubmit={handleSubmit}>
          {/* FROM - Airport Autocomplete */}
          <div className="form-group">
            <label htmlFor="from" className="form-label">From</label>
            <div className="input-wrapper autocomplete-wrapper">
              <div className="icon-container">
                <HiOutlineLocationMarker className="input-icon input-icon-outline" />
                <HiLocationMarker className="input-icon input-icon-filled" />
              </div>
              <AirportAutocomplete
                value={formData.from}
                onChange={handleFromAirportChange}
                placeholder="Search departure airport"
              />
            </div>
          </div>

          {/* TO - Airport Autocomplete */}
          <div className="form-group">
            <label htmlFor="to" className="form-label">To</label>
            <div className="input-wrapper autocomplete-wrapper">
              <div className="icon-container">
                <HiOutlineArrowRight className="input-icon input-icon-outline" />
                <HiArrowRight className="input-icon input-icon-filled" />
              </div>
              <AirportAutocomplete
                value={formData.to}
                onChange={handleToAirportChange}
                placeholder="Search destination airport"
              />
            </div>
          </div>

          {/* TRAVEL DATES */}
          <div className="travel-week-group">
            <label className="travel-week-label">Travel Week(s)</label>
            <div className="date-card">
              <div className="date-sub-label">
                <HiOutlineCalendar className="calendar-icon calendar-icon-outline" />
                <HiCalendar className="calendar-icon calendar-icon-filled" />
                <span>Select your travel dates</span>
              </div>
              <div className="date-inputs">
                <div className="date-group">
                  <label htmlFor="start-date" className="date-label">Start</label>
                  <div className="input-wrapper">
                    <input 
                      type="date"
                      id="start-date"
                      name="startDate"
                      className="form-input date-input" 
                      value={formData.startDate}
                      onChange={handleDateChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <div className="icon-container icon-container-right">
                      <HiOutlineCalendar className="input-icon-right input-icon-outline" />
                      <HiCalendar className="input-icon-right input-icon-filled" />
                    </div>
                  </div>
                </div>
                <div className="date-group">
                  <label htmlFor="end-date" className="date-label">End</label>
                  <div className="input-wrapper">
                    <input 
                      type="date"
                      id="end-date"
                      name="endDate"
                      className="form-input date-input"
                      value={formData.endDate}
                      onChange={handleDateChange}
                      required
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                    />
                    <div className="icon-container icon-container-right">
                      <HiOutlineCalendar className="input-icon-right input-icon-outline" />
                      <HiCalendar className="input-icon-right input-icon-filled" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            className="insights-button"
            disabled={isSubmitting}
          >
            <HiLightBulb className="lightbulb-icon" />
            {isSubmitting ? 'Loading...' : 'Get Travel Insights'}
          </button>
        </form>

        <p className="footer-text">Powered by Anxious Traveler Beta • Making travel stress-free</p>
      </div>
    </section>
  )
}

export default DestinationForm