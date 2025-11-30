/**
 * Emotion Detection Engine
 * Analyzes poem content to detect emotional tone
 */

import Sentiment from 'sentiment';

export type EmotionType = 
  | 'sad' 
  | 'happy' 
  | 'romantic' 
  | 'motivational' 
  | 'peaceful' 
  | 'angry' 
  | 'nostalgic' 
  | 'neutral';

export interface EmotionAnalysis {
  primary: EmotionType;
  confidence: number;
  scores: Record<EmotionType, number>;
  keywords: string[];
}

// Emotion keyword dictionaries
const emotionKeywords: Record<EmotionType, string[]> = {
  sad: ['tear', 'cry', 'sorrow', 'pain', 'loss', 'grief', 'lonely', 'empty', 'broken', 'dark', 'despair', 'melancholy'],
  happy: ['joy', 'smile', 'laugh', 'delight', 'cheerful', 'bright', 'sunshine', 'celebrate', 'bliss', 'wonderful'],
  romantic: ['love', 'heart', 'kiss', 'embrace', 'passion', 'desire', 'romance', 'beloved', 'darling', 'forever', 'together'],
  motivational: ['strength', 'courage', 'rise', 'fight', 'overcome', 'achieve', 'dream', 'inspire', 'power', 'victory', 'believe'],
  peaceful: ['calm', 'serene', 'tranquil', 'quiet', 'gentle', 'soft', 'peace', 'still', 'harmony', 'rest'],
  angry: ['rage', 'fury', 'anger', 'hate', 'bitter', 'storm', 'fire', 'burn', 'destroy', 'fight'],
  nostalgic: ['memory', 'remember', 'past', 'yesterday', 'once', 'used to', 'childhood', 'old', 'forgotten', 'time'],
  neutral: []
};

const sentiment = new Sentiment();

export class EmotionDetector {
  /**
   * Analyze poem content and detect primary emotion
   */
  static analyze(content: string): EmotionAnalysis {
    const text = content.toLowerCase();
    const sentimentResult = sentiment.analyze(text);
    
    // Calculate scores for each emotion
    const scores: Record<EmotionType, number> = {
      sad: 0,
      happy: 0,
      romantic: 0,
      motivational: 0,
      peaceful: 0,
      angry: 0,
      nostalgic: 0,
      neutral: 0
    };

    // Count keyword matches
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\w*\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
          scores[emotion as EmotionType] += matches.length;
        }
      });
    });

    // Adjust scores based on sentiment
    if (sentimentResult.score > 3) {
      scores.happy += 2;
      scores.motivational += 1;
    } else if (sentimentResult.score < -3) {
      scores.sad += 2;
      scores.angry += 1;
    }

    // Find primary emotion
    let primary: EmotionType = 'neutral';
    let maxScore = 0;

    Object.entries(scores).forEach(([emotion, score]) => {
      if (score > maxScore) {
        maxScore = score;
        primary = emotion as EmotionType;
      }
    });

    // Calculate confidence (0-1)
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const confidence = totalScore > 0 ? maxScore / totalScore : 0;

    // Extract keywords
    const keywords = this.extractKeywords(text, primary);

    return {
      primary,
      confidence: Math.min(confidence, 1),
      scores,
      keywords
    };
  }

  /**
   * Extract relevant keywords from text
   */
  private static extractKeywords(text: string, emotion: EmotionType): string[] {
    const words = text.split(/\s+/);
    const keywords = emotionKeywords[emotion] || [];
    
    return words
      .filter(word => keywords.some(kw => word.includes(kw)))
      .slice(0, 5);
  }

  /**
   * Get background theme for emotion
   */
  static getTheme(emotion: EmotionType): {
    gradient: string;
    effect: 'rain' | 'petals' | 'sunrise' | 'stars' | 'none';
    colors: string[];
  } {
    const themes = {
      sad: {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        effect: 'rain' as const,
        colors: ['#667eea', '#764ba2']
      },
      happy: {
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        effect: 'none' as const,
        colors: ['#f093fb', '#f5576c']
      },
      romantic: {
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        effect: 'petals' as const,
        colors: ['#fa709a', '#fee140']
      },
      motivational: {
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        effect: 'sunrise' as const,
        colors: ['#30cfd0', '#330867']
      },
      peaceful: {
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        effect: 'none' as const,
        colors: ['#a8edea', '#fed6e3']
      },
      angry: {
        gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
        effect: 'none' as const,
        colors: ['#ff0844', '#ffb199']
      },
      nostalgic: {
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        effect: 'none' as const,
        colors: ['#ffecd2', '#fcb69f']
      },
      neutral: {
        gradient: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
        effect: 'none' as const,
        colors: ['#e0e0e0', '#f5f5f5']
      }
    };

    return themes[emotion];
  }

  /**
   * Recommend poems based on user's current emotion
   */
  static recommendByMood(
    userEmotion: EmotionType,
    strategy: 'match' | 'balance' = 'match'
  ): EmotionType[] {
    if (strategy === 'match') {
      // Return similar emotions
      const emotionGroups = {
        sad: ['sad', 'nostalgic', 'peaceful'],
        happy: ['happy', 'motivational', 'romantic'],
        romantic: ['romantic', 'happy', 'peaceful'],
        motivational: ['motivational', 'happy', 'peaceful'],
        peaceful: ['peaceful', 'nostalgic', 'romantic'],
        angry: ['angry', 'motivational', 'sad'],
        nostalgic: ['nostalgic', 'sad', 'peaceful'],
        neutral: ['peaceful', 'happy', 'romantic']
      };
      return emotionGroups[userEmotion] || ['neutral'];
    } else {
      // Return balancing emotions
      const balanceMap = {
        sad: ['happy', 'motivational', 'peaceful'],
        happy: ['peaceful', 'romantic', 'nostalgic'],
        romantic: ['peaceful', 'happy', 'nostalgic'],
        motivational: ['peaceful', 'romantic', 'happy'],
        peaceful: ['happy', 'romantic', 'motivational'],
        angry: ['peaceful', 'happy', 'romantic'],
        nostalgic: ['happy', 'motivational', 'romantic'],
        neutral: ['happy', 'peaceful', 'romantic']
      };
      return balanceMap[userEmotion] || ['neutral'];
    }
  }
}
