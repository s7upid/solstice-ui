import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Expandable sections with **Accordion** and **Accordion.Item**. Use **type** `single` (one open) or `multiple`. Control with **defaultExpanded** (uncontrolled) or **expanded** + **onExpandedChange** (controlled). Each item needs **id**, **header**, and **children** (content).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: { control: "select", options: ["single", "multiple"] },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item id="one" header="First section">
        Content for the first section. You can put any content here.
      </Accordion.Item>
      <Accordion.Item id="two" header="Second section">
        Content for the second section.
      </Accordion.Item>
      <Accordion.Item id="three" header="Third section">
        More content in the third section.
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultExpanded={["one"]}>
      <Accordion.Item id="one" header="Section one">
        This accordion allows multiple sections to be open at once.
      </Accordion.Item>
      <Accordion.Item id="two" header="Section two">
        You can expand both this and section one.
      </Accordion.Item>
      <Accordion.Item id="three" header="Section three">
        Or all three.
      </Accordion.Item>
    </Accordion>
  ),
};

export const DefaultExpanded: Story = {
  render: () => (
    <Accordion defaultExpanded={["two"]}>
      <Accordion.Item id="one" header="Collapsed by default">
        This one starts closed.
      </Accordion.Item>
      <Accordion.Item id="two" header="Open by default">
        This section starts expanded.
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithRichHeaders: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item
        id="a"
        header={
          <span>
            <strong>FAQ 1</strong> — How do I get started?
          </span>
        }
      >
        Follow the setup guide in the docs and run the first command.
      </Accordion.Item>
      <Accordion.Item
        id="b"
        header={
          <span>
            <strong>FAQ 2</strong> — Where is the API reference?
          </span>
        }
      >
        The API reference is available under the Reference menu.
      </Accordion.Item>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item id="one" header="Enabled section">
        This section can be toggled.
      </Accordion.Item>
      <Accordion.Item id="two" header="Disabled section" disabled>
        This section cannot be opened.
      </Accordion.Item>
    </Accordion>
  ),
};
