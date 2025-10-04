import type { IAccountLabel } from "../types/account";

export const parseLabels = (labelsString: string): IAccountLabel[] => {
  if (!labelsString.trim()) {
    return [];
  }

  return labelsString
    .split(";")
    .map((label) => label.trim())
    .filter((label) => label.length > 0)
    .map((text) => ({ text }));
};

export const formatLabels = (labels: IAccountLabel[]): string => {
  return labels.map((label) => label.text).join("; ");
};
