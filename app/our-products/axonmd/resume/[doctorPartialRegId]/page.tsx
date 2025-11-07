import { PageHeader } from '@/components/page-header'
import ResumeForm from '../../resume/ResumeForm'

export default async function Page({ params }: { params: Promise<{ doctorPartialRegId: string }> }) {
  const { doctorPartialRegId } = await params
  return (
    <div className="min-h-screen">
      <PageHeader title="Complete Your Registration" />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ResumeForm doctorPartialRegId={doctorPartialRegId} />
        </div>
      </div>
    </div>
  )
}


