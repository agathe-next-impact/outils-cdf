---
titre: "Spécifications fonctionnelles et techniques — Outil web de rédaction, partage et consultation de Mon Plan de Crise"
version: "1.0"
date: "2026-06-06"
langue: "fr-FR"
statut: "Document de cadrage technique"
source_principale: "PDF fourni : b0247984-5006-4feb-b16b-c4025fb1b5d9.pdf — Mon Plan de Crise"
---

# Spécifications fonctionnelles et techniques — Outil web de rédaction, partage et consultation de Mon Plan de Crise

## 1. Objet du document

Ce document décrit de manière exhaustive un outil web permettant de créer, compléter, mettre à jour, valider, partager, consulter et exporter en ligne un document personnel intitulé **Mon Plan de Crise**, ci-après nommé **Plan de crise**, **MPC** ou **plan**.

L'objectif est de fournir aux équipes produit, design, développement, sécurité, conformité, hébergement, support, exploitation et gouvernance clinique un cahier des charges suffisamment complet pour concevoir, développer, déployer, maintenir et auditer une solution web destinée à soutenir l'anticipation des crises psychiques, psychiatriques ou psychosociales.

Le document couvre :

- la description du formulaire source et de son usage attendu ;
- les exigences fonctionnelles ;
- les règles métier ;
- l'expérience utilisateur pour la personne concernée, les proches, les personnes ressources, la personne de confiance et les professionnels ;
- les fonctions de rédaction, d'accompagnement, de révision, de signature, de partage et de consultation en situation de crise ;
- l'architecture applicative ;
- le modèle de données ;
- les API ;
- les schémas JSON ;
- l'interopérabilité avec des systèmes de santé ;
- la sécurité ;
- la protection des données ;
- l'accessibilité ;
- les tests, la mise en production, l'exploitation et le support.

> **Avertissement important** : le Plan de crise est un outil personnel d'anticipation, de prévention, d'expression des préférences, de soutien au rétablissement et de coordination. Il ne doit pas être présenté comme un diagnostic, une prescription, une décision médicale automatisée, une procédure d'urgence autonome ou un document juridiquement contraignant. Toute mise en ligne doit être validée par un responsable clinique, un DPO, un RSSI, un service juridique et, idéalement, des représentants des usagers.

> **Point de vigilance clinique** : le Plan de crise peut contenir des informations sensibles sur le mal-être, les déclencheurs, les signes avant-coureurs, les comportements en crise, les traitements, les lieux de soin, les personnes ressources et les décisions à éviter. Il doit donc être conçu avec une logique de minimisation, de consentement, de traçabilité et de respect de l'autonomie de la personne.

---

## 2. Résumé du formulaire source

### 2.1 Nature de l'outil

Le formulaire source est un document personnel intitulé **Mon Plan de Crise**. Il commence par les champs **Nom**, **Prénom** et **Date de naissance**, puis propose une définition de la crise et explique pourquoi rédiger ce plan.

La crise y est présentée comme un moment pendant lequel la personne ne parvient plus à gérer ses émotions. Le document précise que c'est une phase difficile, mais aussi un moment possible de recherche d'un nouvel équilibre. Le plan vise à prendre soin de soi, développer ou renforcer le pouvoir d'agir, repérer que l'on va moins bien, réagir rapidement et réduire les risques de vivre une crise ou ses dommages.

L'outil web doit donc être conçu comme :

- un **éditeur de document personnel structuré** ;
- un **outil de prévention et d'anticipation** ;
- un **support de discussion** entre la personne, ses proches, ses personnes ressources et les professionnels ;
- un **support de consultation rapide en situation de crise** ;
- un **document versionné, révisable et exportable** ;
- un **module de partage sélectif** strictement maîtrisé ;
- un **outil non scoré**, ne produisant pas de diagnostic ni d'évaluation automatisée du risque.

### 2.2 Structure générale observée

Le document source comporte 4 pages.

| Page | Rubrique principale | Fonction du contenu |
|---:|---|---|
| 1 | Identité, définition de la crise, raison d'être du plan, déclencheurs et signes avant-coureurs | Identifier la personne, expliquer l'objectif, repérer ce qui fait aller moins bien et ce qui indique un changement d'état |
| 2 | Tableau ressentis/actions/pensées, définition personnelle de la crise, ressources personnelles | Aider la personne à décrire les changements observables, préciser ce que signifie être en crise et formaliser les stratégies personnelles utiles |
| 3 | Personnes ressources, exemples d'aide, personne de confiance, attitudes favorisant le rétablissement, traitement actuel | Identifier les personnes aidantes, leurs rôles attendus, les attitudes aidantes et les informations thérapeutiques courantes |
| 4 | Traitements ou thérapies possibles en plus, type et lieu de soin, décisions à éviter, date, aide à la rédaction, signatures | Formaliser les préférences de soins, les refus/précautions, l'historique de rédaction et les signatures |

### 2.3 Sections et champs à numériser

| Code section | Libellé source | Type de saisie recommandé | Criticité |
|---|---|---|---|
| `identity` | Nom, prénom, date de naissance | Identité structurée, liée ou non à un dossier patient | très élevée |
| `crisis_definition_intro` | Qu'entend-on par « crise » ? | Texte informatif non modifiable, versionné | élevée |
| `plan_purpose` | Pourquoi ce plan ? | Texte informatif non modifiable, versionné | élevée |
| `triggers` | Les déclencheurs de mon mal-être | Texte libre guidé + liste structurée | très élevée |
| `early_warning_signs` | Les signes avant-coureurs | Texte libre guidé + liste structurée | très élevée |
| `change_observation_table` | Ce que je ressens / ce que je fais / ce que je pense | Tableau structuré extensible | très élevée |
| `personal_crisis_definition` | Ma définition de la crise | Texte long, éventuellement enrichi par l'entourage | très élevée |
| `personal_resources` | Mes ressources personnelles | Texte long + liste d'actions utiles | élevée |
| `resource_people` | Mes personnes ressources | Liste de contacts structurés avec rôle attendu | très élevée |
| `trusted_person_hint` | Personne de confiance dans le tableau | Marquage facultatif d'un contact comme personne de confiance | élevée |
| `recovery_attitudes` | Les attitudes qui favorisent mon rétablissement | Texte libre guidé | élevée |
| `current_treatment` | Mon traitement et autres thérapies — traitement actuel | Texte libre ou tableau de traitements | très élevée |
| `additional_treatments_in_crisis` | Traitements ou thérapies qui pourraient être introduits en plus | Texte libre ou tableau, à valider cliniquement | très élevée |
| `care_type_place_preferences` | Type et lieu de soin | Préférences hiérarchisées, texte libre et lieux structurés | élevée |
| `decisions_to_avoid` | Les décisions à éviter | Texte long guidé, éléments à ne pas dire/faire/proposer | très élevée |
| `drafted_on` | Plan rédigé le | Date de rédaction | élevée |
| `helped_by` | Avec l'aide de | Personne(s) ayant aidé, facultatif | moyenne |
| `person_signature` | Ma signature | Signature manuscrite numérisée ou validation électronique | élevée |
| `witness_signatures` | Signature du/des témoin(s) | Signature ou attestation facultative selon procédure | moyenne |
| `versioning` | Versions du plan | Version active, brouillon, historique | très élevée |
| `sharing` | Partage | Droits par section, contacts et professionnels | très élevée |
| `export_pdf` | Export imprimable | PDF horodaté, proche de la structure source | élevée |
| `audit_trail` | Traçabilité | Journal d'accès, modification, export, partage | très élevée |

### 2.4 Textes et consignes présents dans la source

Le document source contient notamment les consignes ou formulations suivantes, à reprendre dans l'outil avec une validation éditoriale et clinique :

- **Définition de la crise** : moment pendant lequel la personne ne parvient plus à gérer ses émotions ; phase difficile ; possibilité de rechercher un nouvel équilibre.
- **Finalité du plan** : prendre soin de soi, développer ou renforcer son pouvoir d'agir, prendre conscience que l'on peut aller moins bien, réagir rapidement, réduire les risques et savoir quoi faire.
- **Déclencheurs** : situations qui perturbent le bien-être et éléments « déclencheurs ».
- **Signes avant-coureurs** : manière dont la personne se sent et agit lorsqu'elle va moins bien.
- **Aide à l'identification** : possibilité de demander de l'aide à des personnes en qui l'on a confiance et d'utiliser un tableau distinguant ce que la personne ressent, fait et pense.
- **Définition personnelle de la crise** : ressentis, comportements et signes physiques indiquant que les choses s'aggravent.
- **Contribution de l'entourage** : possibilité de demander à l'entourage ce qu'il perçoit lorsque la personne est en crise.
- **Ressources personnelles** : forces, ressources déjà identifiées, actions ayant déjà aidé à s'apaiser ou aller mieux.
- **Personnes ressources** : personnes considérées comme ressources et actions attendues d'elles avant ou pendant la crise.
- **Personne de confiance** : invitation à vérifier si la personne de confiance apparaît dans le tableau et à demander une information professionnelle sur ce rôle.
- **Attitudes qui favorisent le rétablissement** : attitudes et mots aidant la personne à se sentir mieux et en sécurité.
- **Traitement actuel et thérapies** : traitement en cours et traitements/thérapies qui pourraient être introduits en plus en cas de crise, à discuter avec le médecin traitant et/ou le psychiatre.
- **Type et lieu de soin** : préférences, lieux, équipes, types d'accompagnement, ordre de préférence.
- **Décisions à éviter** : propositions, décisions, paroles, actions, personnes, traitements ou thérapies que la personne ne souhaite pas en période de crise.
- **Validation** : date de rédaction, personne ayant aidé, signature de la personne et signature du/des témoin(s).

### 2.5 Principes de transformation du papier vers le web

La numérisation ne doit pas simplement reproduire la mise en page papier. Elle doit :

1. préserver le sens de chaque rubrique ;
2. transformer les zones de réponse en champs utilisables, sauvegardables et exportables ;
3. permettre une rédaction progressive, avec brouillon ;
4. proposer des aides contextuelles sans imposer de réponse ;
5. distinguer ce qui vient de la personne, de l'entourage et des professionnels ;
6. permettre la mise à jour et l'historisation ;
7. préserver l'autonomie et la confidentialité de la personne ;
8. permettre un partage sélectif par section ;
9. rendre les informations critiques rapidement accessibles en situation de crise ;
10. produire un export PDF lisible et imprimable ;
11. éviter toute interprétation automatisée, tout score, toute prédiction de crise ou toute décision automatique ;
12. accompagner les professionnels sans remplacer le jugement clinique ;
13. prendre en compte les difficultés cognitives, émotionnelles ou attentionnelles possibles pendant la rédaction.

---

## 3. Objectifs produit

### 3.1 Objectif général

Mettre à disposition un outil web sécurisé, accessible et simple d'utilisation permettant à une personne de rédiger son Plan de crise, de l'actualiser, de le partager avec les personnes et professionnels de son choix, et d'en permettre la consultation contrôlée lorsque cela est utile à son accompagnement ou à la prévention d'une crise.

### 3.2 Objectifs détaillés

1. **Numériser le formulaire Plan de crise** sans modifier l'intention des rubriques.
2. **Aider la personne à identifier ses déclencheurs** et signes avant-coureurs.
3. **Structurer ce qui change** lorsque la personne va moins bien : ressentis, actions, pensées.
4. **Formaliser une définition personnelle de la crise** plutôt qu'une définition clinique imposée.
5. **Valoriser les ressources personnelles** déjà efficaces.
6. **Identifier les personnes ressources**, leurs coordonnées et les actions attendues.
7. **Repérer la personne de confiance** lorsqu'elle est mentionnée parmi les personnes ressources.
8. **Documenter les attitudes, mots et comportements aidants**.
9. **Documenter le traitement actuel** et les thérapies ou traitements potentiellement utiles en période de crise.
10. **Documenter les préférences de type et lieu de soin**, y compris les équipes ou lieux préférés.
11. **Documenter les décisions, propositions, personnes, paroles ou traitements à éviter**.
12. **Permettre une rédaction autonome ou accompagnée**, avec mention facultative de l'aide reçue.
13. **Gérer les brouillons, versions actives, versions archivées et révisions**.
14. **Exporter un PDF proche de la structure papier**, utilisable en entretien ou imprimable.
15. **Permettre une consultation rapide en mode crise**, avec affichage prioritaire des informations utiles.
16. **Protéger les données de santé et les données de tiers**.
17. **Tracer les accès, modifications, exports, partages et consultations en mode crise**.
18. **Faciliter l'accessibilité** pour des personnes ayant des difficultés cognitives, visuelles, motrices, psychiques ou linguistiques.
19. **Permettre l'intégration au dossier patient** ou au système d'information de santé lorsque l'organisation le souhaite.
20. **Préserver le pouvoir d'agir** de la personne : aucun professionnel ne doit pouvoir valider ou modifier le plan à sa place sans procédure explicite et tracée.

### 3.3 Non-objectifs

L'outil ne doit pas :

- établir un diagnostic psychiatrique ;
- prédire une crise ;
- produire un score de risque clinique ;
- remplacer l'évaluation clinique ;
- remplacer les urgences ;
- déclencher automatiquement une intervention sans protocole et consentement explicites ;
- imposer automatiquement un traitement ou un lieu de soin ;
- transformer les préférences en prescriptions médicales ;
- se substituer aux Directives Anticipées en Psychiatrie si l'organisation utilise aussi ce type de document ;
- confondre personne de confiance, personne ressource et témoin ;
- masquer les limites juridiques du document ;
- envoyer des informations sensibles aux proches sans partage explicite ;
- utiliser l'intelligence artificielle pour interpréter, résumer, prioriser ou réécrire le plan sans analyse clinique, juridique, éthique et RGPD spécifique ;
- utiliser le contenu pour discriminer, sanctionner, trier administrativement ou restreindre l'accès aux soins.

