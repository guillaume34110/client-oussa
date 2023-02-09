import React, { useState } from 'react'
import './MentionsLegales.css'

export default function MentionsLegales() {
    const [showMention , setShowMention] = useState<boolean>(false)
  
  
  return (<>
  <div className = "mention-link"onClick={() => setShowMention(!showMention)}>Mention légales</div>
  {showMention &&  <div className = "mention-popup">
    <div className = "mention-close" onClick={() => setShowMention(!showMention)}> X </div>
 <h1>Mention légales</h1>
    <div>Propriétaire et éditeur du site:
    Romain Pongérard
    
    Adresse :
    
    Adresse email : 
    
    Hébergement du site web: 
    
    Ce site web est hébergé par [nom de l'hébergeur] situé à [adresse de l'hébergeur].
    
    Conformité à la loi: 
    
    Ce site web est soumis aux lois françaises et à la législation européenne applicable. 
    
    Protection des données personnelles: 
    
    Nous nous engageons à protéger la confidentialité des informations que vous nous fournissez. Nous utilisons des mesures de sécurité pour protéger vos données contre toute manipulation, perte, destruction ou accès non autorisé. 
    
    Droit d'auteur: 
    
    Tous les contenus présents sur ce site sont la propriété de leur propriétaire respectif et sont protégés par les lois internationales sur le droit d'auteur et les traités internationaux. 
    
    Responsabilité: 
    
    Nous ne sommes pas responsables des erreurs, inexactitudes ou omissions concernant les informations contenues sur ce site web. Nous ne sommes pas responsables des dommages directs, indirects ou consécutifs causés par l'utilisation de ce site web ou des informations contenues sur ce site web. 
    
    Liens vers d'autres sites web: 
    
    Ce site web peut contenir des liens vers d'autres sites web. Nous ne sommes pas responsables de l'exactitude des informations contenues sur ces sites web. Nous ne sommes pas responsables des dommages directs, indirects ou consécutifs causés par l'utilisation de ces sites web ou des informations contenues sur ces sites web. 
    
    Modifications du site web: 
    
    Nous nous réservons le droit de modifier ce site web et ces mentions légales à tout moment, sans préavis. 
    
    Contact: 
    
    Si vous avez des questions ou des commentaires concernant ces mentions légales, veuillez nous contacter à l'adresse email suivante : [votre adresse email].</div>
    </div>
}
    </>
  )
}
