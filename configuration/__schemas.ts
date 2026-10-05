import {schema as coreSchema} from "./core";
import {schema as leftPanelSchema} from "./leftPanel";
import {schema as homeSchema} from "./home";


export default [
  {
    title: "Core",
    schema: coreSchema,
  },
  {
    title: "Left Panel",
    schema: leftPanelSchema
  },
  {
    title: "Home",
    schema: homeSchema
  }
];

