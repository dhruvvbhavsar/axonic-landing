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
}

export const products: Product[] = [
  {
    id: 1,
    name: "AxonCare",
    slug: "axoncare",
    logo: "/logos/AxonCarePrism.png",
    image: "/assets/ourProducts/PrismProductImage.png",
    heroImage: "/assets/new-products/AxonCare.png",
    videoUrl: "https://www.youtube.com/shorts/KUNycXG36fA",
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
    redirectUrl: "https://prism.axonichealth.co.in/login"
  },
  {
    id: 2,
    name: "AxonHIS",
    slug: "axonhis",
    logo: "/logos/AxonHIS.png",
    image: "/assets/ourProducts/ACE.png",
    heroImage: "/assets/new-products/AxonHIS.png",
    videoUrl: "https://www.youtube.com/watch?v=u_xkIe_htWI",
    testimonialUrl: "https://www.youtube.com/embed/qrCEQBEdrC4",
    description: "Advanced Clinical Excellence platform for healthcare management and patient care optimization.",
    shortDescription: "Advanced Clinical Excellence platform for healthcare management and patient care optimization.",
    subtitle: "Transforming Clinical Excellence Through Technology",
    features: [
      {
        title: "Unified Clinical Workflow",
        description: "Streamlined processes that connect all aspects of patient care, from admission to discharge, ensuring seamless coordination across medical teams.",
        image: "/assets/image2.png"
      },
      {
        title: "Real-time Patient Monitoring",
        description: "Advanced monitoring systems that provide continuous patient data tracking, alerts, and comprehensive health status updates for immediate response.",
        image: "/assets/image3.png"
      },
      {
        title: "Clinical Decision Support",
        description: "AI-powered tools that assist healthcare professionals in making informed decisions with evidence-based recommendations and clinical guidelines.",
        image: "/assets/image4.png"
      },
      {
        title: "Quality Metrics & Analytics",
        description: "Comprehensive reporting and analytics that track clinical outcomes, quality measures, and performance indicators for continuous improvement.",
        image: "/assets/image5.png"
      }
    ],
    valuePropositions: [
      {
        title: "Enhanced Clinical Outcomes",
        description: "AxonHIS optimizes clinical workflows and decision-making processes, leading to improved patient outcomes and reduced medical errors through systematic excellence.",
        image: "/assets/image1.png"
      },
      {
        title: "Improved Operational Efficiency",
        description: "Streamlined processes and automated workflows reduce administrative burden, allowing healthcare professionals to focus more time on direct patient care.",
        image: "/assets/image2.png"
      },
      {
        title: "Data-Driven Clinical Excellence",
        description: "Advanced analytics and reporting provide actionable insights to continuously improve clinical practices and maintain the highest standards of care.",
        image: "/assets/image3.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonHIS Network and revolutionize your healthcare delivery with advanced clinical management solutions."
  },
  {
    id: 3,
    name: "AxonMD",
    slug: "axonmd",
    logo: "/logos/AxonMD.png",
    image: "/assets/ourProducts/cliniq.png",
    heroImage: "/assets/new-products/AxonMD.png",
    videoUrl: "https://www.youtube.com/shorts/K3ZI3SL_GL0",
    testimonialUrl: "https://www.youtube.com/embed/AQmvWNxE-XM",
    description: "Comprehensive clinic management solution with integrated patient scheduling and records.",
    shortDescription: "Comprehensive clinic management solution with integrated patient scheduling and records.",
    subtitle: "Complete Clinic Management Made Simple",
    features: [
      {
        title: "Smart Appointment Scheduling",
        description: "Intelligent scheduling system that optimizes appointment slots, reduces wait times, and manages provider availability efficiently.",
        image: "/assets/image1.png"
      },
      {
        title: "Electronic Health Records",
        description: "Comprehensive digital patient records with secure storage, easy access, and seamless integration across all clinic departments.",
        image: "/assets/image3.png"
      },
      {
        title: "Patient Communication Hub",
        description: "Integrated communication platform for patient notifications, reminders, and secure messaging between patients and healthcare providers.",
        image: "/assets/image4.png"
      },
      {
        title: "Billing & Revenue Management",
        description: "Automated billing processes, insurance claim management, and revenue tracking to streamline financial operations.",
        image: "/assets/image5.png"
      }
    ],
    valuePropositions: [
      {
        title: "Streamlined Operations",
        description: "AxonMD integrates all clinic operations into one platform, reducing administrative overhead and improving overall clinic efficiency.",
        image: "/assets/image2.png"
      },
      {
        title: "Enhanced Patient Experience",
        description: "Improved scheduling, communication, and care coordination create a better patient experience with reduced wait times and better service.",
        image: "/assets/image1.png"
      },
      {
        title: "Increased Revenue",
        description: "Optimized scheduling, automated billing, and improved patient retention contribute to increased clinic revenue and profitability.",
        image: "/assets/image3.png"
      }
    ],
    ctaText: "Join our network",
    ctaSubtext: "Join the AxonMD Network and transform your clinic management with comprehensive digital solutions."
  },
  {
    id: 4,
    name: "AxonHealthHub",
    slug: "axonhealthhub",
    logo: "/logos/AxonHealthHub.png",
    image: "/assets/ourProducts/AnyTimeHealth.png",
    heroImage: "/assets/new-products/AxonHealthHub.png",
    videoUrl: "https://www.youtube.com/watch?v=NPt4Uo4uwx4",
    testimonialUrl: "https://www.youtube.com/embed/2OPJaJoi0Gs",
    description: "24/7 healthcare access platform providing round-the-clock medical support and consultations.",
    shortDescription: "24/7 healthcare access platform providing round-the-clock medical support and consultations.",
    subtitle: "Healthcare That Never Sleeps",
    features: [
      {
        title: "24/7 Medical Support",
        description: "Round-the-clock access to qualified healthcare professionals for consultations, advice, and emergency support at any time.",
        image: "/assets/image1.png"
      },
      {
        title: "Virtual Care Platform",
        description: "Comprehensive telemedicine platform with video consultations, chat support, and remote monitoring capabilities.",
        image: "/assets/image2.png"
      },
      {
        title: "Continuous Health Monitoring",
        description: "Ongoing health tracking and monitoring with automated alerts and proactive care recommendations.",
        image: "/assets/image3.png"
      },
      {
        title: "Multi-Channel Communication",
        description: "Various communication channels including phone, video, chat, and messaging for flexible patient-provider interactions.",
        image: "/assets/image4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Always Available Care",
        description: "AxonHealthHub ensures healthcare is available 24/7, providing peace of mind and immediate access to medical support whenever needed.",
        image: "/assets/image7.png"
      },
      {
        title: "Reduced Emergency Visits",
        description: "Early intervention and continuous monitoring help prevent health issues from escalating, reducing unnecessary emergency room visits.",
        image: "/assets/image1.png"
      },
      {
        title: "Comprehensive Health Management",
        description: "Continuous care and monitoring provide comprehensive health management, improving long-term health outcomes and patient satisfaction.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonHealthHub Network and provide your patients with round-the-clock access to quality healthcare services."
  },
  {
    id: 5,
    name: "AxonLab",
    slug: "axonlab",
    logo: "/logos/AxonLab.png",
    image: "/assets/ourProducts/LabLink.png",
    heroImage: "/assets/new-products/AxonLab.png",
    videoUrl: "https://www.youtube.com/watch?v=NPt4Uo4uwx4",
    testimonialUrl: "https://www.youtube.com/embed/2OPJaJoi0Gs",
    description: "Laboratory information management system for seamless diagnostic workflows.",
    shortDescription: "Laboratory information management system for seamless diagnostic workflows.",
    subtitle: "Connecting Diagnostics, Delivering Results",
    features: [
      {
        title: "Sample Tracking & Management",
        description: "Complete sample lifecycle management from collection to disposal, with real-time tracking and chain of custody documentation.",
        image: "/assets/image1.png"
      },
      {
        title: "Automated Workflow Processing",
        description: "Streamlined laboratory workflows with automated test processing, result validation, and quality control measures.",
        image: "/assets/image2.png"
      },
      {
        title: "Integrated Instrument Connectivity",
        description: "Seamless integration with laboratory instruments for automated data capture and reduced manual entry errors.",
        image: "/assets/image4.png"
      },
      {
        title: "Comprehensive Reporting",
        description: "Advanced reporting capabilities with customizable templates, statistical analysis, and regulatory compliance features.",
        image: "/assets/image5.png"
      }
    ],
    valuePropositions: [
      {
        title: "Improved Test Accuracy",
        description: "AxonLab reduces manual errors and ensures consistent quality through automated processes and comprehensive quality control measures.",
        image: "/assets/image3.png"
      },
      {
        title: "Faster Turnaround Times",
        description: "Optimized workflows and automated processes significantly reduce test processing times, delivering results faster to healthcare providers.",
        image: "/assets/image1.png"
      },
      {
        title: "Enhanced Laboratory Efficiency",
        description: "Streamlined operations, resource optimization, and improved workflow management increase overall laboratory productivity and efficiency.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonLab Network and enhance your diagnostic capabilities with advanced laboratory management solutions."
  },
  
  {
    id: 6,
    name: "AxonSurge",
    slug: "axonsurge", 
    logo: "/logos/AxonSurge.png",
    image: "/assets/ourProducts/SurgeHub.png",
    heroImage: "/assets/new-products/AxonSurge.png",
    videoUrl: "https://www.youtube.com/watch?v=u_xkIe_htWI",
    testimonialUrl: "https://www.youtube.com/embed/qrCEQBEdrC4",
    description: "Surgical workflow management platform for operating room efficiency and patient safety.",
    shortDescription: "Surgical workflow management platform for operating room efficiency and patient safety.",
    subtitle: "Transforming Operating Theatre Management",
    features: [
      {
        title: "Unified Collaboration",
        description: "Effortless collaboration between surgeons, nurses, and hospital staff ensures smooth operation flow and minimises delays.",
        image: "/assets/image1.png"
      },
      {
        title: "Streamlined Surgical Operations",
        description: "Smart OT Start, Digital Documentation, and Automated Workflow features optimise the surgical process and reduce errors.",
        image: "/assets/image2.png"
      },
      {
        title: "Elevated Patient Safety",
        description: "Enhanced Safety Checklists ensure adherence to protocols, mitigating risks and prioritising patient well-being.",
        image: "/assets/image3.png"
      },
      {
        title: "Insightful Analytics",
        description: "SurgeHub captures valuable data to improve surgical workflows, resource allocation, and overall patient outcomes.",
        image: "/assets/image4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Improved Surgical Efficiency",
        description: "AxonSurge optimises resource utilisation, reduces operating room downtime, and allows hospitals to perform more procedures.",
        image: "/assets/image5.png"
      },
      {
        title: "Enhanced Patient Care",
        description: "Streamlined workflows and focus on safety protocols contribute to better patient outcomes and reduced complications.",
        image: "/assets/image1.png"
      },
      {
        title: "Data-Driven Decision Making",
        description: "AxonSurge provides actionable insights to continuously improve surgical processes and patient care delivery.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Transform your operating theatre management with AxonSurge's advanced surgical workflow solutions."
  },
  {
    id: 7,
    name: "AxonPharma",
    slug: "axonpharma",
    logo: "/logos/AxonQUIK.png",
    image: "/assets/ourProducts/QUIK.png",
    heroImage: "/assets/new-products/AxonPharma.png",
    videoUrl: "https://www.youtube.com/shorts/K3ZI3SL_GL0",
    testimonialUrl: "https://www.youtube.com/embed/AQmvWNxE-XM",
    description: "Smarter Pharmacy, Safer Patients",
    shortDescription: "Smarter Pharmacy, Safer Patients",
    subtitle: "Smarter Pharmacy, Safer Patients",
    features: [
      {
        title: "E-Indents to billing with audit-ready workflows",
        description: "Digitally manage indents, issues, and billing while ensuring every transaction is traceable and compliant.",
        image: "/assets/image1.png"
      },
      {
        title: "ABC/VED stock classification with smart alerts & refill triggers",
        description: "Prioritize inventory effectively with automated stock classification, low-stock alerts, and intelligent reordering.",
        image: "/assets/image2.png"
      },
      {
        title: "Digital drug registers for narcotics",
        description: "Ensure secure, compliant handling of controlled substances with easy-to-maintain digital registers.",
        image: "/assets/image3.png"
      },
      {
        title: "Barcode dispensing with FEFO expiry tracking & multi-store visibility",
        description: "Improve safety and efficiency through barcode-based dispensing, real-time expiry monitoring, and oversight across all pharmacy outlets.",
        image: "/assets/image4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Enhanced patient safety and medication accuracy",
        description: "Barcode dispensing and FEFO tracking minimize errors and prevent dispensing expired or incorrect drugs.",
        image: "/assets/image6.png"
      },
      {
        title: "Reduced stockouts and wastage",
        description: "Automated classification, alerts, and refill triggers ensure optimal stock levels and reduce expired stock loss.",
        image: "/assets/image1.png"
      },
      {
        title: "Simplified compliance and audit readiness",
        description: "Digital registers, traceable workflows, and detailed logs make audits easy and stress-free.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Request Demo",
    ctaSubtext: "Join the AxonPharma Network and provide your patients with instant access to quality healthcare services."
  },
  
  
  {
  "id": 9,
  "name": "AxonDoc",
  "slug": "axondoc",
  "logo": "/logos/AxonDoc.png",
  "image": "/assets/ourProducts/AxonaDocImage.png",
  "heroImage": "/assets/new-products/AxonSurge.png",
  "videoUrl": "https://www.youtube.com/shorts/abc123doc",
  "testimonialUrl": "https://www.youtube.com/embed/abc123doc",
  "description": "Smart documentation system tailored for modern healthcare professionals.",
  "shortDescription": "Instant Expertise, Infinite Care.",
  "subtitle": "Instant Expertise, Infinite Care",
  "features": [
    {
      "title": "Smart triage with auto-generated EMR summaries",
      "description": "AI-driven triage assesses patient symptoms and generates structured summaries directly into the EMR for faster, safer decisions.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Supports regional languages",
      "description": "Break language barriers with multi-lingual capabilities — making quality care accessible to diverse populations.",
      "image": "/assets/image2.png"
    },
    {
      "title": "24/7 availability for continuous care",
      "description": "AxonDoc is always on — supporting patients and providers anytime, anywhere.",
      "image": "/assets/image3.png"
    },
    {
      "title": "Integrated with AxonHealthHub & emergency services",
      "description": "Seamless connection with AxonHealthHub and auto-alerts to emergency services for critical cases.",
      "image": "/assets/image4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Faster, safer clinical decisions",
      "description": "Smart triage and automated summaries reduce delays and support better-informed choices.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Inclusive, accessible healthcare delivery",
      "description": "Regional language support ensures no patient is left behind due to communication gaps.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Enhanced emergency response & coordinated care",
      "description": "Real-time integration helps trigger timely interventions, improving outcomes in critical situations.",
      "image": "/assets/image3.png"
    }
  ],
  "ctaText": "Try AxonDoc",
  "ctaSubtext": "Experience the future of healthcare documentation today.",
  "redirectUrl": "https://axondoc.axonichealth.co.in/login"
},
{
  "id": 10,
  "name": "AxonBuddy",
  "slug": "axonbuddy",
  "logo": "/logos/AxonBuddy.png",
  "image": "/assets/ourProducts/AxonaBuddyImage.png",
  "heroImage": "/assets/new-products/AxonSurge.png",
  "videoUrl": "https://www.youtube.com/shorts/abc123buddy",
  "testimonialUrl": "https://www.youtube.com/embed/abc123buddy",
  "description": "24/7 Health Wisdom at Your Service",
  "shortDescription": "Your personal healthcare assistant and companion.",
  "subtitle": "24/7 Health Wisdom at Your Service",
  "features": [
    {
      "title": "24/7 personalized health companion",
      "description": "Always available to guide users with reliable health information and support, day or night.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Customized advice based on medical history",
      "description": "Provides recommendations and guidance tailored to each user’s health records and conditions.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Symptom-based specialty consultation suggestion",
      "description": "Smart algorithms suggest when and which specialist to consult — helping users seek timely expert care.",
      "image": "/assets/image3.png"
    },
    {
      "title": "Multilingual, conversational health concierge",
      "description": "Engages users in natural, friendly dialogue in their preferred language for better understanding and comfort.",
      "image": "/assets/image4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Empowers users with instant, trusted guidance",
      "description": "AxonBuddy helps people make informed health decisions anytime, reducing anxiety and confusion.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Drives timely access to the right care",
      "description": "By flagging the need for specialty consultations, it helps prevent delays in diagnosis and treatment.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Promotes inclusivity and user comfort",
      "description": "Conversational, multilingual support ensures everyone can access advice in a way that feels natural and respectful.",
      "image": "/assets/image3.png"
    }
  ],
  "ctaText": "Download AxonBuddy",
  "ctaSubtext": "Stay on top of your health with your new digital buddy.",
  "redirectUrl": "https://axonbuddy.axonichealth.co.in/login"
},
{
  "id": 11,
  "name": "AxonScribe",
  "slug": "axonscribe",
  "logo": "/logos/AxonScribe.png",
  "image": "/assets/ourProducts/AxonaScribeImage.png",
  "heroImage": "/assets/new-products/AxonSurge.png",
  "videoUrl": "https://www.youtube.com/shorts/abc123scribe",
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
  "redirectUrl": "https://axonscribe.axonichealth.co.in/login"
},
{
  "id": 12,
  "name": "AxonA",
  "slug": "axona",
  "logo": "/logos/AxonA.png",
  "image": "/assets/ourProducts/AxonaAImage.png",
  "heroImage": "/assets/new-products/AxonSurge.png",
  "videoUrl": "https://www.youtube.com/shorts/abc123axa",
  "testimonialUrl": "https://www.youtube.com/embed/abc123axa",
  "description": "Your Intelligent Clinical Associate makes you a Superdoctor.",
  "shortDescription": "Your Intelligent Clinical Associate makes you a Superdoctor.",
  "subtitle": "AI for Smarter Healthcare",
  "features": [
    {
      "title": "One-click Smart Buttons for Case Entry",
      "description": "Quickly populate casesheets with customizable, condition-specific templates — saving time and ensuring thorough documentation.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Automated GP Letter Generation",
      "description": "Instantly create accurate, professional GP referral and update letters using AI-powered templates.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Hands-free Consultation Mode",
      "description": "Enable voice-driven, AI-supported transcription and record-keeping — no typing, no distraction.",
      "image": "/assets/image3.png"
    },
    {
      "title": "AI Decision Support & Alerts",
      "description": "Get real-time suggestions, reminders, and safety alerts during consultation — helping you deliver safer, smarter care.",
      "image": "/assets/image4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Faster documentation, higher throughput",
      "description": "One-click smart buttons, automated GP letters, and hands-free consultation tools cut admin time dramatically — so you can see more patients without feeling rushed or overworked.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Consistent accuracy and quality of care",
      "description": "AxonA ensures complete, error-free records and standardized communication — boosting compliance, reducing errors, and enhancing trust with patients and referrers.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Better patient experience, greater satisfaction",
      "description": "With streamlined visits, shorter wait times, and more focused doctor-patient interaction, AxonA helps you deliver care that patients truly value and remember.",
      "image": "/assets/image3.png"
    }
  ],
  "ctaText": "Explore AxonA",
  "ctaSubtext": "Turn your data into action with healthcare intelligence.",
  "redirectUrl": "https://axona.axonichealth.co.in/login"
},
{
  "id": 13,
  "name": "AxonLife",
  "slug": "axonlife",
  "logo": "/logos/AxonLife.png",
  "image": "/assets/ourProducts/AxonaLifeImage.png",
  "heroImage": "/assets/new-products/AxonSurge.png",
  "videoUrl": "https://www.youtube.com/shorts/abc123life",
  "testimonialUrl": "https://www.youtube.com/embed/abc123life",
  "description": "Nurturing Dreams into Reality",
  "shortDescription": "Nurturing Dreams into Reality",
  "subtitle": "Nurturing Dreams into Reality",
  "features": [
    {
      "title": "Couple-centric registration and records",
      "description": "Create linked profiles for partners, enabling seamless tracking of joint history, investigations, and treatment plans.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Integrated lab and radiology investigations",
      "description": "Order, track, and view all fertility-related tests and imaging from within the platform — no manual follow-up needed.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Structured diagnosis and individualized treatment planning",
      "description": "Support for evidence-based protocols with customizable plans for IVF, IUI, and other fertility treatments.",
      "image": "/assets/image3.png"
    },
    {
      "title": "End-to-end clinical outcome and pregnancy tracking",
      "description": "Monitor success rates, ongoing pregnancies, and outcomes with easy-to-view dashboards and analytics.",
      "image": "/assets/image4.png"
    }
  ],
  "valuePropositions": [
    {
      "title": "Streamlined care journey for couples",
      "description": "From registration to pregnancy tracking, AxonLife keeps the process smooth, transparent, and connected.",
      "image": "/assets/image1.png"
    },
    {
      "title": "Improved decision-making and success tracking",
      "description": "Consolidated data and outcomes analytics support smarter clinical choices and better patient communication.",
      "image": "/assets/image2.png"
    },
    {
      "title": "Reduced admin load, enhanced compliance",
      "description": "Automated workflows and built-in documentation help clinics stay efficient and audit-ready.",
      "image": "/assets/image3.png"
    }
  ],
  "ctaText": "Join AxonLife",
  "ctaSubtext": "Empower your everyday life with health-first choices.",
  "redirectUrl": "https://axonlife.axonichealth.co.in/login"
},




  
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return products.map(product => product.slug)
} 