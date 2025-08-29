import { useState } from 'react'
import { useSignatures } from '@/hooks/useSignatures'

interface SignatureFormData {
  nom: string
  prenom: string
  email: string
  ville: string
  commentaire: string
  anonyme: boolean
}

interface SignatureFormProps {
  onSignatureAdded: () => void
}

export function SignatureForm({ onSignatureAdded }: SignatureFormProps) {
  const { addSignature } = useSignatures()
  const [formData, setFormData] = useState<SignatureFormData>({
    nom: '',
    prenom: '',
    email: '',
    ville: '',
    commentaire: '',
    anonyme: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom || !formData.prenom || !formData.email || !formData.ville) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Validation simple de l'émail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      
      await addSignature({
        nom: formData.anonyme ? 'Anonyme' : formData.nom.trim(),
        prenom: formData.anonyme ? '' : formData.prenom.trim(),
        email: formData.email.trim().toLowerCase(),
        ville: formData.anonyme ? 'Non spécifié' : formData.ville.trim(),
        commentaire: formData.commentaire.trim() || undefined
      })
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        ville: '',
        commentaire: '',
        anonyme: false
      })
      
      setShowSuccess(true)
      onSignatureAdded()
      
      // Masquer le message de succès après 5 secondes
      setTimeout(() => setShowSuccess(false), 5000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de votre signature')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-emerald-200 p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-emerald-800 mb-6 text-center">
        Signer la pétition
      </h3>
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-semibold">✓ Votre signature a été ajoutée avec succès !</p>
          <p className="text-sm mt-1">Merci de votre soutien pour la dignité du Gabon.</p>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">⚠ Erreur</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-emerald-700 mb-2">
              Prénom *
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
              placeholder="Votre prénom"
            />
          </div>
          
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-emerald-700 mb-2">
              Nom *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
              placeholder="Votre nom de famille"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-emerald-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
            placeholder="votre.email@exemple.com"
          />
        </div>
        
        <div>
          <label htmlFor="ville" className="block text-sm font-medium text-emerald-700 mb-2">
            Ville *
          </label>
          <input
            type="text"
            id="ville"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
            placeholder="Votre ville de résidence"
          />
        </div>
        
        <div>
          <label htmlFor="commentaire" className="block text-sm font-medium text-emerald-700 mb-2">
            Commentaire (optionnel)
          </label>
          <textarea
            id="commentaire"
            name="commentaire"
            value={formData.commentaire}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors resize-vertical"
            placeholder="Partagez votre message de soutien (optionnel)"
          />
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="anonyme"
              checked={formData.anonyme}
              onChange={handleChange}
              className="h-4 w-4 text-emerald-600 focus:ring-yellow-400 border-emerald-300 rounded"
            />
            <span className="ml-3 text-sm font-medium text-emerald-700">
              Signer de manière anonyme
            </span>
          </label>
          <p className="text-xs text-emerald-600 mt-1 ml-7">
            Si vous cochez cette case, votre nom, prénom et ville n'apparaîtront pas publiquement. Seul votre email sera conservé pour éviter les doublons.
          </p>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Ajout en cours...
              </div>
            ) : (
              'SIGNER LA PÉTITION'
            )}
          </button>
        </div>
      </form>
      
      <p className="text-xs text-emerald-600 mt-4 text-center">
        * Champs obligatoires. Vos informations personnelles ne seront utilisées que dans le cadre de cette pétition.
      </p>
    </div>
  )
}