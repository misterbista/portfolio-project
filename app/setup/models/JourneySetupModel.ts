
export default class JourneySetupModel {
  summary: string;
  milestones: Milestone[]
}

class Milestone {
  uniqueId: string;
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
  achievements?: Achievement[];
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