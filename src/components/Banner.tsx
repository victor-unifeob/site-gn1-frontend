// src/components/Banner.tsx

'use client'

interface BannerProps {
  title: string;
  variant?: 'image' | 'color';
  backgroundImage?: string;
  backgroundColor?: string;
  overlayImage?: string;
  overlayOpacity?: number;
  className?: string;
}

export function Banner({
  title,
  variant = 'image',
  backgroundImage = '/patterns/books-bg.webp',
  backgroundColor = 'bg-blue-600',
  overlayImage,
  overlayOpacity = 0.7,
  className = ""
}: BannerProps) {
  return (
    <section className={`relative h-80 lg:h-96 flex items-center justify-center overflow-hidden ${className}`}>
      {variant === 'image' ? (
        <>
          {/* Background Image Version */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${backgroundImage}')`
              }}
            />
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              style={{ opacity: overlayOpacity }}
            />
          </div>
        </>
      ) : (
        <>
          {/* Background Color Version */}
          <div className={`absolute inset-0 ${backgroundColor}`} />

          {/* Image Overlay */}
          {overlayImage && (
            <div
              className="absolute inset-0 bg-right bg-no-repeat"
              style={{
                backgroundImage: `url('${overlayImage}')`
              }}
            />
          )}
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

// Exemplo de uso:
// <Banner title="Nossos Clientes" variant="color" backgroundColor="bg-indigo-600" overlayImage="/path/to/overlay-pattern.png" />
// <Banner title="Nossos Clientes" variant="image" backgroundImage="/path/to/image.jpg" />