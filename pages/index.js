import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Herorecipe from '../components/hero-recipe'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllrecipes } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allrecipes }) {
  const herorecipe = allrecipes[0]
  const morerecipes = allrecipes.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {herorecipe && (
            <Herorecipe
              title={herorecipe.title}
              coverImage={herorecipe.coverImage}
              date={herorecipe.date}
              author={herorecipe.author}
              slug={herorecipe.slug}
              excerpt={herorecipe.excerpt}
            />
          )}
          {morerecipes.length > 0 && <MoreStories recipes={morerecipes} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allrecipes = getAllrecipes([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allrecipes },
  }
}
