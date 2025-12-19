export default class AboutSetupModel {
  aboutMe: string;
  photo: string;
  keypoints: Keypoint[];
}

class Keypoint {
  title: string;
  value: string;
}