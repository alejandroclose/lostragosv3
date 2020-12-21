import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import RecipeBody from '../../components/recipe-body'
import Header from '../../components/header'
import RecipeHeader from '../../components/recipe-header'
import Layout from '../../components/layout'
import { getrecipeBySlug, getAllrecipes } from '../../lib/api'
import RecipeTitle from '../../components/recipe-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function recipe({ recipe, morerecipes, preview }) {
  const router = useRouter()
  if (!router.isFallback && !recipe?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <RecipeTitle>Loading…</RecipeTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {recipe.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={recipe.ogImage.url} />
              </Head>
              <RecipeHeader
                title={recipe.title}
                coverImage={recipe.coverImage}
                date={recipe.date}
                author={recipe.author}
              />
              <RecipeBody content={recipe.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const recipe = getrecipeBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(recipe.content || '')

  return {
    props: {
      recipe: {
        ...recipe,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const recipes = getAllrecipes(['slug'])

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: recipe.slug,
        },
      }
    }),
    fallback: false,
  }
}
