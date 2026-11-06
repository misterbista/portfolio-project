import {Model as BlogsModel} from "@/configuration/blogs";
import {Model as BlogModel} from "@/configuration/blog";


export type BlogPost = BlogsModel["posts"][number] & BlogModel
