import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uhgreapajpnfyqjujnin.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoZ3JlYXBhanBuZnlxanVqbmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzQ2MjYsImV4cCI6MjA3MjAxMDYyNn0.xJPW3TYPAhpKoNzjPQrTZXncmB063qixbpN4oJGilVw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types pour la table signatures
export interface Signature {
  id: string
  nom: string
  prenom: string
  email: string
  ville: string
  commentaire?: string
  date_signature: string
  created_at: string
}

// Fonctions utilitaires pour les signatures
export const signatureService = {
  // Ajouter une nouvelle signature
  async addSignature(signatureData: Omit<Signature, 'id' | 'date_signature' | 'created_at'>) {
    const { data, error } = await supabase
      .from('signatures')
      .insert([signatureData])
      .select()
      .maybeSingle()
    
    if (error) throw error
    return data
  },

  // Récupérer toutes les signatures
  async getSignatures() {
    const { data, error } = await supabase
      .from('signatures')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Compter le nombre total de signatures
  async getSignatureCount() {
    const { count, error } = await supabase
      .from('signatures')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return count || 0
  },

  // Récupérer les signatures avec pagination
  async getSignaturesPaginated(page: number = 0, limit: number = 50) {
    const { data, error } = await supabase
      .from('signatures')
      .select('nom, prenom, ville, commentaire, date_signature')
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1)
    
    if (error) throw error
    return data || []
  }
}