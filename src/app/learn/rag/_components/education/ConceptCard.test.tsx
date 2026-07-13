// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ConceptTrigger } from "./ConceptCard";
import { useRagStore } from "../ragStore";

beforeEach(() => {
  cleanup();
  useRagStore.setState({ persona: "student" });
});

describe("ConceptTrigger", () => {
  it("opens a card with the concept term on click and closes on Escape", () => {
    render(<ConceptTrigger id="chunking">chunk size</ConceptTrigger>);

    const trigger = screen.getByRole("button", { name: "Explain: Chunking" });
    expect(trigger).toHaveProperty("ariaExpanded", "false");

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Chunking" })).toBeTruthy();
    // student voice: analogy leads
    expect(screen.getByText(/index cards/i)).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });
    // AnimatePresence keeps the exiting node mounted briefly; state is authoritative
    expect(trigger).toHaveProperty("ariaExpanded", "false");
  });

  it("re-voices the same concept when the persona changes", () => {
    useRagStore.setState({ persona: "engineer" });
    render(<ConceptTrigger id="chunking">chunk size</ConceptTrigger>);
    fireEvent.click(screen.getByRole("button", { name: "Explain: Chunking" }));
    // technical voice: definition leads
    expect(screen.getByText(/Splitting the document into retrieval units/i)).toBeTruthy();
  });

  it("shows adjust-it chips for parameter-bearing concepts", () => {
    render(<ConceptTrigger id="top-k">top-K</ConceptTrigger>);
    fireEvent.click(screen.getByRole("button", { name: "Explain: Top-K" }));
    expect(screen.getByRole("button", { name: /top-K →/ })).toBeTruthy();
  });

  it("renders enrichment fields when the registry provides them (confidence, history, try-this)", () => {
    render(<ConceptTrigger id="embeddings">embeddings</ConceptTrigger>);
    fireEvent.click(screen.getByRole("button", { name: "Explain: Embeddings" }));
    expect(screen.getByText("established practice")).toBeTruthy();
    expect(screen.getByText("where it came from")).toBeTruthy();
    expect(screen.getByText(/word2vec \(2013\)/)).toBeTruthy();
    expect(screen.getByText("try this now")).toBeTruthy();
  });

  it("omits enrichment sections when a concept doesn't define them", () => {
    render(<ConceptTrigger id="pdf-parsing">parsing</ConceptTrigger>);
    fireEvent.click(screen.getByRole("button", { name: "Explain: PDF parsing" }));
    expect(screen.queryByText("where it came from")).toBeNull();
    expect(screen.queryByText("try this now")).toBeNull();
  });
});
