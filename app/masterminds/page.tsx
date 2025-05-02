import Link from "next/link"
import { CircadianWrapper } from "@/components/circadian-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Settings, Users, FileText } from "lucide-react"

// This would be replaced with actual data fetching logic
async function getMasterminds() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  return [
    {
      id: "1",
      name: "Research Assistant",
      description: "Analyzes scientific papers and research data to extract key insights.",
      files: 3,
      userGroup: "research-team",
    },
    {
      id: "2",
      name: "Marketing Strategist",
      description: "Helps develop and refine marketing campaigns and content strategies.",
      files: 5,
      userGroup: "marketing",
    },
    {
      id: "3",
      name: "Code Reviewer",
      description: "Reviews code for best practices, security issues, and optimization opportunities.",
      files: 2,
      userGroup: "development",
    },
  ]
}

export default async function MastermindsPage() {
  const masterminds = await getMasterminds()

  return (
    <CircadianWrapper>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-luna-navy dark:text-mountain-snow">
            Masterminds
          </h1>
          <Button className="bg-glacier-teal hover:bg-glacier-teal/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterminds.map((mastermind) => (
            <Card key={mastermind.id} className="border-glacier-teal/20 shadow-sm overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="font-fraunces text-xl text-luna-navy dark:text-mountain-snow">
                  {mastermind.name}
                </CardTitle>
                <CardDescription className="text-luna-navy/70 dark:text-mountain-snow/70">
                  {mastermind.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between text-sm text-luna-navy/70 dark:text-mountain-snow/70">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-glacier-teal" />
                    <span>{mastermind.files} files</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-glacier-teal" />
                    <span className="capitalize">{mastermind.userGroup.replace("-", " ")}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="w-full flex justify-end">
                  <Link href={`/masterminds/${mastermind.id}/edit`}>
                    <Button variant="outline" size="sm" className="border-glacier-teal/30 text-glacier-teal">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </CircadianWrapper>
  )
}
