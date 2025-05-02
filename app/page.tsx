import { LunaHeader } from "@/components/luna-header"
import { MastermindSidebar } from "@/components/mastermind-sidebar"
import { ConversationSpace } from "@/components/conversation-space"
import { TopographicalBackground } from "@/components/topographical-background"
import { TimeSlider } from "@/components/time-slider"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <TopographicalBackground />
      <LunaHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <MastermindSidebar />
        <ConversationSpace />
      </div>
      <TimeSlider />
    </div>
  )
}