### 3.4 Indicateurs de succès

| Indicateur | Cible MVP | Méthode de mesure |
|---|---:|---|
| Taux de plans complétés jusqu'à validation | ≥ 70 % des plans commencés | Suivi d'événements applicatifs pseudonymisés |
| Taux de plans avec au moins une personne ressource | ≥ 80 % des plans validés | Analyse de complétude, sans lecture du contenu libre |
| Taux de révision annuelle | ≥ 60 % des plans actifs | Horodatages de versions |
| Temps médian de création accompagnée | À mesurer en pilote | Horodatages début/fin, sans pression utilisateur |
| Temps d'accès en mode crise | < 30 secondes après authentification/habilitation | Monitoring technique et tests métier |
| Taux d'exports PDF réussis | ≥ 99 % | Logs d'export |
| Conformité accessibilité | Cible définie par l'organisation | Audit RGAA/WCAG |
| Taux d'incidents de confidentialité | 0 incident majeur | Suivi RSSI/DPO |

---

## 4. Périmètre fonctionnel

### 4.1 Utilisateurs cibles

| Profil | Description | Besoins principaux |
|---|---|---|
| Personne concernée | Personne rédigeant son Plan de crise | Comprendre, rédiger, modifier, valider, signer, choisir avec qui partager |
| Personne ressource | Proche, aidant, pair, membre de la famille ou professionnel identifié par la personne | Connaître les actions attendues, être contactable si la personne l'a autorisé |
| Personne de confiance | Personne désignée dans le cadre légal applicable, pouvant apparaître dans le tableau des personnes ressources | Être identifiée distinctement, comprendre son rôle, accéder aux informations autorisées |
| Témoin | Personne qui signe ou atteste la rédaction selon le contexte | Signer ou être mentionnée, sans droits automatiques |
| Professionnel référent | Professionnel accompagnant la rédaction ou la révision | Aider sans se substituer, relire, proposer des améliorations, consulter selon droits |
| Professionnel de crise ou d'urgence | Professionnel ayant besoin d'informations rapides | Accéder aux sections critiques dans un cadre habilité et tracé |
| Coordinateur de parcours | Professionnel organisant la continuité de l'accompagnement | Suivre les statuts, relancer, aider à la mise à jour |
| Administrateur fonctionnel | Gestionnaire de structure | Paramétrer les modèles, libellés, équipes, droits, relances |
| Administrateur technique | Exploitant ou DevOps | Superviser, sauvegarder, restaurer, diagnostiquer |
| DPO / Référent conformité | Responsable protection des données | Contrôler finalités, droits, durées, information, AIPD, sous-traitance |
| RSSI | Responsable sécurité | Définir exigences de sécurité, habilitations, réponse incident |
| Juriste | Référent juridique | Valider textes, portée, signatures, mentions, partage, responsabilités |
| Représentant des usagers | Partie prenante qualité/éthique | Relire le vocabulaire, l'expérience et le respect de l'autonomie |

### 4.2 Parcours principaux

#### 4.2.1 Parcours personne concernée — création autonome

1. La personne reçoit un lien d'accès sécurisé ou se connecte à son espace.
2. Elle accède à une page d'accueil présentant le rôle du Plan de crise, les limites du document, les personnes susceptibles d'y accéder, les possibilités d'aide et les informations de confidentialité.
3. Elle complète les rubriques dans l'ordre proposé ou via une navigation libre.
4. Elle enregistre un brouillon à tout moment.
5. Elle relit le document complet.
6. Elle confirme que le contenu correspond à ce qu'elle souhaite actuellement.
7. Elle signe ou valide la version selon la politique retenue.
8. Elle choisit les personnes et professionnels avec qui partager le document.
9. Elle peut exporter une copie PDF et programmer un rappel de révision.

#### 4.2.2 Parcours personne concernée — rédaction accompagnée

1. Un professionnel, un pair aidant, un proche ou une personne ressource accompagne la personne.
2. Le système rappelle que la personne concernée reste l'autrice fonctionnelle du plan.
3. L'aidant peut saisir sous dictée ou aider à reformuler, selon droits.
4. Le système enregistre la mention « avec l'aide de » si la personne le souhaite.
5. Les champs sensibles restent modifiables par la personne jusqu'à validation.
6. Avant validation, une lecture complète est proposée.
7. La personne confirme ou corrige le contenu.
8. La version validée conserve la trace de l'aide à la rédaction, sans attribuer la propriété du contenu à l'aidant.

#### 4.2.3 Parcours personne ressource — information et partage

1. La personne concernée ajoute une personne ressource : nom, lien, téléphone, action attendue.
2. Elle choisit si la personne ressource peut être informée de son rôle.
3. Si oui, le système envoie une invitation ou une notification minimale, sans révéler tout le plan par défaut.
4. La personne ressource confirme ou met à jour ses coordonnées, selon paramétrage.
5. L'accès aux sections du plan est accordé explicitement et peut être retiré à tout moment.
6. Les accès sont journalisés.

#### 4.2.4 Parcours personne de confiance

1. La personne concernée peut marquer une personne ressource comme **personne de confiance**.
2. Le système affiche une information distincte sur ce rôle et ses implications.
3. Si l'organisation souhaite gérer la désignation complète, un module dédié peut recueillir l'acceptation et la cosignature.
4. Le Plan de crise ne doit pas faire croire qu'une simple mention dans le tableau suffit à toutes les exigences juridiques d'une désignation formelle si celles-ci s'appliquent.
5. La personne de confiance peut avoir des droits de consultation renforcés, décidés par la personne concernée et par la politique de l'organisation.

#### 4.2.5 Parcours professionnel — consultation courante

1. Le professionnel recherche la personne dans son périmètre d'habilitation.
2. Il voit le statut du plan : brouillon, actif, à réviser, archivé, révoqué.
3. Il accède aux sections autorisées.
4. Il peut proposer une révision ou ajouter une note professionnelle séparée.
5. Il ne peut pas modifier le texte de la personne sans validation explicite.
6. Tout accès est journalisé.

#### 4.2.6 Parcours professionnel — consultation en situation de crise

1. Le professionnel accède à un **mode crise**.
2. Le mode affiche en priorité l'identité, les personnes ressources, la personne de confiance si indiquée, les déclencheurs, signes avant-coureurs, ressources, traitements, préférences de soins et décisions à éviter.
3. Si l'accès dépasse les droits ordinaires, un mécanisme de **bris de glace** impose un motif, un horodatage et une journalisation renforcée.
4. Le système peut notifier a posteriori la personne concernée ou le référent, selon paramétrage.
5. Le système rappelle que le plan guide l'accompagnement mais ne remplace pas l'évaluation clinique, le consentement actuel ni le cadre légal applicable.

#### 4.2.7 Parcours administrateur

1. Paramétrer les structures, équipes et rôles.
2. Configurer les libellés et aides contextuelles.
3. Définir la politique de partage, d'export, de signature, de relance et d'archivage.
4. Consulter les journaux d'audit selon habilitation.
5. Gérer les modèles de plan et leur versionnement.
6. Superviser les incidents et demandes de droits.

---

## 5. Exigences fonctionnelles détaillées

### 5.1 Gestion du modèle Plan de crise

Le système doit gérer un modèle de Plan de crise versionné.

Exigences :

- chaque modèle possède un identifiant stable, par exemple `crisis_plan_fr_v1` ;
- chaque rubrique possède un identifiant technique stable ;
- les libellés, aides, exemples, contraintes et types de champ sont stockés dans une configuration versionnée ;
- toute modification du modèle crée une nouvelle version ;
- les plans déjà validés restent liés à la version de modèle utilisée lors de leur validation ;
- les exports doivent afficher la version du modèle et la version du plan ;
- les administrateurs fonctionnels peuvent prévisualiser un modèle avant activation ;
- les modifications de libellés ne doivent pas modifier rétroactivement le sens des plans déjà signés ou validés.

### 5.2 Gestion des plans individuels

Statuts recommandés :

| Statut | Description | Modifiable | Consultable |
|---|---|---:|---:|
| `draft` | Brouillon non validé | oui | uniquement auteur et aidants autorisés |
| `pending_review` | Brouillon prêt pour relecture | oui | auteur + relecteurs autorisés |
| `active` | Version validée actuellement applicable | non directement ; nouvelle version requise | selon droits |
| `needs_revision` | Version active mais ancienne ou signalée à réviser | nouvelle version | selon droits |
| `revoked` | Version retirée par la personne | non | accès restreint, audit/conservation selon politique |
| `archived` | Version remplacée | non | professionnels autorisés selon besoin |

Règles :

- une personne ne devrait avoir qu'un seul Plan de crise actif dans un périmètre donné ;
- toute modification d'un plan actif crée une nouvelle version brouillon ;
- la validation de la nouvelle version archive l'ancienne ;
- la révocation doit être simple, mais précédée d'une confirmation explicite.

### 5.3 Identité et métadonnées

Champs source :

- Nom ;
- Prénom ;
- Date de naissance.

Champs numériques recommandés :

| Champ | Type | Obligatoire | Règles |
|---|---|---:|---|
| `last_name` | chaîne | selon contexte | Peut être importé du dossier patient, non forcément modifiable |
| `first_name` | chaîne | selon contexte | Peut être importé du dossier patient |
| `birth_date` | date | selon contexte | Format ISO `YYYY-MM-DD`, affichage localisé |
| `preferred_name` | chaîne | non | Nom d'usage ou prénom choisi |
| `patient_identifier` | UUID ou identifiant SI | oui en contexte professionnel | Ne doit pas être imprimé si non utile |
| `created_at` | horodatage | oui | Généré par le système |
| `updated_at` | horodatage | oui | Généré par le système |
| `validated_at` | horodatage | conditionnel | Renseigné lors de la validation |

### 5.4 Définition de la crise et finalité du plan

Le document source commence par une explication de la crise et de l'utilité du plan. L'interface doit reprendre cette fonction pédagogique.

Exigences :

- afficher un texte introductif avant la première saisie ;
- permettre une version simplifiée en langage clair ;
- proposer un bouton « lire plus » ou « masquer l'introduction » ;
- rappeler que la personne peut passer une rubrique et revenir plus tard ;
- ne pas déclencher de questionnaire clinique ou de score ;
- ne pas utiliser de vocabulaire culpabilisant ;
- afficher un lien ou une mention vers les ressources d'urgence de l'organisation si nécessaire.

### 5.5 Déclencheurs de mon mal-être

Rubrique source : **Les déclencheurs de mon mal-être**.

Question source : **Qu'est-ce qui fait que je vais moins bien ?**

Exigences fonctionnelles :

- champ texte long ;
- option d'ajout sous forme de liste ;
- possibilité de réordonner les déclencheurs ;
- possibilité d'ajouter une catégorie facultative ;
- possibilité d'indiquer un niveau de sensibilité facultatif ;
- possibilité de marquer un déclencheur comme privé et non visible dans certains partages ;
- aucune analyse automatique de dangerosité ;
- possibilité d'exporter les déclencheurs en mode liste ou texte.

Exemple de structure :

| Champ | Type | Description |
|---|---|---|
| `trigger_id` | UUID | Identifiant stable |
| `label` | texte | Description du déclencheur |
| `category` | enum facultatif | Type de déclencheur |
| `notes` | texte | Précisions |
| `visibility` | enum | `full_plan`, `crisis_mode`, `private` |
| `order_index` | entier | Ordre d'affichage |

### 5.6 Signes avant-coureurs

Rubrique source : **Les signes avant-coureurs**.

Question source : **Qu'est-ce qui m'indique que je vais moins bien ?**

Exigences :

- permettre un champ texte libre ;
- permettre une liste structurée ;
- distinguer facultativement les dimensions : ressenti, comportement, pensée, signe physique, relation aux autres, sommeil, alimentation, activité, autre ;
- permettre de relier un signe à un déclencheur ;
- permettre de relier un signe à une action utile ;
- afficher ces signes en priorité dans le mode crise ;
- permettre une formulation personnelle, même non médicale ;
- empêcher les libellés automatiques stigmatisants.

### 5.7 Tableau « Ce que je ressens / Ce que je fais / Ce que je pense »

La page 2 propose un tableau d'aide à l'identification de ce qui change lorsque la personne commence à aller moins bien.

Colonnes source :

- **Ce que je ressens** ;
- **Ce que je fais** ;
- **Ce que je pense**.

Exigences :

- proposer un tableau éditable avec au moins quatre lignes par défaut ;
- permettre d'ajouter, supprimer et réordonner les lignes ;
- permettre des champs multilignes ;
- afficher une aide contextuelle indiquant que ce tableau peut être rempli avec une personne de confiance ou une personne ressource ;
- permettre l'export tabulaire dans le PDF ;
- éviter toute catégorisation imposée si la personne préfère écrire en texte libre ;
- permettre de basculer entre mode tableau et mode cartes accessibles.

### 5.8 Définition personnelle de la crise

Rubrique source : **Ma définition de la crise**.

Question source : **Quand plus rien ne va, que se passe-t-il pour moi ?**

Exigences :

- champ texte long, autosauvegardé ;
- sous-sections facultatives : ressentis, comportements, signes physiques, ce que les autres observent ;
- possibilité d'indiquer une contribution de l'entourage, distincte du texte de la personne ;
- possibilité de masquer les contributions de tiers dans certains exports ;
- affichage prioritaire en mode crise ;
- absence de vocabulaire pathologisant généré automatiquement.

### 5.9 Ressources personnelles

