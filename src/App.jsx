import { useEffect, useRef, useState } from "react";
import "./index.css";

const projects = [
  {
    id: "01",
    title: "Indoor air-quality monitor",
    category: "Electronics",
    type: "Embedded systems / Capstone",
    status: "Design exploration",
    visual: "monitor",
    description:
      "Turning gas-sensor readings into a useful display and a ventilation-control signal.",
    problem:
      "Design a battery-powered indoor monitor that tracks air-quality changes and triggers a vent or fan when a threshold is exceeded.",
    approach:
      "Explored an ENS161 gas sensor, a GD32F405RG development board, and a DFRobot 2.0-inch serial display connected over I²C. The planned display plots readings over time, while threshold logic controls ventilation.",
    skills: ["Sensor interfaces", "I²C", "Battery budgeting", "Control logic"],
    note:
      "The battery-runtime target is at least one week. Runtime and prototype performance have not been verified here. Displayed readings are illustrative.",
  },
  {
    id: "02",
    title: "Programmable power control",
    category: "Electronics",
    type: "Circuit design / Arduino",
    status: "Design iteration",
    visual: "circuit",
    description:
      "Working through voltage regulation, PWM filtering, feedback, and PCB layout.",
    problem:
      "Develop an Arduino-controlled power circuit while keeping measurement signals within the ADC input range.",
    approach:
      "Worked through a 17 V supply, an L7805 regulator, op-amp amplification, BJT control, filtered PWM, voltage-divider sensing, and protection diodes. PCB work considered connectors, thermal spacing, and mounting.",
    skills: ["Analog circuits", "PWM", "ADC scaling", "Altium"],
    note:
      "The design target included an output up to 10 V. This entry describes development work, not verified hardware performance.",
  },
  {
    id: "03",
    title: "Arc Card Analyzer",
    category: "Code",
    type: "C programming / CMPUT 201",
    status: "Course project",
    visual: "terminal",
    description:
      "Reconstructing transit trips from schedule files and tap-history records.",
    problem:
      "Read route schedules and transit tap records, reconstruct trips, and handle ambiguous journeys.",
    approach:
      "Developed file-parsing logic, arrays, stop lookup, error handling, and prompts for ambiguous trips. The workflow reads schedule paths and tap history before writing results to output.txt.",
    skills: ["C", "File I/O", "Pointers", "Parsing", "Debugging"],
    note:
      "The terminal illustration represents the workflow. This portfolio does not include a live executable.",
  },
  {
    id: "04",
    title: "Risk, return & market models",
    category: "Analysis",
    type: "Economics / Quantitative methods",
    status: "Coursework",
    visual: "chart",
    description:
      "Connecting uncertainty, investment decisions, and pricing through mathematical models.",
    problem:
      "Understand how uncertainty, time, and market structure affect economic decisions.",
    approach:
      "Worked through expected value, variance, certainty equivalents, insurance, diversification, bond valuation, NPV, CAPM, monopoly pricing, and price discrimination.",
    skills: ["Expected utility", "NPV", "CAPM", "Market structure"],
    note:
      "The chart is conceptual and does not represent investment performance.",
  },
  {
    id: "05",
    title: "Survey traverse analysis",
    category: "Analysis",
    type: "Surveying / Applied mathematics",
    status: "Coursework",
    visual: "survey",
    description:
      "From observed angles to adjusted bearings, coordinates, and closure checks.",
    problem:
      "Translate traverse observations into consistent directions and coordinates while checking closure.",
    approach:
      "Applied class methods for angular corrections, azimuths, departures, latitudes, northing, and easting. Focused on sign conventions, rounding, and checking calculations.",
    skills: ["Azimuths", "Coordinate geometry", "Error correction"],
    note:
      "The traverse drawing is illustrative and does not represent a surveyed parcel.",
  },
  {
    id: "06",
    title: "Transformers & magnetic circuits",
    category: "Electronics",
    type: "Electromechanics / Lab analysis",
    status: "Coursework & lab study",
    visual: "wave",
    description:
      "Linking equivalent circuits, test measurements, and magnetic paths.",
    problem:
      "Use electrical and magnetic models to understand transformer voltage, current, losses, and flux.",
    approach:
      "Studied open- and short-circuit tests, impedance referral, equivalent circuits, core and winding losses, and magnetic circuits with air gaps. Related work explored DC generators and RLC responses.",
    skills: ["Phasors", "Equivalent circuits", "Reluctance", "Lab calculations"],
    note:
      "Waveforms are conceptual rather than measured hardware results.",
  },
];

