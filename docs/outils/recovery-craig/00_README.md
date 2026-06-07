# Documentation produit et technique — outil web de rétablissement en ligne

**Date :** 2026-06-06  
**Langue :** français  
**Objet :** spécifications détaillées pour créer un outil web permettant d’utiliser en ligne deux guides de Craig Lewis orientés rétablissement en santé mentale, soutien par les pairs, trauma, écriture réflexive, feuilles de travail et plans d’action personnels.

## 1. Résumé exécutif

Le projet consiste à transformer un ensemble de guides structurés en chapitres, réflexions, notes et feuilles de travail en une application web sécurisée, accessible, utilisable seul·e ou en groupe, et adaptée à des personnes pouvant vivre avec de la souffrance psychique, des traumatismes, de l’anxiété, de la dépression, des pensées extrêmes, des difficultés de régulation émotionnelle ou un parcours de rétablissement.

L’application proposée n’est pas conçue comme un substitut à un professionnel de santé. Elle doit être présentée comme un **outil d’accompagnement, d’écriture personnelle, d’auto-réflexion et de soutien par les pairs**. Les fonctionnalités de diagnostic, de traitement médical automatisé, de prédiction clinique ou de décision thérapeutique doivent rester explicitement hors périmètre, sauf décision juridique et réglementaire spécifique avec qualification éventuelle de dispositif médical logiciel.

## 2. Livrables contenus dans ce dossier

| Fichier | Rôle |
|---|---|
| `00_README.md` | Vue d’ensemble du projet, hypothèses, périmètre, principes de conformité et architecture documentaire. |
| `01_analyse_outil_et_contenu.md` | Analyse fonctionnelle du contenu source, structure pédagogique, taxonomie, modules, règles d’éditorialisation. |
| `02_specifications_fonctionnelles.md` | Cahier des charges fonctionnel complet : rôles, parcours, écrans, exigences, critères d’acceptation. |
| `03_specifications_techniques_architecture.md` | Architecture cible, stack recommandée, services applicatifs, déploiement, observabilité, performances. |
| `04_modele_donnees_api.md` | Modèle de données, schémas JSON, endpoints REST, extraits OpenAPI, règles de validation. |
| `05_securite_conformite_ethique.md` | RGPD, données de santé, HDS, sécurité, accessibilité, IA optionnelle, droits d’auteur, crise et éthique. |
| `06_roadmap_tests_exploitation.md` | Roadmap MVP → production, stratégie de tests, exploitation, monitoring, gouvernance de contenu. |

## 3. Sources internes utilisées

Deux fichiers sources ont été fournis :

1. `betterdays.md` — traduction française du guide **Le Guide de Craig Lewis pour Survivre à l’Impossible**, Better Days Recovery Press, première édition 2021.
2. `survivre_a_limpossible.md` — traduction française de **Un jour nouveau : Guide pour le rétablissement en santé mentale**, troisième édition, 2016.

Les documents sources contiennent des mentions de droits d’auteur. Le second document autorise explicitement la reproduction de feuilles de travail à des fins personnelles ou pour distribution aux membres d’un groupe de soutien, mais indique qu’une autorisation préalable est requise pour d’autres formes d’utilisation, de copie ou d’intégration dans un autre document. Le premier document comporte une mention plus stricte de tous droits réservés et d’interdiction de copie/distribution sans citation ou autorisation. La mise en ligne publique d’un outil contenant le texte intégral, les exercices originaux ou des extraits substantiels doit donc être précédée d’une **revue juridique et d’une autorisation écrite du titulaire des droits**.

## 4. Hypothèses de conception

### 4.1 Hypothèses produit

- L’outil aide l’utilisateur à choisir un thème, lire une introduction courte, répondre à des questions réflexives, sauvegarder ses notes, revenir sur ses réponses et construire un plan personnel de rétablissement.
- Le contenu peut être utilisé en autonomie ou dans un groupe animé par un pair aidant, un travailleur social, une association, un professionnel de santé ou un facilitateur formé.
- L’expérience doit être non culpabilisante : aucune mécanique de “streak” punitive, aucun scoring pathologisant, aucune classification de personne en “cas à risque” visible par défaut.
- Les contenus sensibles doivent pouvoir être masqués, sauvegardés localement, exportés ou supprimés à tout moment.
- La confidentialité est centrale : les entrées de journal, réponses de feuilles de travail, plans personnels et contacts de soutien peuvent révéler des données relatives à la santé mentale.

