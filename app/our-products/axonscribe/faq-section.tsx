"use client"
import * as React from "react"

export function FAQSection() {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqs = [
    {
      question: "How accurate is AxonScribe's medical transcription?",
      answer: "AxonScribe achieves 95%+ accuracy in medical transcription using advanced AI and speech recognition technology specifically trained on medical terminology, procedures, and diagnoses. Our system continuously learns and improves with each interaction."
    },
    {
      question: "Does AxonScribe work offline?",
      answer: "Yes, AxonScribe can record full consultations without internet connectivity. When you're back online, the audio automatically transcribes and syncs securely to your account, ensuring you never miss important patient interactions."
    },
    {
      question: "Is AxonScribe HIPAA compliant and secure?",
      answer: "Absolutely. AxonScribe is fully HIPAA compliant with enterprise-grade security measures including end-to-end encryption, secure cloud storage, and comprehensive audit trails to protect patient data and maintain privacy standards."
    },
    {
      question: "What languages does AxonScribe support?",
      answer: "AxonScribe supports multiple languages and dialects with automatic language detection. It can handle mid-conversation language switches and maintains high accuracy across different linguistic patterns and cultural communication styles."
    },
    {
      question: "How much time can AxonScribe save on documentation?",
      answer: "Healthcare providers typically see a 70% reduction in documentation time with AxonScribe. This means more time for patient care, shorter wait times, and improved overall practice efficiency."
    },
    {
      question: "Can AxonScribe integrate with my existing EHR system?",
      answer: "Yes, AxonScribe is designed to integrate seamlessly with most popular EHR systems. Our team provides full integration support to ensure smooth workflow implementation in your existing practice setup."
    },
    {
      question: "What types of medical specialties can use AxonScribe?",
      answer: "AxonScribe works across all medical specialties including General Practice, Dentistry, Orthopedics, Psychology, Cardiology, and more. We offer specialized templates and terminology sets for different medical fields."
    },
    {
      question: "How quickly can I get started with AxonScribe?",
      answer: "Setup is typically completed within 24-48 hours. We provide comprehensive onboarding, training sessions, and ongoing support to ensure your team can start benefiting from AxonScribe immediately."
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about AxonScribe's AI medical scribe capabilities
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItems.has(index)}
                >
                  <h3 className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                      openItems.has(index) ? 'transform rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItems.has(index) && (
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@axonichealth.com"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Contact Support
              </a>
              <a
                href="/contact-us"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
