interface SignatureCounterProps {
  count: number
  isLoading?: boolean
}

export function SignatureCounter({ count, isLoading = false }: SignatureCounterProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-lg shadow-lg p-6 text-center text-white">
      <h2 className="text-lg font-semibold mb-2">Nombre de signatures</h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        </div>
      ) : (
        <div className="text-4xl font-bold text-yellow-400 mb-2">
          {formatNumber(count)}
        </div>
      )}
      
      <p className="text-emerald-100 text-sm">
        {count === 0 ? 'Soyez le premier à signer' : 
         count === 1 ? 'Gabonais a signé cette pétition' :
         'Gabonais ont signé cette pétition'}
      </p>
      
      <div className="mt-4 bg-emerald-600 bg-opacity-50 rounded-full p-2">
        <p className="text-xs font-medium text-yellow-200">
          Ensemble pour la dignité du Gabon
        </p>
      </div>
    </div>
  )
}