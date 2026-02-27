import { Skull } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-horror-dark border-b-2 border-horror-blood shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          <Skull className="w-10 h-10 text-horror-blood animate-pulse-red" />
          <div className="text-center">
            <h1 className="text-4xl font-horror text-horror-blood animate-flicker">
              Horror Video Prompt Generator
            </h1>
            <p className="text-horror-ghostly/70 text-sm mt-1">
              Tạo prompt video kinh dị/bí ẩn cho Sora AI
            </p>
          </div>
          <Skull className="w-10 h-10 text-horror-blood animate-pulse-red" />
        </div>
      </div>
    </header>
  )
}
