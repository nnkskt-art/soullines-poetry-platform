/**
 * Poem Fusion Generator
 * Uses AI to create fusion poems from two source poems
 */

export interface PoemFusion {
  title: string;
  content: string;
  sourcePoems: {
    id: string;
    title: string;
  }[];
  fusionStyle: 'blend' | 'alternate' | 'thematic' | 'emotional';
  createdAt: Date;
  expiresAt: Date;
}

export class PoemFusionGenerator {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate a fusion poem from two source poems
   */
  async generateFusion(
    poem1: { id: string; title: string; content: string },
    poem2: { id: string; title: string; content: string },
    style: 'blend' | 'alternate' | 'thematic' | 'emotional' = 'blend'
  ): Promise<PoemFusion> {
    const prompt = this.buildPrompt(poem1, poem2, style);
    
    // In production, this would call Google Gemini API
    const fusedContent = await this.callGeminiAPI(prompt);

    return {
      title: `Fusion: ${poem1.title} × ${poem2.title}`,
      content: fusedContent,
      sourcePoems: [
        { id: poem1.id, title: poem1.title },
        { id: poem2.id, title: poem2.title }
      ],
      fusionStyle: style,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
  }

  /**
   * Build prompt for AI based on fusion style
   */
  private buildPrompt(
    poem1: { title: string; content: string },
    poem2: { title: string; content: string },
    style: string
  ): string {
    const basePrompt = `You are a creative poetry fusion artist. Create a new, original poem by fusing these two poems together.

Poem 1: "${poem1.title}"
${poem1.content}

Poem 2: "${poem2.title}"
${poem2.content}

`;

    const styleInstructions = {
      blend: 'Seamlessly blend themes, imagery, and emotions from both poems into a cohesive new piece. Mix lines and concepts naturally.',
      alternate: 'Alternate between the styles and themes of each poem, creating a dialogue or contrast between them.',
      thematic: 'Extract the core themes from both poems and create a new poem that explores where these themes intersect.',
      emotional: 'Capture the emotional essence of both poems and create a new emotional journey that combines both feelings.'
    };

    return basePrompt + `Fusion Style: ${styleInstructions[style as keyof typeof styleInstructions]}

Create a fusion poem that:
1. Is original and creative
2. Honors both source poems
3. Has 12-20 lines
4. Maintains poetic quality
5. Creates something new and meaningful

Return only the fused poem, no explanations.`;
  }

  /**
   * Call Gemini API for poem generation
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    // Placeholder - in production would call actual Gemini API
    // Example implementation:
    /*
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    */

    // Placeholder response
    return `A fusion of emotions and themes,
Where two souls meet in dreams,
Lines intertwine like threads of fate,
Creating something new and great.

From sorrow springs a hopeful light,
From darkness comes the morning bright,
Two voices merge in harmony,
A symphony of poetry.

The past and present dance as one,
Beneath the same eternal sun,
What once was separate now combines,
In these fused and flowing lines.`;
  }

  /**
   * Validate if two poems can be fused
   */
  static canFuse(poem1: any, poem2: any): { valid: boolean; reason?: string } {
    if (!poem1 || !poem2) {
      return { valid: false, reason: 'Both poems must be provided' };
    }

    if (poem1.id === poem2.id) {
      return { valid: false, reason: 'Cannot fuse a poem with itself' };
    }

    if (!poem1.content || !poem2.content) {
      return { valid: false, reason: 'Both poems must have content' };
    }

    if (poem1.content.length < 50 || poem2.content.length < 50) {
      return { valid: false, reason: 'Poems must be substantial enough to fuse' };
    }

    return { valid: true };
  }

  /**
   * Get fusion style recommendations based on poem characteristics
   */
  static recommendFusionStyle(
    poem1Emotion: string,
    poem2Emotion: string
  ): 'blend' | 'alternate' | 'thematic' | 'emotional' {
    // If emotions are similar, blend them
    if (poem1Emotion === poem2Emotion) {
      return 'blend';
    }

    // If emotions are opposite, alternate
    const opposites = [
      ['sad', 'happy'],
      ['angry', 'peaceful'],
      ['nostalgic', 'motivational']
    ];

    const isOpposite = opposites.some(pair => 
      (pair.includes(poem1Emotion) && pair.includes(poem2Emotion))
    );

    if (isOpposite) {
      return 'alternate';
    }

    // If emotions are complementary, use emotional fusion
    const complementary = [
      ['romantic', 'peaceful'],
      ['happy', 'motivational'],
      ['sad', 'nostalgic']
    ];

    const isComplementary = complementary.some(pair =>
      (pair.includes(poem1Emotion) && pair.includes(poem2Emotion))
    );

    if (isComplementary) {
      return 'emotional';
    }

    // Default to thematic
    return 'thematic';
  }
}
