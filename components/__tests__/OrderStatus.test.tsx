import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderStatus from "@/components/OrderStatus";

describe("OrderStatus", () => {
  it("renders all four status steps", () => {
    render(<OrderStatus status="PREPARING" />);
    expect(screen.getByText("RECEIVED")).toBeInTheDocument();
    expect(screen.getByText("PREPARING")).toBeInTheDocument();
    expect(screen.getByText("READY")).toBeInTheDocument();
    expect(screen.getByText("COMPLETED")).toBeInTheDocument();
  });
});
