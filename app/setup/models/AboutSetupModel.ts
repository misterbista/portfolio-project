import {Keypoint} from "./Keypoint";

export default class AboutSetupModel {
  aboutMe: string;
  photo: string;
  keypoints: Keypoint[];
  additionalInformation?: string;
}