interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  showSubtitle?: boolean
  className?: string
  variant?: 'main' | 'with-subtitle' | 'cover' | 'identity'
}

export function Logo({ size = 'medium', showSubtitle = false, className = '', variant = 'main' }: LogoProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
    xlarge: 'w-48 h-48'
  }

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
    xlarge: 'text-5xl'
  }

  // Sélection de l'image en fonction de la variante
  const getImageSrc = () => {
    switch (variant) {
      case 'with-subtitle':
        return '/images/Image_15.png'  // Logo avec sous-titre
      case 'cover':
        return '/images/Image_3.jpeg'  // Couverture de livre
      case 'identity':
        return '/images/Image_5.jpeg'  // Interface complète
      default:
        return '/images/Image_3.png'   // Logo principal
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses[size]} mb-3`}>
        <img 
          src={getImageSrc()} 
          alt={`Logo Gabon d'abord ${variant}`} 
          className="w-full h-full object-contain"
        />
      </div>
      {!showSubtitle && variant === 'main' && (
        <h1 className={`${textSizeClasses[size]} font-bold text-emerald-800 text-center`}>
          GABON D'ABORD
        </h1>
      )}
    </div>
  )
}