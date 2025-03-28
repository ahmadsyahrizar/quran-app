import React from 'react';
import { TAJWEED_COLORS } from '@/constants';
import { detectTajweedRules } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TajwidRendererProps {
  text: string;
  enableHighlighting?: boolean;
}

export const TajwidRenderer: React.FC<TajwidRendererProps> = ({
  text,
  enableHighlighting = true
}) => {
  // If highlighting is disabled, render plain text
  if (!enableHighlighting) {
    return <span className="arabic-text">{text}</span>;
  }

  // Detect and render with Tajweed rules
  const processedText = detectTajweedRules(text);


  return (
    <TooltipProvider>
      <span className="arabic-text flex flex-wrap items-center justify-end">
        {processedText.map((item, index) => {
          const ruleColor = item.rule
            ? TAJWEED_COLORS[item.rule.name] || TAJWEED_COLORS['default']
            : TAJWEED_COLORS['default'];

          console.log({ item })
          // If no specific rule is found, render normally
          if (!item.rule) {
            return (
              <span key={index} className={ruleColor}>
                {item.matchedText}
              </span>
            );
          }


          // Render with tooltip for rules
          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <span className={`${ruleColor} cursor-help`}>
                  {item.matchedText}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs">
                  <h4 className="font-bold mb-2">{item?.rule?.name}</h4>
                  <p className="text-sm">{item?.rule?.description}</p>
                  <div className="mt-2 text-xs">
                    <strong>Examples:</strong>
                    <ul className="list-disc list-inside">
                      {item?.rule?.examples?.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </span>
    </TooltipProvider>
  );
};

// Tajweed Rule Toggle Component
export const TajweedToggle: React.FC<{
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}> = ({ enabled, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => onToggle(!enabled)}
          className="sr-only peer"
        />
        <div className="
          relative 
          w-11 h-6 
          bg-gray-200 
          rounded-full 
          peer 
          peer-checked:after:translate-x-full 
          peer-checked:bg-blue-600 
          after:content-[''] 
          after:absolute 
          after:top-0.5 
          after:left-[2px] 
          after:bg-white 
          after:border-gray-300 
          after:border 
          after:rounded-full 
          after:h-5 
          after:w-5 
          after:transition-all
        "></div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          Tajweed Highlighting
        </span>
      </label>
    </div>
  );
};   