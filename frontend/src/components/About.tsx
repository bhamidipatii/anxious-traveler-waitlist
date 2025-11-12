import '../styles/About.css'

function About() {
	const values = {
		empathy: {
			icon: "🤝",
			title: "Empathy First",
			description: "We understand your concerns because we've been there. Every feature is built with your comfort in mind.",
		},
		inclusive: {
			icon: "🌍",
			title: "Inclusive Travel",
			description: "Travel is for everyone. We celebrate diverse experiences and make exploration accessible to all.",
		},
		simplicity: {
			icon: "💡",
			title: "Simplicity",
			description: "Complex planning shouldn't add to your anxiety. We make travel planning simple and intuitive.",
		},
		growth: {
			icon: "✨",
			title: "Growth",
			description: "Every journey is an opportunity to grow. We support you as you step outside your comfort zone.",
		},
	};
	const team = {
		aditya: {
			name: "Aditya Bhamidipati",
			role: "Product and Growth",
			bio: "Sr Program Manager at Micron with a Master's in Engineering Management from Cornell University. Aditya combines technical expertise with a passion for making travel accessible to everyone.",
		},
		
		nikhita: {
			name: "Nikhita Paluru",
			role: "Technology and Platform",
			bio: "Software Engineer with a Master's in Computer Science from University of Buffalo - SUNY. Nikhita is passionate about building tools that help people travel with confidence.",
		},
	};
  return (
    <div className="about-page">
		{/* About The Team Section */}
		<section className="about-team-section">
        	<h2 className="about-team-title">About The Team</h2>
        	<p className="mission-statement">
          		We're a passionate group of travelers and technologists on a mission to make travel accessible and anxiety-free for everyone.
        	</p>
      	</section>
	
      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="story-container">
          <h2 className="story-title">Our Story</h2>
          <p className="story-paragraph">
            The Anxious Traveler was born from personal experience. We understand the overwhelming feeling of wanting to explore the world but being held back by anxiety, uncertainty, and the fear of the unknown.
          </p>
          <p className="story-paragraph">
            Travel should be exciting, not stressful. Whether it's choosing a destination, planning an itinerary, or simply taking that first step, we're here to guide you through every part of your journey.
          </p>
          <p className="story-paragraph">
            Our platform combines expert travel knowledge with practical tools and supportive community features to help you overcome travel anxiety and discover the joy of exploration.
          </p>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="meet-team-section">
        <h2 className="meet-team-title">Meet The Team</h2>
        <div className="team-cards">
			{Object.values(team).map((member) => (
				<div className="team-card">
					<div className="team-avatar">
						<span className="avatar-letter">{member.name.split(' ').map(name => name[0]).join('')}</span>
					</div>
					<h3 className="team-name">{member.name}</h3>
					<p className="team-role">{member.role}</p>
					<p className="team-bio">{member.bio}</p>
				</div>
			))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values-section">
        <h2 className="values-title">Our Values</h2>
        <div className="values-cards">
			{Object.values(values).map((value) => (
				<div className="value-card">
					<div className="value-icon">{value.icon}</div>
					<h3 className="value-title">{value.title}</h3>
					<p className="value-description">{value.description}</p>
				</div>
			))}
        </div>
      </section>
    </div>
  )
}

export default About