Rubrique source : **Mes ressources personnelles**.

Question source : **Qu'est-ce que je peux faire pour gérer ou éviter la crise ?**

Exigences :

- champ texte long ;
- liste d'actions utiles ;
- possibilité de marquer certaines actions comme « avant la crise », « pendant la crise » ou « après la crise » ;
- possibilité d'ajouter des conditions de faisabilité : seul, avec quelqu'un, à domicile, dehors, nécessite transport, nécessite téléphone, autre ;
- possibilité d'ajouter des ressources matérielles ou environnementales ;
- possibilité d'ajouter des liens vers documents ou ressources internes ;
- pas de recommandation automatique d'action thérapeutique sans validation clinique.

### 5.10 Personnes ressources

Rubrique source : **Mes personnes ressources**.

Colonnes source :

- Personne ressource ;
- Lien avec moi ;
- Numéro de téléphone ;
- Ce que j'attends d'elle.

Exigences :

- liste structurée de contacts ;
- au moins trois lignes proposées par défaut ;
- nombre illimité de contacts si possible ;
- validation du format téléphone sans bloquer les numéros internationaux ;
- champ libre pour le lien : ami, parent, pair, voisin, professionnel, médecin traitant, CMP, autre ;
- champ libre « ce que j'attends d'elle » ;
- consentement de la personne concernée avant notification de la personne ressource ;
- possibilité d'indiquer les moments d'appel : avant crise, pendant crise, après crise, seulement avec accord, uniquement professionnel, jamais la nuit ;
- possibilité de masquer certains contacts dans l'export public ;
- journalisation des consultations des coordonnées.

### 5.11 Personne de confiance

Le support source demande de vérifier si la personne de confiance apparaît dans le tableau des personnes ressources et mentionne la possibilité de demander à un professionnel de santé des informations sur ce rôle.

Exigences :

- permettre de cocher qu'une personne ressource est aussi la personne de confiance ;
- distinguer clairement cette indication d'une procédure complète de désignation si l'organisation la gère ailleurs ;
- afficher une aide contextuelle sur le rôle de la personne de confiance ;
- permettre de saisir une date de désignation, une date d'acceptation et une preuve si la procédure le nécessite ;
- permettre à la personne de modifier ou retirer cette mention ;
- ne pas attribuer automatiquement des droits d'accès à une personne de confiance sans décision de partage ;
- prévoir un contrôle juridique avant activation d'une signature ou cosignature numérique liée à ce rôle.

### 5.12 Attitudes qui favorisent mon rétablissement

Rubrique source : **Les attitudes qui favorisent mon rétablissement**.

Question source : **Comment les autres peuvent se comporter pour m'aider à me sentir mieux ?**

Exigences :

- champ texte long ;
- liste optionnelle d'attitudes aidantes ;
- possibilité de distinguer : mots à dire, mots à éviter, gestes utiles, distance souhaitée, présence silencieuse, aide pratique, environnement calme, contact physique accepté/refusé ;
- affichage prioritaire en mode crise ;
- export visible dans une rubrique dédiée ;
- possibilité de créer une version courte pour les personnes ressources.

### 5.13 Traitement actuel et autres thérapies

Question source : **Quel est mon traitement actuel ?**

Exigences :

- proposer un champ texte libre par défaut ;
- proposer un tableau structuré en option : traitement/thérapie, posologie, prescripteur, indication personnelle, remarques ;
- afficher un avertissement : ne pas modifier un traitement sans avis médical ;
- distinguer traitements médicamenteux, psychothérapies, prises en charge, outils de soutien, soins somatiques associés ;
- permettre l'import depuis un dossier patient uniquement avec gouvernance et validation ;
- afficher la date de dernière mise à jour ;
- indiquer si l'information est déclarative ou issue d'un système tiers ;
- ne pas transformer le plan en ordonnance.

### 5.14 Traitements ou thérapies qui pourraient être introduits en plus

Question source : **En cas de crise, quel(s) traitement(s) ou thérapie(s) pourraient être introduits en plus ?**

Exigences :

- champ texte libre ;
- tableau optionnel : traitement/thérapie, déjà utilisé, effet observé, conditions, professionnel à contacter, remarques ;
- statut de validation clinique : non relu, à discuter, discuté, validé par professionnel, obsolète ;
- avertissement affiché dans le PDF : « information déclarative à vérifier avec un professionnel de santé » ;
- pas de proposition automatique de médicaments ou thérapies ;
- pas de dosage calculé automatiquement ;
- toute intégration avec des données de prescription doit être séparée et validée.

### 5.15 Type et lieu de soin

Question source : **Si mon état nécessite un accompagnement spécifique ou une hospitalisation, quelles sont mes préférences (lieu, équipe) ?**

Exigences :

- permettre une liste hiérarchisée ;
- champs recommandés : type de soin, lieu, équipe, adresse, téléphone, préférence, remarques ;
- possibilité de distinguer : préféré, acceptable, à éviter, refusé si possible, inconnu ;
- possibilité d'ajouter des raisons personnelles ;
- possibilité d'indiquer un ordre de préférence ;
- rappeler que les préférences dépendent des disponibilités, du cadre légal, du consentement actuel et de l'évaluation clinique ;
- ne pas garantir l'accès à un lieu ;
- afficher les lieux dans le PDF de manière claire.

### 5.16 Décisions à éviter

Rubrique source : **Les décisions à éviter**.

Question source : **Quelles sont les propositions que je ne veux plus qu'on me fasse, les décisions que je ne veux pas ou plus qu'on prenne quand je vais mal ?**

Exigences :

- champ texte long ;
- liste optionnelle de décisions, paroles, actions, personnes ou traitements à éviter ;
- champs : type, description, raison facultative, contexte, visibilité ;
- affichage très visible en mode crise ;
- rappel que ces éléments sont des préférences et doivent être articulés avec l'évaluation clinique et le cadre légal ;
- possibilité de masquer certaines informations dans les partages à des proches ;
- relecture professionnelle recommandée lorsque des traitements ou décisions de soin sont mentionnés.

### 5.17 Date, aide à la rédaction et signatures

Éléments source :

- Plan rédigé le ;
- Avec l'aide de ;
- Ma signature ;
- Signature du/des témoin(s).

Exigences :

- date de rédaction préremplie mais modifiable selon droits ;
- champ facultatif « avec l'aide de » ;
- signature électronique simple, signature avancée ou validation par case à cocher selon politique ;
- signature manuscrite numérisée uniquement si conforme à la politique de sécurité ;
- signature des témoins facultative selon procédure ;
- horodatage systématique ;
- conservation de la preuve de validation ;
- impossibilité de modifier une version signée sans créer une nouvelle version ;
- PDF signé ou cachet serveur si nécessaire ;
- mécanisme de révocation ou remplacement.

### 5.18 Export PDF et impression

Exigences :

- export complet ;
- export court « mode crise » ;
- export pour personne ressource, limité aux informations partagées ;
- export professionnel, selon habilitation ;
- affichage de la version, date d'export, date de validation ;
- filigrane optionnel : brouillon, actif, archivé, révoqué ;
- pagination claire ;
- tableaux lisibles ;
- respect des retours à la ligne ;
- options gros caractères ;
- PDF accessible autant que possible : titres, ordre de lecture, balises, texte sélectionnable ;
- avertissement sur la confidentialité du document imprimé.

### 5.19 Recherche et consultation

Exigences :

- recherche par patient/personne uniquement pour les professionnels habilités ;
- aucune recherche globale dans les champs libres par défaut, sauf besoin clinique validé ;
- filtres : statut, date de dernière validation, à réviser, sans personne ressource, sans export récent ;
- consultation en lecture seule pour les versions validées ;
- affichage de la source des données ;
- masquage des sections non autorisées ;
- journalisation des consultations.

### 5.20 Collaboration et commentaires

Exigences :

- permettre des commentaires de relecture séparés du texte de la personne ;
- mentionner l'auteur et la date de chaque commentaire ;
- permettre à la personne d'accepter, refuser ou ignorer une suggestion ;
- distinguer les notes professionnelles du Plan de crise ;
- empêcher l'intégration silencieuse de modifications par un tiers ;
- permettre un historique des contributions ;
- supprimer ou archiver les commentaires selon politique de conservation.

### 5.21 Partage sélectif

Exigences :

- partage par personne, rôle, équipe ou lien sécurisé ;
- partage par section ;
- durée de partage limitée ;
- retrait possible à tout moment, sauf obligations légales ou archivage professionnel ;
- notification des nouveaux partages ;
- consentement explicite lorsque les proches sont concernés ;
- pas d'envoi de contenu sensible par e-mail ou SMS non sécurisé ;
- accès aux coordonnées des personnes ressources uniquement selon nécessité ;
- audit complet des accès.

---

## 6. Exigences UX et interface

### 6.1 Principes UX

L'interface doit être rassurante, non culpabilisante, progressive, autosauvegardée, utilisable sur ordinateur, tablette et mobile, claire sur les droits d'accès et compatible avec une rédaction émotionnellement difficile.

Principes rédactionnels :

- parler directement à la personne ;
- utiliser le « je » lorsque l'on reprend les rubriques du plan ;
- éviter le jargon médical ;
- préférer des phrases courtes ;
- proposer des exemples facultatifs ;
- éviter les injonctions ;
- rappeler que les champs peuvent être laissés vides et complétés plus tard.

### 6.2 Page d'accueil

Contenus recommandés :

- titre : **Mon Plan de Crise** ;
- résumé : « Ce document vous aide à repérer ce qui peut annoncer une crise, ce qui vous aide et ce que vous souhaitez que les autres sachent pour vous accompagner. » ;
- avertissement : « Ce plan ne remplace pas les urgences ni l'avis d'un professionnel. » ;
- statut du plan ;
- date de dernière modification ;
- bouton « Commencer » ou « Continuer » ;
- bouton « Voir le plan complet » ;
- bouton « Exporter » si disponible ;
- informations de confidentialité ;
- bouton d'aide.

### 6.3 Navigation

Deux modes doivent être proposés :

1. **Mode guidé** : une rubrique par écran, avec aide contextuelle.
2. **Mode document** : affichage complet proche du formulaire papier.

Navigation recommandée :

- sommaire latéral ou supérieur ;
- indicateur de progression ;
- badges : non commencé, commencé, complété, à relire ;
- bouton précédent/suivant ;
- sauvegarde visible ;
- possibilité de revenir à l'accueil ;
- accès rapide au mode crise pour les professionnels habilités.

### 6.4 Mode guidé

Chaque étape doit afficher le titre de la rubrique, la question principale, une aide optionnelle, le champ de saisie, des exemples masqués par défaut ou affichables, une action « passer cette question », un bouton « enregistrer et continuer » et un indicateur de sauvegarde.

### 6.5 Mode document

Le mode document doit conserver l'ordre du PDF source, permettre la lecture complète, les modifications inline en brouillon, l'affichage des rubriques vides, la signalisation des champs sensibles, la prévisualisation impression et l'utilisation sur tablette en entretien.

### 6.6 Mode crise

Exigences UX :

- affichage compact ;
- bouton d'appel ou copie des numéros si autorisé ;
- rubriques prioritaires en haut ;
- bannière indiquant la date de validation ;
- avertissement si le plan est ancien ;
- section « À faire » et « À éviter » très visibles ;
- pas de modification directe ;
- journalisation visible pour les professionnels ;
- option d'impression courte.

### 6.7 Champs de liste

Exigences :

- ajout/suppression de lignes ;
- réorganisation par boutons accessibles, pas seulement glisser-déposer ;
- validation légère ;
- conservation de l'ordre ;
- aide pour les numéros de téléphone ;
- possibilité d'ajouter une remarque ;
- affichage mobile en cartes.

### 6.8 Messages d'erreur

Messages recommandés :

- « Ce champ peut rester vide. Vous pourrez y revenir plus tard. »
- « Le numéro semble incomplet. Vous pouvez l'enregistrer quand même si c'est volontaire. »
- « La sauvegarde n'a pas fonctionné. Votre texte est conservé sur cet écran ; réessayez avant de fermer. »
- « Cette section contient des informations sensibles. Vérifiez les personnes avec qui vous la partagez. »

### 6.9 Ton éditorial

Ton recommandé : respectueux, orienté pouvoir d'agir, non directif, concret, soutenant et compatible avec l'entretien clinique.

### 6.10 Design system

Composants nécessaires :

- champ texte long autosauvegardé ;
- tableau éditable accessible ;
- carte contact ;
- sélecteur de visibilité ;
- indicateur de statut ;
- bannière d'avertissement ;
- panneau d'aide ;
- panneau de partage ;
- prévisualisation PDF ;
- bouton d'action critique ;
- historique de version ;
- journal d'accès consultable selon droits.

---

## 7. Accessibilité

### 7.1 Cible d'accessibilité

L'outil doit viser au minimum une conformité avec le référentiel d'accessibilité applicable à l'organisation. Pour un service public français ou assimilé, la cible doit être définie en cohérence avec le RGAA. Pour une cible internationale, les WCAG doivent être utilisées comme référence.

Exigences générales :

- navigation intégrale au clavier ;
- focus visible ;
- ordre de tabulation logique ;
- contrastes suffisants ;
- taille de texte ajustable ;
- structure de titres correcte ;
- libellés explicites ;
- messages d'erreur reliés aux champs ;
- compatibilité lecteurs d'écran ;
- pas d'information uniquement par couleur ;
- délais ajustables ;
- absence de composants qui piègent le focus.

### 7.2 Exigences spécifiques au Plan de crise

