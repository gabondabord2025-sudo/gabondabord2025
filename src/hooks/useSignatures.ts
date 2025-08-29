import { useState, useEffect } from 'react'
import { signatureService, Signature } from '@/lib/supabase'

export function useSignatures() {
  const [signatures, setSignatures] = useState<Signature[]>([])
  const [signatureCount, setSignatureCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les signatures et le compteur
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [signaturesData, count] = await Promise.all([
        signatureService.getSignaturesPaginated(0, 100),
        signatureService.getSignatureCount()
      ])
      
      setSignatures(signaturesData as Signature[])
      setSignatureCount(count)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Ajouter une nouvelle signature
  const addSignature = async (signatureData: Omit<Signature, 'id' | 'date_signature' | 'created_at'>) => {
    try {
      const newSignature = await signatureService.addSignature(signatureData)
      if (newSignature) {
        // Rafraîchir les données après ajout
        await fetchData()
        return newSignature
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de la signature')
    }
  }

  return {
    signatures,
    signatureCount,
    isLoading,
    error,
    addSignature,
    refreshData: fetchData
  }
}