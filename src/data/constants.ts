/** Local skill-grid icons (reliable on GitHub Pages / light mode). */
const si = (name: string) => `/assets/skill-icons/${name}.svg`;
const kc = (name: string) => ({
  dark: `/assets/keycaps/dark/${name}.png`,
  light: `/assets/keycaps/light/${name}.png`,
});

// Skill `name` must match object names in skills_keyboard.spline.
export enum SkillNames {
  PY = "py",
  SQL = "SQL",
  HTML = "html",
  ROBOTICS = "Robotics",
  REACT = "react",
  OPENCV = "OpenCV",
  TENSORFLOW = "TensorFlow",
  ROS = "ROS",
  TABLEAU = "Tableau",
  AZURE = "Azure",
  POSTGRES = "postgres",
  DATABRICKS = "Databricks",
  NEURAL = "Neural Networks",
  GITHUB = "github",
  POWERBI = "Power BI",
  AI = "ai",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  AUTOCAD = "autocad",
  AWS = "aws",
  VBNET = "vb.net",
  CYBERSECURITY = "cybersecurity",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  keycapIcon: { dark: string; light: string };
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PY]: {
    id: 1,
    name: "py",
    label: "Python",
    shortDescription:
      "Primary language for ML, automation, vision apps, and manufacturing tooling.",
    color: "#3776ab",
    icon: si("python"),
    keycapIcon: kc("python"),
  },
  [SkillNames.SQL]: {
    id: 2,
    name: "SQL",
    label: "SQL Server",
    shortDescription:
      "Manufacturing database ownership, upgrades, queries, and stored procedures.",
    color: "#cc2927",
    icon: si("sqlserver"),
    keycapIcon: kc("sqlserver"),
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription:
      "Semantic markup and web UI foundations for dashboards, tools, and portfolio sites.",
    color: "#e34f26",
    icon: si("html"),
    keycapIcon: kc("html"),
  },
  [SkillNames.ROBOTICS]: {
    id: 4,
    name: "Robotics",
    label: "Robotics",
    shortDescription:
      "Robot cells, ABB/Fanuc integration, motion control, and AGV systems.",
    color: "#22314e",
    icon: si("ros"),
    keycapIcon: kc("ros"),
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: "Component-driven frontends for dashboards, tools, and CRM apps.",
    color: "#61dafb",
    icon: si("react"),
    keycapIcon: kc("react"),
  },
  [SkillNames.OPENCV]: {
    id: 6,
    name: "OpenCV",
    label: "OpenCV",
    shortDescription:
      "Computer vision for inspection, calibration, tracking, and 3D reconstruction.",
    color: "#5c3ee8",
    icon: si("opencv"),
    keycapIcon: kc("opencv"),
  },
  [SkillNames.TENSORFLOW]: {
    id: 7,
    name: "TensorFlow",
    label: "TensorFlow",
    shortDescription:
      "DNN training and deployment for detection and manufacturing ML solutions.",
    color: "#ff6f00",
    icon: si("tensorflow"),
    keycapIcon: kc("tensorflow"),
  },
  [SkillNames.ROS]: {
    id: 8,
    name: "ROS",
    label: "ROS",
    shortDescription: "Robot Operating System for AGVs, path planning, and collaborative robotics.",
    color: "#22314e",
    icon: si("ros"),
    keycapIcon: kc("ros"),
  },
  [SkillNames.TABLEAU]: {
    id: 9,
    name: "Tableau",
    label: "Tableau",
    shortDescription: "Interactive dashboards for quality metrics and manufacturing visibility.",
    color: "#e97627",
    icon: si("tableau"),
    keycapIcon: kc("tableau"),
  },
  [SkillNames.AZURE]: {
    id: 10,
    name: "Azure",
    label: "Azure",
    shortDescription: "Cloud ML, analytics, and Big Data platforms for scalable solutions.",
    color: "#0078d4",
    icon: si("azure"),
    keycapIcon: kc("azure"),
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Relational backends for custom CRM and workflow applications.",
    color: "#336791",
    icon: si("postgres"),
    keycapIcon: kc("postgres"),
  },
  [SkillNames.DATABRICKS]: {
    id: 12,
    name: "Databricks",
    label: "Databricks",
    shortDescription: "Unified analytics and data platforms for manufacturing insights.",
    color: "#ff3621",
    icon: si("databricks"),
    keycapIcon: kc("databricks"),
  },
  [SkillNames.NEURAL]: {
    id: 13,
    name: "Neural Networks",
    label: "Neural Networks",
    shortDescription:
      "Deep learning models for anomaly detection, vision, and predictive analytics.",
    color: "#7c3aed",
    icon: si("neural"),
    keycapIcon: kc("neural"),
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "Hosting portfolios, projects, and collaborative engineering work.",
    color: "#181717",
    icon: si("github"),
    keycapIcon: kc("github"),
  },
  [SkillNames.POWERBI]: {
    id: 15,
    name: "Power BI",
    label: "Power BI",
    shortDescription: "Business intelligence dashboards and operational reporting.",
    color: "#f2c811",
    icon: si("powerbi"),
    keycapIcon: kc("powerbi"),
  },
  [SkillNames.AI]: {
    id: 16,
    name: "ai",
    label: "Gen AI",
    shortDescription: "AI agents and LLM-powered integrations across manufacturing data sources.",
    color: "#10a37f",
    icon: si("genai"),
    keycapIcon: kc("genai"),
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "Realtime backends, auth, and hosted apps for dashboards and internal tools.",
    color: "#FFCA28",
    icon: si("firebase"),
    keycapIcon: kc("firebase"),
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "WordPress",
    shortDescription:
      "Content sites and CMS workflows for portfolios, blogs, and project pages.",
    color: "#21759b",
    icon: si("wordpress"),
    keycapIcon: kc("wordpress"),
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "Servers, hypervisors, and OT-adjacent infrastructure.",
    color: "#fcc624",
    icon: si("linux"),
    keycapIcon: kc("linux"),
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription: "Containerized app stacks for CRM and local development.",
    color: "#2496ed",
    icon: si("docker"),
    keycapIcon: kc("docker"),
  },
  [SkillNames.AUTOCAD]: {
    id: 21,
    name: "autocad",
    label: "AutoCAD",
    shortDescription: "Electrical schematics, control drawings, and design documentation.",
    color: "#e51937",
    icon: si("autocad"),
    keycapIcon: kc("autocad"),
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "AWS",
    shortDescription: "Cloud services for search, data, and ML-supporting workloads.",
    color: "#ff9900",
    icon: si("aws"),
    keycapIcon: kc("aws"),
  },
  [SkillNames.VBNET]: {
    id: 23,
    name: "vb.net",
    label: "VB.NET",
    shortDescription: "Custom production support applications for 24/7 pod line operations.",
    color: "#512bd4",
    icon: si("dotnet"),
    keycapIcon: kc("dotnet"),
  },
  [SkillNames.CYBERSECURITY]: {
    id: 24,
    name: "cybersecurity",
    label: "OT Cybersecurity",
    shortDescription:
      "Secure workflows, remote access, checksum hardening, and OT lifecycle controls.",
    color: "#00b4d8",
    icon: si("security"),
    keycapIcon: kc("security"),
  },
};

