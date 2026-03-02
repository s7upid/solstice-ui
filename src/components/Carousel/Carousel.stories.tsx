import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Carousel from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slideshow of content. Each child is one slide. Supports **prev/next arrows**, **dot indicators**, **controlled** (`activeIndex` / `onActiveIndexChange`) or uncontrolled use, and optional **auto-play**. Accessible (region, slide roles, aria-labels).",
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-[320px] w-full min-h-0">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showArrows: { control: "boolean" },
    showDots: { control: "boolean" },
    autoPlay: { control: "boolean" },
    interval: { control: { type: "number", min: 1000 } },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const slideContent = (num: number, color: string) => (
  <div
    key={num}
    style={{
      padding: 48,
      background: color,
      borderRadius: 12,
      textAlign: "center",
      color: "#fff",
      minHeight: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h3 style={{ margin: 0, fontSize: 24 }}>Slide {num}</h3>
  </div>
);

const luxurySlides = [
  { num: 1, bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", title: "Editorial" },
  { num: 2, bg: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)", title: "Collection" },
  { num: 3, bg: "linear-gradient(135deg, #3d3d3d 0%, #2a2a2a 100%)", title: "Showcase" },
];

const luxurySlideContent = (slide: (typeof luxurySlides)[0]) => (
  <div
    key={slide.num}
    style={{
      padding: 56,
      background: slide.bg,
      borderRadius: 12,
      minHeight: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h3 style={{ margin: 0, fontSize: 22, fontWeight: 300, letterSpacing: "0.2em", color: "rgba(255,255,255,0.95)", textTransform: "uppercase" }}>
      {slide.title}
    </h3>
  </div>
);

export const Default: Story = {
  args: {
    children: [
      slideContent(1, "#2563eb"),
      slideContent(2, "#059669"),
      slideContent(3, "#7c3aed"),
    ],
    ariaLabel: "Content carousel",
  },
};

export const Luxury: Story = {
  args: {
    children: luxurySlides.map((s) => luxurySlideContent(s)),
    ariaLabel: "Editorial carousel",
  },
};

export const NoArrows: Story = {
  args: {
    children: [
      slideContent(1, "#2563eb"),
      slideContent(2, "#059669"),
    ],
    showArrows: false,
    ariaLabel: "Carousel",
  },
};

export const NoDots: Story = {
  args: {
    children: [
      slideContent(1, "#2563eb"),
      slideContent(2, "#059669"),
    ],
    showDots: false,
    ariaLabel: "Carousel",
  },
};

export const AutoPlay: Story = {
  args: {
    children: [
      slideContent(1, "#2563eb"),
      slideContent(2, "#059669"),
      slideContent(3, "#7c3aed"),
    ],
    autoPlay: true,
    interval: 3000,
    ariaLabel: "Auto-advancing carousel",
  },
};

export const Controlled: Story = {
  render: function Controlled() {
    const [index, setIndex] = useState(0);
    return (
      <div className="space-y-4">
        <Carousel
          activeIndex={index}
          onActiveIndexChange={setIndex}
          ariaLabel="Controlled carousel"
        >
          {slideContent(1, "#2563eb")}
          {slideContent(2, "#059669")}
          {slideContent(3, "#7c3aed")}
        </Carousel>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Active slide index: <strong>{index}</strong>
        </p>
      </div>
    );
  },
};

export const SingleSlide: Story = {
  args: {
    children: [slideContent(1, "#2563eb")],
    ariaLabel: "Single slide",
  },
};
