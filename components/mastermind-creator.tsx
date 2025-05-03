"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Upload, FileText, Mic, AtSign, Brain, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { TerrainVisualization } from "@/components/terrain-visualization"
import { useTime } from "@/components/time-provider"
import { cn } from "@/lib/utils"

interface MastermindCreatorProps {
  isOpen: boolean
  onClose: () => void
}

export function MastermindCreator({ isOpen, onClose }: MastermindCreatorProps) {
  const { timeOfDay } = useTime()
  const [activeTab, setActiveTab] = useState("upload")
  const [mastermindName, setMastermindName] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [personalityTraits, setPersonalityTraits] = useState({
    analytical: 50,
    creative: 50,
    detailed: 50,
  })

  const handleUpload = () => {
    if (!mastermindName) return

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsUploading(false)
          onClose()
          setUploadProgress(0)
          setMastermindName("")
        }, 500)
      }
    }, 200)
  }

  // Background color based on time of day
  const bgColor = {
    dawn: "bg-luna-navy/90",
    day: "bg-luna-navy/85",
    dusk: "bg-luna-navy/90",
    night: "bg-luna-navy/95",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[600px] text-white border-white/10 backdrop-blur-md", bgColor[timeOfDay])}>
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl flex items-center">
            <AtSign className="mr-2 h-5 w-5 text-glacier-teal" />
            Create New Mastermind
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="mastermind-name" className="text-mountain-snow/70">
              Mastermind Name
            </Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-glacier-teal" />
              <Input
                id="mastermind-name"
                value={mastermindName}
                onChange={(e) => setMastermindName(e.target.value)}
                placeholder="e.g., ResearchAnalyst"
                className="bg-white/5 border-white/10 text-white pl-10 placeholder:text-mountain-snow/30 focus-visible:ring-glacier-teal focus-visible:border-glacier-teal/50 transition-all hover:bg-white/10"
              />
            </div>
          </div>

          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white/5 grid grid-cols-3">
              <TabsTrigger
                value="upload"
                className="data-[state=active]:bg-glacier-teal data-[state=active]:text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-glacier-teal data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="voice" className="data-[state=active]:bg-glacier-teal data-[state=active]:text-white">
                <Mic className="h-4 w-4 mr-2" />
                Voice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-4">
              <div className="border border-dashed border-white/20 rounded-lg p-8 text-center group hover:border-glacier-teal/50 transition-colors">
                <Upload className="h-10 w-10 mx-auto mb-4 text-mountain-snow/50 group-hover:text-glacier-teal transition-colors" />
                <p className="text-mountain-snow/70 mb-4">Drag and drop files here or click to browse</p>
                <Button className="bg-glacier-teal hover:bg-glacier-teal/90 text-white group-hover:animate-pulse">
                  Select Files
                </Button>
                <p className="text-xs text-mountain-snow/50 mt-4">Supports PDF, DOCX, TXT, CSV (max 50MB)</p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-4">
              <div className="space-y-4">
                <textarea
                  className="w-full h-40 rounded-lg p-3 bg-white/5 border border-white/10 text-white placeholder:text-mountain-snow/30 focus:outline-none focus:ring-2 focus:ring-glacier-teal/50 transition-all hover:bg-white/10"
                  placeholder="Paste your text content here..."
                />
              </div>
            </TabsContent>

            <TabsContent value="voice" className="mt-4">
              <div className="border border-dashed border-white/20 rounded-lg p-8 text-center group hover:border-glacier-teal/50 transition-colors">
                <Mic className="h-10 w-10 mx-auto mb-4 text-mountain-snow/50 group-hover:text-glacier-teal transition-colors" />
                <p className="text-mountain-snow/70 mb-4">Click to start recording your voice input</p>
                <Button className="bg-glacier-teal hover:bg-glacier-teal/90 text-white group-hover:animate-pulse">
                  Start Recording
                </Button>
                <p className="text-xs text-mountain-snow/50 mt-4">Speak clearly for best results (max 10 minutes)</p>
              </div>
            </TabsContent>
          </Tabs>

          {!isUploading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg">Personality Framework</h3>
                <Button variant="ghost" size="sm" className="text-glacier-teal hover:bg-white/5">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Randomize
                </Button>
              </div>

              <div className="space-y-6 p-4 bg-white/5 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-mountain-snow/70">Analytical</span>
                    <span className="text-glacier-teal">{personalityTraits.analytical}%</span>
                  </div>
                  <Slider
                    value={[personalityTraits.analytical]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setPersonalityTraits({ ...personalityTraits, analytical: value[0] })}
                    className="[&>span:first-child]:h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-mountain-snow/70">Creative</span>
                    <span className="text-glacier-teal">{personalityTraits.creative}%</span>
                  </div>
                  <Slider
                    value={[personalityTraits.creative]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setPersonalityTraits({ ...personalityTraits, creative: value[0] })}
                    className="[&>span:first-child]:h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-mountain-snow/70">Detailed</span>
                    <span className="text-glacier-teal">{personalityTraits.detailed}%</span>
                  </div>
                  <Slider
                    value={[personalityTraits.detailed]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setPersonalityTraits({ ...personalityTraits, detailed: value[0] })}
                    className="[&>span:first-child]:h-2"
                  />
                </div>
              </div>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-mountain-snow/70">
                <span>Building your Mastermind</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 bg-white/10" indicatorClassName="bg-glacier-teal" />
              <div className="h-40 mt-4">
                <TerrainVisualization progress={uploadProgress} />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/10 text-mountain-snow/70 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!mastermindName || isUploading}
              className="bg-glacier-teal hover:bg-glacier-teal/90 text-white group-hover:animate-pulse"
            >
              <Brain className="mr-2 h-4 w-4" />
              Create Mastermind
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
