import { client } from "@/sanity/lib/client";
import { Project, Comment, Post } from "@/types"



const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/studio'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}


export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"]{
    _id,
    title,
    description,
    "imageUrl": mainImage.asset->url,
    author->{
        name,
        image
      },
    githubUrl,
    liveUrl,
    body,
    publishedAt,
    technologies
  }`;
  const projects = await client.fetch(query);
  return projects;
}

//fetch project by id
export async function getProjectById(id: string): Promise<Project> {
  const query = `*[_type == "project" && _id == $id]{
    _id,
    title,
    description,
    "imageUrl": mainImage.asset->url,
    githubUrl,
    liveUrl,
    technologies
  }`;
  const project = await client.fetch(query, { id });
  return project[0];
}

// Fetch Blog Posts using GROQ
export async function getBlogPosts(searchTerm: string = ''): Promise<Post[]> {
  const query = `*[_type == "post" && (title match $searchTerm || body[].children[].text match $searchTerm)]{
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "author": author->name,
    "categories": categories[]->title,
    publishedAt,
    body,
  } | order(publishedAt desc)`;

  // Fetch blog posts from Sanity
  const blogPosts = await client.fetch(query, {
    searchTerm: `${searchTerm}*`,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return blogPosts.map((post: any) => ({
    id: post._id,
    title: post.title,
    slug: post.slug,
    mainImage: post.mainImage,
    author: post.author,
    categories: post.categories,
    publishedAt: post.publishedAt,
    body: post.body, // Rich text, can be parsed on the frontend
  }));
}

export async function getBlogPost(id: string): Promise<Post> {
  const query = `
    *[_type == "post" && _id == $id] {
      _id,
      title,
      body,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      date,
      author->{
        name,
        image
      },
      publishedAt,
    }[0]
  `;
  const blogPost = await client.fetch(query, {
    id: `${id}`,
  });
  return blogPost; // This will return the post object
}


export async function getComments(postId: string): Promise<Comment[]> {
  const CommentFiltersInput = {
    "postId": { "eq": postId },
  }
  const data = await fetchAPI(`
    query GetComments($filters: CommentFiltersInput) {
      comments(filters: $filters) {
          documentId
            content
            author
            createdAt
      }
    }
  `, {
    variables: { CommentFiltersInput },
  })
  return data
}

export async function postComment(postId: string, content: string, author: string): Promise<Comment> {
  const data = await fetchAPI(`
    mutation CreateComment($postId: ID!, $content: String!, $author: String!) {
      createComment(data: { content: $content, author: $author, post: $postId }) {
        data {
          id
          attributes {
            content
            author
            createdAt
          }
        }
      }
    }
  `, {
    variables: { postId, content, author },
  })
  return data.createComment.data
}