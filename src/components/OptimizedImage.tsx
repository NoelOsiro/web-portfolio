import Image from 'next/image'
import { useState } from 'react'

type OptimizedImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, width, height, className }) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width / height }}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}

export default OptimizedImage