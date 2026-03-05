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
          "Slideshow: **layout** single (one slide) or peek (prev/next visible). **arrowVariant**: experimentation (hover), glide (pill), visible. Dots, auto-play, controlled mode.",
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
    arrowVariant: { control: "radio", options: ["experimentation", "glide", "visible"] },
    showDots: { control: "boolean" },
    autoPlay: { control: "boolean" },
    interval: { control: { type: "number", min: 1000, max: 15000, step: 500 } },
    ariaLabel: { control: "text" },
    threeD: { control: "boolean" },
    layout: { control: "radio", options: ["single", "peek"] },
    peekSlideWidth: { control: { type: "number", min: 0.4, max: 0.95, step: 0.05 } },
  },
  args: {
    showArrows: true,
    arrowVariant: "experimentation",
    showDots: true,
    autoPlay: false,
    interval: 5000,
    ariaLabel: "Content carousel",
    threeD: false,
    layout: "single",
    peekSlideWidth: 0.55,
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

export const ArrowVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-2">Visible arrows</p>
        <div className="h-[220px]">
          <Carousel arrowVariant="visible" ariaLabel="Visible arrows">
            {slideContent(1, "#2563eb")}
            {slideContent(2, "#059669")}
            {slideContent(3, "#7c3aed")}
          </Carousel>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Glide arrows</p>
        <div className="h-[220px]">
          <Carousel arrowVariant="glide" ariaLabel="Glide arrows">
            {slideContent(1, "#2563eb")}
            {slideContent(2, "#059669")}
            {slideContent(3, "#7c3aed")}
          </Carousel>
        </div>
      </div>
    </div>
  ),
};

export const Peek: Story = {
  args: {
    children: [
      slideContent(1, "#2563eb"),
      slideContent(2, "#059669"),
      slideContent(3, "#7c3aed"),
      slideContent(4, "#dc2626"),
      slideContent(5, "#ca8a04"),
    ],
    layout: "peek",
    peekSlideWidth: 0.55,
    arrowVariant: "glide",
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
