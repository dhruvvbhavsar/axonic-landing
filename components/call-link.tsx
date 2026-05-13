"use client"

export function CallLink() {
  return (
    <button 
      onClick={() => window.open('tel:+918956652831', '_self')}
      className="text-gray-600 hover:text-gray-900 text-sm font-medium underline transition-colors duration-200"
    >
      Prefer to call? +1 (800) 210-1999
    </button>
  )
} 