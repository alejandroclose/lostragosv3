import markdownStyles from './markdown-styles.module.css'

export default function RecipeBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto font-montserrat">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
