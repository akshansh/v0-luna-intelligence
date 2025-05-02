import { Suspense } from "react"
import { notFound } from "next/navigation"
import MastermindEditForm from "./mastermind-edit-form"
import MastermindEditSkeleton from "./mastermind-edit-skeleton"
import { SidebarLayout } from "@/components/sidebar-layout"

// This would be replaced with actual data fetching logic
async function getMastermind(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  const mastermind = {
    id,
    name: "Research Analyst",
    description: "Helps analyze scientific papers and research data to extract key insights and summarize findings.",
    files: [
      { id: "1", name: "research-methodology.pdf", type: "pdf", size: "2.4MB" },
      { id: "2", name: "data-analysis.csv", type: "csv", size: "1.1MB" },
      { id: "3", name: "literature-review.docx", type: "docx", size: "3.7MB" },
    ],
    inputMethods: ["text", "voice", "upload"],
    activeInputMethod: "text",
    personality: {
      analytical: 85,
      creative: 40,
      detailed: 90,
    },
    userGroup: "research-team",
  }

  return mastermind
}

export default async function MastermindEditPage({ params }: { params: { id: string } }) {
  const mastermind = await getMastermind(params.id)

  if (!mastermind) {
    notFound()
  }

  return (
    <SidebarLayout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <h1 className="font-fraunces text-2xl md:text-3xl font-semibold mb-6 text-luna-navy dark:text-mountain-snow">
          Edit Mastermind
        </h1>

        <Suspense fallback={<MastermindEditSkeleton />}>
          <MastermindEditForm mastermind={mastermind} />
        </Suspense>
      </div>
    </SidebarLayout>
  )
}
