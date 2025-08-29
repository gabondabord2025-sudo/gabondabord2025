import { useState, useEffect } from 'react'
import { Logo } from '@/components/Logo'
import { SignatureForm } from '@/components/SignatureForm'
import { SignatureCounter } from '@/components/SignatureCounter'
import { SignatureList } from '@/components/SignatureList'
import { SocialShare } from '@/components/SocialShare'
import { useSignatures } from '@/hooks/useSignatures'
import { PETITION_CONTENT } from '@/data/petitionContent'

function App() {
  const { signatureCount, isLoading, refreshData } = useSignatures()
  const [showFullPetition, setShowFullPetition] = useState(false)

  const handleSignatureAdded = () => {
    refreshData()
  }

  const scrollToSignature = () => {
    document.getElementById('signature-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
      {/* Header avec fond blanc et logo agrandi */}
      <header className="bg-white shadow-lg border-b-4 border-emerald-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            {/* Logo principal agrandi */}
            <Logo size="xlarge" variant="with-subtitle" className="mb-6" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {PETITION_CONTENT.title}
          </h1>
          
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-emerald-100 text-lg leading-relaxed whitespace-pre-line">
              {PETITION_CONTENT.introduction}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToSignature}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-emerald-900 font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              SIGNER MAINTENANT
            </button>
            
            <button
              onClick={() => setShowFullPetition(!showFullPetition)}
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-emerald-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
            >
              {showFullPetition ? 'MASQUER LE TEXTE' : 'LIRE LE TEXTE COMPLET'}
            </button>
          </div>
        </div>
      </section>

      {/* Citations Section */}
      <section className="bg-gradient-to-r from-yellow-100 to-emerald-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Citation Principale */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-600">
              <blockquote className="text-emerald-800 text-lg font-medium italic mb-3">
                "{PETITION_CONTENT.citations.principale.texte}"
              </blockquote>
              <cite className="text-emerald-600 font-semibold">
                — {PETITION_CONTENT.citations.principale.auteur}
              </cite>
            </div>
            
            {/* Citation Anti-Passivité */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
              <blockquote className="text-emerald-800 text-lg font-medium italic mb-3">
                "{PETITION_CONTENT.citations.antiPassivite.texte}"
              </blockquote>
              <cite className="text-emerald-600 font-semibold">
                — {PETITION_CONTENT.citations.antiPassivite.auteur}
              </cite>
            </div>
          </div>
          
          {/* Citation Africaine Centrée */}
          <div className="mt-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-lg shadow-lg p-6 text-white text-center">
              <blockquote className="text-yellow-100 text-xl font-medium italic mb-4">
                "{PETITION_CONTENT.citations.africaine.texte}"
              </blockquote>
              <cite className="text-yellow-300 font-bold text-lg">
                — {PETITION_CONTENT.citations.africaine.auteur}
                <br />
                <span className="text-yellow-200 text-sm font-normal italic">
                  {PETITION_CONTENT.citations.africaine.source}
                </span>
              </cite>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Signature Counter */}
        <div className="mb-8">
          <SignatureCounter count={signatureCount} isLoading={isLoading} />
        </div>

        {/* Bandeau avec image identité */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-100 to-yellow-100 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-emerald-800 mb-2">
                Justice et Identité Culturelle Gabonaise
              </h3>
              <p className="text-emerald-700">
                Notre pétition s'appuie sur les valeurs fondamentales de justice et de respect 
                de l'identité culturelle gabonaise. Ensemble, défendons notre dignité nationale.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="/images/Image_3.jpeg" 
                alt="Justice et Identité Culturelle" 
                className="w-32 h-32 object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Full Petition Content */}
        {showFullPetition && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-lg border border-emerald-200 p-6 md:p-8">
              <div className="prose prose-emerald max-w-none">
                {/* Les faits */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                    {PETITION_CONTENT.facts.title}
                  </h2>
                  {PETITION_CONTENT.facts.items.map((fact, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                        {fact.title}
                      </h3>
                      <p className="text-emerald-600 leading-relaxed">
                        {fact.content}
                      </p>
                    </div>
                  ))}
                </section>

                {/* Notre réponse */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                    {PETITION_CONTENT.response.title}
                  </h2>
                  {PETITION_CONTENT.response.content.map((paragraph, index) => (
                    <p key={index} className="text-emerald-600 leading-relaxed mb-4 font-medium">
                      {paragraph}
                    </p>
                  ))}
                  <ul className="list-disc list-inside text-emerald-600 space-y-2 ml-4">
                    {PETITION_CONTENT.response.actions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </section>

                {/* Nos exigences */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                    {PETITION_CONTENT.demands.title}
                  </h2>
                  <ul className="list-disc list-inside text-emerald-600 space-y-3 ml-4">
                    {PETITION_CONTENT.demands.items.map((demand, index) => (
                      <li key={index} className="leading-relaxed">{demand}</li>
                    ))}
                  </ul>
                </section>

                {/* Notre message */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                    {PETITION_CONTENT.message.title}
                  </h2>
                  {PETITION_CONTENT.message.content.map((paragraph, index) => (
                    <p key={index} className="text-emerald-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </section>

                {/* Hashtags */}
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <p className="text-emerald-700 font-semibold mb-2">Hashtags :</p>
                  <p className="text-emerald-600 font-mono text-lg">
                    {PETITION_CONTENT.hashtags.join(' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de signature avec image intégrée */}
          <div id="signature-form" className="relative">
            {/* Image décorative près du formulaire */}
            <div className="absolute -top-6 -right-6 hidden lg:block z-10">
              <div className="bg-white rounded-full p-3 shadow-lg border-4 border-yellow-400">
                <img 
                  src="/images/Image_5.jpeg" 
                  alt="Symbole Gabon d'abord" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <SignatureForm onSignatureAdded={handleSignatureAdded} />
          </div>

          {/* Partage social */}
          <div>
            <SocialShare />
          </div>
        </div>

        {/* Liste des signataires */}
        <div className="mt-8">
          <SignatureList maxItems={10} />
        </div>
      </div>

      {/* Section Chiffres Clés */}
      <section className="bg-gradient-to-r from-red-50 via-white to-red-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-6">
              CHIFFRES CLÉS SUR L'IMMIGRATION
            </h2>
            <div className="w-32 h-1 bg-red-600 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Première image - Classement Afrique */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-red-200">
              <img 
                src="/images/Image_20.png" 
                alt="Classement des pays africains par taux d'immigration" 
                className="w-full h-auto rounded-lg mb-6 shadow-md"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-800 mb-3">
                  🥇 LE GABON : N°1 EN AFRIQUE
                </h3>
                <p className="text-red-700 text-lg leading-relaxed">
                  <strong>18,72% d'immigrants</strong> - Le taux le plus élevé d'Afrique ! 
                  Près d'1 personne sur 5 au Gabon est immigrante, dépassant largement 
                  tous les autres pays africains.
                </p>
              </div>
            </div>

            {/* Deuxième image - Carte des flux */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-red-200">
              <img 
                src="/images/Image_19.png" 
                alt="Flux migratoires vers le Gabon depuis les pays voisins" 
                className="w-full h-auto rounded-lg mb-6 shadow-md"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-800 mb-3">
                  📊 FLUX MIGRATOIRES VERS LE GABON
                </h3>
                <p className="text-red-700 text-lg leading-relaxed">
                  Le <strong>Cameroun (20%)</strong> et le <strong>Bénin</strong> figurent parmi 
                  les principaux pays d'origine des migrants au Gabon, montrant l'ampleur 
                  de notre générosité d'accueil.
                </p>
              </div>
            </div>
          </div>

          {/* Message ironique */}
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-xl shadow-2xl p-8 text-white">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">
                  ⚖️ LA VÉRITÉ DES CHIFFRES
                </h3>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-red-100">
                  <strong className="text-yellow-300">Voici le pays que vous (Certains Africains et Panafricanistes) avez osé traiter de xénophobes</strong>, 
                  recevant le <strong>plus grand taux de migrants d'Afrique et du monde</strong>, par rapport au seuil de sa population. 
                  Et ceux qui ont décidés de piétiner notre souveraineté par une cabale calomnieuse à l'égard de notre chère et majestueuse patrie le GABON, 
                  font parties de ceux qui comptent le <strong>plus grand nombre de migrants dans notre Pays</strong> et cela est <strong className="text-yellow-300">INACCEPTABLE !</strong>
                </p>
                
                <div className="bg-red-700 rounded-lg p-6 border-l-4 border-yellow-400">
                  <p className="text-yellow-100 font-semibold">
                    Le peuple GABONAIS réclame <strong className="text-yellow-300">JUSTICE</strong> avec l'entrée en VIGUEUR DE <strong>LOIS FORTES ET PROHIBITIVES</strong> 
                    à l'égard de ce mépris sans commune mesure, de ces peuples que nous avons toujours considérés, nous, Gabonais au GABON & ailleurs, 
                    comme des peuples Africains frères. Le <strong className="text-yellow-300">GABON est souverain</strong> et doit prendre ses responsabilités, 
                    il en va de notre honneur.
                  </p>
                </div>
                
                <p className="text-center text-yellow-200 text-xl font-bold italic">
                  Le peuple GABONAIS ne sera plus jamais passif et regarde attentivement vers ses autorités 
                  tout en lançant un <strong className="text-yellow-300">Boycott de dignité nationale</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer avec devise, contacts et message Gabondabord */}
      <footer className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            {/* Devise du Gabon */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                UNION - TRAVAIL - JUSTICE
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center mb-8">
              <div className="mb-6 md:mb-0 md:mr-8">
                <Logo size="medium" className="" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-emerald-200 mb-3 text-lg">
                  Pour la dignité et la souveraineté du Gabon
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-yellow-400">
                  {PETITION_CONTENT.hashtags.map((hashtag, index) => (
                    <span key={index} className="font-semibold">{hashtag}</span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Message Gabondabord */}
            <div className="bg-emerald-700 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
              <p className="text-yellow-100 text-lg leading-relaxed italic">
                "Gabondabord, c'est toi, c'est moi, c'est vous, c'est nous. Unis dans la concorde comme un seul Homme, 
                pour défendre notre Majestueux Gabon. Défendre les intérêts de la nation par le peuple et pour le peuple. 
                Nous n'avons pas choisi d'être Gabonais, nous avons juste eu de la chance."
              </p>
            </div>
            
            {/* Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-emerald-200">GitHub : Gabondabord2025</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-emerald-200">Email : Gabondabord2025@gmail.com</span>
              </div>
            </div>
            
            {/* Image finale */}
            <div className="mb-6">
              <img 
                src="/images/Image_3.png" 
                alt="Logo final Gabon d'abord" 
                className="w-24 h-24 object-contain mx-auto opacity-80"
              />
            </div>
            
            <div className="pt-6 border-t border-emerald-700">
              <p className="text-emerald-300 text-sm">
                &copy; 2025 Gabon d'abord - Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App