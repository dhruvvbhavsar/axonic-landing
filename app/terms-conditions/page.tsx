import { promises as fs } from 'fs'
import path from 'path'
import { MarkdownPage } from '@/components/markdown-page'
import { PageHeader } from '@/components/page-header'

export default async function TermsConditionsPage() {
  const filePath = path.join(process.cwd(), 'data', 'tnc.md')
  const fileContent = await fs.readFile(filePath, 'utf8')

  return (
    <>
      <PageHeader title="Terms & Conditions" />
      <MarkdownPage content={fileContent} />
    </>
  )
} 