
export default class JourneySetupModel {
  summary: string;
  milestones: Milestone[]
}

class Milestone {
  type: MilestoneType;
  title: string;
  description: string;
  start?: Date;
  end?: Date;
  organisation?: string;
  organizationWebsite?: string;
  department?: string;
  departmentWebsite?: string;
  points: string[];
  partingNote?: string;
  // projects?: Project[];
  achievements?: Achievement[];
  // skills?: Skill[];

}

enum MilestoneType {
  Academic = "Academic",
  Professional = "Professional",
  Personal = "Personal"
}

class Achievement {
  title: string;
  description: string
  on?: Date;
}