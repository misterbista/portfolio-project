export default class AboutSetupModel {
  aboutMe: string;
  photo: string;
  keypoints: Keypoint[];
  additionalInformation?: string;
}

class Keypoint {
  title: string;
  value: string;
}