### 4.2 Hypothèses techniques

- Application web responsive, mobile-first, accessible depuis navigateur.
- Backend API sécurisé, hébergement européen, chiffrement fort.
- Base relationnelle PostgreSQL pour données transactionnelles.
- Stockage objet chiffré pour exports ou pièces jointes éventuelles.
- Notifications optionnelles par e-mail, SMS ou push, désactivables.
- Fonctionnement possible en mode anonyme/local pour réduire la collecte de données.
- IA générative optionnelle seulement en module séparé, avec garde-fous, consentement explicite et interdiction de diagnostic.

### 4.3 Hypothèses réglementaires

- En France, un service stockant des données personnelles relatives à la santé mentale doit être analysé comme traitant des données sensibles, avec obligations RGPD renforcées.
- Si l’outil est présenté comme un simple cahier d’exercices numérique, sans finalité médicale de diagnostic, prévention personnalisée, traitement ou décision thérapeutique, le risque de qualification en dispositif médical est réduit mais doit être confirmé par conseil juridique.
- Si l’outil analyse les réponses pour formuler des recommandations personnalisées de nature clinique, oriente automatiquement la prise en charge, détecte un risque suicidaire ou prétend traiter un trouble, une analyse MDR/AI Act devient nécessaire.

## 5. Vision produit

### Nom de travail

**Better Days Online — Cahier de rétablissement numérique**

### Proposition de valeur

Permettre à une personne en parcours de rétablissement de :

- accéder à des modules courts et rassurants ;
- écrire sans jugement ;
- organiser ses moyens d’adaptation ;
- préparer un plan de rétablissement ;
- retrouver des ressources en cas de crise ;
- partager volontairement certains éléments avec une personne de confiance ou un groupe ;
- conserver la maîtrise de ses données et de son rythme.

### Positionnement

L’outil doit être présenté comme :

- un cahier numérique ;
- un support de pair-aidance ;
- un espace personnel de réflexion ;
- un support d’atelier ;
- un compagnon de planification personnelle.

Il ne doit pas être présenté comme :

- une thérapie automatisée ;
- un dispositif de diagnostic ;
- un outil d’évaluation clinique autonome ;
- une alternative aux urgences ;
- un outil de surveillance des personnes vulnérables sans consentement explicite.

## 6. Principes directeurs

1. **Sécurité psychologique** : l’utilisateur peut arrêter, masquer, reprendre, ignorer une question, choisir un module moins intense.
2. **Contrôle utilisateur** : suppression, export, consentement granulaire, partage volontaire.
3. **Confidentialité par défaut** : collecte minimale, chiffrement, pas de journalisation du contenu sensible.
4. **Accessibilité** : objectif WCAG 2.2 niveau AA au minimum.
5. **Trauma-informed design** : langage doux, absence de surprise, avertissements contextuels, pas d’interface agressive.
6. **Pair-aidance** : parcours de groupe possible mais jamais imposé.
7. **Légalité éditoriale** : intégration du contenu original uniquement avec droit écrit.
8. **Extensibilité** : modèle de contenu générique pour ajouter des modules, langues, versions, guides, groupes.

## 7. Vue d’ensemble des fonctionnalités cibles

### MVP obligatoire

- Catalogue de modules.
- Page module avec résumé, objectifs et avertissement de contenu sensible.
- Moteur de feuilles de travail avec questions, champs texte, brouillons et sauvegarde.
- Journal personnel libre.
- Plan de rétablissement personnel.
- Liste de moyens d’adaptation.
- Page d’aide immédiate et ressources de crise configurables par pays.
- Export PDF/Markdown des réponses personnelles.
- Compte utilisateur, mode invité/local et suppression des données.
- Back-office de contenu avec import de modules sous licence.

### Version 1.1

