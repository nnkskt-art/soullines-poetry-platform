'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, MessageCircle, Bookmark, Eye } from 'lucide-react'

interface PoemCardProps {
  poem: {
    id: string
    title: string
    excerpt: string
    coverImageUrl?: string
    emotion: string
    category: string
    likeCount: number
    commentCount: number
    viewCount: number
    createdAt: string
  }
}

export function PoemCard({ poem }: PoemCardProps) {
  const emotionColors: Record<string, string> = {
    sad: '#667eea',
    happy: '#f093fb',
    romantic: '#fa709a',
    motivational: '#30cfd0',
    peaceful: '#a8edea',
    angry: '#ff0844',
    nostalgic: '#ffecd2',
    neutral: '#e0e0e0',
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/poems/${poem.id}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
          {/* Cover Image */}
          {poem.coverImageUrl && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={poem.coverImageUrl}
                alt={poem.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Emotion Badge */}
            <div 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
              style={{
                backgroundColor: `${emotionColors[poem.emotion]}20`,
                color: emotionColors[poem.emotion],
              }}
            >
              {poem.emotion}
            </div>

            {/* Title */}
            <h3 className="text-xl font-playfair font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {poem.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 poem-text">
              {poem.excerpt}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{poem.viewCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{poem.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{poem.commentCount}</span>
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
            style={{ background: emotionColors[poem.emotion] }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