- Prévoir des écrans courts pour réduire la charge cognitive.
- Permettre de sauvegarder sans terminer.
- Proposer une version « facile à lire » des aides.
- Éviter les animations inutiles.
- Prévoir un bouton « faire une pause ».
- Ne pas effacer un texte long en cas d'erreur réseau.
- Permettre l'impression en gros caractères.
- Permettre la dictée vocale via fonctionnalités natives du système.
- Permettre à un professionnel d'accompagner sans prendre la main de manière invisible.

### 7.3 Formulaires accessibles

Chaque champ doit avoir un `label` visible, une description courte lorsque nécessaire, un identifiant unique, un état d'erreur accessible, une association programmatique entre erreur et champ, une indication claire des champs obligatoires si certains le sont et une aide non obligatoire.

### 7.4 Exemple de champ texte accessible

```html
<div class="field">
  <label for="triggers">Qu'est-ce qui fait que je vais moins bien ?</label>
  <p id="triggers-help">
    Vous pouvez décrire ici les situations qui perturbent votre bien-être ou les éléments déclencheurs.
  </p>
  <textarea
    id="triggers"
    name="triggers"
    aria-describedby="triggers-help triggers-save-status"
    rows="8"></textarea>
  <p id="triggers-save-status" role="status">Brouillon sauvegardé.</p>
</div>
```

### 7.5 Accessibilité du PDF

L'export PDF doit contenir du texte sélectionnable, conserver un ordre de lecture logique, afficher les titres de rubriques, éviter les tableaux trop larges, fournir une alternative en HTML imprimable lorsque le PDF balisé n'est pas disponible, éviter les images de texte et afficher les statuts et alertes sous forme textuelle.

---

## 8. Règles métier

### 8.1 Propriété fonctionnelle du document

Le Plan de crise est le document de la personne concernée. Elle doit pouvoir le consulter, créer une nouvelle version, retirer un partage, demander l'archivage ou la suppression selon le cadre légal. Les notes professionnelles doivent rester séparées du contenu personnel.

### 8.2 Consentement et information

Avant validation ou partage, l'utilisateur doit recevoir une information claire sur la finalité du plan, les personnes pouvant y accéder, les modalités de partage, les limites en cas d'urgence, les droits de retrait, les données de tiers saisies, la durée de conservation et les journaux d'accès.

### 8.3 Complétude

Le Plan de crise ne doit pas imposer toutes les réponses. Un plan incomplet peut être utile.

Règles :

- aucune rubrique narrative ne doit être obligatoirement remplie par défaut ;
- les champs d'identité peuvent être obligatoires en contexte professionnel ;
- le système peut recommander certaines rubriques : personnes ressources, ce qui aide, décisions à éviter ;
- un plan peut être validé avec des rubriques vides si la personne le souhaite ;
- les rubriques vides doivent apparaître comme vides, non comme « non applicable ».

### 8.4 Champs obligatoires proposés

Pour un MVP professionnel, les champs obligatoires minimaux peuvent être :

| Champ | Obligation recommandée | Motif |
|---|---:|---|
| Identifiant patient ou compte utilisateur | oui | rattachement sécurisé |
| Nom/prénom/date de naissance | selon contexte | identification dans l'export |
| Date de rédaction | oui | validité temporelle |
| Confirmation de validation | oui | preuve que le contenu est assumé |
| Statut de partage | oui | sécurité et confidentialité |

### 8.5 Révision périodique

Règles recommandées :

- proposer une révision tous les 6 ou 12 mois ;
- permettre une relance personnalisable ;
- afficher « plan ancien » au-delà d'une durée paramétrée ;
- ne jamais invalider automatiquement un plan sans politique explicite ;
- conserver les versions antérieures selon les règles de conservation ;
- permettre une révision après événement : hospitalisation, changement de traitement, changement de personne ressource, déménagement, demande de la personne.

### 8.6 Accès bris de glace

Le bris de glace est un mécanisme exceptionnel permettant à un professionnel habilité d'accéder au plan hors droits ordinaires lorsqu'un protocole le prévoit. Il impose un motif, une authentification forte, une limitation temporelle, une journalisation renforcée et une revue périodique.

### 8.7 Données de tiers

Le plan peut contenir les noms, liens, numéros et rôles de personnes ressources. Il faut informer la personne concernée que ces données concernent des tiers, ne pas notifier les tiers sans décision explicite, limiter les informations au nécessaire, permettre la suppression ou la mise à jour d'un contact et gérer les demandes de droits selon la politique DPO.

### 8.8 Historisation

Toute version validée doit historiser le contenu complet, l'auteur fonctionnel, l'aidant éventuel, la date de création, la date de validation, la version de modèle, le statut, les partages actifs, les exports, les révocations et les accès en mode crise.

### 8.9 Règles d'affichage des avertissements

| Contexte | Avertissement |
|---|---|
| Plan ancien | « Ce plan n'a pas été révisé depuis plus de X mois. Vérifiez avec la personne si ces informations sont toujours actuelles. » |
| Traitements | « Ces informations ne remplacent pas une prescription médicale. » |
| Lieux de soin | « Les préférences dépendent du contexte, des disponibilités, du consentement actuel et du cadre légal. » |
| Décisions à éviter | « Ces éléments expriment des préférences et doivent être articulés avec la situation clinique. » |
| Mode crise | « Consultation tracée. Utiliser uniquement les informations nécessaires à l'accompagnement. » |
| Export | « Document confidentiel. Ne pas diffuser sans accord ou habilitation. » |

---

## 9. Spécification de validation, complétude et restitution

### 9.1 Absence de score

Le Plan de crise est un document narratif et préférentiel. Il ne comporte pas de score, de seuil, de cotation ou d'interprétation automatisée.

Interdictions :

- score de risque ;
- score de complétude présenté comme score clinique ;
- niveau de crise calculé ;
- prédiction de crise ;
- priorisation automatique des personnes à contacter ;
- recommandation automatisée de traitement.

### 9.2 Indicateurs autorisés

| Indicateur | Utilité | Affichage utilisateur |
|---|---|---|
| Progression de remplissage | Aider à se repérer | oui, sous forme non clinique |
| Rubriques commencées | Navigation | oui |
| Rubriques vides | Relecture | oui |
| Plan à réviser | Fraîcheur documentaire | oui |
| Partages actifs | Confidentialité | oui |
| Nombre de personnes ressources | Aide à la vérification | oui, sans jugement |
| Accès récents | Transparence | oui selon droits |

### 9.3 Calcul de complétude proposé

La complétude ne doit pas être confondue avec une qualité clinique. Elle peut servir à guider la relecture.

```text
complétude = nombre_de_sections_avec_contenu / nombre_de_sections_recommandées
```

Affichage recommandé : « 6 rubriques sur 10 contiennent des informations », sans jugement et sans couleurs anxiogènes.

### 9.4 Statuts de restitution

| Statut | Signification | Action proposée |
|---|---|---|
| Brouillon | Le plan n'est pas validé | Continuer ou relire |
| À relire | La personne a indiqué vouloir relire | Relire avec ou sans aide |
| Validé | Le plan est actif | Partager, exporter, réviser plus tard |
| À réviser | Le plan est ancien ou signalé comme obsolète | Créer une nouvelle version |
| Archivé | Une version plus récente existe | Consulter si besoin historique |
| Révoqué | La personne a retiré le plan | Ne pas utiliser comme préférence actuelle |

### 9.5 Restitution individuelle

La restitution à la personne doit afficher le plan comme un document personnel, valoriser les ressources, éviter tout jugement sur les rubriques vides, afficher clairement les partages actifs, proposer une révision, permettre le téléchargement, l'impression et la demande d'aide.

### 9.6 Restitution professionnelle

La restitution professionnelle doit afficher les informations selon droits, distinguer contenu validé et brouillon, afficher la date de validation, signaler les rubriques critiques vides sans jugement, permettre une note professionnelle séparée et journaliser l'accès.

### 9.7 Restitution agrégée

Des indicateurs agrégés peuvent être utilisés pour piloter le service : nombre de plans actifs, plans à réviser, taux de plans avec personne ressource, taux d'exports, consultations en mode crise, accès bris de glace. Les textes libres ne doivent pas être exploités sans base légale, gouvernance et information.

---

## 10. Architecture cible

### 10.1 Vue d'ensemble

```text
[ Navigateur / Mobile ]
          |
          | HTTPS + HSTS
          v
[ Frontend Web ]  ---->  [ Service d'authentification / IAM ]
          |
          v
[ API Gateway / Backend BFF ]
          |
          +--> [ Service Plans de crise ]
          +--> [ Service Partage et droits ]
          +--> [ Service Export PDF ]
          +--> [ Service Notifications ]
          +--> [ Service Audit ]
          +--> [ Service Interopérabilité santé ]
          |
          v
[ Base PostgreSQL chiffrée ] ---- [ Stockage objets chiffré ]
          |
          v
[ Sauvegardes chiffrées / SIEM / Supervision ]
```

### 10.2 Composants

| Composant | Responsabilité |
|---|---|
| Frontend | Interface de rédaction, mode document, mode crise, partage, export |
| Backend API | Règles métier, validation, droits, workflows |
| Service modèle | Versionnement du modèle de Plan de crise |
| Service plan | Création, modification, validation, archivage |
| Service droits | RBAC/ABAC, partages, accès tiers, bris de glace |
| Service PDF | Génération de PDF complets, courts et accessibles |
| Service notifications | E-mail, SMS minimal, messagerie sécurisée, relances |
| Service audit | Journalisation immuable, exports d'audit |
| Service interopérabilité | FHIR, DPI, DMP ou connecteurs internes selon contexte |
| Base de données | Données structurées, versions, droits, journaux |
| Stockage objets | PDF générés, pièces jointes éventuelles |
| Observabilité | Logs techniques, métriques, alertes, traces |

### 10.3 Choix techniques possibles

| Couche | Option recommandée | Alternatives |
|---|---|---|
| Frontend | React + TypeScript | Vue, Angular, Svelte |
| Design system | Composants internes accessibles | DSFR si service public français |
| Backend | Node.js/NestJS ou Java/Spring Boot | .NET, Python/FastAPI |
| API | REST JSON + OpenAPI 3.1 | GraphQL pour lecture complexe, à justifier |
| Base | PostgreSQL | MariaDB, SQL Server selon SI |
| Cache | Redis pour sessions courtes | Cache applicatif local |
| Files | Stockage objet S3 compatible chiffré | Stockage HDS interne |
| Auth | OIDC/OAuth2, MFA | SAML selon SI existant |
| PDF | Génération serveur HTML-to-PDF | LaTeX, moteur documentaire interne |
| Interop | FHIR R4/R5 selon SI | HL7 v2, CDA, API propriétaire |
| Conteneurs | Docker/Kubernetes | VM durcies |
| CI/CD | GitLab CI/GitHub Actions/Azure DevOps | Jenkins |

### 10.4 Contraintes d'architecture

- chiffrement en transit obligatoire ;
- chiffrement au repos recommandé ;
- séparation des environnements ;
- secrets hors code ;
- journalisation non répudiable ;
- limitation des exports ;
- cloisonnement des tenants/structures ;
- résilience aux erreurs réseau pendant la saisie ;
- sauvegarde fréquente des brouillons ;
- compatibilité mobile ;
- absence de contenu sensible dans les logs applicatifs ;
- tests automatisés sur les règles de droits.

### 10.5 Environnements

| Environnement | Données | Accès | Usage |
|---|---|---|---|
| Local développement | données fictives | développeurs | développement |
| Intégration | données fictives | équipe projet | tests automatisés |
| Recette | données fictives ou pseudonymisées selon politique | métier + QA | validation fonctionnelle |
| Préproduction | configuration proche production | accès restreint | tests déploiement et sécurité |
| Production | données réelles | utilisateurs habilités | service réel |
| PRA/PCA | réplication chiffrée | équipe exploitation | continuité et reprise |

---

## 11. Modèle de données conceptuel

### 11.1 Entités principales

| Entité | Description |
|---|---|
| `Person` | Personne concernée ou utilisateur |
| `CrisisPlan` | Document logique du Plan de crise |
| `CrisisPlanVersion` | Version de contenu d'un plan |
| `CrisisPlanModel` | Modèle de rubriques et champs |
| `ResourcePerson` | Personne ressource associée au plan |
| `PlanSignature` | Validation ou signature |
| `ShareGrant` | Autorisation de partage |
| `ProfessionalNote` | Note professionnelle séparée |
| `PdfExport` | Export généré |
| `AuditEvent` | Événement d'audit |
| `Notification` | Notification envoyée ou planifiée |

### 11.2 Entités de droits

| Entité | Description |
|---|---|
| `UserAccount` | Compte applicatif |
| `Role` | Rôle : personne, professionnel, admin, DPO, etc. |
| `Team` | Équipe ou unité de soin |
| `Organization` | Structure ou tenant |
| `AccessPolicy` | Politique d'accès |
| `BreakGlassAccess` | Accès exceptionnel tracé |

### 11.3 Entités d'interopérabilité

| Entité | Description |
|---|---|
| `ExternalIdentifier` | Identifiants DPI/INS/local, selon règles applicables |
| `FhirMapping` | Association avec ressources FHIR |
| `DocumentReferenceLink` | Lien vers un document publié |
| `InteropExportJob` | Job d'export ou synchronisation |
| `ImportJob` | Import depuis une source autorisée |

### 11.4 Cardinalités

- une personne peut avoir plusieurs plans au cours du temps ;
- un plan possède plusieurs versions ;
- une seule version est active à un instant donné dans un périmètre ;
- une version peut contenir plusieurs personnes ressources ;
- une personne ressource peut être marquée comme personne de confiance ;
- une version peut avoir plusieurs signatures ou validations ;
- une version peut avoir plusieurs partages ;
- une version peut générer plusieurs exports PDF ;
- chaque accès produit un événement d'audit.

