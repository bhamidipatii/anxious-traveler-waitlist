import { useLocation } from 'react-router-dom'
import '../App.css'
import DestinationForm from './DestinationForm.tsx'
import { useEffect } from 'react'

function Home() {
  const scrollToDestination = () => {
    const element = document.getElementById('destination-form')
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  const location = useLocation()
  useEffect(() => {
    if (location.hash === '#destination-form') {
      setTimeout(() => {
        scrollToDestination()
      }, 100)
    }
  }, [location])

  return (
    <>
      <main className="main-content">
        <div className="content-wrapper">
          <div className="left-column">
            <div className="divider"></div>
            <h2 className="main-heading">The Anxious Traveler</h2>
            <p className="paragraph">
              Are you anxious about travel? Don't know where to start but need to plan a trip? Have the FOMO to travel but not sure where to go?
            </p>
            <p className="paragraph">
              You're at the right place. This is for you. Stay tuned, so that we get the anxiety out of you and you don't have to use this platform anymore :)
            </p>
            <button className="cta-button" onClick={scrollToDestination}>Join the waitlist</button>
          </div>

          <div className="right-column">
            <div className="image-collage">
              <div className="image-wrapper image-top-right">
                <img 
                  src="./src/assets/images/man-with-camera.jpeg" 
                  alt="Man with camera" 
                  className="collage-image"
                />
              </div>
              <div className="image-wrapper image-middle-left">
                <img 
                  src="./src/assets/images/scenery.jpeg" 
                  alt="Travel essentials" 
                  className="collage-image"
                />
              </div>
              <div className="image-wrapper image-bottom-right">
                <img 
                  src="./src/assets/images/airplane-window.jpeg" 
                  alt="Airplane window view" 
                  className="collage-image"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <DestinationForm />
    </>
  )
}

export default Home

