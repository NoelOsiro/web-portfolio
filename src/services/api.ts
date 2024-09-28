import { BlogPost, Project } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

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
        data {
          id
          attributes {
            title
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
            technologies
            longDescription
            githubUrl
            liveUrl
          }
        }
      }
    }
  `)
  return data.projects.data
}

export async function getBlogPosts(searchTerm: string = ''): Promise<BlogPost[]> {
  const data = await fetchAPI(`
    query GetBlogPosts($searchTerm: String) {
      blogPosts(filters: { or: [
        { title: { containsi: $searchTerm } },
        { content: { containsi: $searchTerm } }
      ]}) {
        data {
          id
          attributes {
            title
            content
            date
            author
          }
        }
      }
    }
  `, {
    variables: { searchTerm },
  })
  return data.blogPosts.data
}