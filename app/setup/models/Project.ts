import {Keypoint} from "./Keypoint";

export class Project {
  title: string;
  links: string[];
  description: string;
  images: string[];
  technologies: string[];
  keypoints: Keypoint[];
  milestoneId?: string;
}