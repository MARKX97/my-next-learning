'use client';

import { create } from 'zustand';

export type LearningFeature = {
  id: string;
  title: string;
  summary: string;
  actionLabel: string;
  docsUrl: string;
};

const defaultFeatures: LearningFeature[] = [
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    summary:
      'Utility-first styling that composes quickly and pairs perfectly with shadcn/ui.',
    actionLabel: 'Tailwind docs',
    docsUrl: 'https://tailwindcss.com/docs',
  },
  {
    id: 'components',
    title: 'shadcn/ui primitives',
    summary:
      'Reusable button, input, and card patterns powered by class-variance-authority + Radix.',
    actionLabel: 'shadcn/ui docs',
    docsUrl: 'https://ui.shadcn.com',
  },
  {
    id: 'zustand',
    title: 'Zustand',
    summary:
      'A minimal state container for client components—perfect for demos like this feature switcher.',
    actionLabel: 'Zustand docs',
    docsUrl: 'https://zustand-demo.pmnd.rs/',
  },
];

type FeatureStore = {
  features: LearningFeature[];
  activeId: string;
  setActive: (id: string) => void;
};

export const useFeatureStore = create<FeatureStore>(set => ({
  features: defaultFeatures,
  activeId: defaultFeatures[0].id,
  setActive: id => set({ activeId: id }),
}));
