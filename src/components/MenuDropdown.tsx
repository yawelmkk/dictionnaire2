import React, { useEffect, useRef } from 'react';
import { Info, Shield, Mail } from 'lucide-react';

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAbout = () => {
    alert(`À propos du Dictionnaire Nzébi

Le dictionnaire Nzébi-français est une application conçue pour préserver, valoriser et transmettre la langue et le patrimoine culturel de l'ethnie Nzébi du Gabon et du Congo.

Elle permet à tout utilisateur de découvrir des mots en langue nzébi, leur traduction en français, et dans certains cas, leur prononciation audio, afin d'en faciliter l'apprentissage et la mémorisation.

Ce projet s'inscrit dans une démarche de sauvegarde des langues gabonaises minoritaires, souvent menacées de disparition à cause de l'exode rural, de la domination du français, et du vieillissement des locuteurs natifs.

Origine des données linguistiques
Les données de ce dictionnaire proviennent d'un travail existant, réalisé par: Luc de NADAILLAC, sous la forme d'un PDF librement accessible en ligne.
Ce dictionnaire numérique ne prétend en aucun cas s'approprier ce travail. Au contraire, il vise à le valoriser, le diffuser et le rendre plus accessible, notamment aux jeunes générations.

Nous reconnaissons et respectons la propriété intellectuelle de l'auteur initial, et l'application ne saurait exister sans sa contribution précieuse.

Qui sont les Nzébi ?
Les Nzébi (ou Ndzébi, parfois écrit Njebi) sont un peuple bantou du Gabon et du Congo-Brazzaville. Au Gabon, ils sont principalement présents dans le sud-est du pays.

Localisation
Ils sont installés dans la province du Haut-Ogooué (notamment autour de Franceville, Moanda, Bongoville) et aussi dans le sud de la Ngounié (Mbigou, Mandji, Lébamba, inounoushyabola, makongonio, Mouila).

Le territoire nzébi se situe entre forêts équatoriales, plateaux sablonneux et zones minières, en bordure du fleuve Ogooué et de ses affluents.

Population
Leur population est estimée entre 50 000 et 70 000 personnes au Gabon, bien que beaucoup aient migré vers les villes comme Libreville ou Port-Gentil. Certains groupes Nzébi sont également présents au Congo-Brazzaville.

Histoire, culture et langue
Les Nzébi descendent de peuples bantous migrants, venus des rives du fleuve Congo.

Ils sont réputés pour leur culture spirituelle riche, leurs rituels d'initiation (Bwiti, Mwiri, etc.), leurs masques traditionnels et leur oralité poétique.

Leur langue, le nzébi, fait partie du groupe B.50 des langues bantoues, avec une grammaire complexe fondée sur les classes nominales et un système de tons.

Cependant, cette langue est aujourd'hui en danger, menacée par la prédominance du français dans l'enseignement, les médias et la vie sociale. C'est pourquoi cette application souhaite contribuer, à son échelle, à la préservation de ce patrimoine linguistique précieux.

En utilisant cette application, vous participez activement à la transmission de la langue nzébi.
Merci de votre engagement et de votre curiosité.

Merci d'utiliser cette application et de soutenir la mission de Langue Nzébi Officiel.
En diffusant et en pratiquant la langue nzébi, vous aidez à faire vivre un patrimoine culturel précieux.`);
    onClose();
  };

  const handlePrivacy = () => {
    alert(`Politique de Confidentialité du Dictionnaire Nzébi

1. Introduction
L'application Dictionnaire Nzébi (« nous », « notre », « nos ») est une application mobile conçue pour fournir une ressource linguistique sur la langue inzèbi. Votre vie privée est de la plus haute importance.

La présente politique de confidentialité vise à vous informer de la manière dont nous traitons vos données.

2. Absence de Collecte de Données Personnelles
Le Dictionnaire Nzébi est conçu pour fonctionner sans collecter, stocker, transmettre ou traiter aucune donnée personnelle de ses utilisateurs.

Nous ne demandons ni n'enregistrons votre nom, votre adresse e-mail, votre localisation, vos identifiants d'appareil ou toute autre information permettant de vous identifier.

L'application ne nécessite pas de connexion à un compte utilisateur.

Toutes les recherches de mots et les fonctionnalités (comme les favoris ou l'historique) sont stockées localement sur votre propre appareil et ne sont jamais transmises à nos serveurs ou à des tiers.

3. Données Non-Personnelles
Nous n'utilisons aucun outil d'analyse tiers ni aucun service de suivi qui pourrait collecter des informations sur la manière dont vous utilisez l'application.

Si, à l'avenir, nous décidions d'intégrer des outils d'analyse pour améliorer l'application (par exemple, pour savoir quelles fonctionnalités sont les plus utilisées), nous veillerons à ce que ces données soient :

Anonymes et agrégées (ne permettant pas d'identifier un utilisateur individuel).

Et nous mettrons à jour cette politique en conséquence.

4. Services Tiers
L'application est autonome et ne partage pas vos données avec des services tiers, des annonceurs ou des partenaires.

Si l'application est disponible via une boutique (comme l'App Store d'Apple ou le Google Play Store), leurs politiques de confidentialité respectives régissent les données qu'ils pourraient collecter au moment du téléchargement.

5. Sécurité
Puisque nous ne collectons aucune donnée personnelle, le risque de fuite de données personnelles est nul. La sécurité de vos données est assurée par le fait même qu'elles ne quittent jamais votre appareil.

6. Contact
Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante :

languenzebiofficiel@gmail.com`);
    onClose();
  };

  const handleContact = () => {
    window.location.href = 'mailto:languenzebiofficiel@gmail.com?subject=Contact%20-%20Dictionnaire%20Nzébi&body=Bonjour,%0D%0A%0D%0AJe%20vous%20contacte%20concernant%20le%20dictionnaire%20Nzébi.%0D%0A%0D%0ACordialement,';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
    >
      <button
        onClick={handleAbout}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
      >
        <Info className="w-4 h-4" />
        À propos de
      </button>
      
      <button
        onClick={handlePrivacy}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
      >
        <Shield className="w-4 h-4" />
        Confidentialité
      </button>
      
      <button
        onClick={handleContact}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
      >
        <Mail className="w-4 h-4" />
        Contactez-nous
      </button>
    </div>
  );
}