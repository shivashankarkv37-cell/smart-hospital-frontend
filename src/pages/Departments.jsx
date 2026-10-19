const departments = [
  { name: 'Cardiology', description: 'Heart and circulation care', icon: '♡' },
  { name: 'Pediatrics', description: 'Care for infants and children', icon: '✳' },
  { name: 'Orthopedics', description: 'Bone, joint, and mobility care', icon: '⌁' },
  { name: 'Neurology', description: 'Brain and nervous system care', icon: '◉' },
  { name: 'Dermatology', description: 'Skin, hair, and nail care', icon: '◌' },
  { name: 'Family Medicine', description: 'Everyday and preventive care', icon: '✚' },
]

function Departments() {
  return (
    <section className="section placeholder-page">
      <div className="container">
        <div className="placeholder-content placeholder-heading">
          <p className="eyebrow">EXPLORE OUR CARE</p>
          <h1>Hospital departments</h1>
          <p>Explore the sample departments planned for the CareBridge patient experience.</p>
        </div>
        <div className="department-grid department-grid-page">
          {departments.map((department) => (
            <article className="department-card department-card-static" key={department.name}>
              <span className="department-icon" aria-hidden="true">{department.icon}</span>
              <h2>{department.name}</h2>
              <p>{department.description}</p>
            </article>
          ))}
        </div>
        <p className="placeholder-note">Department details and appointment availability are sample content and are not connected to a backend.</p>
      </div>
    </section>
  )
}

export default Departments
