import { TAJWEED_RULES } from "@/constants";
import { TajwidRule } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

export const TajweedUtils = {
  // More sophisticated Tajweed rule detection
  detectAdvancedTajweedRules: (text: string) => {
    // Implement more complex Arabic text analysis
    const rules: {
      type: string;
      positions: { start: number; end: number }[];
    }[] = [];

    // Example of a simplified detection mechanism
    const noonSakinahRegex = /ن\s*(?=[تثدذرزسشصضطظفق])/g;
    const meemSakinahRegex = /م\s*(?=[بپ])/g;

    const findMatches = (regex: RegExp) => {
      const matches = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length
        });
      }
      return matches;
    };

    rules.push({
      type: 'Noon Sakinah',
      positions: findMatches(noonSakinahRegex)
    });

    rules.push({
      type: 'Meem Sakinah',
      positions: findMatches(meemSakinahRegex)
    });

    return rules;
  },

  // Generate detailed Tajweed guidance
  generateTajweedGuidance: (rule: string) => {
    const guidanceMap: Record<string, string> = {
      'Noon Sakinah': `
        Noon Sakinah has four main rules:
        1. Idhar (Clear Pronunciation)
        2. Idgham (Merging)
        3. Iqlab (Conversion)
        4. Ikhfa (Concealment)
      `,
      'Meem Sakinah': `
        Meem Sakinah has three main rules:
        1. Idhar Shafawi (Clear Pronunciation)
        2. Idgham Shafawi (Merging)
        3. Ikhfa Shafawi (Concealment)
      `,
      // Add more detailed rules
    };

    return guidanceMap[rule] || 'No specific guidance available.';
  }
};

export const detectTajweedRules = (text: string): {
  rule?: TajwidRule,
  matchedText: string
}[] => {
  // This is a simplified detection. In a real-world scenario, 
  // you'd need a more sophisticated Arabic text analysis
  const detectedRules: {
    rule?: TajwidRule,
    matchedText: string
  }[] = [];


  console.log({ detectedRules })

  TAJWEED_RULES.forEach(rule => {
    rule.examples.forEach(example => {
      const regex = new RegExp(example, 'g');
      const matches = text.match(regex);
      if (matches) {
        matches.forEach(match => {
          detectedRules.push({ rule, matchedText: match });
        });
      }
    });
  });

  return detectedRules.length > 0 ? detectedRules : [{ matchedText: text }];
};