// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { useRagStore } from "../ragStore";
import { dayKey, DEFAULT_ROI } from "./historySlice";

const S = () => useRagStore.getState();

beforeEach(() => {
  localStorage.clear();
  useRagStore.setState({
    historyHydrated: false, costDays: {}, roiAssumptions: { ...DEFAULT_ROI },
    usage: { embedTokens: 0, promptTokens: 0, completionTokens: 0, costUSD: 0 },
  });
});

describe("historySlice", () => {
  it("buckets real cost into today's ledger and persists it", () => {
    S().addDayCost(0.002);
    S().addDayCost(0.003);
    expect(S().costDays[dayKey()]).toBeCloseTo(0.005, 10);

    useRagStore.setState({ historyHydrated: false, costDays: {} });
    S().hydrateHistory();
    expect(S().costDays[dayKey()]).toBeCloseTo(0.005, 10);
  });

  it("usage deltas flow into the ledger via the store subscription", () => {
    S().addUsage({ costUSD: 0.01 });
    expect(S().costDays[dayKey()]).toBeCloseTo(0.01, 10);
    S().addUsage({ costUSD: 0.005 });
    expect(S().costDays[dayKey()]).toBeCloseTo(0.015, 10);
  });

  it("ignores non-positive costs", () => {
    S().addDayCost(0);
    S().addDayCost(-1);
    expect(S().costDays[dayKey()]).toBeUndefined();
  });

  it("ROI assumptions are editable, validated, and persisted", () => {
    S().setRoiAssumption("questionsPerMonth", 5000);
    S().setRoiAssumption("analystHourlyCost", -5);   // rejected
    expect(S().roiAssumptions.questionsPerMonth).toBe(5000);
    expect(S().roiAssumptions.analystHourlyCost).toBe(DEFAULT_ROI.analystHourlyCost);

    useRagStore.setState({ historyHydrated: false, roiAssumptions: { ...DEFAULT_ROI } });
    S().hydrateHistory();
    expect(S().roiAssumptions.questionsPerMonth).toBe(5000);
  });
});
