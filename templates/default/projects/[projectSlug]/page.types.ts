import type {TModel as ProjectModel} from "@/configuration/projects";
import type {TModel as MilestoneModel} from "@/configuration/journey";
import type {TModel as SkillModel} from "@/configuration/skills";

export interface PageContentProps {
  project: ProjectModel["projects"][number];
  milestone?: MilestoneModel["milestones"][number];
  skills: SkillModel["skills"];
}
