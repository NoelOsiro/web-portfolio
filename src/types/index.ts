import { TypedObject } from "sanity";

  
  export interface BlogPost {
    documentId: string ; // depending on how your Strapi model is structured
    mainimage: {
      url: string;
    };
    title: string;
    author: string;
    date: string;
    content: string;
  }
  

  export interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    githubUrl: string;
    liveUrl: string;
    author: Author;
    publishedAt: string;
    technologies: string[];
    body: TypedObject | TypedObject[]

  }

// types.ts or Comment.ts


export interface Comment {
  documentId: string
  author: string
  content: string
  createdAt: string
}

export interface Post {
  id: string
  title: string
  slug: string
  mainImage: string
  description: string
  content: string
  author: Author
  categories: string[]
  publishedAt: string
  body: TypedObject | TypedObject[]

}

interface Author {
  name: string
  image: string

}