---

## 12. Modèle de données logique PostgreSQL

### 12.1 Table `patients`

```sql
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    external_patient_id TEXT,
    last_name TEXT,
    first_name TEXT,
    preferred_name TEXT,
    birth_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (organization_id, external_patient_id)
);
```

### 12.2 Table `crisis_plan_models`

```sql
CREATE TABLE crisis_plan_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_code TEXT NOT NULL,
    version TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'fr-FR',
    title TEXT NOT NULL,
    model_yaml JSONB NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft','active','retired')),
    activated_at TIMESTAMPTZ,
    retired_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (model_code, version, locale)
);
```

### 12.3 Table `crisis_plans`

```sql
CREATE TABLE crisis_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    organization_id UUID NOT NULL,
    current_version_id UUID,
    status TEXT NOT NULL CHECK (status IN ('draft','active','needs_revision','revoked','archived')) DEFAULT 'draft',
    created_by_user_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revoked_at TIMESTAMPTZ,
    revoke_reason TEXT
);
```

### 12.4 Table `crisis_plan_versions`

```sql
CREATE TABLE crisis_plan_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES crisis_plans(id) ON DELETE CASCADE,
    model_id UUID NOT NULL REFERENCES crisis_plan_models(id),
    version_number INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft','pending_review','active','archived','revoked')),
    content_json JSONB NOT NULL,
    completion_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    visibility_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by_user_id UUID,
    helped_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    validated_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    UNIQUE (plan_id, version_number)
);
```

### 12.5 Table `resource_people`

```sql
CREATE TABLE resource_people (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    relationship TEXT,
    phone_number TEXT,
    email TEXT,
    expected_action TEXT,
    contact_timing TEXT,
    is_trusted_person BOOLEAN NOT NULL DEFAULT FALSE,
    notification_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    access_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 12.6 Table `treatment_entries`

```sql
CREATE TABLE treatment_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id) ON DELETE CASCADE,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('current','additional_in_crisis','to_avoid')),
    name TEXT NOT NULL,
    dosage TEXT,
    usage_effect TEXT,
    prescriber TEXT,
    validation_status TEXT CHECK (validation_status IN ('declared','to_discuss','discussed','clinically_validated','obsolete')),
    remarks TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 12.7 Table `care_place_preferences`

```sql
CREATE TABLE care_place_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id) ON DELETE CASCADE,
    preference_type TEXT NOT NULL CHECK (preference_type IN ('preferred','acceptable','avoid','refused','alternative')),
    care_type TEXT,
    place_name TEXT,
    team_name TEXT,
    address TEXT,
    phone_number TEXT,
    priority INTEGER,
    remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 12.8 Table `signatures`

```sql
CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id) ON DELETE CASCADE,
    signer_type TEXT NOT NULL CHECK (signer_type IN ('person','witness','professional','trusted_person')),
    signer_name TEXT,
    signer_user_id UUID,
    signature_method TEXT NOT NULL CHECK (signature_method IN ('checkbox','typed_name','drawn','advanced_e_signature','paper_scan')),
    signature_payload_ref TEXT,
    signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_address INET,
    user_agent TEXT
);
```

### 12.9 Table `share_grants`

```sql
CREATE TABLE share_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id) ON DELETE CASCADE,
    grantee_type TEXT NOT NULL CHECK (grantee_type IN ('user','resource_person','team','organization','secure_link')),
    grantee_id UUID,
    grantee_label TEXT,
    sections TEXT[] NOT NULL,
    permissions TEXT[] NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_by_user_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 12.10 Table `break_glass_accesses`

```sql
CREATE TABLE break_glass_accesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id),
    user_id UUID NOT NULL,
    reason TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,
    reviewed_at TIMESTAMPTZ,
    reviewed_by_user_id UUID,
    review_outcome TEXT
);
```

### 12.11 Table `audit_events`

```sql
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL,
    patient_id UUID,
    plan_id UUID,
    plan_version_id UUID,
    actor_user_id UUID,
    actor_role TEXT,
    event_type TEXT NOT NULL,
    event_category TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_events_plan_version ON audit_events(plan_version_id, occurred_at DESC);
CREATE INDEX idx_audit_events_actor ON audit_events(actor_user_id, occurred_at DESC);
CREATE INDEX idx_audit_events_patient ON audit_events(patient_id, occurred_at DESC);
```

### 12.12 Table `pdf_exports`

```sql
CREATE TABLE pdf_exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_version_id UUID NOT NULL REFERENCES crisis_plan_versions(id) ON DELETE CASCADE,
    export_type TEXT NOT NULL CHECK (export_type IN ('full','crisis_short','resource_person','professional','archive')),
    file_ref TEXT NOT NULL,
    checksum_sha256 TEXT NOT NULL,
    generated_by_user_id UUID,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);
```

### 12.13 Données semi-structurées dans `content_json`

```json
{
  "identity": {
    "lastName": "",
    "firstName": "",
    "birthDate": ""
  },
  "triggers": [
    {"id": "uuid", "label": "", "category": "", "notes": "", "visibility": "full_plan"}
  ],
  "earlyWarningSigns": [
    {"id": "uuid", "label": "", "dimension": "", "linkedTriggerIds": []}
  ],
  "changeObservationTable": [
    {"id": "uuid", "feel": "", "do": "", "think": ""}
  ],
  "personalCrisisDefinition": {
    "narrative": "",
    "othersPerception": ""
  },
  "personalResources": [
    {"id": "uuid", "label": "", "timing": "before_crisis"}
  ],
  "resourcePeople": [
    {
      "id": "uuid",
      "displayName": "",
      "relationship": "",
      "phoneNumber": "",
      "expectedAction": "",
      "isTrustedPerson": false
    }
  ],
  "recoveryAttitudes": "",
  "currentTreatment": "",
  "additionalTreatmentsInCrisis": "",
  "careTypePlacePreferences": [],
  "decisionsToAvoid": "",
  "draftedOn": "",
  "helpedBy": ""
}
```

---

## 13. Source de vérité du modèle en YAML

### 13.1 Exemple de modèle

```yaml
id: crisis_plan_fr_v1
version: "1.0.0"
locale: fr-FR
title: "Mon Plan de Crise"
description: >
  Outil personnel d'anticipation permettant de décrire les déclencheurs,
  signes avant-coureurs, ressources, personnes ressources, préférences de soins
  et décisions à éviter en situation de crise.
sections:
  - id: identity
    title: "Identité"
    fields:
      - id: last_name
        type: text
        label: "Nom"
      - id: first_name
        type: text
        label: "Prénom"
      - id: birth_date
        type: date
        label: "Date de naissance"
  - id: introduction
    title: "Qu'entend-on par crise ?"
    type: information
    content: >
      La crise est un moment pour lequel on ne parvient plus à gérer les émotions.
      C'est une phase difficile que personne n'aime traverser. La crise peut être
      un moment pour rechercher un nouvel équilibre.
  - id: plan_purpose
    title: "Pourquoi ce plan ?"
    type: information
    content: >
      Prendre soin de soi et développer ou renforcer son pouvoir d'agir.
      Prendre conscience que l'on peut aller moins bien, réagir rapidement afin
      de réduire les risques de vivre une crise et ses dommages, ou savoir quoi
      faire pour la gérer.
  - id: triggers
    title: "1) Les déclencheurs de mon mal-être"
    question: "Qu'est-ce qui fait que je vais moins bien ?"
    fields:
      - id: triggers_list
        type: repeatable_text
        label: "Déclencheur"
  - id: early_warning_signs
    title: "2) Les signes avant-coureurs"
    question: "Qu'est-ce qui m'indique que je vais moins bien ?"
    fields:
      - id: signs_list
        type: repeatable_text
        label: "Signe avant-coureur"
  - id: change_observation_table
    title: "Ce qui change quand je commence à aller moins bien"
    question: "Qu'est-ce qui change pour moi quand je commence à aller moins bien ?"
    fields:
      - id: changes
        type: table
        columns:
          - id: feel
            label: "Ce que je ressens"
          - id: do
            label: "Ce que je fais"
          - id: think
            label: "Ce que je pense"
        default_rows: 4
  - id: personal_crisis_definition
    title: "3) Ma définition de la crise"
    question: "Quand plus rien ne va, que se passe-t-il pour moi ?"
    fields:
      - id: narrative
        type: textarea
        label: "Ma description"
      - id: others_perception
        type: textarea
        label: "Ce que mon entourage perçoit"
        optional: true
  - id: personal_resources
    title: "4.1 Mes ressources personnelles"
    question: "Qu'est-ce que je peux faire pour gérer ou éviter la crise ?"
    fields:
      - id: resources
        type: repeatable_text
        label: "Ressource personnelle ou action utile"
  - id: resource_people
    title: "4.2 Mes personnes ressources"
    question: "Qui peut m'aider à éviter ou gérer la crise et qu'est-ce que je veux qu'elles fassent pour moi ?"
    fields:
      - id: people
        type: table
        columns:
          - id: display_name
            label: "Personne ressource"
          - id: relationship
            label: "Lien avec moi"
          - id: phone_number
            label: "Numéro de téléphone"
          - id: expected_action
            label: "Ce que j'attends d'elle"
          - id: is_trusted_person
            label: "Personne de confiance"
            type: checkbox
  - id: recovery_attitudes
    title: "4.3 Les attitudes qui favorisent mon rétablissement"
    question: "Comment les autres peuvent se comporter pour m'aider à me sentir mieux ?"
    fields:
      - id: attitudes
        type: textarea
        label: "Attitudes, mots et comportements aidants"
  - id: current_treatment
    title: "4.4 Mon traitement et autres thérapies"
    question: "Quel est mon traitement actuel ?"
    fields:
      - id: current_treatment_text
        type: textarea
        label: "Traitement actuel"
  - id: additional_treatments_in_crisis
    title: "Traitements ou thérapies en plus en cas de crise"
    question: "En cas de crise, quel(s) traitement(s) ou thérapie(s) pourraient être introduits en plus ?"
    fields:
      - id: additional_treatments_text
        type: textarea
        label: "Traitements ou thérapies ayant déjà aidé ou à discuter"
  - id: care_type_place_preferences
    title: "4.5 Type et lieu de soin"
    question: "Si mon état nécessite un accompagnement spécifique ou une hospitalisation, quelles sont mes préférences ?"
    fields:
      - id: care_preferences
        type: repeatable_text
        label: "Préférence de soin, lieu ou équipe"
  - id: decisions_to_avoid
    title: "4.6 Les décisions à éviter"
    question: "Quelles sont les propositions ou décisions que je ne veux pas ou plus quand je vais mal ?"
    fields:
      - id: decisions_to_avoid_text
        type: textarea
        label: "Choses à éviter"
  - id: validation
    title: "Validation"
    fields:
      - id: drafted_on
        type: date
        label: "Plan rédigé le"
      - id: helped_by
        type: text
        label: "Avec l'aide de"
        optional: true
      - id: person_signature
        type: signature
        label: "Ma signature"
      - id: witness_signatures
        type: repeatable_signature
        label: "Signature du/des témoin(s)"
        optional: true
```

### 13.2 Règles de versionnement YAML

Toute modification de structure augmente la version majeure ou mineure. Toute correction de libellé sans changement de sens augmente la version patch. Les plans validés conservent la version du modèle utilisée. Les migrations doivent être explicites et testées.

### 13.3 Génération des types

Le YAML doit permettre de générer types TypeScript, schémas JSON, validations backend, formulaire frontend, export PDF, documentation utilisateur, tests de non-régression et mapping FHIR si activé.

---

## 14. API REST

### 14.1 Principes

- API REST JSON ;
- versionnement par URL ou en-tête ;
- authentification OIDC/OAuth2 ;
- autorisation centralisée ;
- idempotence sur les opérations sensibles ;
- pagination pour les listes ;
- traçabilité de toutes les opérations ;
- jamais de données sensibles dans les URLs ;
- erreurs normalisées ;
- OpenAPI 3.1 comme contrat.

### 14.2 Endpoints personne concernée

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/me/crisis-plans` | Liste des plans de la personne connectée |
| `POST` | `/api/v1/me/crisis-plans` | Créer un plan brouillon |
| `GET` | `/api/v1/me/crisis-plans/{planId}` | Lire un plan |
| `PATCH` | `/api/v1/me/crisis-plans/{planId}/draft` | Mettre à jour le brouillon |
| `POST` | `/api/v1/me/crisis-plans/{planId}/validate` | Valider une version |
| `POST` | `/api/v1/me/crisis-plans/{planId}/revoke` | Révoquer le plan actif |
| `POST` | `/api/v1/me/crisis-plans/{planId}/exports` | Générer un PDF |
| `GET` | `/api/v1/me/crisis-plans/{planId}/shares` | Lister les partages |
| `POST` | `/api/v1/me/crisis-plans/{planId}/shares` | Créer un partage |
| `DELETE` | `/api/v1/me/crisis-plans/{planId}/shares/{shareId}` | Retirer un partage |
| `GET` | `/api/v1/me/audit-events` | Consulter ses accès récents selon politique |

### 14.3 Endpoints professionnel

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/pro/patients/{patientId}/crisis-plans` | Liste des plans accessibles |
| `GET` | `/api/v1/pro/crisis-plans/{planId}` | Consultation professionnelle |
| `GET` | `/api/v1/pro/crisis-plans/{planId}/crisis-view` | Mode crise |
| `POST` | `/api/v1/pro/crisis-plans/{planId}/notes` | Ajouter une note professionnelle séparée |
| `POST` | `/api/v1/pro/crisis-plans/{planId}/review-request` | Demander une révision |
| `POST` | `/api/v1/pro/crisis-plans/{planId}/exports` | Export professionnel selon droits |

