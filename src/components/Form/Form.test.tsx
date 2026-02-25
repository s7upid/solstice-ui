import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
  it("renders as form with children", () => {
    const { container } = render(
      <Form>
        <input name="x" />
      </Form>
    );
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form?.querySelector('input[name="x"]')).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(<Form className="my-form">x</Form>);
    expect(container.querySelector("form.my-form")).toBeInTheDocument();
  });

  it("forwards form props", () => {
    const onSubmit = () => {};
    const { container } = render(
      <Form action="/submit" method="post" onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "/submit");
    expect(form).toHaveAttribute("method", "post");
  });
});
