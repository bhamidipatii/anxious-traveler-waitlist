import '../styles/DestinationForm.css'
import { HiOutlineLocationMarker, HiLocationMarker } from 'react-icons/hi'
import { HiOutlineArrowRight, HiArrowRight } from 'react-icons/hi'
import { HiOutlineCalendar, HiCalendar } from 'react-icons/hi'
import { HiLightBulb } from 'react-icons/hi'

function DestinationForm() {
  return (
    <section id="destination-form" className="destination-section">
      <div className="destination-container">
        <h2 className="destination-title">Pick Your Destination</h2>
        <p className="destination-subtitle">Discover insights for your perfect trip</p>
        
        <div className="form-card">
          <div className="form-group">
            <label htmlFor="from" className="form-label">From</label>
            <div className="input-wrapper">
              <div className="icon-container">
                <HiOutlineLocationMarker className="input-icon input-icon-outline" />
                <HiLocationMarker className="input-icon input-icon-filled" />
              </div>
              <input 
                type="text" 
                id="from" 
                className="form-input text-input" 
                placeholder="Departure city"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="to" className="form-label">To</label>
            <div className="input-wrapper">
              <div className="icon-container">
                <HiOutlineArrowRight className="input-icon input-icon-outline" />
                <HiArrowRight className="input-icon input-icon-filled" />
              </div>
              <input 
                type="text" 
                id="to" 
                className="form-input text-input" 
                placeholder="Destination city"
              />
            </div>
          </div>

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
                      type="text" 
                      id="start-date" 
                      className="form-input date-input" 
                      placeholder="mm/dd/yyyy"
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
                      type="text" 
                      id="end-date" 
                      className="form-input date-input" 
                      placeholder="mm/dd/yyyy"
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

          <button className="insights-button">
            <HiLightBulb className="lightbulb-icon" />
            Get Travel Insights
          </button>
        </div>

        <p className="footer-text">Powered by Anxious Traveler Beta • Making travel stress-free</p>
      </div>
    </section>
  )
}

export default DestinationForm