### 14.4 Endpoints personne de confiance / personnes ressources

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/resource-access/{token}` | Accès via invitation sécurisée |
| `POST` | `/api/v1/resource-access/{token}/acknowledge` | Confirmer la prise de connaissance |
| `PATCH` | `/api/v1/resource-access/{token}/contact` | Corriger ses coordonnées si autorisé |
| `GET` | `/api/v1/resource-access/{token}/plan-summary` | Lire les sections partagées |

### 14.5 Endpoints administration

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/crisis-plan-models` | Liste des modèles |
| `POST` | `/api/v1/admin/crisis-plan-models` | Créer un modèle |
| `POST` | `/api/v1/admin/crisis-plan-models/{modelId}/activate` | Activer un modèle |
| `GET` | `/api/v1/admin/audit-events` | Recherche d'audit habilitée |
| `GET` | `/api/v1/admin/statistics` | Indicateurs agrégés |
| `POST` | `/api/v1/admin/export-jobs` | Exports administratifs contrôlés |

### 14.6 Format d'erreur

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Certaines informations doivent être vérifiées.",
    "correlationId": "01HXYZ...",
    "fields": [
      {
        "path": "resourcePeople[0].phoneNumber",
        "message": "Le numéro semble incomplet."
      }
    ]
  }
}
```

---

## 15. Schémas JSON principaux

### 15.1 `CrisisPlanContent`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.org/schemas/crisis-plan-content.schema.json",
  "title": "CrisisPlanContent",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "identity": {"$ref": "#/$defs/Identity"},
    "triggers": {"type": "array", "items": {"$ref": "#/$defs/Trigger"}},
    "earlyWarningSigns": {"type": "array", "items": {"$ref": "#/$defs/EarlyWarningSign"}},
    "changeObservationTable": {"type": "array", "items": {"$ref": "#/$defs/ChangeObservation"}},
    "personalCrisisDefinition": {"$ref": "#/$defs/PersonalCrisisDefinition"},
    "personalResources": {"type": "array", "items": {"$ref": "#/$defs/PersonalResource"}},
    "resourcePeople": {"type": "array", "items": {"$ref": "#/$defs/ResourcePerson"}},
    "recoveryAttitudes": {"type": "string"},
    "currentTreatment": {"type": "string"},
    "additionalTreatmentsInCrisis": {"type": "string"},
    "careTypePlacePreferences": {"type": "array", "items": {"$ref": "#/$defs/CarePreference"}},
    "decisionsToAvoid": {"type": "string"},
    "draftedOn": {"type": "string", "format": "date"},
    "helpedBy": {"type": "string"}
  },
  "required": ["identity"],
  "$defs": {
    "Identity": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "lastName": {"type": "string"},
        "firstName": {"type": "string"},
        "birthDate": {"type": "string", "format": "date"}
      }
    },
    "Trigger": {
      "type": "object",
      "required": ["id", "label"],
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "label": {"type": "string", "minLength": 1},
        "category": {"type": "string"},
        "notes": {"type": "string"},
        "visibility": {"type": "string", "enum": ["full_plan", "crisis_mode", "private"]}
      }
    },
    "EarlyWarningSign": {
      "type": "object",
      "required": ["id", "label"],
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "label": {"type": "string"},
        "dimension": {"type": "string"},
        "linkedTriggerIds": {"type": "array", "items": {"type": "string", "format": "uuid"}}
      }
    },
    "ChangeObservation": {
      "type": "object",
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "feel": {"type": "string"},
        "do": {"type": "string"},
        "think": {"type": "string"}
      }
    },
    "PersonalCrisisDefinition": {
      "type": "object",
      "properties": {
        "narrative": {"type": "string"},
        "othersPerception": {"type": "string"}
      }
    },
    "PersonalResource": {
      "type": "object",
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "label": {"type": "string"},
        "timing": {"type": "string", "enum": ["before_crisis", "during_crisis", "after_crisis", "anytime"]}
      }
    },
    "ResourcePerson": {
      "type": "object",
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "displayName": {"type": "string"},
        "relationship": {"type": "string"},
        "phoneNumber": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "expectedAction": {"type": "string"},
        "isTrustedPerson": {"type": "boolean"}
      }
    },
    "CarePreference": {
      "type": "object",
      "properties": {
        "id": {"type": "string", "format": "uuid"},
        "preferenceType": {"type": "string", "enum": ["preferred", "acceptable", "avoid", "refused", "alternative"]},
        "careType": {"type": "string"},
        "placeName": {"type": "string"},
        "teamName": {"type": "string"},
        "priority": {"type": "integer"},
        "remarks": {"type": "string"}
      }
    }
  }
}
```

### 15.2 `ShareGrant`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ShareGrant",
  "type": "object",
  "properties": {
    "id": {"type": "string", "format": "uuid"},
    "planVersionId": {"type": "string", "format": "uuid"},
    "granteeType": {"type": "string", "enum": ["user", "resource_person", "team", "organization", "secure_link"]},
    "granteeId": {"type": "string", "format": "uuid"},
    "sections": {"type": "array", "items": {"type": "string"}},
    "permissions": {"type": "array", "items": {"type": "string", "enum": ["read", "export", "comment"]}},
    "startsAt": {"type": "string", "format": "date-time"},
    "expiresAt": {"type": "string", "format": "date-time"},
    "revokedAt": {"type": "string", "format": "date-time"}
  },
  "required": ["planVersionId", "granteeType", "sections", "permissions"]
}
```

### 15.3 `BreakGlassRequest`

```json
{
  "type": "object",
  "properties": {
    "planVersionId": {"type": "string", "format": "uuid"},
    "reason": {"type": "string", "minLength": 10},
    "requestedSections": {"type": "array", "items": {"type": "string"}},
    "durationMinutes": {"type": "integer", "minimum": 5, "maximum": 240}
  },
  "required": ["planVersionId", "reason"]
}
```

---

## 16. Extrait OpenAPI 3.1

```yaml
openapi: 3.1.0
info:
  title: Crisis Plan API
  version: 1.0.0
  description: API de gestion des Plans de crise.
servers:
  - url: https://api.example.org/api/v1
security:
  - oidc: []
paths:
  /me/crisis-plans:
    get:
      summary: Liste les Plans de crise de la personne connectée
      operationId: listMyCrisisPlans
      responses:
        "200":
          description: Liste des plans
    post:
      summary: Crée un nouveau Plan de crise brouillon
      operationId: createMyCrisisPlan
      responses:
        "201":
          description: Plan créé
  /me/crisis-plans/{planId}/draft:
    patch:
      summary: Met à jour le brouillon
      operationId: updateCrisisPlanDraft
      parameters:
        - name: planId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        "200":
          description: Brouillon mis à jour
  /me/crisis-plans/{planId}/validate:
    post:
      summary: Valide le Plan de crise
      operationId: validateCrisisPlan
      responses:
        "200":
          description: Version validée
  /pro/crisis-plans/{planId}/crisis-view:
    get:
      summary: Consulte la vue crise d'un plan
      operationId: getCrisisView
      responses:
        "200":
          description: Vue crise
components:
  securitySchemes:
    oidc:
      type: openIdConnect
      openIdConnectUrl: https://auth.example.org/.well-known/openid-configuration
