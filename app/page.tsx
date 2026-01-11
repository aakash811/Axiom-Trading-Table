import { StoreProvider } from "@/components/providers/store-provider"
import { PulseView } from "@/components/pulse-view"

export default function PulsePage() {
  return (
    <StoreProvider>
      <PulseView />
    </StoreProvider>
  )
}
