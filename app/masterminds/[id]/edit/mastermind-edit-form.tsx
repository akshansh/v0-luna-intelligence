"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Trash2,
  Save,
  X,
  FileText,
  FileSpreadsheet,
  FileIcon as FileWord,
  Upload,
  Mic,
  MessageSquare,
  Info,
  Eye,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMobile } from "@/hooks/use-mobile"

type Mastermind = {
  id: string
  name: string
  description: string
  files: Array<{
    id: string
    name: string
    type: string
    size: string
  }>
  inputMethods: string[]
  activeInputMethod: string
  personality: {
    analytical: number
    creative: number
    detailed: number
  }
  userGroup: string
}

type GuidanceContent = {
  title: string
  content: string
}

export default function MastermindEditForm({ mastermind }: { mastermind: Mastermind }) {
  const router = useRouter()
  const isMobile = useMobile()
  const [formData, setFormData] = useState(mastermind)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [activeGuidance, setActiveGuidance] = useState<GuidanceContent | null>(null)

  const guidanceContent: Record<string, GuidanceContent> = {
    name: {
      title: "Mastermind Name",
      content:
        "Choose a clear, descriptive name that reflects this Mastermind's purpose. Names should be concise but informative.",
    },
    files: {
      title: "Uploaded Files",
      content:
        "These files provide the knowledge base for your Mastermind. Upload PDFs, documents, spreadsheets, or other text-based files that contain relevant information.",
    },
    inputMethods: {
      title: "Input Methods",
      content:
        "Select how users will interact with this Mastermind. Text allows typed queries, Voice enables spoken interaction, and Upload lets users submit files for analysis.",
    },
    personality: {
      title: "Personality Framework",
      content:
        "Adjust these sliders to fine-tune how your Mastermind responds. Higher Analytical values prioritize facts and logic, Creative increases novel solutions, and Detailed controls the comprehensiveness of responses.",
    },
    description: {
      title: "Purpose/Description",
      content:
        "Provide a detailed explanation of what this Mastermind does and how it should be used. This helps users understand when to engage with this particular Mastermind.",
    },
    userGroup: {
      title: "User Group Assignment",
      content:
        "Assign this Mastermind to specific user groups to control access. Only members of the selected group will be able to interact with this Mastermind.",
    },
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: value,
          },
        }
      }
      return { ...prev, [field]: value }
    })
    setIsDirty(true)
  }

  const handleInputMethodToggle = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      activeInputMethod: method,
    }))
    setIsDirty(true)
  }

  const handleDeleteFile = (fileId: string) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== fileId),
    }))
    setIsDirty(true)
  }

  const handleSave = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsDirty(false)
    router.push("/masterminds")
  }

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true)
    } else {
      router.push("/masterminds")
    }
  }

  const handleDelete = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/masterminds")
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "csv":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "docx":
        return <FileWord className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getInputMethodIcon = (method: string) => {
    switch (method) {
      case "text":
        return <MessageSquare className="h-5 w-5" />
      case "voice":
        return <Mic className="h-5 w-5" />
      case "upload":
        return <Upload className="h-5 w-5" />
      default:
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const showGuidance = (key: string) => {
    setActiveGuidance(guidanceContent[key])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Panel - Configuration Options */}
      <div className="lg:col-span-2 space-y-8">
        <Card className="overflow-hidden border-glacier-teal/20 shadow-sm bg-white/90 dark:bg-luna-navy/90 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Mastermind Name */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-luna-navy dark:text-mountain-snow">
                  Mastermind Name
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => showGuidance("name")}>
                        <Info className="h-4 w-4 text-glacier-teal" />
                        <span className="sr-only">Name information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click for guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-white/50 dark:bg-luna-navy/50"
              />
            </div>

            {/* Uploaded Files */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-luna-navy dark:text-mountain-snow">
                  Uploaded Files
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => showGuidance("files")}>
                        <Info className="h-4 w-4 text-glacier-teal" />
                        <span className="sr-only">Files information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click for guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="bg-mountain-snow/50 dark:bg-luna-navy/30 rounded-md p-4 space-y-2">
                {formData.files.length > 0 ? (
                  formData.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 bg-white dark:bg-luna-navy/50 rounded border border-glacier-teal/20"
                    >
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="text-sm font-medium text-luna-navy dark:text-mountain-snow">{file.name}</p>
                          <p className="text-xs text-luna-navy/60 dark:text-mountain-snow/60">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-glacier-teal hover:text-glacier-teal/80 hover:bg-glacier-teal/10"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View {file.name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-glacier-teal hover:text-glacier-teal/80 hover:bg-glacier-teal/10"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Replace {file.name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteFile(file.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {file.name}</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-luna-navy/60 dark:text-mountain-snow/60 text-center py-4">
                    No files uploaded yet
                  </p>
                )}
                <Button className="w-full bg-glacier-teal hover:bg-glacier-teal/90 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New File
                </Button>
              </div>
            </div>

            {/* Input Methods */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-luna-navy dark:text-mountain-snow">
                  Input Methods
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => showGuidance("inputMethods")}
                      >
                        <Info className="h-4 w-4 text-glacier-teal" />
                        <span className="sr-only">Input methods information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click for guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex space-x-2">
                {formData.inputMethods.map((method) => (
                  <Button
                    key={method}
                    variant={formData.activeInputMethod === method ? "default" : "outline"}
                    className={
                      formData.activeInputMethod === method
                        ? "bg-glacier-teal hover:bg-glacier-teal/90 text-white"
                        : "border-glacier-teal/30 text-luna-navy dark:text-mountain-snow"
                    }
                    onClick={() => handleInputMethodToggle(method)}
                  >
                    {getInputMethodIcon(method)}
                    <span className="ml-2 capitalize">{method}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Personality Framework */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-luna-navy dark:text-mountain-snow">
                  Personality Framework
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => showGuidance("personality")}
                      >
                        <Info className="h-4 w-4 text-glacier-teal" />
                        <span className="sr-only">Personality information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click for guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-4 bg-mountain-snow/50 dark:bg-luna-navy/30 rounded-md p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-luna-navy dark:text-mountain-snow">Analytical</label>
                    <span className="text-sm font-medium text-glacier-teal">{formData.personality.analytical}%</span>
                  </div>
                  <Slider
                    value={[formData.personality.analytical]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleInputChange("personality.analytical", value[0])}
                    className="[&>span]:bg-glacier-teal"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-luna-navy dark:text-mountain-snow">Creative</label>
                    <span className="text-sm font-medium text-glacier-teal">{formData.personality.creative}%</span>
                  </div>
                  <Slider
                    value={[formData.personality.creative]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleInputChange("personality.creative", value[0])}
                    className="[&>span]:bg-glacier-teal"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-luna-navy dark:text-mountain-snow">Detailed</label>
                    <span className="text-sm font-medium text-glacier-teal">{formData.personality.detailed}%</span>
                  </div>
                  <Slider
                    value={[formData.personality.detailed]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleInputChange("personality.detailed", value[0])}
                    className="[&>span]:bg-glacier-teal"
                  />
                </div>
              </div>
            </div>

            {/* Purpose/Description */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-luna-navy dark:text-mountain-snow"
                >
                  Purpose/Description
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => showGuidance("description")}
                      >
                        <Info className="h-4 w-4 text-glacier-teal" />
                        <span className="sr-only">Description information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click for guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className="w-full bg-white/50 dark:bg-luna-navy/50"
              />
            </div>

            {/* User Group Assignment */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="userGroup" className="block text-sm font-medium text-luna-navy dark:text-mountain-snow">
                  User Group Assignment
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => showGuidance("userGroup")}>
                        <Info className="h-4 w-4 text-glacier-teal" />
                        <span className="sr-only">User group information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click for guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={formData.userGroup} onValueChange={(value) => handleInputChange("userGroup", value)}>
                <SelectTrigger className="w-full bg-white/50 dark:bg-luna-navy/50">
                  <SelectValue placeholder="Select a user group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research-team">Research Team</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="all-users">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t border-glacier-teal/20">
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Mastermind
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!isDirty}
                  className="bg-glacier-teal hover:bg-glacier-teal/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Guidance */}
      {!isMobile && (
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="border-glacier-teal/20 shadow-sm overflow-hidden bg-white/90 dark:bg-luna-navy/90 backdrop-blur-sm">
              <CardContent className="p-6">
                {activeGuidance ? (
                  <div className="space-y-3">
                    <h3 className="font-fraunces text-lg font-medium text-luna-navy dark:text-mountain-snow">
                      {activeGuidance.title}
                    </h3>
                    <p className="text-sm text-luna-navy/80 dark:text-mountain-snow/80">{activeGuidance.content}</p>
                  </div>
                ) : (
                  <div className="text-center space-y-3 py-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-glacier-teal/10 flex items-center justify-center">
                      <Info className="h-6 w-6 text-glacier-teal" />
                    </div>
                    <h3 className="font-fraunces text-lg font-medium text-luna-navy dark:text-mountain-snow">
                      Guidance Panel
                    </h3>
                    <p className="text-sm text-luna-navy/80 dark:text-mountain-snow/80">
                      Click the info icon next to any field for detailed guidance on configuring your Mastermind.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mastermind</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this Mastermind? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push("/masterminds")}
              className="bg-luna-navy text-white hover:bg-luna-navy/90"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
