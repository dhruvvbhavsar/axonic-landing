export interface Product {
  id: number
  name: string
  slug: string
  logo: string
  image: string
  heroImage: string
  videoUrl: string
  testimonialUrl: string
  description: string
  shortDescription: string
  subtitle: string
  features: {
    title: string
    description: string
    image: string
  }[]
  valuePropositions: {
    title: string
    description: string
    image: string
  }[]
  ctaText: string
  ctaSubtext: string
  redirectUrl?: string
  calendlyUrl?: string
  shortPunchLine?: string
  aiImage?: string
  platformImage?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "AxonCare",
    slug: "axoncare",
    logo: "/logos/AxonCarePrism.png",
    image: "/assets/ourProducts/PrismProductImage.png",
    platformImage: "/assets/platform-images/axoncare.png",
    aiImage: "/assets/ai-images/axoncare.png",
    heroImage: "/assets/new-products/AxonCare.png",
    videoUrl: "https://youtube.com/shorts/TTL3e1lJibc?si=huUbgKvbzyYunBJY",
    testimonialUrl: "https://www.youtube.com/embed/qrCEQBEdrC4",
    description: "Predictive Risk Intelligence for Strategic Medicine - advanced analytics for healthcare outcomes.",
    shortDescription: "Predictive Risk Intelligence for Strategic Medicine - advanced analytics for healthcare outcomes.",
    subtitle: "Predictive Intelligence for Strategic Healthcare",
    features: [
      {
        title: "Advanced Risk Analytics",
        description: "Sophisticated algorithms analyze patient data to identify potential health risks and predict adverse events before they occur.",
        image: "/assets/image2.png"
      },
      {
        title: "Strategic Care Planning",
        description: "Data-driven insights enable healthcare providers to develop strategic care plans based on predictive analytics and risk assessment.",
        image: "/assets/image3.png"
      },
      {
        title: "Population Health Insights",
        description: "Comprehensive analysis of population health trends, disease patterns, and risk factors for proactive healthcare management.",
        image: "/assets/image4.png"
      },
      {
        title: "Clinical Decision Intelligence",
        description: "AI-powered decision support tools that provide evidence-based recommendations for clinical interventions and treatment strategies.",
        image: "/assets/image5.png"
      }
    ],
    valuePropositions: [
      {
        title: "Proactive Risk Management",
        description: "AxonCare enables early identification of health risks, allowing for proactive interventions that prevent adverse outcomes and improve patient care.",
        image: "/assets/image1.png"
      },
      {
        title: "Strategic Healthcare Planning",
        description: "Data-driven insights support strategic decision-making in healthcare delivery, resource allocation, and care management strategies.",
        image: "/assets/image2.png"
      },
      {
        title: "Improved Clinical Outcomes",
        description: "Predictive analytics and intelligent recommendations lead to better clinical decisions, improved patient outcomes, and reduced healthcare costs.",
        image: "/assets/image3.png"
      }
    ],
    ctaText: "Book Appointment Now",
    ctaSubtext: "Join the AxonCare Network and revolutionize your healthcare strategy with advanced predictive analytics and risk intelligence.",
    redirectUrl: "https://axoncare.axonichealth.com",
    calendlyUrl: "https://calendly.com/axonichealth-info/axoncare",
    shortPunchLine: "Smart Health, Anytime, Anywhere"
  },
  {
    id: 2,
    name: "AxonHIS",
    slug: "axonhis",
    logo: "/logos/AxonHIS.png",
    image: "/assets/ourProducts/HIS.png",
    heroImage: "/assets/new-products-1/his/HIS.png",
    platformImage: "/assets/platform-images/axonhis.png",
    aiImage: "/assets/ai-images/his.png",
    videoUrl: "https://www.youtube.com/watch?v=syMnFR0qx6k",
    testimonialUrl: "https://www.youtube.com/embed/qrCEQBEdrC4",
    description: "Advanced Clinical Excellence platform for healthcare management and patient care optimization.",
    shortDescription: "Advanced Clinical Excellence platform for healthcare management and patient care optimization.",
    subtitle: "Transforming Clinical Excellence Through Technology",
    features: [
      {
        title: "One Platform. Total Control.",
        description: "50+ modules from registration to discharge. Real-time sync across clinical, financial, and admin workflows with built-in ABDM, HL7, HIPAA & GDPR compliance",
        image: "/assets/new-products-1/his/his-1.png"
      },
      {
        title: "Insights That Drive Action",
        description: "Live BI dashboards and predictive analytics to monitor KPIs, billing, outcomes, and inventory. Drill into patient-level trends for data-driven decisions.",
        image: "/assets/new-products-1/his/his-2.png"
      },
      {
        title: "Smarter EMR. Safer Care.",
        description: "AI-powered EMR with smart documentation, color-coded triage, automated vitals, and voice inputs. Enhances care across OPD, IPD, ER, and specialty workflows",
        image: "/assets/new-products-1/his/his-3.png"
      },
      {
        title: "Care That Moves With You.",
        description: "Branded mobile app for staff and patients, manage appointments, reports, billing, and e-prescriptions. Includes queue alerts, remote access & notifications.",
        image: "/assets/new-products-1/his/his-4.png"
      },
    ],
    valuePropositions: [
      {
        title: "Enhanced Clinical Outcomes",
        description: "AxonHIS optimizes clinical workflows and decision-making processes, leading to improved patient outcomes and reduced medical errors through systematic excellence.",
        image: "/assets/new-products-1/his/c-1.png"
      },
      {
        title: "Improved Operational Efficiency",
        description: "Streamlined processes and automated workflows reduce administrative burden, allowing healthcare professionals to focus more time on direct patient care.",
        image: "/assets/new-products-1/his/c-2.png"
      },
      {
        title: "Data-Driven Clinical Excellence",
        description: "Advanced analytics and reporting provide actionable insights to continuously improve clinical practices and maintain the highest standards of care.",
        image: "/assets/new-products-1/his/c-3.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonHIS Network and revolutionize your healthcare delivery with advanced clinical management solutions.",
    calendlyUrl: "https://calendly.com/axonichealth-info/axonhis",
    shortPunchLine: "One Platform. Total Control."
  },
  {
    id: 3,
    name: "AxonMD",
    slug: "axonmd",
    logo: "/logos/AxonMD.png",
    image: "/assets/ourProducts/cliniq.png",
    heroImage: "/assets/new-products/AxonMD.png",
    platformImage: "/assets/platform-images/axonmd.png",
    aiImage: "/assets/ai-images/md.png",
    videoUrl: "https://youtube.com/shorts/KUNycXG36fA?si=QBT7IDLq7Fi_QRDD",
    testimonialUrl: "https://www.youtube.com/embed/AQmvWNxE-XM",
    description: "Comprehensive clinic management solution with integrated patient scheduling and records.",
    shortDescription: "Comprehensive clinic management solution with integrated patient scheduling and records.",
    subtitle: "Complete Clinic Management Made Simple",
    features: [
      {
        title: "One Platform, Total Care",
        description: "Run in-clinic and virtual care together with a single, secure EMR + video consult hub — no extra tools, no patient drop-offs.",
        image: "/assets/new-products-1/md/md-1.png"
      },
      {
        title: "Smart Casesheet with Time-Saving Features",
        description: "Smart buttons, guided flows, and voice notes make documenting fast, error-free, and almost touchless.",
        image: "/assets/new-products-1/md/md-2.png"
      },
      {
        title: "Medication Compliance",
        description: "Automatic dose alerts for patients. Real-time tracking for doctors. Better results, no guesswork.",
        image: "/assets/new-products-1/md/md-3.png"
      },
      {
        title: "Multilingual Global Reach",
        description: "Break barriers with multilingual casesheets, and video calls through AI-assisted clinitalk. One clinic, any region.",
        image: "/assets/new-products-1/md/md-4.png"
      }
    ],
    valuePropositions: [
      {
        title: "More Time for Patients",
        description: "Spend less time typing, more time caring.",
        image: "/assets/new-products-1/md/c-1.png"
      },
      {
        title: "Safer, Smarter Practice",
        description: "Better compliance + smart notes = fewer errors, better outcomes.",
        image: "/assets/new-products-1/md/c-2.png"
      },
      {
        title: "Grow Without Borders",
        description: "Reach new communities — no language or location limits.",
        image: "/assets/new-products-1/md/c-3.png"
      }
    ],
    ctaText: "Join our network",
    ctaSubtext: "Join the AxonMD Network and transform your clinic management with comprehensive digital solutions.",
    calendlyUrl: "https://calendly.com/axonichealth-info/axonmd",
    shortPunchLine: "Total Hospital Intelligence in One Platform (50+ Modules)"
  },
  {
    id: 4,
    name: "AxonHealthHub",
    slug: "axonhealthhub",
    logo: "/logos/AxonHealthHub.png",
    image: "/assets/ourProducts/AnyTimeHealth.jpg",
    platformImage: "/assets/platform-images/axonhealthhub.png",
    aiImage: "/assets/ai-images/healthhub.png",
    heroImage: "/assets/new-products-1/healthhub/HEALTHHUB.png",
    videoUrl: "https://youtu.be/RHBiso6sE_g?si=X7Gi9oidF7tWScMm",
    testimonialUrl: "https://www.youtube.com/embed/2OPJaJoi0Gs",
    description: "24/7 healthcare access platform providing round-the-clock medical support and consultations.",
    shortDescription: "24/7 healthcare access platform providing round-the-clock medical support and consultations.",
    subtitle: "Healthcare That Never Sleeps",
    features: [
      {
        title: "Instant Smart Diagnostics",
        description: "Do quick basic health checks and PCOT tests on the spot — no queues, no hassle.",
        image: "/assets/new-products-1/healthhub/healthhub-1.png"
      },
      {
        title: "Plug into Expert Help",
        description: "Seamlessly links patients to AxonDoc for medical guidance follow-ups with real time doctor.",
        image: "/assets/new-products-1/healthhub/healthhub-2.png"
      },
      {
        title: "Book & Connect on the Go",
        description: "Patients can self-book appointments and jump straight into secure video calls with doctors — anytime, anywhere.",
        image: "/assets/new-products-1/healthhub/healthhub-3.png"
      },
      {
        title: "Vitals Sync & Care Continuity",
        description: "All readings and reports flow directly into the patient’s health record — so doctors see the full picture, instantly.",
        image: "/assets/new-products-1/healthhub/healthhub-4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Access Health, Anytime",
        description: "Get instant tests and vitals without waiting in line — stay ahead of problems, easily.",
        image: "/assets/new-products-1/healthhub/c-1.png"
      },
      {
        title: "See Doctors, Faster",
        description: "Book your own slot and connect by video in minutes — no calls, no confusion.",
        image: "/assets/new-products-1/healthhub/c-2.png"
      },
      {
        title: "One Hub, Total Care",
        description: "From quick checks to live consults and follow-ups — everything is linked in one smart system.",
        image: "/assets/new-products-1/healthhub/c-3.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonHealthHub Network and provide your patients with round-the-clock access to quality healthcare services.",
    calendlyUrl: "https://calendly.com/axonichealth-info/axonhealthhub",
    shortPunchLine: "Complete Healthcare in Your Community"
  },
  {
    id: 5,
    name: "AxonLab",
    slug: "axonlab",
    logo: "/logos/AxonLab.png",
    image: "/assets/ourProducts/LabLink.png",
    heroImage: "/assets/new-products/AxonLab.png",
    platformImage: "/assets/platform-images/axonlab.png",
    videoUrl: "https://youtu.be/cOdfvKDkzM8",
    testimonialUrl: "https://www.youtube.com/embed/2OPJaJoi0Gs",
    description: "Laboratory information management system for seamless diagnostic workflows.",
    shortDescription: "Laboratory information management system for seamless diagnostic workflows.",
    subtitle: "Connecting Diagnostics, Delivering Results",
    features: [
      {
        title: "Smart Test Management",
        description: "Dynamic test catalog with configurable pricing, TAT, reference ranges, and sample rules, customized per specialty",
        image: "/assets/new-products-1/lab/lab-1.png"
      },
      {
        title: "Insightful Dashboards and Reports",
        description: "Track TAT, test volumes, and KPIs with real-time MIS and department-wise compliance reports.",
        image: "/assets/new-products-1/lab/lab-2.png"
      },
      {
        title: "End-to-End Sample Intelligence",
        description: "Barcode-based Lifecycle Tracking from collection to disposal, Bi-directional Analyzer Integration ensures zero errors and full traceability.",
        image: "/assets/new-products-1/lab/lab-3.png"
      },
      {
        title: "Specialty Driven Lab workflow",
        description: "Dedicated modules for Histopathology and Microbiology, covering grossing, slide tracking, antibiograms, and digital reporting for accuracy and compliance.",
        image: "/assets/new-products-1/lab/lab-4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Improved Test Accuracy",
        description: "AxonLab reduces manual errors and ensures consistent quality through automated processes and comprehensive quality control measures.",
        image: "/assets/new-products-1/lab/c-1.png"
      },
      {
        title: "Faster Turnaround Times",
        description: "Optimized workflows and automated processes significantly reduce test processing times, delivering results faster to healthcare providers.",
        image: "/assets/new-products-1/lab/c-2.png"
      },
      {
        title: "Enhanced Laboratory Efficiency",
        description: "Streamlined operations, resource optimization, and improved workflow management increase overall laboratory productivity and efficiency.",
        image: "/assets/new-products-1/lab/c-3.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonLab Network and enhance your diagnostic capabilities with advanced laboratory management solutions.",
    calendlyUrl: "https://calendly.com/axonichealth-info/axonlab",
    shortPunchLine: "Empowering Doctors, Enhancing Care"
  },
  
  {
    id: 6,
    name: "AxonSurge",
    slug: "axonsurge", 
    logo: "/logos/AxonSurge.png",
    image: "/assets/ourProducts/SurgeHub.png",
    heroImage: "/assets/new-products/AxonSurge.png",
    platformImage: "/assets/platform-images/axonsurge.png",
    videoUrl: "https://www.youtube.com/watch?v=u_xkIe_htWI",
    testimonialUrl: "https://www.youtube.com/embed/qrCEQBEdrC4",
    description: "Surgical workflow management platform for operating room efficiency and patient safety.",
    shortDescription: "Surgical workflow management platform for operating room efficiency and patient safety.",
    subtitle: "Transforming Operating Theatre Management",
    features: [
      {
        title: "Smart OT Scheduling",
        description: "Centralized dashboard prevents OT clashes and supports emergency overrides. Real-time availability of surgeons, slots, and equipment—streamlined for efficiency.",
        image: "/assets/new-products-1/surge/surge-1.png"
      },
      {
        title: "Instrument & Supply Intelligence",
        description: "Track trays, implants, and consumables using barcodes/RFID. Get expiry alerts and auto-deduct stock from inventory based on OT usage.",
        image: "/assets/new-products-1/surge/surge-2.png"
      },
      {
        title: "Surgical Workflow Automation",
        description: "Digitized pre, intra, and post-op workflows with WHO checklists, real-time logging, and multimedia documentation for safer, standardized surgeries.",
        image: "/assets/new-products-1/surge/surge-3.png"
      },
      {
        title: "Surgical Outcomes Dashboard",
        description: "Monitor KPIs like blood loss, complications, and OT time. Visualize outcomes through real-time dashboards and attach photos/videos for complete records.",
        image: "/assets/new-products-1/surge/surge-4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Improved Surgical Efficiency",
        description: "AxonSurge optimises resource utilisation, reduces operating room downtime, and allows hospitals to perform more procedures.",
        image: "/assets/new-products-1/surge/c-1.png"
      },
      {
        title: "Enhanced Patient Care",
        description: "Streamlined workflows and focus on safety protocols contribute to better patient outcomes and reduced complications.",
        image: "/assets/new-products-1/surge/c-2.png"
      },
      {
        title: "Data-Driven Decision Making",
        description: "AxonSurge provides actionable insights to continuously improve surgical processes and patient care delivery.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Transform your operating theatre management with AxonSurge's advanced surgical workflow solutions.",
    calendlyUrl: "https://calendly.com/axonichealth-info/axonsurge",
    shortPunchLine: "Transforming Operating Theatre Management"
  },
  {
    id: 7,
    name: "AxonPharma",
    slug: "axonpharma",
    logo: "/logos/AxonCarePharma.png",
    image: "/assets/ourProducts/QUIK.png",
    heroImage: "/assets/new-products/AxonPharma.png",
    platformImage: "/assets/platform-images/axonpharma.png",
    videoUrl: "https://youtu.be/j3Z7C_iDJdQ",
    testimonialUrl: "https://www.youtube.com/embed/AQmvWNxE-XM",
    description: "Smarter Pharmacy, Safer Patients",
    shortDescription: "Smarter Pharmacy, Safer Patients",
    subtitle: "Smarter Pharmacy, Safer Patients",
    features: [
      {
        title: "E-Indents to billing with audit-ready workflows",
        description: "Digitally manage indents, issues, and billing while ensuring every transaction is traceable and compliant.",
        image: "/assets/new-products-1/pharma/pharma-1.png"
      },
      {
        title: "Digital drug registers for narcotics",
        description: "Ensure secure, compliant handling of controlled substances with easy-to-maintain digital registers.",
        image: "/assets/new-products-1/pharma/pharma-2.png"
      },
      {
        title: "ABC/VED stock classification with smart alerts & refill triggers",
        description: "Prioritize inventory effectively with automated stock classification, low-stock alerts, and intelligent reordering.",
        image: "/assets/new-products-1/pharma/pharma-3.png"
      },
      {
        title: "Barcode dispensing with FEFO expiry tracking & multi-store visibility",
        description: "Improve safety and efficiency through barcode-based dispensing, real-time expiry monitoring, and oversight across all pharmacy outlets.",
        image: "/assets/new-products-1/pharma/pharma-4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Enhanced patient safety and medication accuracy",
        description: "Barcode dispensing and FEFO tracking minimize errors and prevent dispensing expired or incorrect drugs.",
        image: "/assets/new-products-1/lab/c-1.png"
      },
      {
        title: "Reduced stockouts and wastage",
        description: "Automated classification, alerts, and refill triggers ensure optimal stock levels and reduce expired stock loss.",
        image: "/assets/new-products-1/lab/c-2.png"
      },
      {
        title: "Simplified compliance and audit readiness",
        description: "Digital registers, traceable workflows, and detailed logs make audits easy and stress-free.",
        image: "/assets/new-products-1/lab/c-3.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonPharma Network and provide your patients with instant access to quality healthcare services.",
    calendlyUrl: "https://calendly.com/axonichealth-info/axonpharma",
    shortPunchLine: "Smarter Pharmacy, Safer Patients"
  },
  
  
  {
  "id": 9,
  "name": "AxonDoc",
  "slug": "axondoc",
  "logo": "/logos/AxonDoc.png",
  "image": "/assets/ourProducts/AxonaDocImage.png",
  "platformImage": "/assets/platform-images/axondoc.png",
  "aiImage": "/assets/ai-images/axondoc.png",
  "heroImage": "/assets/new-products-1/doc/DOC.png",
  "videoUrl": "https://youtu.be/glvGIGOLSlg",
  "testimonialUrl": "https://www.youtube.com/embed/abc123doc",
  "description": "Smart documentation system tailored for modern healthcare professionals.",
  "shortDescription": "Instant Expertise, Infinite Care.",
  "subtitle": "Instant Expertise, Infinite Care",
  "features": [
    {
      "title": "AI Triage & Guidance",
      "description": "Smart conversational flows handle early questions, suggest next steps, and ease doctor's workload.",
      "image": "/assets/new-products-1/doc/doc-1.png"
    },
    {
      "title": "Regional Language Support",
      "description": "Patients chat naturally in their language — AxonDoc understands and translates for clear, inclusive care.",
      "image": "/assets/new-products-1/doc/doc-2.png"
    },
    {
      "title": "Voice-to-Case in Seconds",
      "description": "AxonDoc is always on — supporting patients and providers anytime, anywhere.Captures patient symptoms by voice, auto-summarizes them, and fills the casesheet — no typing needed.",
      "image": "/assets/new-products-1/doc/doc-3.png"
    },
    {
      "title": "Integrated into AxonMD and AxonHealthHub",
      "description": "Works hand-in-hand with your EMR and Health Hub tools — boosting doctor efficiency without replacing human care.",
      "image": "/assets/new-products-1/doc/doc-4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Less Manual Work",
      "description": "Automates routine history-taking and frees doctors for real medical decisions.",
      "image": "/assets/new-products-1/doc/c-1.png"
    },
    {
      "title": "See More Patients, Smoothly",
      "description": " Faster triage and summaries mean better flow and shorter waiting times.",
      "image": "/assets/new-products-1/doc/c-2.png"
    },
    {
      "title": "Serve All Communities",
      "description": "Breaks language barriers and makes smart AI care accessible for everyone.",
      "image": "/assets/new-products-1/doc/c-3.png"
    }
  ],
  "ctaText": "Try AxonDoc",
  "ctaSubtext": "Experience the future of healthcare documentation today.",
  "calendlyUrl": "https://calendly.com/axonichealth-info/axondoc",
  "shortPunchLine": "Instant Expertise, Infinite Care"
},
{
  "id": 10,
  "name": "AxonBuddy",
  "slug": "axonbuddy",
  "logo": "/logos/AxonBuddy.png",
  "image": "/assets/ourProducts/AxonaBuddyImage.png",
  "heroImage": "/assets/new-products-1/buddy/BUDDY.png",
  "platformImage": "/assets/platform-images/axonbuddy.png",
  "aiImage": "/assets/ai-images/buddy.png",
  "videoUrl": "https://youtube.com/shorts/2bSA6Yha6nM",
  "testimonialUrl": "https://www.youtube.com/embed/abc123buddy",
  "description": "24/7 Health Wisdom at Your Service",
  "shortDescription": "Always by your side, AxonBuddy offers intelligent, multilingual health guidance tailored to your symptoms, history, and needs — anytime, anywhere.",
  "subtitle": "24/7 Health Wisdom at Your Service",
  "features": [
    {
      "title": "24/7 personalized health companion",
      "description": "Always available to guide users with reliable health information and support, day or night.",
      "image": "/assets/new-products-1/buddy/buddy-1.png"
    },
    {
      "title": "Customized advice based on medical history",
      "description": "Provides recommendations and guidance tailored to each user’s health records and conditions.",
      "image": "/assets/new-products-1/buddy/buddy-2.png"
    },
    {
      "title": "Symptom-based specialty consultation suggestion",
      "description": "Smart algorithms suggest when and which specialist to consult — helping users seek timely expert care.",
      "image": "/assets/new-products-1/buddy/buddy-3.png"
    },
    {
      "title": "Multilingual, conversational health concierge",
      "description": "Engages users in natural, friendly dialogue in their preferred language for better understanding and comfort.",
      "image": "/assets/new-products-1/buddy/buddy-4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Empowers users with instant, trusted guidance",
      "description": "AxonBuddy helps people make informed health decisions anytime, reducing anxiety and confusion.",
      "image": "/assets/new-products-1/buddy/c-1.png"
    },
    {
      "title": "Drives timely access to the right care",
      "description": "By flagging the need for specialty consultations, it helps prevent delays in diagnosis and treatment.",
      "image": "/assets/new-products-1/buddy/c-2.png"
    },
    {
      "title": "Promotes inclusivity and user comfort",
      "description": "Conversational, multilingual support ensures everyone can access advice in a way that feels natural and respectful.",
      "image": "/assets/new-products-1/buddy/c-3.png"
    }
  ],
  "ctaText": "Download AxonBuddy",
  "ctaSubtext": "Stay on top of your health with your new digital buddy.",
  "calendlyUrl": "https://calendly.com/axonichealth-info/axonbuddy",
  "shortPunchLine": "24/7 Health Wisdom at Your Service"
},
{
  "id": 11,
  "name": "AxonScribe",
  "slug": "axonscribe",
  "logo": "/logos/AxonScribe.png",
  "image": "/assets/ourProducts/AxonaScribeImage.png",
  "platformImage": "/assets/platform-images/axonscribe.png",
  "aiImage": "/assets/ai-images/scribe.png",
  "heroImage": "/assets/new-products/AxonSurge.png",
  "videoUrl": "https://www.youtube.com/watch?v=PM9LlDn4S40",
  "testimonialUrl": "https://www.youtube.com/embed/abc123scribe",
  "description": "Where Conversations Become Care Records",
  "shortDescription": "Where Conversations Become Care Records",
  "subtitle": "Where Conversations Become Care Records",
  "features": [
    {
      "title": "Accurate AI-powered transcription of doctor-patient conversations",
      "description": "Transforms spoken interactions into clear, structured SOAP notes automatically.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Real-time editing with specialty-specific templates",
      "description": "Customize notes on the go with templates tailored for different specialties, ensuring clinical relevance.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Auto-sync with AxonMD & AxonDoc platforms",
      "description": "Seamlessly integrates your notes into the broader Axonic ecosystem — no double entry, no data loss.",
      "image": "/assets/image3.png"
    },
    {
      "title": "Secure, compliant documentation",
      "description": "Built-in data security, audit trails, and compliance-ready formats meet medico-legal and regulatory standards.",
      "image": "/assets/image4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Massive reduction in admin burden",
      "description": "Spend less time typing and more time focusing on patients.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Improved accuracy & consistency in records",
      "description": "Standardized notes reduce errors and enhance communication across the care team.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Supports faster, safer decision-making",
      "description": "Structured, complete records at every consult help you provide better, safer care.",
      "image": "/assets/image3.png"
    }
  ],
  "ctaText": "Book Demo",
  "ctaSubtext": "Revolutionize your consultation process with AxonScribe.",
  "redirectUrl": "https://axonscribe.axonichealth.com",
  "calendlyUrl": "https://calendly.com/axonichealth-info/axonscribe",
  "shortPunchLine": "Where Conversations Become Care Records"
},
{
  "id": 12,
  "name": "AxonA",
  "slug": "axona",
  "logo": "/logos/AxonA.png",
  "image": "/assets/ourProducts/AxonaAImage.png",
  "platformImage": "/assets/platform-images/axona.png",
  "aiImage": "/assets/ai-images/axona.png",
  "heroImage": "/assets/new-products-1/axona/AXONA.png",
  "videoUrl": "https://youtu.be/KmalK7AXfnE?si=S2FFuGH7nWfEELsX",
  "testimonialUrl": "https://www.youtube.com/embed/abc123axa",
  "description": "Ambient Scribe, your Intelligent Clinical Associate, who makes you a Superdoctor ",
  "shortDescription": "Ambient Scribe, your Intelligent Clinical Associate, who makes you a Superdoctor ",
  "subtitle": "Redefining Healthcare Intelligence",
  "features": [
    {
      "title": "One-click Smart Buttons for Case Entry",
      "description": "Quickly populate casesheets with customizable, condition-specific templates — saving time and ensuring thorough documentation.",
      "image": "/assets/new-products-1/axona/axona-1.png"
    },
    {
      "title": "Hands-free Consultation Mode",
      "description": "Enable voice-driven, AI-supported transcription and record-keeping — no typing, no distraction.",
      "image": "/assets/new-products-1/axona/axona-2.png"
    },
    {
      "title": "Automated GP Letter Generation",
      "description": "Instantly create accurate, professional GP referral and update letters using AI-powered templates.",
      "image": "/assets/new-products-1/axona/axona-3.png"
    },
    {
      "title": "AI Decision Support & Alerts",
      "description": "Get real-time suggestions, reminders, and safety alerts during consultation — helping you deliver safer, smarter care.",
      "image": "/assets/new-products-1/axona/axona-4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Faster documentation, higher throughput",
      "description": "One-click smart buttons, automated GP letters, and hands-free consultation tools cut admin time dramatically — so you can see more patients without feeling rushed or overworked.",
      "image": "/assets/new-products-1/axona/c-1.png"
    },
    {
      "title": "Consistent accuracy and quality of care",
      "description": "AxonA ensures complete, error-free records and standardized communication — boosting compliance, reducing errors, and enhancing trust with patients and referrers.",
      "image": "/assets/new-products-1/axona/c-2.png"
    },
    {
      "title": "Better patient experience, greater satisfaction",
      "description": "With streamlined visits, shorter wait times, and more focused doctor-patient interaction, AxonA helps you deliver care that patients truly value and remember.",
      "image": "/assets/new-products-1/axona/c-3.png"
    }
  ],
  "ctaText": "Explore AxonA",
  "ctaSubtext": "Turn your data into action with healthcare intelligence.",
  "calendlyUrl": "https://calendly.com/axonichealth-info/axona",
  "shortPunchLine": "Your Intelligent Clinical Associate makes you a Superdoctor"
},
{
  "id": 13,
  "name": "AxonLife",
  "slug": "axonlife",
  "logo": "/logos/AxonLife.png",
  "image": "/assets/ourProducts/AxonaLifeImage.png",
  "platformImage": "/assets/platform-images/axonlife.png",
  "heroImage": "/assets/new-products/AxonLife.png",
  "videoUrl": "https://www.youtube.com/shorts/abc123life",
  "testimonialUrl": "https://www.youtube.com/embed/abc123life",
  "description": "Nurturing Dreams Into Reality",
  "shortDescription": "Nurturing Dreams Into Reality",
  "subtitle": "Nurturing Dreams Into Reality",
  "features": [
    {
      "title": "Personalized Health Insights",
      "description": "Get tailored health recommendations based on your lifestyle, habits, and medical history.",
      "image": "/assets/new-products-1/lab/lab-1.png"
    },
    {
      "title": "Real-time Health Monitoring",
      "description": "Track your health metrics, including heart rate, sleep, and activity levels, to make informed decisions about your well-being.",
      "image": "/assets/new-products-1/lab/lab-2.png"
    },
    {
      "title": "AI-Powered Health Recommendations",
      "description": "Get personalized health tips, exercise plans, and lifestyle advice based on your health data and goals.",
      "image": "/assets/new-products-1/lab/lab-3.png"
    },
    {
      "title": "Secure, Private Health Records",
      "description": "Store and access your health data securely, with built-in privacy protection and compliance-ready storage.",
      "image": "/assets/new-products-1/lab/lab-4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Personalized Health Insights",
      "description": "Get tailored health recommendations based on your lifestyle, habits, and medical history.",
      "image": "/assets/new-products-1/lab/c-1.png"
    },
    {
      "title": "Real-time Health Monitoring",
      "description": "Track your health metrics, including heart rate, sleep, and activity levels, to make informed decisions about your well-being.",
      "image": "/assets/new-products-1/lab/c-2.png"
    },
    {
      "title": "AI-Powered Health Recommendations",
      "description": "Get personalized health tips, exercise plans, and lifestyle advice based on your health data and goals.",
      "image": "/assets/new-products-1/lab/c-3.png"
    }
  ],
  "ctaText": "Download AxonLife",
  "ctaSubtext": "Stay on top of your health with your new digital companion.",
  "calendlyUrl": "https://calendly.com/axonichealth-info/axonlife",
  "shortPunchLine": "Nurturing Dreams Into Reality"
}
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return products.map(product => product.slug)
} 