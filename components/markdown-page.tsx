import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownPageProps {
  content: string
}

export function MarkdownPage({ content }: MarkdownPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-500 pb-2">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">{children}</h3>,
                h4: ({children}) => <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">{children}</h4>,
                p: ({children}) => <p className="text-gray-600 leading-relaxed mb-4">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">{children}</ol>,
                li: ({children}) => <li className="mb-1">{children}</li>,
                strong: ({children}) => <strong className="font-semibold text-gray-800">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                hr: () => <hr className="my-8 border-gray-300" />,
                blockquote: ({children}) => <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700 my-4">{children}</blockquote>,
                a: ({href, children}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
} 