const categories = ["All work", "Electronics", "Code", "Analysis"];

function Monitor() {
  return (
    <div>
      <img 
        src="/Beach Are You Kidding Me GIF by Angry Birds.gif" 
        alt="angy bir" 
        style={{ width: '100%', maxWidth: '500px', height: 'auto', marginLeft: 'auto', display: 'block' }} 
      />
    </div>
  );
}


function ProjectVisual({ type }) {
  if (type === "monitor") {
    return (
      <div className="flow">
        <small>SENSE → DISPLAY → ACTUATE</small>
        <p>ENS161 · Gas sensing</p>
        <span>↓</span>
        <p>GD32F405 · Threshold logic</p>
        <span>↓</span>
        <p>Display + fan control</p>
      </div>
    );
  }

  if (type === "terminal") {
    return (
      <div className="terminal">
        <small>arc-card / analyzer.c</small>
        <p>$ ./analyzer</p>
        <span>Processing 221 schedule files…</span>
        <span>read → match → reconstruct</span>
        <span>Ambiguous trip? Request input.</span>
        <p>↳ output.txt</p>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 440 220" fill="none" aria-hidden="true">
      {type === "circuit" && (
        <>
          <g stroke="currentColor" strokeWidth="2">
            <path d="M45 110H115V55H200M115 110V170H200M260 55H330V110H395M260 170H330V110" />
            <rect x="200" y="35" width="60" height="40" rx="3" />
            <rect x="200" y="150" width="60" height="40" rx="3" />
            <circle cx="45" cy="110" r="12" />
            <circle cx="395" cy="110" r="12" />
            <path d="M330 110V200M315 200H345M320 207H340M325 214H335" />
          </g>
          <g fill="currentColor" fontFamily="monospace" fontSize="12">
            <text x="213" y="60">7805</text>
            <text x="218" y="176">PWM</text>
            <text x="28" y="85">17 V</text>
            <text x="376" y="85">OUT</text>
          </g>
        </>
      )}

      {type === "chart" && (
        <>
          <path
            d="M60 25V180H395M60 140H395M60 100H395M60 60H395"
            stroke="currentColor"
            opacity=".25"
          />
          <path
            d="M60 165Q180 150 380 35"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M60 165L380 35"
            stroke="currentColor"
            strokeDasharray="5 5"
            opacity=".4"
          />
          <circle cx="220" cy="108" r="6" fill="currentColor" />
          <g fill="currentColor" fontFamily="monospace" fontSize="11">
            <text x="60" y="205">RISK →</text>
            <text x="75" y="35">RETURN</text>
          </g>
        </>
      )}

      {type === "survey" && (
        <>
          <path
            d="M40 40H400M40 80H400M40 120H400M40 160H400M80 20V200M140 20V200M200 20V200M260 20V200M320 20V200M380 20V200"
            stroke="currentColor"
            opacity=".15"
          />
          <path
            d="M100 153L137 48L310 65L348 163L220 190Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          {[
            [100, 153],
            [137, 48],
            [310, 65],
            [348, 163],
            [220, 190],
          ].map(([x, y], index) => (
            <g key={index}>
              <circle cx={x} cy={y} r="5" fill="currentColor" />
              <text
                x={x + 10}
                y={y - 10}
                fill="currentColor"
                fontFamily="monospace"
                fontSize="12"
              >
                {String.fromCharCode(65 + index)}
              </text>
            </g>
          ))}
        </>
      )}

      {type === "wave" && (
        <>
          <path
            d="M35 110H405"
            stroke="currentColor"
            opacity=".25"
          />
          <path
            d="M35 110C65 15 95 15 125 110S185 205 215 110S275 15 305 110S365 205 395 110"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M35 110C65 60 95 60 125 110S185 160 215 110S275 60 305 110S365 160 395 110"
            stroke="currentColor"
            strokeWidth="2"
            opacity=".4"
          />
          <text
            x="35"
            y="28"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="11"
          >
            PRIMARY / SECONDARY
          </text>
        </>
      )}
    </svg>
  );
}

