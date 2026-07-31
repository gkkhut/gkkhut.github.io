import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

const cover = (id: string) => `/assets/projects-covers/${id}.svg`;

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" href={live}>
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" href={repo}>
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const chip = (title: string, short: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <span className="text-[10px] font-bold leading-none">{short}</span>,
});

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "phd-ot-anomaly",
    category: "Ph.D. Research",
    title: "OT Anomaly Detection Framework",
    src: cover("phd-ot-anomaly"),
    screenshots: ["hero-banner.png"],
    skills: {
      frontend: [chip("Python", "Py"), chip("Research", "PhD")],
      backend: [chip("Deep Learning", "DL"), chip("OT / ICS", "OT"), chip("Bayesian ML", "Bayes")],
    },
    live: "#",
    github: "https://github.com/gkkhut",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Domain-adapted, uncertainty-aware anomaly detection for discrete manufacturing OT networks.
          </TypographyP>
          <TypographyP className="font-mono">
            Applied Design Science Research to build a deep learning detector with Bayesian MC-dropout
            and conformal prediction for FDA-regulated medical device assembly OT networks.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Evaluation</TypographyH3>
          <p className="font-mono mb-2">
            Benchmarks include SWaT, WADI, and HAI plus discrete manufacturing OT telemetry
            (PLC historian, Ethernet/IP, robotic assembly sensors).
          </p>
        </div>
      );
    },
  },
  {
    id: "greenbelt",
    category: "Six Sigma",
    title: "Green Belt & Six Sigma Projects",
    src: cover("greenbelt"),
    screenshots: ["work.gif"],
    skills: {
      frontend: [chip("Quality", "GB")],
      backend: [chip("Poka-Yoke", "PY"), chip("Traceability", "eDHR")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            First certified Green Belt Six Sigma professional at the company.
          </TypographyP>
          <TypographyP className="font-mono">
            Two Greenbelt projects and one Six Sigma project eliminating labeling NCMRs at C95,
            reducing scrap by $450,698 annually, cutting lot processing time 29%, and enabling
            $1,666,536 in additional annual revenue.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "pokayoke",
    category: "Manufacturing",
    title: "Omnipod Packaging Poka-Yoke",
    src: cover("pokayoke"),
    screenshots: ["work2.gif"],
    skills: {
      frontend: [chip("Vision", "CV")],
      backend: [chip("PLC", "PLC"), chip("Labeling", "LBL")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            End-to-end error-proofing for USAM packaging &amp; labeling.
          </TypographyP>
          <TypographyP className="font-mono">
            Architected poka-yoke solutions preventing Omnipod labeling defects through automated
            verification and process controls at USAM.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "sql-upgrade",
    category: "OT Databases",
    title: "SQL Server 2016→2022 Upgrade",
    src: cover("sql-upgrade"),
    screenshots: ["work3.gif"],
    skills: {
      frontend: [chip("VB.NET", "VB")],
      backend: [chip("SQL Server", "SQL"), chip("DAS", "DAS")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Manufacturing ownership for database &amp; DAS lifecycle upgrade.
          </TypographyP>
          <TypographyP className="font-mono">
            Led SQL Server upgrade across manufacturing equipment, Data Acquisition Servers, and
            production support apps—including validation and production bring-up.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "ai-manufacturing",
    category: "AI / ML",
    title: "AI/ML for Smart Manufacturing",
    src: cover("ai-manufacturing"),
    screenshots: ["work4.gif"],
    skills: {
      frontend: [chip("Python", "Py")],
      backend: [chip("Gen AI Agents", "AI"), chip("Deep Learning", "DL")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Integrating AI, ML, and deep learning into production operations.
          </TypographyP>
          <TypographyP className="font-mono">
            Predictive models, computer vision inspection, anomaly detection, and Gen AI agents
            connecting OT sensor data, historian logs, and business systems.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "vision-140k",
    category: "Machine Vision",
    title: "Vision System Integration",
    src: cover("vision-140k"),
    screenshots: ["work5.gif"],
    skills: {
      frontend: [chip("Cognex/Keyence", "CV")],
      backend: [chip("Python", "Py"), chip("Inspection", "QC")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Real-time clutch spring presence and orientation checks.
          </TypographyP>
          <TypographyP className="font-mono">
            Integrated vision as a new station and improved existing inspection—supporting
            140K+ parts daily production output.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "ssa-crm",
    category: "Custom CRM",
    title: "SSA-CRM Workflow Platform",
    src: cover("ssa-crm"),
    screenshots: ["cover_bg_1.jpg"],
    skills: {
      frontend: [chip("React", "React"), chip("TypeScript", "TS")],
      backend: [chip("Node.js", "Node"), chip("PostgreSQL", "PG"), chip("Prisma", "ORM")],
    },
    live: "#",
    github: "https://github.com/gkkhut",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Design, Procure, Print &amp; Packaging CRM
          </TypographyP>
          <TypographyP className="font-mono">
            End-to-end CRM with clients, jobs, approvals, payments, role-based permissions, and
            review workflows (React, Node, Express, Prisma, PostgreSQL).
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "homelab",
    category: "Infrastructure",
    title: "Homelab IT/OT Infrastructure",
    src: cover("homelab"),
    screenshots: ["work6.gif"],
    skills: {
      frontend: [chip("Networking", "Net")],
      backend: [chip("Linux", "Linux"), chip("VPN / Firewall", "VPN"), chip("NAS", "NAS")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Full-stack personal homelab — networking to NAS.
          </TypographyP>
          <TypographyP className="font-mono">
            Network architecture, firewalls, VPN, hypervisors, servers, NAS, and segmented networks
            for OT, cybersecurity, and AI/ML experimentation.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "analog-devices",
    category: "Anomaly Detection",
    title: "Poly Etch Anomaly Detection",
    src: cover("analog-devices"),
    screenshots: ["work7.gif"],
    skills: {
      frontend: [chip("Python", "Py")],
      backend: [chip("Autoencoders", "AE"), chip("Isolation Forest", "IF")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Analog Devices — Poly Etch process monitoring.
          </TypographyP>
          <TypographyP className="font-mono">
            Autoencoder and Isolation Forest models with 91% anomaly prediction rate for real-time
            operational monitoring.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "emergency-vehicle",
    category: "Computer Vision",
    title: "Emergency Vehicle Detection",
    src: cover("emergency-vehicle"),
    screenshots: ["challenege.gif"],
    skills: {
      frontend: [chip("Python", "Py")],
      backend: [chip("TensorFlow", "TF"), chip("Faster R-CNN", "CNN")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Winner — Northrop Grumman Challenge
          </TypographyP>
          <TypographyP className="font-mono">
            Transfer learning with Faster R-CNN for emergency vehicle detection in low visibility,
            exceeding 92% accuracy.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "ariac",
    category: "Robotics Competition",
    title: "ARIAC Collaborative Robotics",
    src: cover("ariac"),
    screenshots: ["ariac-flip-part.gif"],
    skills: {
      frontend: [chip("C++", "C++")],
      backend: [chip("ROS", "ROS"), chip("MoveIt", "MI"), chip("Gazebo", "Gaz")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Agile Robotics for Industrial Automation Competition
          </TypographyP>
          <TypographyP className="font-mono">
            Coordinated UR10 and AGV to fulfill orders with contingencies for Part Drop and
            Important Order First (C++, ROS, MoveIt, Gazebo).
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "gps-vault",
    category: "Embedded Security",
    title: "GPS Vault with Biometrics",
    src: cover("gps-vault"),
    screenshots: ["gpsvault.jpg"],
    skills: {
      frontend: [chip("Embedded", "HW")],
      backend: [chip("Biometrics", "Bio"), chip("GPS", "GPS")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Winner — Best Innovative Project
          </TypographyP>
          <TypographyP className="font-mono">
            Multi-layered security vault requiring coordinate-specific location, biometric
            recognition, and encrypted 4-digit PIN.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "sunganak",
    category: "Data Science",
    title: "SunGanak — Solar Tool",
    src: cover("sunganak"),
    screenshots: ["Sunganak_logo.png"],
    skills: {
      frontend: [chip("Web App", "Web")],
      backend: [chip("Data Science", "DS"), chip("ROI Analytics", "ROI")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Data science powered solar PV generation reporting.
          </TypographyP>
          <TypographyP className="font-mono">
            ROI, carbon footprints, and estimated generation for solar PV plants.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "rrt-agv",
    category: "Path Planning",
    title: "RRT Path Planning on AGV",
    src: cover("rrt-agv"),
    screenshots: ["gazebo.gif"],
    skills: {
      frontend: [chip("LiDAR", "LDR")],
      backend: [chip("SLAM", "SLAM"), chip("RRT", "RRT")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Obstacle-aware route planning in a simulated environment.
          </TypographyP>
          <TypographyP className="font-mono">
            g-mapping SLAM binary maps feeding an RRT planner for AGV navigation.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "edhr",
    category: "Quality",
    title: "Validated Parameters Digitization (eDHR)",
    src: cover("edhr"),
    screenshots: ["work8.gif"],
    skills: {
      frontend: [chip("HMI", "HMI")],
      backend: [chip("eDHR", "eDHR"), chip("Compliance", "FDA")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Green Belt Quality — eDHR component digitization.
          </TypographyP>
          <TypographyP className="font-mono">
            Digitized machine parameters via HMI/VP Buddy for automated, audit-ready capture in
            FDA-regulated production.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "fft-hardening",
    category: "Functional Final Test",
    title: "Functional Final Test Hardening",
    src: cover("fft-hardening"),
    screenshots: ["work9.gif"],
    skills: {
      frontend: [chip("Process", "Proc")],
      backend: [chip("Checksums", "CHK"), chip("Security", "SEC")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Closing FFT workflow vulnerabilities securely.
          </TypographyP>
          <TypographyP className="font-mono">
            Checksum validation, process upgrades, and secure gap closure for end-to-end functional
            final test integrity.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "tableau-dashboards",
    category: "BI / Analytics",
    title: "Tableau Dashboards",
    src: cover("tableau-dashboards"),
    screenshots: [],
    skills: {
      frontend: [chip("Tableau", "Tb")],
      backend: [chip("Quality Metrics", "QM"), chip("Reporting", "Rpt")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Interactive quality dashboards that cut reporting time in half.
          </TypographyP>
          <TypographyP className="font-mono">
            Developed and deployed 5 interactive Tableau dashboards for quality metrics visibility,
            with best practices for data sourcing, calculations, validation, and reporting —
            reducing reporting time by 50%.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "turtlebot-walker",
    category: "ROS Robotics",
    title: "TurtleBot Walker",
    src: cover("turtlebot-walker"),
    screenshots: [],
    skills: {
      frontend: [chip("ROS", "ROS")],
      backend: [chip("Laser Scan", "LDR"), chip("Obstacle Avoidance", "OA")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Vacuum-style walker behavior on TurtleBot.
          </TypographyP>
          <TypographyP className="font-mono">
            Implemented a walker algorithm that moves straight until near an obstacle, then rotates
            in place until the path is clear — using laser scan data for obstruction checks.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "astar-path",
    category: "Path Planning",
    title: "A* Path Planning",
    src: cover("astar-path"),
    screenshots: [],
    skills: {
      frontend: [chip("OpenCV", "CV")],
      backend: [chip("A*", "A*"), chip("C-Space", "CS")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A* planning for a differential-drive robot.
          </TypographyP>
          <TypographyP className="font-mono">
            Built an A* planner on a 2D C-Space map extracted from gmap / SDF, processed with OpenCV
            (obstacles padded by robot radius) to find paths between start and goal points.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "op5-npi",
    category: "New Product Introduction (NPI)",
    title: "OP5 NPI Pod Program",
    src: cover("op5-npi"),
    screenshots: [],
    skills: {
      frontend: [chip("DCS Logic", "DCS")],
      backend: [chip("Multi-Product", "MP"), chip("NPI", "NPI")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Expanded production from 2 to 7 product types.
          </TypographyP>
          <TypographyP className="font-mono">
            Led the OP5 NPI Pod Program deployment, integrating G6/G7, G6/Libre 2, Gov Pod G6/G7, Atlas, Orion, Moonshot,
            and OTA products at USAM with DCS logic and multi-product line support.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "auto-tcp",
    category: "Robotics",
    title: "Auto TCP Correction for ABB Robots",
    src: cover("auto-tcp"),
    screenshots: [],
    skills: {
      frontend: [chip("ABB", "ABB")],
      backend: [chip("Teach Points", "TP"), chip("Robot Vision", "RV")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Automated robot teach-point correction saves 12-14 hours/week.
          </TypographyP>
          <TypographyP className="font-mono">
            Developed an automated solution to continuously monitor and adjust teach points on ABB robots, keeping
            programmed points accurate over time and eliminating most manual reteaching.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "conveyor-hmi",
    category: "Human Machine Interface (HMI)",
    title: "Conveyor HMI Redesign",
    src: cover("conveyor-hmi"),
    screenshots: [],
    skills: {
      frontend: [chip("HMI", "HMI")],
      backend: [chip("Conveyor Logic", "CL"), chip("Downtime", "DT")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            98% downtime reduction on conveyor systems.
          </TypographyP>
          <TypographyP className="font-mono">
            Redesigned conveyor HMI logic, cutting associated downtime from 4 hours to 10 minutes and improving
            responsiveness across the pod-line.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
  {
    id: "laser-marker",
    category: "Laser Marking",
    title: "Laser Marker Program Upgrades",
    src: cover("laser-marker"),
    screenshots: [],
    skills: {
      frontend: [chip("Laser", "Las")],
      backend: [chip("Versioning", "Ver")],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Multi-product laser program versioning for Inspire and OP5.
          </TypographyP>
          <TypographyP className="font-mono">
            Upgraded laser marker programs for 8 versions of Inspire and OP5 G6/G7 products, refining programs to improve
            performance across multiple product categories.
          </TypographyP>
          <ProjectsLinks live={this.live} />
        </div>
      );
    },
  },
];

export default projects;
