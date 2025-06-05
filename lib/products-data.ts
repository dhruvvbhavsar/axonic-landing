export interface Product {
  id: number
  name: string
  slug: string
  logo: string
  image: string
  heroImage: string
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
}

export const products: Product[] = [
  {
    id: 1,
    name: "ACE",
    slug: "ace",
    logo: "/logos/ACE.png",
    image: "/assets/image1.png",
    heroImage: "/assets/image1.png",
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
        description: "ACE optimizes clinical workflows and decision-making processes, leading to improved patient outcomes and reduced medical errors through systematic excellence.",
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
    ctaText: "Transform Your Clinical Excellence",
    ctaSubtext: "Join the ACE Network and revolutionize your healthcare delivery with advanced clinical management solutions."
  },
  {
    id: 2,
    name: "CliniQ",
    slug: "cliniq",
    logo: "/logos/CliniQ.png",
    image: "/assets/image2.png",
    heroImage: "/assets/image2.png",
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
        description: "CliniQ integrates all clinic operations into one platform, reducing administrative overhead and improving overall clinic efficiency.",
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
    ctaText: "Optimize Your Clinic Operations",
    ctaSubtext: "Join the CliniQ Network and transform your clinic management with comprehensive digital solutions."
  },
  {
    id: 3,
    name: "LabLink",
    slug: "lablink",
    logo: "/logos/LabLink.png",
    image: "/assets/image3.png",
    heroImage: "/assets/image3.png",
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
        description: "LabLink reduces manual errors and ensures consistent quality through automated processes and comprehensive quality control measures.",
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
    ctaText: "Revolutionize Your Laboratory",
    ctaSubtext: "Join the LabLink Network and enhance your diagnostic capabilities with advanced laboratory management solutions."
  },
  {
    id: 4,
    name: "AxonCare",
    slug: "axoncare",
    logo: "/logos/AxonCare.png",
    image: "/assets/image4.png",
    heroImage: "/assets/image4.png",
    description: "Complete healthcare ecosystem connecting patients, providers, and care coordinators.",
    shortDescription: "Complete healthcare ecosystem connecting patients, providers, and care coordinators.",
    subtitle: "Connecting Care, Empowering Health",
    features: [
      {
        title: "Integrated Care Coordination",
        description: "Seamless coordination between healthcare providers, specialists, and care teams to ensure comprehensive patient care across all touchpoints.",
        image: "/assets/image1.png"
      },
      {
        title: "Patient Engagement Platform",
        description: "Comprehensive patient portal with health tracking, appointment management, secure messaging, and educational resources.",
        image: "/assets/image2.png"
      },
      {
        title: "Population Health Management",
        description: "Advanced analytics and insights for managing patient populations, identifying health trends, and implementing preventive care strategies.",
        image: "/assets/image3.png"
      },
      {
        title: "Telehealth Integration",
        description: "Built-in telehealth capabilities for remote consultations, virtual care delivery, and continuous patient monitoring.",
        image: "/assets/image5.png"
      }
    ],
    valuePropositions: [
      {
        title: "Comprehensive Care Delivery",
        description: "AxonCare enables coordinated care delivery across the entire healthcare ecosystem, improving patient outcomes and care quality.",
        image: "/assets/image4.png"
      },
      {
        title: "Improved Patient Engagement",
        description: "Enhanced patient involvement in their care journey through accessible tools, education, and communication platforms.",
        image: "/assets/image1.png"
      },
      {
        title: "Data-Driven Health Insights",
        description: "Advanced analytics provide valuable insights into population health trends, enabling proactive care management and better health outcomes.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Transform Healthcare Delivery",
    ctaSubtext: "Join the AxonCare Network and create a connected healthcare ecosystem that empowers both patients and providers."
  },
  {
    id: 5,
    name: "SurgeHub",
    slug: "surgehub", 
    logo: "/logos/SurgeHub.png",
    image: "/assets/image5.png",
    heroImage: "/assets/image5.png",
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
        description: "SurgeHub optimises resource utilisation, reduces operating room downtime, and allows hospitals to perform more procedures.",
        image: "/assets/image5.png"
      },
      {
        title: "Enhanced Patient Care",
        description: "Streamlined workflows and focus on safety protocols contribute to better patient outcomes and reduced complications.",
        image: "/assets/image1.png"
      },
      {
        title: "Data-Driven Decision Making",
        description: "SurgeHub provides actionable insights to continuously improve surgical processes and patient care delivery.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Join the AxonCare Network",
    ctaSubtext: "Transform your operating theatre management with SurgeHub's advanced surgical workflow solutions."
  },
  {
    id: 6,
    name: "QUIK",
    slug: "quik",
    logo: "/logos/QUIK.png",
    image: "/assets/image6.png",
    heroImage: "/assets/image6.png",
    description: "Quick access healthcare platform for rapid patient consultations and care delivery.",
    shortDescription: "Quick access healthcare platform for rapid patient consultations and care delivery.",
    subtitle: "Quick Healthcare Access, Anytime, Anywhere",
    features: [
      {
        title: "Instant Consultation Booking",
        description: "Immediate appointment scheduling with available healthcare providers, reducing wait times and providing quick access to care.",
        image: "/assets/image1.png"
      },
      {
        title: "Rapid Triage System",
        description: "AI-powered triage system that quickly assesses patient needs and connects them with appropriate healthcare providers.",
        image: "/assets/image2.png"
      },
      {
        title: "Mobile Health Platform",
        description: "Complete mobile platform for healthcare access, consultations, prescriptions, and follow-up care from anywhere.",
        image: "/assets/image3.png"
      },
      {
        title: "Emergency Care Coordination",
        description: "Rapid response system for emergency situations with immediate provider notification and care coordination.",
        image: "/assets/image4.png"
      }
    ],
    valuePropositions: [
      {
        title: "Immediate Healthcare Access",
        description: "QUIK provides instant access to healthcare services, eliminating wait times and ensuring patients receive timely care when needed.",
        image: "/assets/image6.png"
      },
      {
        title: "Convenient Care Delivery",
        description: "Mobile-first platform allows patients to access healthcare services from anywhere, improving convenience and accessibility.",
        image: "/assets/image1.png"
      },
      {
        title: "Efficient Resource Utilization",
        description: "Optimized provider scheduling and patient flow management ensure efficient use of healthcare resources and reduced operational costs.",
        image: "/assets/image2.png"
      }
    ],
    ctaText: "Access Quick Healthcare",
    ctaSubtext: "Join the QUIK Network and provide your patients with instant access to quality healthcare services."
  },
  {
    id: 7,
    name: "AnyTime Health",
    slug: "anytime-health",
    logo: "/logos/AnyTime Health.png",
    image: "/assets/image7.png",
    heroImage: "/assets/image7.png",
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
        description: "AnyTime Health ensures healthcare is available 24/7, providing peace of mind and immediate access to medical support whenever needed.",
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
    ctaText: "Enable 24/7 Healthcare",
    ctaSubtext: "Join the AnyTime Health Network and provide your patients with round-the-clock access to quality healthcare services."
  },
  {
    id: 8,
    name: "PRISM",
    slug: "prism",
    logo: "/logos/PRISM.png",
    image: "/assets/image1.png",
    heroImage: "/assets/image1.png",
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
        description: "PRISM enables early identification of health risks, allowing for proactive interventions that prevent adverse outcomes and improve patient care.",
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
    ctaText: "Harness Predictive Intelligence",
    ctaSubtext: "Join the PRISM Network and revolutionize your healthcare strategy with advanced predictive analytics and risk intelligence."
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return products.map(product => product.slug)
} 