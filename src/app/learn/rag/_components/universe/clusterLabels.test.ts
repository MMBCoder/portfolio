import { describe, it, expect } from "vitest";
import { clusterLabels } from "./clusterLabels";

/* Cluster names come from real term frequency — never invented. */

describe("clusterLabels", () => {
  const texts = [
    "Travel insurance covers trip cancellation and travel delays worldwide.",
    "Travel insurance includes baggage protection for every travel booking.",
    "Airport lounge access grants entry to partner lounge networks globally.",
    "Lounge access includes complimentary lounge visits each calendar year.",
  ];
  const assign = [0, 0, 1, 1];

  it("labels each cluster with its own characteristic terms", () => {
    const labels = clusterLabels(texts, assign, 2);
    expect(labels).toHaveLength(2);
    expect(labels[0]).toContain("travel");
    expect(labels[1]).toContain("lounge");
  });

  it("never uses stopwords as labels", () => {
    const labels = clusterLabels(["the and of to in is", "the and of to in is"], [0, 1], 2);
    for (const l of labels) {
      expect(l).not.toMatch(/\b(the|and|of|to|in|is)\b/);
    }
  });

  it("survives empty clusters and empty input", () => {
    expect(clusterLabels([], [], 2)).toHaveLength(2);
    expect(clusterLabels(["only text here today"], [0], 3)).toHaveLength(3);
  });

  it("weights against corpus-wide terms so a shared word doesn't label every cluster", () => {
    const t = [
      "card benefits include cashback rewards on card purchases",
      "card benefits include cashback rewards on card purchases",
      "card annual fee waiver applies for card premium members",
      "card annual fee waiver applies for card premium members",
    ];
    const labels = clusterLabels(t, [0, 0, 1, 1], 2);
    // "card" appears everywhere — at most one cluster may lead with it
    const leadsWithCard = labels.filter(l => l.startsWith("card")).length;
    expect(leadsWithCard).toBeLessThanOrEqual(1);
  });
});
