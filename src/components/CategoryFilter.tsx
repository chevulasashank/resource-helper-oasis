
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

export function CategoryFilter({ categories, onSelectCategory, selectedCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-2 max-w-full overflow-x-auto">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
          selectedCategory === null
            ? "bg-blue-600 text-white shadow-md" 
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
        )}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            selectedCategory === category
              ? "bg-blue-600 text-white shadow-md" 
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
