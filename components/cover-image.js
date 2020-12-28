import cn from 'classnames'
import Link from 'next/link'

export default function CoverImage({ title, src, slug, children }) {
  const image = (
    <img
      src={src}
      alt={`Imágen de cabecera de ${title}`}
      className={cn('shadow-small w-full h-40 sm:h-96', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0 z-0 bg-cover1 sm:h-96" >
      {slug ? (
        <Link as={`/receta/${slug}`} href="/receta/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
        )}
        <div className="z-50 relative  -top-30 sm:-top-56"><div className="text-white font-montserrat">{children}</div></div>
    </div>
  )
}
