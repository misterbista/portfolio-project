import {Identifier, useConfig} from "@/hooks/useConfig";

export function generateMilestoneLabel(milestone: Exclude<ReturnType<typeof useConfig<Identifier.Journey>>["config"], undefined>["milestones"][number]) {
  const { title, start, end, department, organisation } = milestone;

  const bigDot = "•";

  const departmentPart = department ? `${department} ` : "";
  const organisationPart = department ? `@ ${organisation}` : organisation || "";
  const details = [departmentPart, organisationPart]
    .filter(Boolean)
    .map((part) => part.trim())
    .join(" ")
    .trim();
  const datePart = start ? `(${start}${end ? ` — ${end}` : ""})` : "";

  return `${title} ${details.length ? (bigDot + " " + details) : details} ${datePart}`.trim();
}
