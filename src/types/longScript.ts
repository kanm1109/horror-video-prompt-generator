import { PromptResult } from '../types'

export interface Scene {
  id: string
  sceneNumber: number
  startTime: number // in seconds
  endTime: number
  duration: number // in seconds
  scriptText: string
  prompt?: PromptResult
  imageUrl?: string
  isGenerating?: boolean
  isGeneratingImage?: boolean
  error?: string
  imageError?: string
}

export interface LongScriptProject {
  id: string
  title: string
  fullScript: string
  totalDuration: number // in seconds
  sceneDuration: number // default 5 seconds
  scenes: Scene[]
  createdAt: string
  updatedAt: string
}

export interface SceneSplitResult {
  scenes: Omit<Scene, 'id' | 'prompt'>[]
  totalScenes: number
  estimatedDuration: number
}

export type ReadingSpeed = 'slow' | 'standard' | 'fast'

export interface ReadingSpeedConfig {
  label: string
  charsPerSecond: number
  description: string
  recommended?: boolean
}

export interface TimelineExport {
  version: string
  projectName: string
  totalDuration: number
  scenes: {
    sceneNumber: number
    startTime: number
    endTime: number
    duration: number
    prompt: string
    style: string
    mood: string
    camera: string
    lighting: string
    sound: string
  }[]
}