```

---

## 17. Interopérabilité santé

### 17.1 Objectifs

L'interopérabilité doit permettre l'intégration au dossier patient informatisé, l'export de la version validée, la consultation par des professionnels habilités, la conservation comme document de coordination et éventuellement l'échange de sections structurées.

### 17.2 Mapping FHIR proposé

| Élément Plan de crise | Ressource FHIR possible | Remarques |
|---|---|---|
| Document complet PDF | `DocumentReference` | Publication du PDF validé |
| Données structurées du formulaire | `Questionnaire` + `QuestionnaireResponse` | Représentation formulaire/réponses |
| Plan de soutien ou objectifs | `CarePlan` | À utiliser si intégré dans un plan de soins formalisé |
| Personnes ressources | `RelatedPerson` | Données de tiers, droits spécifiques |
| Professionnels | `Practitioner` | Si rattachés à un SI santé |
| Organisation | `Organization` | Structure de soin |
| Consentements de partage | `Consent` | À adapter au cadre local |
| Historique et validation | `Provenance` | Auteur, validation, horodatage |
| Export signé | `Binary` lié à `DocumentReference` | Stockage du PDF ou référence |

### 17.3 Exemple FHIR QuestionnaireResponse simplifié

```json
{
  "resourceType": "QuestionnaireResponse",
  "status": "completed",
  "questionnaire": "Questionnaire/crisis-plan-fr-v1",
  "subject": {
    "reference": "Patient/123"
  },
  "authored": "2026-06-06T10:00:00+02:00",
  "item": [
    {
      "linkId": "triggers",
      "text": "Les déclencheurs de mon mal-être",
      "answer": [{"valueString": "Texte renseigné par la personne"}]
    },
    {
      "linkId": "early_warning_signs",
      "text": "Les signes avant-coureurs",
      "answer": [{"valueString": "Texte renseigné par la personne"}]
    },
    {
      "linkId": "decisions_to_avoid",
      "text": "Les décisions à éviter",
      "answer": [{"valueString": "Texte renseigné par la personne"}]
    }
  ]
}
```

### 17.4 Exigences d'export

- export JSON structuré ;
- export PDF ;
- export FHIR si activé ;
- traçabilité de l'export ;
- contrôle des droits avant export ;
- horodatage ;
- signature ou cachet si requis ;
- journalisation du destinataire ;
- suppression des exports temporaires.

### 17.5 Imports

Imports possibles : identité patient, coordonnées de professionnels, traitement courant si le SI et la gouvernance le permettent, lieux de soin connus, personne de confiance déjà désignée dans un système source.

---

## 18. Sécurité applicative

### 18.1 Niveau de sensibilité

Les données du Plan de crise sont hautement sensibles. Elles peuvent révéler des informations de santé mentale, des vulnérabilités, des coordonnées de proches, des préférences de soins, des situations de crise, des traitements et des décisions ou personnes à éviter.

### 18.2 Authentification

Exigences :

- OIDC/OAuth2 recommandé ;
- MFA pour professionnels et administrateurs ;
- MFA optionnel mais encouragé pour personnes concernées ;
- sessions courtes pour comptes professionnels ;
- rafraîchissement sécurisé des tokens ;
- déconnexion globale ;
- protection contre l'énumération de comptes ;
- politique de mots de passe robuste si mots de passe locaux ;
- support de fédération d'identité si SI hospitalier.

### 18.3 Autorisation

Modèle recommandé : RBAC + ABAC.

Critères ABAC : organisation, équipe, relation de soin, partage explicite, statut du plan, section demandée, contexte de consultation, urgence/bris de glace, heure et localisation technique si nécessaire.

### 18.4 Matrice de droits simplifiée

| Action | Personne | Personne ressource | Personne de confiance | Professionnel référent | Professionnel crise | Admin fonctionnel | Admin technique |
|---|---:|---:|---:|---:|---:|---:|---:|
| Créer brouillon | oui | non | non | assisté | non | non | non |
| Modifier brouillon | oui | non | selon partage commentaire | assisté/proposition | non | non | non |
| Valider | oui | non | non | non sauf procédure | non | non | non |
| Consulter plan actif | oui | sections partagées | sections partagées | selon droits | mode crise | métadonnées | non par défaut |
| Exporter | oui | si autorisé | si autorisé | selon droits | court si autorisé | rapports agrégés | non contenu |
| Partager | oui | non | non | proposer | non | paramétrer | non |
| Révoquer | oui | non | non | proposer | non | non | non |
| Bris de glace | non | non | non | selon politique | oui | audit | non contenu |
| Voir audit | oui partiel | non | non | selon droits | selon droits | oui | technique |

### 18.5 Protection des données en transit et au repos

Exigences : TLS 1.2 minimum, TLS 1.3 recommandé, HSTS, chiffrement base ou volume, chiffrement des fichiers PDF, gestion des clés via KMS/HSM si possible, rotation des clés, sauvegardes chiffrées, secrets en coffre-fort, absence de données sensibles dans les logs et purge contrôlée des fichiers temporaires.

### 18.6 Sécurité frontend

- CSP stricte ;
- protection XSS ;
- échappement systématique des champs libres ;
- aucun rendu HTML non assaini depuis les réponses utilisateur ;
- protection CSRF si cookies ;
- cookies `HttpOnly`, `Secure`, `SameSite` ;
- pas de stockage de contenu sensible en `localStorage` ;
- autosauvegarde avec chiffrement en transit ;
- avertissement avant fermeture si sauvegarde en échec.

### 18.7 Sécurité API

- validation stricte des entrées ;
- limitation de débit ;
- contrôle d'autorisation sur chaque ressource ;
- identifiants opaques UUID ;
- pas d'identifiants sensibles dans URL de partage non expirables ;
- idempotency key pour validation et export ;
- pagination et limites ;
- journalisation structurée ;
- corrélation des requêtes ;
- tests de sécurité automatisés.

### 18.8 Logs

Les logs ne doivent pas contenir le texte des rubriques libres, les traitements, les numéros de téléphone complets, les tokens, les mots de passe, les PDF ou les détails de santé non nécessaires.

### 18.9 Menaces principales

| Menace | Mesure de réduction |
|---|---|
| Accès non autorisé au plan | RBAC/ABAC, MFA, audit, tests d'autorisation |
| Partage accidentel à un proche | Confirmation, prévisualisation des sections partagées, retrait simple |
| Exposition par PDF téléchargé | Avertissements, expiration, filigrane, contrôle d'accès |
| XSS via champ libre | Échappement, sanitation, CSP, tests |
| Fuite via logs | Masquage, politique logging, revue |
| Consultation abusive en mode crise | Motif, bris de glace, revue, notification |
| Modification non tracée | Versioning immuable, audit, signatures |
| Perte de brouillon | Autosauvegarde, résilience réseau, sauvegardes |
| Confusion document clinique/prescription | Avertissements, validation juridique/clinique, séparation traitements |
| Hameçonnage via invitations | Liens expirables, messages minimaux, vérification d'identité |

### 18.10 Référentiels sécurité

Référentiels à consulter : OWASP ASVS, OWASP Top 10, OWASP Cheat Sheet Series, guides ANSSI applicables, exigences HDS si hébergement de données de santé, politique de sécurité interne et exigences de l'IAM de l'organisation.

---

## 19. Protection des données et conformité

### 19.1 Catégories de données

| Catégorie | Exemples | Sensibilité |
|---|---|---|
| Identité | nom, prénom, date de naissance | élevée |
| Santé mentale | crise, mal-être, signes, comportements | très élevée |
| Traitements | traitement actuel, thérapies | très élevée |
| Préférences de soin | lieux, équipes, décisions à éviter | très élevée |
| Données de tiers | personnes ressources, téléphone, lien | élevée |
| Données d'usage | horodatages, exports, accès | élevée |
| Audit | acteur, action, motif, IP | élevée |
| Signatures | validation, preuve | élevée |

### 19.2 Finalités

Finalités possibles : rédaction d'un Plan de crise, prévention et anticipation, coordination de l'accompagnement, consultation par professionnels habilités, partage avec personnes choisies, export et impression, traçabilité, support et sécurité, pilotage agrégé non intrusif.

### 19.3 Base légale et régime de données de santé

La base légale dépend du contexte : établissement de santé, association, cabinet, service public, outil individuel, recherche, etc. Les points à traiter avec le DPO incluent la base légale, l'exception applicable aux données de santé, l'information de la personne, les données de tiers, le partage, la conservation, l'hébergement, l'AIPD, les transferts éventuels et les sous-traitants.

### 19.4 AIPD

Une analyse d'impact relative à la protection des données est fortement recommandée et peut être obligatoire selon le contexte, compte tenu des données de santé mentale, des champs libres, des personnes potentiellement vulnérables, de la consultation en situation de crise, du partage avec tiers, des accès professionnels et des risques de stigmatisation.

### 19.5 Minimisation

Règles : ne collecter que les informations utiles, rendre les champs facultatifs, éviter les catégories trop intrusives, limiter les pièces jointes, limiter les données de tiers, masquer les informations non nécessaires dans les exports, éviter la recherche plein texte non justifiée et ne pas utiliser les données à des fins secondaires sans base et information.

### 19.6 Information des personnes

L'information doit préciser le responsable du traitement, les finalités, les données collectées, les destinataires, les modalités de partage, les données de tiers, les durées de conservation, les droits, le contact DPO, les ressources d'urgence et la procédure de retrait de partage.

### 19.7 Droits des personnes

Prévoir des procédures pour l'accès, la rectification, l'effacement lorsque possible, la limitation, l'opposition selon base légale, la portabilité selon contexte, le retrait de consentement si applicable, l'accès au journal des consultations selon politique et les réclamations.

### 19.8 Durées de conservation

| Donnée | Durée indicative à arbitrer |
|---|---|
| Brouillon abandonné | 6 à 12 mois selon information |
| Plan actif | Tant que la relation ou le compte est actif |
| Versions archivées | Selon obligations du dossier ou politique interne |
| Exports PDF temporaires | Durée courte, par exemple 30 jours, sauf archivage |
| Journaux d'audit | Selon exigences sécurité et conformité |
| Invitations expirées | Purge rapide après expiration |
| Données de personnes ressources retirées | Suppression ou archivage minimal selon trace nécessaire |

### 19.9 Hébergement HDS

Si l'outil est utilisé par un acteur de santé ou traite des données de santé dans un cadre relevant de l'hébergement de données de santé, l'hébergement doit être analysé avec le DPO, le RSSI et la direction juridique. Le recours à un hébergeur certifié HDS peut être requis selon le contexte.

### 19.10 Sous-traitance

Tous les sous-traitants doivent être évalués : hébergeur, fournisseur e-mail/SMS, service de signature, analytics, support, monitoring, génération PDF et IAM. Les contrats doivent couvrir sécurité, localisation, réversibilité, notification d'incident et auditabilité.

---

## 20. Hébergement et exploitation

### 20.1 Exigences de disponibilité

| Fonction | Disponibilité cible |
|---|---:|
| Consultation mode crise | très élevée, à définir par SLA |
| Rédaction brouillon | élevée |
| Export PDF | élevée mais peut être asynchrone |
| Administration | standard |
| Statistiques | standard |

### 20.2 Sauvegardes

Exigences : sauvegarde base régulière, sauvegarde fichiers PDF si conservés, chiffrement, tests de restauration, séparation logique des sauvegardes, protection contre suppression malveillante, RPO/RTO définis et procédures documentées.

### 20.3 Supervision

Métriques : disponibilité API, latence, taux d'erreurs, échecs d'authentification, échecs d'export, temps de génération PDF, file de notifications, accès bris de glace, erreurs de sauvegarde, capacité stockage, tentatives d'accès refusées.

### 20.4 Alertes

Alertes critiques : indisponibilité API ou mode crise, hausse anormale des erreurs 403/401, hausse des accès bris de glace, échec de sauvegarde, expiration certificats, saturation base ou stockage, échec de génération PDF en série, incident sécurité.

### 20.5 Déploiement

Exigences : CI/CD avec validation automatisée, migrations réversibles ou plan de rollback, tests de non-régression sur le modèle, tests de droits, déploiement progressif, journal de changements, monitoring renforcé après déploiement, plan de retour arrière et validation métier en préproduction.

---

## 21. Notifications

### 21.1 Canaux

Canaux possibles : e-mail, SMS minimal, notification in-app, messagerie sécurisée, notification DPI interne, courrier ou impression remise en main propre selon contexte.

### 21.2 Contenu des notifications

Règles : ne pas inclure le contenu du plan, ne pas mentionner de détails de crise dans l'objet, utiliser un lien sécurisé, indiquer l'organisation émettrice, expliquer pourquoi la personne reçoit le message, proposer une procédure en cas d'erreur et tracer l'envoi.

### 21.3 Relances

Relances possibles : brouillon non terminé, demande de relecture, demande de signature, plan à réviser, coordonnées de personne ressource à vérifier, partage expirant. La fréquence doit être limitée et les relances ne doivent pas être anxiogènes.

---

## 22. Administration

### 22.1 Paramétrage fonctionnel

Paramètres : modèle actif, textes d'aide, politique de signature, durée avant révision, sections du mode crise, politique d'export, politique de partage, politique de bris de glace, durée des invitations, messages d'information, coordonnées de support, ressources d'urgence affichées.

### 22.2 Gestion des équipes

Exigences : rattacher les professionnels à une organisation et à une ou plusieurs équipes, définir les périmètres patients, gérer l'arrivée et le départ des professionnels, synchroniser avec l'annuaire si disponible et journaliser les changements d'habilitation.

### 22.3 Gestion des rôles

Rôles standards : personne concernée, personne ressource, personne de confiance, professionnel lecteur, professionnel contributeur, professionnel référent, professionnel crise, administrateur fonctionnel, administrateur sécurité, auditeur, DPO, support technique sans contenu.

### 22.4 Audit administratif

Les administrateurs doivent pouvoir consulter les changements de modèle, changements de rôles, accès bris de glace, exports, erreurs de partage, suppressions, incidents et statistiques agrégées. L'accès au contenu des plans par les administrateurs doit être interdit ou strictement encadré.

---

## 23. Tableau de bord professionnel

### 23.1 Vue liste

Colonnes recommandées : personne, date de naissance, statut du plan, date de dernière validation, à réviser, personne ressource renseignée, partage actif, accès mode crise disponible, actions.

### 23.2 Fiche Plan de crise

Sections : résumé, version active, mode crise, plan complet, personnes ressources, traitements/thérapies, lieux/préférences, décisions à éviter, notes professionnelles séparées, historique, partages, exports, audit.

### 23.3 Indicateurs de service

Indicateurs agrégés : nombre de plans actifs, nombre de plans en brouillon, nombre de plans à réviser, taux de plans avec personnes ressources, nombre d'exports, nombre de consultations mode crise, nombre de bris de glace, délais moyens de révision, nombre de demandes support.

### 23.4 Filtres

Filtres : équipe, statut, date de validation, à réviser, sans personne ressource, sans préférences de soin, partage actif, accès récent, modèle/version.

---

## 24. Gestion des risques cliniques et éthiques

### 24.1 Risques principaux

| Risque | Description | Mitigation |
|---|---|---|
| Confusion avec urgence | La personne pense que remplir le plan remplace un recours d'urgence | Messages clairs, ressources d'urgence, formation |
| Plan obsolète | Informations anciennes utilisées en crise | date visible, relances, statut à réviser |
| Modification par tiers | Un tiers modifie le plan à la place de la personne | droits, validation, audit, versioning |
| Préférences interprétées comme prescriptions | Des souhaits sont lus comme des ordres cliniques | avertissements, formation, gouvernance |
| Exposition des proches | Coordonnées de personnes ressources diffusées trop largement | partage par section, minimisation, audit |
| Stigmatisation | Contenu utilisé contre la personne | politique d'usage, contrôle d'accès, formation |
| Surcharge émotionnelle | Remplissage difficile | sauvegarde, pause, accompagnement, UX douce |
| Faux sentiment de sécurité | Plan rempli mais non partagé ou non à jour | statut partage visible, relances, formation |
| Rupture de confidentialité | Accès non autorisé | sécurité, MFA, audit, sanctions internes |
| Automatisation abusive | IA ou scoring interprète le contenu | interdiction par défaut, gouvernance spécifique |

### 24.2 Gouvernance clinique

Prévoir un comité de gouvernance incluant psychiatres ou médecins référents, psychologues ou soignants concernés, pairs aidants si possible, représentants des usagers, DPO, RSSI, juriste, responsable produit, support et direction qualité.

### 24.3 Règles sur l'IA

Par défaut, aucune IA ne doit résumer le plan, reformuler les préférences, classer les risques, détecter les crises, proposer des traitements, suggérer des personnes à contacter ou analyser les champs libres à des fins de pilotage. Tout usage d'IA nécessite validation clinique, analyse juridique, AIPD, étude de biais, information claire, supervision humaine et tests de sécurité.

---

## 25. Tests et assurance qualité

### 25.1 Tests unitaires

À couvrir : validation des schémas, statuts, création de version, archivage, révocation, partages, droits par section, complétude, génération de statut, format téléphone souple, validation de date, masquage des champs privés et journalisation.

### 25.2 Tests d'intégration

Scénarios : création d'un plan complet, sauvegarde d'un brouillon, reprise après erreur réseau, validation, création d'une nouvelle version, export PDF, partage à une personne ressource, retrait du partage, accès professionnel, accès mode crise, bris de glace, audit, notification et import identité.

### 25.3 Tests end-to-end

Parcours E2E : création autonome sur mobile, création accompagnée sur tablette, ajout de personnes ressources, validation et signature, export complet, consultation par professionnel, mode crise, révision annuelle, révocation, demande d'accès au journal.

### 25.4 Tests de sécurité

Tests : contrôle d'accès horizontal et vertical, IDOR, XSS champs libres, CSRF si applicable, injection SQL, fuite dans logs, tokens d'invitation, expiration de session, MFA, bris de glace, export PDF non autorisé, rate limiting, secrets, SAST/DAST et revue manuelle.

### 25.5 Tests d'accessibilité

Tests : navigation clavier, lecteur d'écran, contraste, zoom 200 %, mobile, erreurs de formulaire, tableaux accessibles, mode cartes, export HTML/PDF, langage clair et absence de piège au focus.

### 25.6 Tests de charge

Scénarios : consultation simultanée mode crise, génération PDF en file, autosauvegarde fréquente, ouverture de tableaux de bord, imports, exports agrégés, restauration de sauvegarde et montée en charge progressive.

### 25.7 Recette métier

Critères : toutes les rubriques du PDF source sont représentées, l'ordre du plan est préservé, l'utilisateur peut laisser une rubrique vide, les personnes ressources sont structurées, la personne de confiance est distinguée, le mode crise affiche les informations prioritaires, le PDF est lisible, le plan validé n'est pas modifiable sans nouvelle version et les droits de partage sont compréhensibles.

---

## 26. Stratégie de migration depuis le papier

### 26.1 Inventaire

Avant migration : identifier les plans papier existants, vérifier leur date, vérifier l'accord de la personne, décider si l'ancien plan est importé, scanné ou remplacé, définir les droits d'accès et informer les personnes concernées.

### 26.2 Modes de migration

| Mode | Description | Avantages | Limites |
|---|---|---|---|
| Re-saisie accompagnée | La personne remplit le web avec aide | qualité, consentement, mise à jour | temps nécessaire |
| Scan en pièce jointe | Le papier est stocké en PDF | rapide | peu structuré, accessibilité faible |
| Saisie par professionnel sous dictée | Le professionnel saisit pendant l'entretien | structuré | nécessite relecture et validation |
| Import OCR | Extraction automatique | gain potentiel | risque d'erreurs, validation indispensable |
| Coexistence papier/web | Papier conservé, web pour nouveaux plans | transition douce | double gestion |

### 26.3 Validation après migration

Toute migration doit être relue par la personne si possible, indiquer la source, indiquer la date du papier, indiquer la date de saisie numérique, conserver l'image ou le PDF source si nécessaire, créer une version validée distincte et tracer l'opérateur de saisie.

### 26.4 Coexistence papier/web

Règles : afficher quelle version est active, éviter deux versions contradictoires, informer les professionnels, prévoir une procédure de remplacement, permettre l'impression web pour les personnes préférant le papier et éviter que le scan papier soit utilisé comme version active si un plan web validé plus récent existe.

---

## 27. Déploiement MVP

### 27.1 Périmètre MVP recommandé

Le MVP doit inclure authentification, création d'un plan brouillon, toutes les rubriques source, autosauvegarde, validation simple, version active, export PDF complet, mode crise lecture seule, personnes ressources, partages simples, audit, administration minimale, conformité et sécurité de base, accessibilité des parcours essentiels.

### 27.2 Hors MVP

Peuvent être reportés : signature avancée, intégration FHIR complète, import de traitements, notifications multicanales avancées, analytics détaillés, IA, applications mobiles natives, coédition temps réel, consentements complexes, OCR de plans papier, traduction multilingue complète.

### 27.3 Jalons

| Jalon | Contenu | Sortie attendue |
|---|---|---|
| Cadrage | validation contenu, risques, conformité | cahier des charges validé |
| Prototype UX | maquettes guidé/document/crise | tests utilisateurs |
| Socle technique | auth, base, API, audit | environnement intégration |
| Fonctionnel MVP | saisie, validation, export, partage | recette métier |
| Sécurité/conformité | tests, AIPD, durcissement | go/no-go production |
| Pilote | déploiement limité | retours terrain |
| Généralisation | corrections, formation, support | mise en production élargie |

### 27.4 Critères de succès MVP

- le plan peut être créé, validé, consulté et exporté ;
- toutes les rubriques du PDF source sont présentes ;
- le mode crise fonctionne ;
- les droits sont correctement appliqués ;
- les journaux sont exploitables ;
- aucun contenu sensible n'apparaît dans les logs techniques ;
- le parcours est utilisable sur mobile ;
- l'export PDF est lisible ;
- la personne peut retirer un partage ;
- la gouvernance valide les avertissements.

---

## 28. Formation et support

### 28.1 Formation professionnels

Contenus : finalité du Plan de crise, différence entre plan, DAP, prescription et dossier médical, accompagnement de la rédaction, respect de l'autonomie, partage et confidentialité, mode crise, bris de glace, export PDF, gestion des plans obsolètes, incidents et support.

### 28.2 Formation personnes concernées

Supports : guide court, vidéo ou tutoriel, version facile à lire, aide en entretien, exemples de réponses, explication des partages, fiche « que faire en cas de problème ».

### 28.3 Support utilisateur

Support : FAQ, contact support, procédure de récupération d'accès, aide à l'export, aide à la suppression ou au retrait de partage, signalement d'erreur, support pour proches invités, support accessibilité.

### 28.4 Support technique

Procédures : incident de connexion, incident d'export, incident de sauvegarde, erreur de droits, bris de glace contesté, demande d'audit, restauration, purge, violation de données, indisponibilité mode crise.

---

## 29. Documentation technique attendue

Livrables :

- architecture détaillée ;
- diagrammes de flux ;
- modèle de données ;
- dictionnaire des champs ;
- OpenAPI ;
- schémas JSON ;
- guide d'installation ;
- guide d'exploitation ;
- guide de sauvegarde/restauration ;
- guide de sécurité ;
- matrice de droits ;
- registre des traitements ;
- analyse d'impact ;
- politique de conservation ;
- plan de tests ;
- rapport d'accessibilité ;
- guide utilisateur ;
- guide professionnel ;
- guide administrateur ;
- procédure incident ;
- procédure réversibilité ;
- documentation de l'export PDF ;
- documentation FHIR si activé.

---

## 30. Registre des décisions à prendre

| Sujet | Question | Responsable pressenti |
|---|---|---|
| Portée juridique | Le plan a-t-il une valeur institutionnelle ou uniquement informative ? | Juriste + direction |
| Personne de confiance | Le module gère-t-il la désignation complète ou seulement un marquage ? | Juriste + clinique |
| Signature | Signature simple, avancée ou validation ? | Juriste + DPO + produit |
| Partage proches | Quels proches peuvent accéder à quelles sections ? | DPO + clinique + usagers |
| Mode crise | Qui peut y accéder et dans quelles conditions ? | RSSI + clinique |
| Bris de glace | Activé ou non ? | Direction + RSSI + DPO |
| HDS | L'hébergement HDS est-il requis ? | DPO + juridique + DSI |
| Conservation | Combien de temps conserver les versions ? | DPO + archives + clinique |
| PDF | Quel format d'export et quel filigrane ? | Produit + juridique |
| Interop | FHIR, DPI, DMP ou aucune intégration MVP ? | DSI + interop |
| Notifications | Quels canaux et quels contenus ? | DPO + produit |
| Accessibilité | Niveau cible et audit externe ? | Produit + conformité |
| IA | Usage interdit, expérimental ou encadré ? | Gouvernance éthique |
| Migration papier | Scan, re-saisie ou coexistence ? | Métier + DPO |

---

## 31. Checklist de mise en production

### 31.1 Produit et clinique

- [ ] Toutes les rubriques source sont présentes.
- [ ] Les libellés ont été relus.
- [ ] Les avertissements sont validés.
- [ ] Le mode crise est validé par les professionnels.
- [ ] Les personnes concernées ont testé le parcours.
- [ ] Les exports PDF sont validés.
- [ ] Les formations sont prêtes.
- [ ] Le support est prêt.
- [ ] Les limites du plan sont clairement indiquées.

### 31.2 Juridique et conformité

- [ ] Registre de traitement rempli.
- [ ] Base légale documentée.
- [ ] Données de santé analysées.
- [ ] AIPD réalisée ou décision documentée.
- [ ] Politique de conservation validée.
- [ ] Information utilisateur validée.
- [ ] Contrats sous-traitants validés.
- [ ] HDS évalué.
- [ ] Personne de confiance validée juridiquement.
- [ ] Signature validée juridiquement.

### 31.3 Sécurité

- [ ] MFA activé pour professionnels/admins.
- [ ] Tests d'autorisation réussis.
- [ ] Audit activé.
- [ ] Logs sans données sensibles.
- [ ] Chiffrement configuré.
- [ ] Sauvegardes testées.
- [ ] Secrets dans coffre.
- [ ] CSP configurée.
- [ ] DAST/SAST réalisés.
- [ ] Plan incident prêt.
- [ ] Bris de glace testé si activé.

### 31.4 Accessibilité

- [ ] Navigation clavier testée.
- [ ] Lecteur d'écran testé.
- [ ] Contrastes conformes.
- [ ] Zoom 200 % testé.
- [ ] Tableaux accessibles.
- [ ] Mode mobile testé.
- [ ] Messages d'erreur accessibles.
- [ ] PDF ou alternative accessible.
- [ ] Déclaration ou rapport d'accessibilité préparé.

### 31.5 Exploitation

- [ ] Monitoring configuré.
- [ ] Alertes configurées.
- [ ] Runbooks disponibles.
- [ ] PRA/PCA défini.
- [ ] Sauvegarde/restauration testée.
- [ ] Procédure de rollback testée.
- [ ] Support formé.
- [ ] Documentation administrateur disponible.
- [ ] Indicateurs MVP configurés.

---

## 32. Annexes

### Annexe A — Exemple de structure de dépôt

```text
crisis-plan-web/
├── apps/
│   ├── frontend/
│   └── backend/
├── packages/
│   ├── crisis-plan-model/
│   ├── ui-components/
│   ├── api-client/
│   └── pdf-renderer/
├── infra/
│   ├── docker/
│   ├── kubernetes/
│   └── terraform/
├── docs/
│   ├── architecture/
│   ├── security/
│   ├── privacy/
│   ├── accessibility/
│   └── user-guides/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── security/
└── openapi/
    └── crisis-plan-api.yaml
