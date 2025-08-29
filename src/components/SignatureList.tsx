import { useSignatures } from '@/hooks/useSignatures'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface SignatureListProps {
  showTitle?: boolean
  maxItems?: number
}

export function SignatureList({ showTitle = true, maxItems }: SignatureListProps) {
  const { signatures, isLoading, error } = useSignatures()
  
  const displayedSignatures = maxItems ? signatures.slice(0, maxItems) : signatures
  
  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: fr })
    } catch (error) {
      return 'Date inconnue'
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-emerald-200 p-6">
        {showTitle && (
          <h3 className="text-xl font-bold text-emerald-800 mb-6 text-center">
            Signataires récents
          </h3>
        )}
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
          <span className="ml-3 text-emerald-700">Chargement des signatures...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-red-200 p-6">
        {showTitle && (
          <h3 className="text-xl font-bold text-emerald-800 mb-6 text-center">
            Signataires récents
          </h3>
        )}
        <div className="text-center py-8">
          <p className="text-red-600">Erreur lors du chargement des signatures</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (displayedSignatures.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-emerald-200 p-6">
        {showTitle && (
          <h3 className="text-xl font-bold text-emerald-800 mb-6 text-center">
            Signataires récents
          </h3>
        )}
        <div className="text-center py-8">
          <p className="text-emerald-600">Aucune signature pour le moment</p>
          <p className="text-emerald-500 text-sm mt-2">Soyez le premier à signer cette pétition !</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-emerald-200 p-6">
      {showTitle && (
        <h3 className="text-xl font-bold text-emerald-800 mb-6 text-center">
          Signataires récents
        </h3>
      )}
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {displayedSignatures.map((signature, index) => (
          <div 
            key={signature.id || index} 
            className="border-b border-emerald-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-emerald-800">
                    {signature.prenom} {signature.nom}
                  </span>
                  <span className="text-sm text-emerald-600">
                    de {signature.ville}
                  </span>
                </div>
                
                {signature.commentaire && (
                  <div className="mt-2 p-3 bg-emerald-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-emerald-700 text-sm italic">
                      "{signature.commentaire}"
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-emerald-500 ml-4 flex-shrink-0">
                {formatRelativeTime(signature.date_signature || signature.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {maxItems && signatures.length > maxItems && (
        <div className="mt-4 pt-4 border-t border-emerald-200 text-center">
          <p className="text-emerald-600 text-sm">
            Et {signatures.length - maxItems} autres signataires...
          </p>
        </div>
      )}
    </div>
  )
}