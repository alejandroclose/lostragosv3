export default function RecipeTitle({ children }) {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-tight md:leading-none mb-12 text-center">
      {children}
    </h1>
  )
}