```

### Annexe B — Exemple de composant React simplifié

```tsx
import { useState } from "react";

type Trigger = {
  id: string;
  label: string;
};

type Props = {
  initialTriggers: Trigger[];
  onChange: (triggers: Trigger[]) => void;
};

export function TriggersEditor({ initialTriggers, onChange }: Props) {
  const [triggers, setTriggers] = useState<Trigger[]>(initialTriggers);

  function updateTrigger(id: string, label: string) {
    const next = triggers.map((trigger) =>
      trigger.id === id ? { ...trigger, label } : trigger
    );
    setTriggers(next);
    onChange(next);
  }

  function addTrigger() {
    const next = [...triggers, { id: crypto.randomUUID(), label: "" }];
    setTriggers(next);
    onChange(next);
  }

  return (
    <section aria-labelledby="triggers-title">
      <h2 id="triggers-title">Les déclencheurs de mon mal-être</h2>
      <p id="triggers-help">
        Vous pouvez décrire les situations qui perturbent votre bien-être.
      </p>
      {triggers.map((trigger, index) => (
        <div key={trigger.id}>
          <label htmlFor={`trigger-${trigger.id}`}>
            Déclencheur {index + 1}
          </label>
          <textarea
            id={`trigger-${trigger.id}`}
            value={trigger.label}
            aria-describedby="triggers-help"
            onChange={(event) => updateTrigger(trigger.id, event.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addTrigger}>
        Ajouter un déclencheur
      </button>
    </section>
  );
}
```

### Annexe C — Exemple de service de publication

```ts
type ValidatePlanInput = {
  planId: string;
  actorUserId: string;
  signatureMethod: "checkbox" | "typed_name" | "advanced_e_signature";
};

async function validateCrisisPlan(input: ValidatePlanInput) {
  return await db.transaction(async (tx) => {
    const draft = await tx.crisisPlanVersions.findDraftForUpdate(input.planId);
    if (!draft) {
      throw new Error("Aucun brouillon à valider.");
    }

    await authorization.assertCanValidatePlan(input.actorUserId, draft.planId);
    await tx.crisisPlanVersions.archiveActiveVersions(draft.planId);

    const validated = await tx.crisisPlanVersions.update(draft.id, {
      status: "active",
      validatedAt: new Date().toISOString()
    });

    await tx.signatures.insert({
      planVersionId: draft.id,
      signerType: "person",
      signerUserId: input.actorUserId,
      signatureMethod: input.signatureMethod,
      signedAt: new Date().toISOString()
    });

    await tx.crisisPlans.update(draft.planId, {
      currentVersionId: draft.id,
      status: "active"
    });

    await audit.log(tx, {
      actorUserId: input.actorUserId,
      planVersionId: draft.id,
      eventType: "crisis_plan.validated",
      eventCategory: "write"
    });

    return validated;
  });
}
```

### Annexe D — Exemple de dictionnaire de données export

| Champ | Type | Description | Sensibilité |
|---|---|---|---|
| `plan_id` | UUID | Identifiant du plan | élevée |
| `version_id` | UUID | Identifiant de version | élevée |
| `patient_id` | UUID | Identifiant interne patient | très élevée |
| `status` | enum | Statut du plan | moyenne |
| `validated_at` | datetime | Date de validation | moyenne |
| `triggers_count` | integer | Nombre de déclencheurs renseignés | moyenne |
| `resource_people_count` | integer | Nombre de personnes ressources | moyenne |
| `has_trusted_person` | boolean | Personne de confiance indiquée | élevée |
| `has_current_treatment` | boolean | Traitement actuel renseigné | élevée |
| `has_decisions_to_avoid` | boolean | Décisions à éviter renseignées | élevée |
| `last_exported_at` | datetime | Dernier export | moyenne |
| `last_crisis_view_at` | datetime | Dernière consultation mode crise | élevée |

### Annexe E — Références normatives et guides à consulter

Références à vérifier avant mise en production :

- W3C — Web Content Accessibility Guidelines WCAG 2.2 : https://www.w3.org/TR/WCAG22/
- W3C WAI — vue d'ensemble WCAG : https://www.w3.org/WAI/standards-guidelines/wcag/
- RGAA — Référentiel général d'amélioration de l'accessibilité : https://accessibilite.numerique.gouv.fr/
- OWASP — Application Security Verification Standard : https://owasp.org/www-project-application-security-verification-standard/
- OWASP — Cheat Sheet Series : https://cheatsheetseries.owasp.org/
- ANS — Hébergeurs de données de santé : https://esante.gouv.fr/services/hebergeurs-de-donnees-de-sante
- CNIL — Données de santé : https://www.cnil.fr/fr/thematiques/sante
- CNIL — Analyse d'impact relative à la protection des données : https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd
- HL7 FHIR — QuestionnaireResponse : https://hl7.org/fhir/questionnaireresponse.html
- Légifrance — Code de la santé publique, personne de confiance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049391677

---

## 33. Conclusion

La transformation de **Mon Plan de Crise** en outil web doit préserver l'intention principale du support papier : permettre à la personne de mieux se connaître, d'anticiper les moments où elle va moins bien, de formaliser ce qui l'aide, d'indiquer qui peut l'accompagner et de rendre visibles ses préférences en cas de crise.

La valeur du service ne réside pas dans un score ou une automatisation, mais dans la qualité de l'expression personnelle, la sécurité du partage, l'accessibilité de la rédaction, la fiabilité de la version active et la capacité des proches ou professionnels habilités à retrouver rapidement les informations utiles.

Le développement doit donc être guidé par cinq principes :

1. **autonomie** de la personne concernée ;
2. **confidentialité** des informations sensibles ;
3. **clarté** des rôles et des limites ;
4. **traçabilité** des accès et modifications ;
5. **utilité clinique et humaine** en situation de crise.

Un déploiement fiable suppose une gouvernance clinique, juridique, technique et éthique continue, associant les usagers et les professionnels dès la conception.
