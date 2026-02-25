import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ModalPortal from "./ModalPortal";

describe("ModalPortal", () => {
  it("portals children to document.body", () => {
    render(
      <ModalPortal>
        <div data-testid="portal-child">Inside portal</div>
      </ModalPortal>
    );
    expect(screen.getByTestId("portal-child")).toBeInTheDocument();
    expect(screen.getByText("Inside portal")).toBeInTheDocument();
  });

  it("portals to custom container when provided", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <ModalPortal container={container}>
        <span data-testid="in-container">In container</span>
      </ModalPortal>
    );
    expect(container.querySelector("[data-testid='in-container']")).toBeInTheDocument();
    expect(container.textContent).toBe("In container");
    document.body.removeChild(container);
  });
});
