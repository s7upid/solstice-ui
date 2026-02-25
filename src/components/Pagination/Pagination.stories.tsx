import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Page navigation: current page, total pages, prev/next, and optional page dropdown. Optional page size selector (onPageSizeChange, pageSizeOptions).",
      },
    },
  },
  argTypes: {
    currentPage: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

function PaginationWrapper(props: { totalPages: number; showPageSize?: boolean }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  return (
    <Pagination
      currentPage={page}
      totalPages={props.totalPages}
      onPageChange={setPage}
      pageSize={props.showPageSize ? pageSize : undefined}
      onPageSizeChange={props.showPageSize ? setPageSize : undefined}
    />
  );
}

export const Default: Story = {
  render: () => <PaginationWrapper totalPages={10} />,
};

export const ManyPages: Story = {
  render: () => <PaginationWrapper totalPages={50} />,
};

export const WithPageSize: Story = {
  render: () => <PaginationWrapper totalPages={20} showPageSize />,
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
};