export type SkillChip = { label: string; icon: string };

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillChip[];
};

const chip = (label: string, icon: string): SkillChip => ({ label, icon });

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Jul 2020",
    endDate: "Present",
    title: "Senior Staff Controls Engineer",
    company: "Insulet Corporation, Acton, MA",
    description: [
      "Led implementation of assembly and process equipment, AGVs, and robots (ABB, Fanuc) to optimize manufacturing operations, including full controls infrastructure design: PLC programming, HMIs, machine vision (Keyence, Cognex), and motion control drives.",
      "Architected controls and OT network infrastructure for high-speed robotic cells, including IO/device selection, power distribution, vision integration, and scalable data exchange with detailed electrical schematics and functional requirement documentation.",
      "Developed and implemented computer vision and Deep Learning systems for production (real-time object recognition/tracking, camera calibration, 3D reconstruction, ML-based inspection) and led ML/DL anomaly detection using manufacturing telemetry and sensor streams to improve equipment reliability and reduce false-positive alerts.",
      "Owned manufacturing SQL Server databases and custom VB.NET production support applications end-to-end, including a company-wide SQL Server upgrade across manufacturing equipment and Data Acquisition Servers; drove query optimization and architecture improvements to scale 24/7 pod-line operations.",
      "Built AI agents and ML pipelines integrating heterogeneous manufacturing and business data sources into a unified analytics platform, enabling cross-functional, deep-learning-driven operational decision support.",
      "Designed and deployed operational dashboards, translating shop-floor and OT data into actionable insights for engineering and production stakeholders.",
      "Architected and deployed end-to-end poka-yoke solutions for Omnipod packaging and labeling at USAM, and improved end-to-end functional final test workflows through checksum validation and secure workflow hardening, enabling USAM to produce clinical builds for all approved product types with full component-level traceability.",
      "Implemented secure, auditable remote access solutions for production equipment, enabling centralized data collection and vendor support while maintaining security in 24/7 environments.",
      "Led cross-domain root cause analysis across controls, network, and data layers, and owned OT system lifecycle activities (upgrades, validation, change-controlled deployments) to sustain high availability in continuous manufacturing.",
      "Led the OP5 NPI Pod Program deployment, expanding production from 2 to 7 product types (G6/G7, G6/Libre 2, Gov Pod G6/G7, Atlas, Orion, Moonshot, OTA), including DCS logic development and multi-product line integration at USAM.",
      "Integrated a real-time vision inspection station for clutch spring presence/orientation and upgraded existing vision inspection, minimizing faults and supporting a daily production output of 140K+ parts.",
      "Developed an automated Auto TCP correction solution for ABB robots to continuously monitor and adjust teach points, cutting reteaching requirements by an estimated 12-14 hours per week.",
      "Redesigned conveyor HMI logic, reducing associated downtime from 4 hours to 10 minutes (a 98% improvement).",
      "Completed two Greenbelt projects and one Six Sigma project as the company's first certified Greenbelt Six Sigma professional, eliminating labeling NCMRs, reducing scrap costs by $450,698 annually, cutting lot processing time by 29%, and driving $1,666,536 in additional annual revenue.",
    ],
    skills: [
      chip("PLC / SCADA", si("plc")),
      chip("Cognex / Keyence", si("vision")),
      chip("SQL Server", si("sqlserver")),
      chip("VB.NET", si("dotnet")),
      chip("Python", si("python")),
      chip("AI / ML", si("pytorch")),
      chip("OT Cybersecurity", si("security")),
      chip("Tableau / Spotfire", si("tableau")),
    ],
  },
  {
    id: 2,
    startDate: "Jun 2020",
    endDate: "Sep 2020",
    title: "Business Intelligence Developer",
    company: "Sylger Corporation, Washington, DC",
    description: [
      "Developed scalable ML solutions for CSOSA (Court Services and Offender Supervision Agency) throughout the entire project lifecycle, including data extraction/preparation and result documentation on Azure Big Data platforms. Processed and analyzed a dataset of 50M offender records, achieving accuracy of 98%, resulting in improved model performance.",
    ],
    skills: [
      chip("Azure", si("azure")),
      chip("Machine Learning", si("tensorflow")),
      chip("Python", si("python")),
    ],
  },
  {
    id: 3,
    startDate: "Feb 2020",
    endDate: "Jun 2020",
    title: "Software Engineer Intern",
    company: "digiBlitz, Herndon, VA",
    description: [
      "Conducted large-scale data training and validation for various DNNs implemented in TensorFlow, handling datasets of over 100,000 samples with an accuracy enhancement of 15% on average.",
      "Designed and programmed robotic arms, resulting in a 25% increase in precision on robot control and device controllers.",
    ],
    skills: [
      chip("TensorFlow", si("tensorflow")),
      chip("Robotics", si("ros")),
      chip("Python", si("python")),
    ],
  },
  {
    id: 4,
    startDate: "May 2018",
    endDate: "Dec 2019",
    title: "Research Assistant",
    company: "University of Maryland, College Park",
    description: [
      "Led the development of scalable ML solutions, including facial recognition, achieving a recognition accuracy of 92%.",
      "Designed and executed various SQL queries and functions, meeting demands with a 98% accuracy rate in query results.",
      "Implemented ML algorithms using Azure for detailed analytics, resulting in a 75% improvement in model performance.",
      "Updated Python scripts to match training data with the AWS cloud Search database for document classification.",
    ],
    skills: [
      chip("Python", si("python")),
      chip("Azure", si("azure")),
      chip("AWS", si("aws")),
      chip("SQL", si("sqlserver")),
    ],
  },
  {
    id: 5,
    startDate: "Jul 2015",
    endDate: "Dec 2017",
    title: "Automation Engineer",
    company: "P. G. Drive, Mumbai, India",
    description: [
      "Performed testing, commissioning, and maintenance of electrical panels, PLCs, VFDs, and HMIs for various projects.",
      "Innovated and upgraded a manual solar tracker to a sensor-based model for automation.",
      "Developed control logic, AutoCAD drawings, technical specification documents, power and control wiring, specifications, and inspection of low-medium power electrical equipment: switchgears, transformers, motor testing.",
      "Led various field operational projects from design through commissioning, providing after-sales and technical support.",
      "Designed electrical control panels and successfully commissioned complex solutions involving IT networking and automation components, yielding a 20% enhancement in production efficiency and reduction in manual intervention.",
      "Prepared instruments data sheet, flow charts, BOM, and erection bill of material based on cost-effective solutions.",
    ],
    skills: [
      chip("PLC / HMI / VFD", si("plc")),
      chip("AutoCAD", si("autocad")),
      chip("IT/OT Networking", si("linux")),
    ],
  },
  {
    id: 6,
    startDate: "Jun 2014",
    endDate: "Jun 2015",
    title: "Maintenance Engineer",
    company: "JK & PC Textlab Equipments, Mumbai, India",
    description: [
      "Installed 15 complex and advanced machinery for clothing yarns, resulting in a 40% increase in production capacity.",
      "Updated the technical documentation database and performed analysis to find 6 process innovations.",
      "Contributed to the enhancement of product portfolio by working on 2 special projects for beaker dyeing machine.",
      "Diagnosed and troubleshooted system errors, implementing tactical solutions to improve machine efficiency by 15%.",
      "Calibrated and performed FAT for the instruments, ensuring quality standards and a 100% passing rate.",
    ],
    skills: [
      chip("Equipment FAT", si("vision")),
      chip("Process Improvement", si("office")),
    ],
  },
  {
    id: 7,
    startDate: "Jun 2012",
    endDate: "Jun 2014",
    title: "Electronics Engineer",
    company: "Speed Control Industries, Mumbai, India",
    description: [
      "Configured module software, generated I/O databases, and translated flowcharts and write-ups to configurations.",
      "Engaged in system engineering, including designing PCBs, IoT integration, assigning digital I/O points, preparing BOMs, and wiring diagrams; prepared comprehensive documentation which reduced troubleshooting time by 60%.",
      "Coordinated with contractors and customers during site visits, meetings, and document preparation for successful project implementation with 95% customer satisfaction rate.",
    ],
    skills: [
      chip("PCB / Embedded", si("csharp")),
      chip("IoT", si("iot")),
      chip("Documentation", si("office")),
    ],
  },
];