- Groupes privés animés par facilitateur.
- Partage sélectif d’une réponse ou d’un plan avec une personne de confiance.
- Suivi d’objectifs personnels non compétitif.
- Rappels doux.
- Tags personnels.
- Tableau de bord de progression non médical.
- Multilingue.

### Version 1.2+

- Application mobile/PWA offline.
- IA de reformulation et de soutien rédactionnel, désactivée par défaut.
- Analyse de sécurité non clinique pour afficher des ressources de crise lorsque l’utilisateur exprime une détresse aiguë.
- Intégrations calendriers, exports chiffrés, bibliothèques associatives.

## 8. Périmètre exclu du MVP

- Diagnostic psychiatrique.
- Score clinique automatisé.
- Détection suicidaire invisible à l’utilisateur ou non consentie.
- Recommandation médicamenteuse.
- Messagerie ouverte non modérée entre utilisateurs vulnérables.
- Réseau social public.
- Publicité ciblée.
- Revente de données.
- Entraînement de modèles IA sur les réponses utilisateurs.

## 9. Références externes à vérifier au lancement

Les documents techniques font référence aux cadres suivants :

- W3C — WCAG 2.2, recommandation W3C, accessibilité web.
- OWASP — ASVS 5.0.0, contrôle de sécurité applicative.
- OWASP — Top 10 for LLM Applications 2025, si l’option IA est activée.
- CNIL — RGPD appliqué au secteur de la santé ; formalités pour traitements de données de santé ; guide de sécurité des données personnelles.
- Agence du numérique en santé — certification HDS et liste des hébergeurs certifiés.
- Commission européenne — AI Act, calendrier d’application et obligations GPAI.
- Commission européenne / MDCG — qualification et classification des logiciels dispositifs médicaux.
- 3114 — numéro national français de prévention du suicide, pour la configuration France des ressources d’urgence.

## 10. Décisions structurantes à prendre avant développement

| Décision | Options | Recommandation initiale |
|---|---|---|
| Licence de contenu | Autorisation écrite, contenu paraphrasé, contenu BYO, contenu minimal | Obtenir autorisation écrite avant tout texte original substantiel. |
| Données utilisateur | Local-only, compte cloud, compte cloud HDS | MVP : compte cloud HDS ou local-only, selon périmètre réel. |
| Public cible | Grand public, associations, pros, groupes de pairs | Commencer par grand public + groupes privés. |
| IA | Sans IA, IA rédactionnelle, IA conversationnelle | MVP sans IA ; IA plus tard, séparée et consentie. |
| Qualification médicale | Bien-être / support, dispositif médical logiciel | Rester support non médical, sans claims cliniques. |
| Hébergement | Cloud standard EU, HDS, on-premise | HDS recommandé si stockage cloud de données de santé mentale. |
| Authentification | Mot de passe, magic link, OIDC, WebAuthn | Magic link + MFA optionnelle + WebAuthn. |
| Données de groupe | Partage volontaire, notes facilitateur, analytics | Partage volontaire uniquement, analytics agrégées et anonymisées. |

## 11. Structure recommandée du dépôt projet

```text
better-days-online/
  apps/
    web/                      # Next.js ou autre frontend
    api/                      # API backend
    worker/                   # jobs asynchrones
  packages/
    content-schema/           # schémas JSON de contenu
    ui/                       # design system accessible
    shared/                   # types TypeScript partagés
  infra/
    terraform/
    k8s/
    docker-compose.yml
  docs/
    product/
    architecture/
    security/
    legal/
  scripts/
    import-content.ts
    export-user-data.ts
  tests/
    e2e/
    security/
    accessibility/
```

## 12. Statut de cette documentation

Cette documentation est une base de conception détaillée. Elle n’est pas un avis juridique, médical ou réglementaire. Avant mise en ligne publique, il faut valider :

- droits de reproduction et d’adaptation des contenus ;
- qualification juridique de l’application ;
- base légale RGPD et éventuelle AIPD ;
- hébergement HDS si applicable ;
- protocole de crise ;
- conformité accessibilité ;
- sécurité applicative ;
- politique de conservation/suppression ;
- mentions légales et conditions d’utilisation.
