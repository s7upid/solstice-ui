import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles, Zap, Globe, Rocket } from "lucide-react";
import StackedCardsDeck from "./StackedCardsDeck";

const meta: Meta<typeof StackedCardsDeck> = {
  title: "Components/StackedCardsDeck",
  component: StackedCardsDeck,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Scroll-driven animated queue of cards inspired by modern motion UIs. Cards shrink, move, fade and rotate as you scroll. Props: **items**, **containerHeight** (vh), **cardHeight**, **spacing**, **className**.",
      },
    },
  },
  argTypes: {
    containerHeight: { control: { type: "number", min: 40, max: 100 } },
    cardHeight: { control: { type: "number", min: 200, max: 400 } },
    spacing: { control: { type: "number", min: 60, max: 200 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "200vh",
          padding: "120px 24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 720 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof StackedCardsDeck>;

const sampleItems = [
  {
    title: "Quantum Leap",
    description:
      "Exploring the frontiers of quantum computing and its potential to revolutionize data processing.",
    imageSrc: "https://picsum.photos/seed/quantum/400/300",
    actionLabel: "Explore",
    actionIcon: Sparkles,
  },
  {
    title: "Neon Dreams",
    description:
      "Visualizing the future of augmented reality and its impact on human interaction.",
    imageSrc: "https://picsum.photos/seed/neon/400/300",
    actionLabel: "Discover",
    actionIcon: Zap,
  },
  {
    title: "Cyber Nexus",
    description:
      "Connecting minds in the digital realm through advanced neural interfaces.",
    imageSrc: "https://picsum.photos/seed/cyber/400/300",
    actionLabel: "Connect",
    actionIcon: Globe,
  },
  {
    title: "Stellar Voyage",
    description:
      "Charting a course through the cosmos with next-generation propulsion systems.",
    imageSrc: "https://picsum.photos/seed/stellar/400/300",
    actionLabel: "Launch",
    actionIcon: Rocket,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const CompactSpacing: Story = {
  args: {
    items: sampleItems,
    spacing: 90,
    cardHeight: 260,
  },
};

export const TwoCards: Story = {
  args: {
    items: sampleItems.slice(0, 2),
  },
};

export const TextOnly: Story = {
  args: {
    items: [
      { title: "First Card", description: "Scroll down." },
      { title: "Second Card", description: "Cards animate smoothly." },
      { title: "Third Card", description: "Queue effect." },
    ],
  },
};