export type SkillCategory = {
  title: string;
  items: SkillChip[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI, ML & Deep Learning",
    items: [
      chip("Python", si("python")),
      chip("PyTorch", si("pytorch")),
      chip("TensorFlow", si("tensorflow")),
      chip("Keras", si("keras")),
      chip("scikit-learn", si("sklearn")),
      chip("OpenCV", si("opencv")),
      chip("Generative AI", si("genai")),
      chip("Computer Vision", si("opencv")),
    ],
  },
  {
    title: "Tools & Software",
    items: [
      chip("Python", si("python")),
      chip("R", si("r")),
      chip("C / C++ / C#", si("csharp")),
      chip("SQL / SQL Server", si("sqlserver")),
      chip("PostgreSQL", si("postgres")),
      chip("MATLAB", si("matlab")),
      chip("ROS", si("ros")),
      chip("React", si("react")),
      chip("Node.js", si("nodejs")),
      chip("VB.NET", si("dotnet")),
      chip("Git", si("git")),
      chip("Databricks", si("databricks")),
      chip("Spark", si("spark")),
      chip("AutoCAD", si("autocad")),
      chip("MS Office Suite", si("office")),
    ],
  },
  {
    title: "Data Visualization & BI",
    items: [
      chip("Tableau", si("tableau")),
      chip("Power BI", si("powerbi")),
      chip("Spotfire", si("spotfire")),
      chip("Oracle Analytics Cloud", si("tableau")),
    ],
  },
  {
    title: "Cloud & Platforms",
    items: [
      chip("Azure", si("azure")),
      chip("AWS", si("aws")),
      chip("GCP", si("gcp")),
    ],
  },
  {
    title: "IT Infrastructure & Networking",
    items: [
      chip("Linux", si("linux")),
      chip("Docker", si("docker")),
      chip("Networking / VPN", si("wireguard")),
      chip("Hypervisors / NAS", si("linux")),
    ],
  },
  {
    title: "Manufacturing & Enterprise Systems",
    items: [
      chip("ERP / SAP", si("sap")),
      chip("MES / SCADA / DCS", si("plc")),
      chip("eDHR / Historian / DAS", si("sqlserver")),
      chip("CRM", si("react")),
    ],
  },
  {
    title: "Industrial Automation & OT",
    items: [
      chip("PLC (Rockwell / Siemens / ABB / GE-Fanuc / Delta)", si("plc")),
      chip("HMI / VFD", si("plc")),
      chip("SCADA / MES", si("plc")),
      chip("Cognex & Keyence", si("vision")),
      chip("Robotics & Motion Control", si("ros")),
      chip("IT/OT Integration", si("linux")),
      chip("IIoT", si("iot")),
      chip("OT Cybersecurity", si("security")),
    ],
  },
];

