'use client'

import { motion } from 'framer-motion'
import { Cloud, Heart, Smile, Zap, Leaf, Flame, Clock, Minus } from 'lucide-react'

const emotions = [
  { id: 'sad', label: 'Sad', icon: Cloud, color: '#667eea' },
  { id: 'happy', label: 'Happy', icon: Smile, color: '#f093fb' },
  { id: 'romantic', label: 'Romantic', icon: Heart, color: '#fa709a' },
  { id: 'motivational', label: 'Motivational', icon: Zap, color: '#30cfd0' },
  { id: 'peaceful', label: 'Peaceful', icon: Leaf, color: '#a8edea' },
  { id: 'angry', label: 'Angry', icon: Flame, color: '#ff0844' },
  { id: 'nostalgic', label: 'Nostalgic', icon: Clock, color: '#ffecd2' },
  { id: 'neutral', label: 'Neutral', icon: Minus, color: '#e0e0e0' },
]

interface EmotionSelectorProps {
  selected: string | null
  onSelect: (emotion: string | null) => void
}

export function EmotionSelector({ selected, onSelect }: EmotionSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {emotions.map((emotion) => {
        const Icon = emotion.icon
        const isSelected = selected === emotion.id

        return (
          <motion.button
            key={emotion.id}
            onClick={() => onSelect(isSelected ? null : emotion.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative px-6 py-3 rounded-full font-medium transition-all
              ${isSelected 
                ? 'ring-2 ring-offset-2 ring-offset-background' 
                : 'hover:opacity-80'
              }
            `}
            style={{
              backgroundColor: isSelected ? emotion.color : 'transparent',
              border: `2px solid ${emotion.color}`,
              color: isSelected ? '#ffffff' : emotion.color,
              ringColor: emotion.color,
            }}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5" />
              <span>{emotion.label}</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
