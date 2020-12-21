import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const recipesDirectory = join(process.cwd(), '_recipes')

export function getrecipeSlugs() {
  return fs.readdirSync(recipesDirectory)
}

export function getrecipeBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(recipesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllrecipes(fields = []) {
  const slugs = getrecipeSlugs()
  const recipes = slugs
    .map((slug) => getrecipeBySlug(slug, fields))
    // sort recipes by date in descending order
    .sort((recipe1, recipe2) => (recipe1.date > recipe2.date ? '-1' : '1'))
  return recipes
}