function ProjectCard({ project, onSelect }) {
  return (
    <button
      className="project-card"
      onClick={() => onSelect(project)}
      aria-label={`View ${project.title}`}
    >
      <div className={`project-art ${project.visual}`}>
        <span className="project-number">{project.id}</span>
        <ProjectVisual type={project.visual} />
        <span className="project-arrow" aria-hidden="true">↗</span>
      </div>

      <div className="project-meta">
        <span>{project.type}</span>
        <span aria-hidden="true">↗</span>
      </div>

      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </button>
  );
}

function ProjectDetails({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (outside) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onClick={handleBackdropClick}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <button className="close-button" onClick={onClose} aria-label="Close">
        ×
      </button>

      <div className="eyebrow">{project.type}</div>
      <h2 id="dialog-title">{project.title}</h2>
      <span className="eyebrow">{project.status}</span>

      <h3>The problem</h3>
      <p>{project.problem}</p>

      <h3>The approach</h3>
      <p>{project.approach}</p>

      <div className="skills">
        {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>

      <h3>Project notes</h3>
      <p className="project-note">{project.note}</p>
    </dialog>
  );
}

export default function App() {
  const [category, setCategory] = useState("All work");
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = projects.filter(
    (project) => category === "All work" || project.category === category
  );

  return (
    <>
      <header className="site-header">
        <div className="container navigation">
          <a className="brand">
            <em><h3>John Bubblebutt</h3></em>
          </a>

          

          <nav aria-label="Main navigation">
            <a href="#work">The Collection</a>
            <a href="#about">Pictures of Le Angry Birds</a>
            <a href="#about">Pictures of Le Bubblebutt</a>
          </nav>

          
        </div>
      </header>

      <main className="container" id="home">
        <section className="hero">
          <div>
            <div className="eyebrow">

            </div>

            <h1>
              Live,
              <br />
              Laugh, 
              <br />
              <em>bubblebutt.</em>
            </h1>

            <p className="hero-description">
              From cyberpunk jokes to angry birds, experience the beauty of what makes bubblebutt.... <em>bubblebutt.</em>
            </p>

            <a className="primary-link" href="#work">
              Explore the collection<span></span>
            </a>
          </div>


            <Monitor />
            <div className="art-caption">
 
            </div>
        </section>

        <div className="discipline-strip">
          <span>01 / ELECTRONICS</span>
          <span>02 / PROGRAMMING</span>
          <span>03 / QUANTITATIVE THINKING</span>
          <span>04 / CONTINUOUS LEARNING</span>
        </div>

        <section className="work-section" id="work">
          <div className="section-heading">
            <div>
              <div className="eyebrow">The project index</div>
              <h2>Selected work <span>/ 06</span></h2>
            </div>

            <div className="filters" role="group" aria-label="Filter projects">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "filter active" : "filter"}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>

          <p className="result-count" aria-live="polite">
            Showing {visibleProjects.length} project
            {visibleProjects.length === 1 ? "" : "s"}
          </p>
        </section>

        <section className="about-section" id="about">
          <div>
            <div className="eyebrow">A cross-disciplinary notebook</div>
            <h2>Make it work.<br />Know why it works.</h2>
          </div>

          <div>
            <p>
              This collection brings together engineering builds, programming
              assignments, and quantitative coursework. The common thread is
              a practical approach: break a problem down, test the reasoning,
              and keep refining the result.
            </p>
            <p>
              Alongside the technical work, studies in economics, mathematics,
              Korean, and French add different ways to think and communicate.
            </p>

            <div className="skills">
              {[
                "C / Python",
                "Arduino",
                "Altium",
                "Circuit analysis",
                "Economic models",
                "Linear algebra",
              ].map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="closing">
          <div>
            <h2>Always a work in progress.</h2>
            <p>A living collection of builds, calculations, and lessons learned.</p>
          </div>
          <a href="#work">Back to the projects ↗</a>
        </section>

        <footer>
          <span>JOHN BUTT SIMULATOR © 2026</span>
          <span>Selected projects & coursework · Concept visuals</span>
        </footer>
      </main>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}