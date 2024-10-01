
  
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
  
  documentId: string ; // depending on how your Strapi model is structured
  title: string;
  description: string;
  technologies: string[];
  image: {
        url: string;
  };
  githubUrl: string;
  liveUrl: string;
}

// types.ts or Comment.ts


export interface Comment {
  documentId: string
  author: string
  content: string
  createdAt: string
}