export type EducationItem = {
  id: number;
  institution: string;
  degree: string;
};

export const EDUCATION: EducationItem[] = [
  {
    id: 1,
    institution: "University of the Cumberlands, USA",
    degree: "Ph.D. in Information Technology (Data Science) (Ongoing)",
  },
  {
    id: 2,
    institution: "New England College, USA",
    degree: "M.S. in Data Science & Analytics",
  },
  {
    id: 3,
    institution: "University of Maryland, College Park, USA",
    degree: "M.Eng. in Robotics",
  },
  {
    id: 4,
    institution: "NMIMS, Mumbai, India",
    degree: "MBA in Business Management",
  },
  {
    id: 5,
    institution: "SMEC Automation Pvt. Ltd., India",
    degree: "T. Diploma in Industrial Automation",
  },
  {
    id: 6,
    institution: "North Maharashtra University, India",
    degree: "B.Eng. in Electronics & Telecommunications",
  },
  {
    id: 7,
    institution: "K J Somaiya Polytechnic, India",
    degree: "T. Diploma in Industrial Electronics",
  },
];

export const themeDisclaimers = {
  light: [
    "Switching to light mode for clearer daytime reading.",
    "Light mode on — optimized for bright environments.",
  ],
  dark: [
    "Dark mode on — easier on the eyes for long sessions.",
    "Welcome back to dark mode.",
  ],
};
