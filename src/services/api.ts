import { Project, BlogPost, Comment } from "@/types"



const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const res = await fetch(`${API_URL}/graphql`, {
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
  const data = await fetchAPI(`
    query {
      projects {
          documentId
          title
          description
          image {
                  url
                }
          technologies
          longDescription
          githubUrl
          liveUrl
        }      
          }
  
  `)
  return data.projects
}

export async function getBlogPosts(searchTerm: string = ''): Promise<BlogPost[]> {
  const BlogPostFiltersInput = {
    "filters:": {
      "or": [
        { "title": { "containsi": searchTerm } },
        { "content": { "containsi": searchTerm } }
      ]
    }

  }
  const data = await fetchAPI(`
    query GetBlogPosts($filters: BlogPostFiltersInput) {
      blogPosts(filters: $filters) {
          documentId
          title
          content
          mainimage{
          url
          }
          date
          author
      }
    }
  `, {
    variables: { BlogPostFiltersInput },
  })
  return data.blogPosts
}

export async function getBlogPost(id: string): Promise<BlogPost> {
  const data = await fetchAPI(`
    query GetBlogPost($id: ID!) {
      blogPost(documentId: $id) {
        documentId
        title
        mainimage{
          url
          }
        content
        date
        author
      }
    }
  `, {
    variables: { id },
  })

  // Ensure that data is correctly retrieved and structured
  if (!data || !data.blogPost) {
    throw new Error('Post not found')
  }

  return data.blogPost
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