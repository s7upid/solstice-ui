import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

const Throw = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <span data-testid="child">OK</span>
      </ErrorBoundary>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("OK");
  });

  it("renders default fallback when child throws", () => {
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div data-testid="custom">Custom</div>}>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("custom")).toHaveTextContent("Custom");
  });

  it("calls onError when child throws", () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <Throw />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object)
    );
  });

  it("Try Again resets state (child throws again so error UI may reappear)", async () => {
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("showDetails shows error details", () => {
    render(
      <ErrorBoundary showDetails>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText(/error details/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it("resets when resetKeys change and resetOnPropsChange is true", () => {
    const { rerender } = render(
      <ErrorBoundary resetOnPropsChange resetKeys={["a"]}>
        <Throw />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    rerender(
      <ErrorBoundary resetOnPropsChange resetKeys={["b"]}>
        <span data-testid="ok">OK</span>
      </ErrorBoundary>
    );
    expect(screen.getByTestId("ok")).toHaveTextContent("OK");
  });

  it("Refresh Page calls window.location.reload", async () => {
    const reload = vi.fn();
    Object.defineProperty(window, "location", { value: { reload }, writable: true });
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>
    );
    await userEvent.click(screen.getByRole("button", { name: /refresh page/i }));
    expect(reload).toHaveBeenCalled();
    Object.defineProperty(window, "location", {
      value: { ...window.location, reload: window.location.reload },
      writable: true,
    });
  });

  it("Go Home navigates to homeUrl or /", async () => {
    const loc = { href: "" as string };
    Object.defineProperty(window, "location", {
      value: loc,
      writable: true,
      configurable: true,
    });
    render(
      <ErrorBoundary homeUrl="/dashboard">
        <Throw />
      </ErrorBoundary>
    );
    await userEvent.click(screen.getByRole("button", { name: /go home/i }));
    expect(loc.href).toBe("/dashboard");
  });
});
