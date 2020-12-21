import RecipePreview from '../components/recipe-preview'

export default function MoreStories({ recipes }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {recipes.map((recipe) => (
          <RecipePreview
            key={recipe.slug}
            title={recipe.title}
            coverImage={recipe.coverImage}
            date={recipe.date}
            author={recipe.author}
            slug={recipe.slug}
            excerpt={recipe.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
