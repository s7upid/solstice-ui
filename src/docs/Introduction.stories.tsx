import type { Meta, StoryObj } from "@storybook/react";

const ComponentOverview = () => (
  <div style={{ maxWidth: 720, lineHeight: 1.6 }}>
    <h1>Solstice UI</h1>
    <p>
      React component library for <strong>dark and light mode</strong>, built
      with TypeScript, Tailwind CSS, and CSS Modules. Glassmorphism-style
      surfaces, consistent hover and focus states in both themes. Accessible,
      themable, and tree-shakeable.
    </p>

    <h2>Component overview</h2>
    <p>Use the <strong>Components</strong> section in the sidebar to explore each component and its variants.</p>

    <h3>Core</h3>
    <ul>
      <li><strong>Button</strong> — Primary, secondary, danger, ghost, success, outline; sizes and icons</li>
      <li><strong>Input</strong> — Text field with label, error, optional left/right icon (e.g. Lucide), and <code>endAdornment</code> (e.g. button at the end)</li>
      <li><strong>Card</strong> — Content card with header, details, stats, actions; optional <code>onClick</code> to make the whole card clickable (e.g. open details); set <code>imageSrc</code> for image layout with action</li>
      <li><strong>Badge</strong> — Status and label badges</li>
      <li><strong>Dropdown</strong> — Select-style dropdown</li>
      <li><strong>Form</strong> — Form layout and validation</li>
      <li><strong>Alert</strong> — Inline alerts (info, success, warning, error)</li>
      <li><strong>Progress</strong> — Progress bar with optional label</li>
      <li><strong>Toggle</strong> — <strong>Button</strong> (pressed/unpressed), <strong>switch</strong> (off / indeterminate / on), or <strong>checkbox</strong> variant (label, error, description, tri-state)</li>
      <li><strong>Carousel</strong> — Slideshow with arrows, dots, optional auto-play</li>
    </ul>

    <h3>Layout</h3>
    <ul>
      <li><strong>PageHeader</strong> — Page title and actions</li>
      <li><strong>DataPage</strong> — Unified page layout: <code>layout="grid"</code> or <code>layout="list"</code>, optional PageHeader, loading, empty state, pagination</li>
      <li><strong>List</strong> — Structured list</li>
      <li><strong>Grid</strong> — Responsive card grid (items, renderCard, 1–4 columns)</li>
      <li><strong>TabNavigation</strong> — Tabs</li>
      <li><strong>StackedCardsDeck</strong> — Scroll-driven stack of cards; cards animate (scale, fade, rotate) as you scroll</li>
    </ul>

    <h3>Feedback</h3>
    <ul>
      <li><strong>LoadingSpinner</strong>, <strong>EmptyState</strong>, <strong>Toast</strong>, <strong>ErrorBoundary</strong></li>
    </ul>

    <h3>Overlays</h3>
    <ul>
      <li><strong>Dialog</strong> — Modal with title, content, optional footer or footer actions (with icons)</li>
    </ul>

    <h3>Actions</h3>
    <ul>
      <li><strong>DangerZone</strong>, <strong>Pagination</strong>, <strong>SearchInput</strong>, <strong>Toggle</strong></li>
    </ul>

    <h3>Forms</h3>
    <ul>
      <li><strong>Input</strong>, <strong>Toggle</strong> (checkbox variant), <strong>DateTimePicker</strong>, <strong>Form</strong></li>
    </ul>

    <h3>Theme</h3>
    <ul>
      <li><strong>ThemeToggle</strong>, <strong>ThemeProvider</strong>, <strong>useThemeContext</strong></li>
    </ul>

    <h2>Quick start</h2>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200">
{`npm install solstice-ui react react-dom lucide-react`}
    </pre>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200">
{`import "solstice-ui/styles";
import { ThemeProvider, Button, Input } from "solstice-ui";

<ThemeProvider defaultTheme="light" storageKey="app-theme">
  <Button variant="primary">Save</Button>
  <Input label="Email" placeholder="you@example.com" />
</ThemeProvider>`}
    </pre>
    <p>Use Tailwind <code>darkMode: 'class'</code> and toggle the <code>.dark</code> class on the root when in dark mode.</p>

    <h2>Theming</h2>
    <p>Surfaces, accents, status colors, focus rings, shadows, and transitions are controlled by CSS custom properties in the library stylesheet. To retheme, override those variables (e.g. in your app after importing <code>solstice-ui/styles</code>); see the source <code>index.css</code> for the full set of tokens.</p>
  </div>
);

const meta: Meta<typeof ComponentOverview> = {
  title: "Documentation/Introduction",
  component: ComponentOverview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Solstice UI — React component library for dark and light mode. Browse the Components section for each component and its stories.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ComponentOverview>;

export const Overview: Story = {
  render: () => <ComponentOverview />,
};
