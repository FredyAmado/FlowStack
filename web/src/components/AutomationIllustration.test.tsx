import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import AutomationIllustration from "./AutomationIllustration";

describe("AutomationIllustration", () => {
  it("renders an SVG element", () => {
    render(<AutomationIllustration />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 500 400");
  });

  it("accepts a className prop", () => {
    render(<AutomationIllustration className="custom-class" />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("custom-class");
  });

  it("renders with default empty className", () => {
    render(<AutomationIllustration />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
