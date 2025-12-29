import {Keypoint} from "./Keypoint";
import {SocialLink} from "@nightmaregaurav/react-social-media-links";

export class Project {
  title: string;
  links: SocialLink[];
  description: string;
  previewImage: string;
  images: string[];
  keypoints: Keypoint[];
  seoKeywords: string[];
  milestoneId?: string;
}