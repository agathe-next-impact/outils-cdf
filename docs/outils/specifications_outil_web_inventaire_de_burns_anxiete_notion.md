---
titre: "Spécifications fonctionnelles et techniques — Outil web de passation, cotation et suivi de l'Inventaire de Burns pour mesurer l'anxiété"
version: "1.0"
date: "2026-06-06"
langue: "fr-FR"
statut: "Document de cadrage technique"
source_principale: "PDF fourni : anxiete-inventaire-de-burns.pdf — Inventaire de Burns pour mesurer l'anxiété"
---

# Spécifications fonctionnelles et techniques — Outil web de passation, cotation et suivi de l'Inventaire de Burns pour mesurer l'anxiété

## 1. Objet du document

Ce document décrit de manière exhaustive un outil web permettant d'administrer en ligne, de compléter, de coter, d'interpréter, de suivre dans le temps, d'exporter et d'exploiter de façon sécurisée l'**Inventaire de Burns pour mesurer l'anxiété**, ci-après nommé **Inventaire de Burns**, **IB-Anxiété** ou **questionnaire**.

L'objectif est de fournir aux équipes produit, design, développement, sécurité, conformité, hébergement, support, exploitation et gouvernance clinique un cahier des charges suffisamment détaillé pour concevoir, développer, déployer, maintenir et auditer une solution web fiable.

Le document couvre :

- la description du formulaire source et de son mode de passation ;
- la transformation du formulaire papier en expérience numérique ;
- le modèle de questionnaire et les règles de cotation ;
- les exigences fonctionnelles ;
- les règles métier ;
- l'expérience utilisateur pour la personne répondante et pour les professionnels ;
- l'architecture applicative ;
- le modèle de données ;
- les API ;
- les schémas JSON ;
- l'interopérabilité possible avec des systèmes de santé ;
- la sécurité ;
- la protection des données ;
- l'accessibilité ;
- les tests, l'exploitation, le support et la mise en production.

> **Avertissement important** : l'outil décrit ici est un outil numérique de passation et de cotation d'un questionnaire d'auto-évaluation. Il ne doit pas être présenté comme un diagnostic médical, comme un dispositif de triage d'urgence ou comme un remplacement de l'évaluation clinique. Les libellés, seuils, droits d'utilisation, conditions de diffusion, modalités d'interprétation et messages affichés aux usagers doivent être validés par un responsable clinique, le DPO, le RSSI, le service juridique et, si nécessaire, un référent réglementaire dispositif médical.

> **Point de vigilance sur les droits** : le document source est fourni comme base de travail. Avant toute mise en ligne publique ou professionnelle, l'organisation doit vérifier qu'elle dispose des droits nécessaires pour reproduire le questionnaire, ses items, ses choix de réponse et ses seuils d'interprétation dans un service numérique.

---

## 2. Résumé du formulaire source

### 2.1 Nature de l'outil

Le formulaire source est un questionnaire d'auto-évaluation intitulé **Inventaire de Burns — pour mesurer l'anxiété**.

Il vise à aider une personne à évaluer l'intensité de symptômes d'anxiété ressentis **durant la dernière semaine**. Les symptômes sont regroupés en trois catégories :

1. manifestations au niveau des sentiments ;
2. manifestations au niveau de la pensée ;
3. manifestations par des symptômes physiques.

Chaque item est coté sur une échelle de fréquence ou d'intensité à quatre niveaux :

| Valeur | Libellé source | Code recommandé |
|---:|---|---|
| 0 | Pas du tout | `not_at_all` |
| 1 | Quelquefois | `sometimes` |
| 2 | Assez souvent | `fairly_often` |
| 3 | Beaucoup | `a_lot` |

Le score total est obtenu par addition des 33 réponses. Le score maximal théorique est donc de 99.

### 2.2 Structure générale observée

Le document source comporte 2 pages.

| Page | Contenu principal | Fonction du contenu |
|---:|---|---|
| 1 | Titre, nom, date, instructions, catégories I et II, items 1 à 17, colonnes de réponse 0 à 3 | Identification, consignes, passation des symptômes émotionnels et cognitifs |
| 2 | Catégorie III, items 18 à 33, colonnes de réponse 0 à 3, total, interprétation du pointage | Passation des symptômes physiques, calcul du total, lecture du niveau d'anxiété |

### 2.3 Sections et champs à numériser

| Code section | Libellé source ou fonction | Type de saisie recommandé | Criticité |
|---|---|---|---|
| `respondent_identity` | Nom | Identité structurée ou pseudonyme selon contexte | élevée |
| `assessment_date` | Date | Date de passation, préremplie et modifiable selon droits | élevée |
| `instructions` | Instructions de passation | Texte non modifiable versionné | élevée |
| `timeframe` | Durant la dernière semaine | Constante affichée, enregistrée dans la réponse | élevée |
| `category_feelings` | Catégorie I : manifestations au niveau des sentiments | Groupe de 6 items | élevée |
| `category_thoughts` | Catégorie II : manifestations au niveau de la pensée | Groupe de 11 items | élevée |
| `category_physical` | Catégorie III : manifestations par des symptômes physiques | Groupe de 16 items | élevée |
| `response_scale` | Pas du tout / Quelquefois / Assez souvent / Beaucoup | Choix radio 0 à 3 | très élevée |
| `answers` | Réponses aux 33 items | Entiers 0 à 3, une réponse par item | très élevée |
| `total_score` | Total | Calcul automatique, entier 0 à 99 | très élevée |
| `severity_band` | Interprétation du pointage | Catégorie calculée selon seuils source | élevée |
| `clinical_context` | Contexte facultatif de passation | Champ optionnel pour professionnel, non présent sur papier | moyenne |
| `review_notes` | Notes professionnelles facultatives | Texte séparé des réponses de la personne | moyenne |
| `export_pdf` | Reproduction lisible du questionnaire | Export PDF horodaté | élevée |
| `audit_trail` | Traçabilité | Journal technique et métier | très élevée |

### 2.4 Items du questionnaire

Le questionnaire comprend 33 items.

| N° | Code | Catégorie | Libellé à afficher |
|---:|---|---|---|
| 1 | `q01` | Sentiments | sentiment d'anxiété, de nervosité, d'inquiétude ou de peur |
| 2 | `q02` | Sentiments | ressentir votre environnement immédiat comme étrange, irréel ou embrouillé |
| 3 | `q03` | Sentiments | sentiment d'être séparé de l'ensemble ou d'une partie de votre corps |
| 4 | `q04` | Sentiments | périodes de panique soudaines et inattendues |
| 5 | `q05` | Sentiments | appréhension ou sens d'un danger imminent |
| 6 | `q06` | Sentiments | sentiment d'être tendu, stressé, oppressé, crispé |
| 7 | `q07` | Pensée | avoir des difficultés de concentration |
| 8 | `q08` | Pensée | avoir un flot de pensées rapides ou l'esprit qui saute constamment d'un sujet à l'autre |
| 9 | `q09` | Pensée | être songeur durant la journée ou être dérangé par des pensées effrayantes |
| 10 | `q10` | Pensée | sentir que vous êtes sur le point de perdre le contrôle |
| 11 | `q11` | Pensée | avoir peur de « craquer » ou de devenir fou |
| 12 | `q12` | Pensée | avoir peur de défaillir ou de vous évanouir |
| 13 | `q13` | Pensée | avoir peur de souffrir d'une maladie physique, d'une crise cardiaque ou de mourir |
| 14 | `q14` | Pensée | avoir peur de paraître ridicule ou inadéquat face aux autres |
| 15 | `q15` | Pensée | avoir peur d'être seul, isolé ou abandonné |
| 16 | `q16` | Pensée | avoir peur d'être critiqué ou désapprouvé |
| 17 | `q17` | Pensée | avoir peur qu'un événement tragique ne soit sur le point d'arriver |
| 18 | `q18` | Symptômes physiques | cœur qui s'accélère, qui bat fort ou dont le rythme est parfois irrégulier (palpitations) |
| 19 | `q19` | Symptômes physiques | douleurs ou serrements dans la poitrine |
| 20 | `q20` | Symptômes physiques | engourdissements ou fourmillements des extrémités |
| 21 | `q21` | Symptômes physiques | malaises ou « papillons » dans l'estomac |
| 22 | `q22` | Symptômes physiques | constipation et/ou diarrhée |
| 23 | `q23` | Symptômes physiques | sensations de fatigue et/ou réactions de sursaut |
| 24 | `q24` | Symptômes physiques | raideur ou tension musculaire |
| 25 | `q25` | Symptômes physiques | transpiration excessive non causée par la chaleur |
| 26 | `q26` | Symptômes physiques | sensation de « boule » dans la gorge |
| 27 | `q27` | Symptômes physiques | tremblements |
| 28 | `q28` | Symptômes physiques | jambes molles, en « guenille » |
| 29 | `q29` | Symptômes physiques | étourdissements, vertiges |
| 30 | `q30` | Symptômes physiques | sensation d'étouffement et/ou essoufflement rapide au repos et/ou difficulté à respirer |
| 31 | `q31` | Symptômes physiques | maux de tête ou douleurs dans le cou ou le dos |
| 32 | `q32` | Symptômes physiques | alternance de frissons et de chaleur |
| 33 | `q33` | Symptômes physiques | sensations de fatigue, de faiblesse ou sentiment d'être facilement épuisé |


#### Table plate compatible import Notion — items, catégories et valeurs autorisées

Cette table répète tous les items dans une forme plate, sans intervalle du type `q01 à q33`, afin que l'import Notion crée une ligne par item et ne perde pas les questions lors de la conversion en base de données.

| Propriété Notion | N° | Code item | Catégorie | Code catégorie | Libellé item | Type Notion conseillé | Valeurs autorisées | Score |
|---|---:|---|---|---|---|---|---|---:|
| q01 | 1 | q01 | Sentiments | feelings | sentiment d'anxiété, de nervosité, d'inquiétude ou de peur | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q02 | 2 | q02 | Sentiments | feelings | ressentir votre environnement immédiat comme étrange, irréel ou embrouillé | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q03 | 3 | q03 | Sentiments | feelings | sentiment d'être séparé de l'ensemble ou d'une partie de votre corps | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q04 | 4 | q04 | Sentiments | feelings | périodes de panique soudaines et inattendues | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q05 | 5 | q05 | Sentiments | feelings | appréhension ou sens d'un danger imminent | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q06 | 6 | q06 | Sentiments | feelings | sentiment d'être tendu, stressé, oppressé, crispé | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q07 | 7 | q07 | Pensée | thoughts | avoir des difficultés de concentration | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q08 | 8 | q08 | Pensée | thoughts | avoir un flot de pensées rapides ou l'esprit qui saute constamment d'un sujet à l'autre | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q09 | 9 | q09 | Pensée | thoughts | être songeur durant la journée ou être dérangé par des pensées effrayantes | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q10 | 10 | q10 | Pensée | thoughts | sentir que vous êtes sur le point de perdre le contrôle | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q11 | 11 | q11 | Pensée | thoughts | avoir peur de « craquer » ou de devenir fou | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q12 | 12 | q12 | Pensée | thoughts | avoir peur de défaillir ou de vous évanouir | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q13 | 13 | q13 | Pensée | thoughts | avoir peur de souffrir d'une maladie physique, d'une crise cardiaque ou de mourir | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q14 | 14 | q14 | Pensée | thoughts | avoir peur de paraître ridicule ou inadéquat face aux autres | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q15 | 15 | q15 | Pensée | thoughts | avoir peur d'être seul, isolé ou abandonné | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q16 | 16 | q16 | Pensée | thoughts | avoir peur d'être critiqué ou désapprouvé | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q17 | 17 | q17 | Pensée | thoughts | avoir peur qu'un événement tragique ne soit sur le point d'arriver | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q18 | 18 | q18 | Symptômes physiques | physical | cœur qui s'accélère, qui bat fort ou dont le rythme est parfois irrégulier (palpitations) | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q19 | 19 | q19 | Symptômes physiques | physical | douleurs ou serrements dans la poitrine | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q20 | 20 | q20 | Symptômes physiques | physical | engourdissements ou fourmillements des extrémités | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q21 | 21 | q21 | Symptômes physiques | physical | malaises ou « papillons » dans l'estomac | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q22 | 22 | q22 | Symptômes physiques | physical | constipation et/ou diarrhée | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q23 | 23 | q23 | Symptômes physiques | physical | sensations de fatigue et/ou réactions de sursaut | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q24 | 24 | q24 | Symptômes physiques | physical | raideur ou tension musculaire | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q25 | 25 | q25 | Symptômes physiques | physical | transpiration excessive non causée par la chaleur | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q26 | 26 | q26 | Symptômes physiques | physical | sensation de « boule » dans la gorge | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q27 | 27 | q27 | Symptômes physiques | physical | tremblements | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q28 | 28 | q28 | Symptômes physiques | physical | jambes molles, en « guenille » | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q29 | 29 | q29 | Symptômes physiques | physical | étourdissements, vertiges | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q30 | 30 | q30 | Symptômes physiques | physical | sensation d'étouffement et/ou essoufflement rapide au repos et/ou difficulté à respirer | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q31 | 31 | q31 | Symptômes physiques | physical | maux de tête ou douleurs dans le cou ou le dos | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q32 | 32 | q32 | Symptômes physiques | physical | alternance de frissons et de chaleur | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |
| q33 | 33 | q33 | Symptômes physiques | physical | sensations de fatigue, de faiblesse ou sentiment d'être facilement épuisé | Nombre ou sélection | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | valeur choisie |

### 2.5 Interprétation du pointage source

Le formulaire source propose les seuils suivants :

| Score total | Interprétation source | Code recommandé |
|---:|---|---|
| 0 à 5 | anxiété minimale | `minimal` |
| 6 à 15 | anxiété légère | `mild` |
| 16 à 30 | anxiété modérée | `moderate` |
| 31 à 50 | anxiété marquée | `marked` |
| 51 à 99 | anxiété très marquée | `very_marked` |

### 2.6 Principes de transformation du papier vers le web

La numérisation ne doit pas seulement recopier la mise en page papier. Elle doit :

1. préserver les items, les catégories, l'échelle de réponse et les seuils ;
2. afficher clairement la période de référence : **la dernière semaine** ;
3. empêcher les erreurs de cotation manuelle ;
4. rendre visible le nombre d'items complétés ;
5. permettre une sauvegarde temporaire si le parcours est long ;
6. distinguer les réponses de la personne, les notes professionnelles et les métadonnées techniques ;
7. gérer les questionnaires incomplets sans produire d'interprétation trompeuse ;
8. afficher l'interprétation avec prudence clinique ;
9. permettre un export PDF lisible et horodaté ;
10. permettre un suivi longitudinal lorsque plusieurs passations sont réalisées ;
11. garantir la confidentialité, l'auditabilité et la maîtrise des droits d'accès ;
12. éviter toute formulation culpabilisante, alarmiste ou diagnostique.

---

## 3. Objectifs produit

### 3.1 Objectif général

Mettre à disposition un outil web sécurisé, accessible et simple d'utilisation permettant à une personne de répondre à l'Inventaire de Burns, de calculer automatiquement son score, de visualiser une interprétation prudente, de partager le résultat avec des professionnels habilités, et de suivre l'évolution des scores dans le temps.

### 3.2 Objectifs détaillés

1. **Numériser fidèlement le questionnaire** : 33 items, 3 catégories, 4 choix de réponse, score total et seuils.
2. **Réduire les erreurs** de remplissage, d'addition et d'interprétation.
3. **Permettre une passation autonome** par la personne répondante.
4. **Permettre une passation accompagnée** par un professionnel sans confusion sur l'auteur des réponses.
5. **Permettre l'invitation sécurisée** par lien temporaire ou via un espace patient.
6. **Calculer automatiquement le score total** uniquement lorsque les règles de complétude sont satisfaites.
7. **Afficher une interprétation graduée** conforme aux seuils du document source.
8. **Informer clairement** que le résultat n'est pas un diagnostic.
9. **Permettre le suivi longitudinal** avec graphiques d'évolution, sans surinterprétation.
10. **Gérer les versions du questionnaire** et l'historique des modifications.
11. **Exporter les résultats** au format PDF, CSV contrôlé ou JSON d'interopérabilité.
12. **Permettre l'intégration** à un dossier patient informatisé ou à un entrepôt de données, selon autorisations.
13. **Protéger les données de santé** et les identités.
14. **Respecter l'accessibilité** pour les personnes ayant des difficultés visuelles, motrices, cognitives, psychiques ou linguistiques.
15. **Tracer les accès, modifications, exports et suppressions**.
16. **Permettre l'administration multi-structure** si plusieurs services utilisent l'outil.
17. **Limiter la charge de support** grâce à une interface explicite et à des messages d'erreur compréhensibles.
18. **Fournir une base de tests robuste** pour garantir la stabilité du score et des seuils.

### 3.3 Non-objectifs

L'outil ne doit pas :

- poser un diagnostic de trouble anxieux ;
- remplacer un entretien clinique ;
- prescrire un traitement ;
- produire une décision automatisée de prise en charge ;
- déclencher automatiquement une alerte médicale sans protocole validé ;
- être utilisé comme outil d'urgence ;
- masquer l'incertitude clinique ;
- interpréter des symptômes physiques potentiellement urgents comme de l'anxiété sans avertissement ;
- modifier les seuils sans gouvernance clinique ;
- mélanger les réponses du questionnaire avec des notes ou commentaires professionnels ;
- utiliser les résultats à des fins de sélection, discrimination, sanction ou notation administrative ;
- entraîner un modèle d'intelligence artificielle sans base légale, information, gouvernance éthique et validation spécifiques.

### 3.4 Indicateurs de succès

| Indicateur | Cible MVP | Méthode de mesure |
|---|---:|---|
| Taux de questionnaires complétés | ≥ 85 % des passations commencées | Analytics applicatif anonymisé ou pseudonymisé |
| Taux d'erreur de score | 0 erreur détectée en production | Tests unitaires + audits périodiques |
| Temps médian de passation | À établir lors du pilote | Timestamps début/fin |
| Taux de satisfaction utilisateur | ≥ 80 % d'avis positifs | Micro-questionnaire facultatif |
| Conformité accessibilité | Audit RGAA/WCAG selon cible | Audit externe ou interne formalisé |
| Taux d'exports réussis | ≥ 99 % | Monitoring technique |
| Disponibilité applicative | ≥ 99,5 % hors maintenance | Supervision |
| Incident de confidentialité | 0 incident majeur | Registre incidents |

---

## 4. Périmètre fonctionnel

### 4.1 Utilisateurs cibles

| Profil | Description | Besoins principaux |
|---|---|---|
| Personne répondante | Personne qui complète le questionnaire pour elle-même | Comprendre les consignes, répondre facilement, recevoir ou non un résultat selon paramétrage |
| Patient ou usager suivi | Personne rattachée à une structure de soin ou d'accompagnement | Répondre à une invitation, suivre l'évolution, partager avec l'équipe |
| Aidant ou proche accompagnant | Personne aidant à lire ou comprendre, sans répondre à la place de la personne | Assistance de lecture, confidentialité, non-substitution |
| Professionnel référent | Médecin, psychologue, infirmier, médiateur ou autre professionnel habilité | Inviter, consulter, interpréter avec prudence, suivre l'évolution |
| Professionnel d'accueil ou de coordination | Personne organisant les passations | Planifier, relancer, vérifier les passations attendues |
| Administrateur fonctionnel | Gestionnaire de la structure | Paramétrer les modèles, droits, profils, exports et messages |
| Administrateur technique | Exploitant de l'application | Maintenir, superviser, restaurer, diagnostiquer |
| DPO / Référent conformité | Responsable protection des données | Contrôler finalités, bases légales, droits, durées, AIPD |
| RSSI | Responsable sécurité | Définir exigences d'habilitation, sécurité, audits, incidents |
| Référent clinique | Responsable du contenu clinique | Valider libellés, seuils, messages, protocoles de réponse |
| Chercheur ou analyste autorisé | Exploitation secondaire sous gouvernance | Données pseudonymisées, extractions contrôlées, traçabilité |

### 4.2 Parcours principaux

#### 4.2.1 Parcours personne répondante — passation autonome

1. La personne reçoit un lien sécurisé ou se connecte à son espace.
2. Elle consulte une page d'introduction rappelant :
   - l'objectif du questionnaire ;
   - la période de référence : la dernière semaine ;
   - le fait que le résultat n'est pas un diagnostic ;
   - les destinataires éventuels ;
   - les droits relatifs aux données.
3. Elle complète les 33 items.
4. Elle peut revenir en arrière avant soumission.
5. Elle visualise une page de vérification des réponses manquantes.
6. Elle soumet le questionnaire.
7. Le score est calculé automatiquement.
8. Selon le paramétrage, elle visualise :
   - le score total ;
   - le niveau d'anxiété associé ;
   - un message d'information ;
   - des conseils de contact non prescriptifs.
9. Elle peut télécharger un PDF si cette fonction est activée.
10. Elle peut retrouver l'historique de ses passations si elle dispose d'un compte.

#### 4.2.2 Parcours personne répondante — passation accompagnée

1. Le professionnel ouvre une session de passation accompagnée.
2. L'interface affiche que les réponses doivent rester celles de la personne.
3. Le professionnel peut lire les items, clarifier les modalités et saisir sous dictée.
4. Le système enregistre la modalité `assisted`.
5. Avant soumission, la personne doit confirmer les réponses.
6. La trace d'audit indique le professionnel accompagnant, sans mélanger ses notes avec les réponses.

#### 4.2.3 Parcours professionnel — invitation

1. Le professionnel sélectionne la personne concernée.
2. Il choisit le questionnaire et sa version.
3. Il définit une échéance de réponse.
4. Il sélectionne le mode de communication : espace patient, courriel, SMS, impression d'un code, ou saisie en face à face.
5. Le système génère une invitation à durée limitée.
6. Les relances sont envoyées selon les préférences et la base légale.
7. À soumission, le professionnel reçoit une notification non intrusive.

#### 4.2.4 Parcours professionnel — consultation d'un résultat

1. Le professionnel ouvre le dossier habilité.
2. Il consulte le score total, le niveau, les réponses par item et les scores par catégorie si activés.
3. Il peut comparer avec les passations antérieures.
4. Il peut ajouter une note clinique séparée.
5. Il peut exporter ou intégrer le résultat selon ses droits.
6. Chaque consultation est journalisée.

#### 4.2.5 Parcours longitudinal

1. Les passations successives sont affichées sur une frise chronologique.
2. Les scores totaux peuvent être représentés sous forme de graphique.
3. Les seuils peuvent être indiqués visuellement avec prudence.
4. Les variations sont affichées comme des évolutions descriptives, non comme des conclusions automatiques.
5. L'outil signale les changements de version du questionnaire, car la comparaison n'est valide que si les règles de score sont compatibles.

#### 4.2.6 Parcours export

1. L'utilisateur habilité demande un export.
2. Le système vérifie les droits.
3. Il génère un PDF ou un fichier structuré.
4. L'export contient :
   - identité ou pseudonyme selon contexte ;
   - date de passation ;
   - version du questionnaire ;
   - réponses ;
   - score total ;
   - interprétation ;
   - avertissement clinique ;
   - horodatage d'export.
5. L'export est journalisé.

### 4.3 Périmètre MVP

Le MVP doit inclure :

- une version numérique stable du questionnaire ;
- la passation web responsive ;
- la validation des 33 réponses ;
- le calcul du score total ;
- l'affichage du niveau d'anxiété ;
- une page de résultat ;
- un export PDF ;
- l'invitation sécurisée ;
- la consultation professionnelle ;
- l'audit des accès ;
- l'administration minimale des utilisateurs et des droits ;
- la documentation de score ;
- les tests automatisés des seuils.

### 4.4 Périmètre hors MVP

Les fonctions suivantes peuvent être prévues mais différées :

- application mobile native ;
- mode hors ligne complet ;
- interopérabilité FHIR complète ;
- tableaux de bord populationnels avancés ;
- exports vers entrepôt de recherche ;
- traduction multilingue ;
- intégration au DMP ou à un DPI spécifique ;
- signature électronique avancée ;
- analyse automatique de tendance ;
- recommandations personnalisées ;
- intelligence artificielle de synthèse.

---

## 5. Exigences fonctionnelles détaillées

### 5.1 Gestion du questionnaire

#### F-QST-001 — Référentiel de questionnaire versionné

Le système doit stocker le questionnaire dans un référentiel versionné contenant :

- identifiant stable : `burns_anxiety_inventory_fr` ;
- version fonctionnelle : `1.0.0` au lancement ;
- langue : `fr-FR` ;
- titre ;
- sous-titre ;
- instructions ;
- période de référence ;
- catégories ;
- items ;
- choix de réponse ;
- règles de score ;
- seuils d'interprétation ;
- date d'activation ;
- statut : brouillon, actif, archivé.

Le référentiel doit être immuable pour les passations déjà soumises : toute modification d'item, de choix ou de seuil doit créer une nouvelle version.

#### F-QST-002 — Affichage des instructions

Avant la première question, l'outil doit afficher une instruction équivalente à :

> Les symptômes de l'anxiété peuvent se manifester au niveau des sentiments, de la pensée ou par des symptômes physiques. Pour évaluer votre niveau d'anxiété, indiquez pour chaque symptôme comment il vous a affecté durant la dernière semaine. Le score total sera additionné et interprété à l'aide de l'échelle du questionnaire.

Les formulations exactes doivent être validées lors de l'autorisation d'usage.

#### F-QST-003 — Affichage par catégories

Le système doit pouvoir afficher les items :

- en une seule page avec les trois catégories ;
- ou en trois étapes, une par catégorie ;
- ou item par item, mode recommandé pour mobile et accessibilité.

Le mode d'affichage ne doit jamais modifier les règles de score.

#### F-QST-004 — Conservation du libellé source

Les libellés d'items doivent être conservés de manière fidèle. Des textes d'aide peuvent être ajoutés, mais ils doivent être distincts du libellé source et validés par un référent clinique.

#### F-QST-005 — Gestion des droits d'utilisation

Le système doit permettre d'associer au questionnaire :

- une note de licence ;
- le statut des droits ;
- la source utilisée ;
- les restrictions d'usage ;
- la date de validation juridique ;
- l'identité du validateur.

Aucune mise en production ne doit être possible si le statut des droits est `unknown` ou `rejected`.

### 5.2 Passation

#### F-PAS-001 — Création d'une session

Une session de passation doit être créée avec :

- un identifiant unique ;
- un questionnaire et une version ;
- une personne répondante ou un pseudonyme ;
- un contexte de passation ;
- une date de début ;
- un statut ;
- une échéance éventuelle ;
- un mode : autonome, accompagné, professionnel, import papier.

#### F-PAS-002 — Réponses obligatoires par défaut

Par défaut, les 33 items doivent recevoir une réponse avant calcul du score. Les réponses manquantes doivent être signalées clairement.

#### F-PAS-003 — Sauvegarde de brouillon

Si le questionnaire est rempli dans un espace authentifié, l'utilisateur peut sauvegarder un brouillon. Les brouillons doivent être chiffrés au repos, associés à une durée de conservation et supprimés ou archivés selon politique.

#### F-PAS-004 — Mode invitation sans compte

L'outil peut permettre une passation sans création de compte via un lien temporaire. Dans ce cas :

- le jeton doit être aléatoire, long et stocké haché ;
- le lien doit expirer ;
- le lien doit être à usage unique ou invalider les soumissions multiples ;
- aucune donnée sensible ne doit apparaître dans l'URL ;
- l'accès au résultat doit être paramétrable.

#### F-PAS-005 — Prévention de double soumission

Une session soumise ne peut plus être modifiée directement. Toute correction doit créer :

- soit une nouvelle version de réponse ;
- soit une annulation tracée suivie d'une nouvelle passation ;
- soit une correction administrative explicitement journalisée.

#### F-PAS-006 — Import d'un formulaire papier

Le système peut offrir un mode d'import manuel permettant à un professionnel habilité de saisir des réponses issues d'un papier. Ce mode doit enregistrer :

- que la source est papier ;
- le nom du saisissant ;
- la date de saisie ;
- la date réelle de passation ;
- un indicateur de contrôle qualité ;
- éventuellement une copie numérisée, si la base légale et la politique documentaire l'autorisent.

### 5.3 Saisie des réponses

#### F-REP-001 — Composant de réponse

Chaque item doit être présenté dans un groupe de boutons radio avec quatre options exclusives :

- Pas du tout — 0 ;
- Quelquefois — 1 ;
- Assez souvent — 2 ;
- Beaucoup — 3.

Le nom visuel du groupe, le code item et la valeur numérique doivent être explicitement associés dans le DOM.

#### F-REP-002 — Navigation

L'utilisateur doit pouvoir :

- répondre dans l'ordre ;
- revenir à une question précédente ;
- voir la progression ;
- accéder à une liste des questions manquantes ;
- interrompre et reprendre si le mode brouillon est activé.

#### F-REP-003 — Validation immédiate

Les valeurs acceptées sont strictement `0`, `1`, `2`, `3`. Toute autre valeur doit être rejetée côté client et côté serveur.

#### F-REP-004 — Neutralité de l'interface

Les options ne doivent pas être colorées de manière anxiogène ou stigmatisante. Les couleurs peuvent aider la lisibilité mais ne doivent pas être le seul moyen d'information.

#### F-REP-005 — Confirmation avant soumission

Avant soumission finale, l'outil doit afficher :

- le nombre d'items répondus ;
- le nombre d'items manquants ;
- un rappel que la soumission sera enregistrée ;
- un bouton de correction.

### 5.4 Calcul et interprétation

#### F-SCO-001 — Calcul du total

Le total est la somme des valeurs numériques des 33 items.

#### F-SCO-002 — Calcul des sous-scores

Le système peut calculer des sous-scores par catégorie à titre descriptif :

- sentiments : items 1 à 6, maximum 18 ;
- pensée : items 7 à 17, maximum 33 ;
- symptômes physiques : items 18 à 33, maximum 48.

Ces sous-scores ne figurent pas dans l'interprétation source et doivent donc être signalés comme descriptifs, sauf validation clinique contraire.

#### F-SCO-003 — Interprétation

Le système doit associer le score total aux niveaux source :

- 0 à 5 : anxiété minimale ;
- 6 à 15 : anxiété légère ;
- 16 à 30 : anxiété modérée ;
- 31 à 50 : anxiété marquée ;
- 51 à 99 : anxiété très marquée.

#### F-SCO-004 — Score incomplet

Si une réponse est manquante, le résultat doit être `incomplete`. Le système ne doit pas afficher de niveau d'anxiété, sauf si une règle de proratisation a été explicitement activée et validée.

#### F-SCO-005 — Traçabilité du calcul

Chaque résultat doit conserver :

- la version du questionnaire ;
- la version de la règle de score ;
- le total ;
- les sous-scores éventuels ;
- les seuils appliqués ;
- la date du calcul ;
- la version du code de calcul ou hash de configuration.

### 5.5 Restitution à la personne répondante

#### F-RES-001 — Page de résultat

Selon paramétrage, la page de résultat peut afficher :

- le score total ;
- le niveau correspondant ;
- une phrase d'explication ;
- un rappel que le questionnaire ne constitue pas un diagnostic ;
- un conseil de discussion avec un professionnel ;
- des informations d'urgence génériques si la personne se sent en danger immédiat ou présente des symptômes physiques inquiétants.

#### F-RES-002 — Mode sans restitution directe

Certaines organisations peuvent choisir de ne pas afficher le score directement à la personne. Dans ce cas, l'outil doit afficher un message clair, par exemple :

> Vos réponses ont été enregistrées. Elles seront consultées par un professionnel habilité selon les modalités prévues.

Le choix de masquage doit être justifié et documenté.

#### F-RES-003 — Avertissements sur symptômes physiques

Parce que certains items portent sur des douleurs thoraciques, palpitations, essoufflement ou étourdissements, l'outil doit éviter toute conclusion automatique selon laquelle ces symptômes sont uniquement liés à l'anxiété. Un message prudent doit indiquer qu'en cas de symptôme physique intense, inhabituel, persistant ou inquiétant, la personne doit contacter un professionnel ou les services d'urgence appropriés.

### 5.6 Restitution professionnelle

#### F-PRO-001 — Vue synthétique

La vue professionnelle doit afficher :

- date de passation ;
- mode de passation ;
- score total ;
- niveau ;
- complétude ;
- catégorie principale, si sous-scores activés ;
- comparaison avec passations précédentes ;
- lien vers le détail item par item.

#### F-PRO-002 — Vue détaillée

La vue détaillée doit afficher les 33 items avec :

- catégorie ;
- libellé ;
- réponse textuelle ;
- valeur numérique ;
- éventuel commentaire séparé ;
- indicateur de modification administrative, si applicable.

#### F-PRO-003 — Notes professionnelles

Les professionnels peuvent ajouter des notes, mais celles-ci doivent être séparées techniquement et visuellement des réponses de la personne.

#### F-PRO-004 — Historique longitudinal

La vue historique doit permettre :

- un tableau des passations ;
- un graphique du score total ;
- le filtrage par période ;
- l'export contrôlé ;
- l'identification des passations incomplètes.

### 5.7 Exports

#### F-EXP-001 — Export PDF individuel

L'export PDF doit contenir :

- titre du questionnaire ;
- identité ou pseudonyme selon contexte ;
- date de passation ;
- version du questionnaire ;
- instructions abrégées ;
- items et réponses ;
- score total ;
- niveau ;
- avertissement clinique ;
- date et auteur de l'export ;
- mention de confidentialité.

#### F-EXP-002 — Export CSV

L'export CSV doit être réservé aux utilisateurs habilités. Il doit séparer :

- données directement identifiantes ;
- données de réponse ;
- métadonnées ;
- scores.

Les exports populationnels doivent utiliser une pseudonymisation forte lorsque l'identification directe n'est pas nécessaire.

#### F-EXP-003 — Export JSON

L'export JSON doit suivre un schéma stable, versionné et documenté.

#### F-EXP-004 — Journalisation des exports

Tout export doit créer une entrée d'audit contenant :

- utilisateur ;
- finalité ;
- type d'export ;
- périmètre ;
- horodatage ;
- succès ou échec ;
- adresse IP ou contexte technique ;
- identifiant du fichier exporté ou empreinte.

### 5.8 Notifications

#### F-NOT-001 — Invitation

Le système peut envoyer une invitation contenant :

- une phrase neutre ;
- un lien sécurisé ;
- une date limite ;
- un contact support ;
- aucune donnée de santé explicite dans le sujet ou le corps du message, sauf validation.

#### F-NOT-002 — Relance

Les relances doivent être limitées, configurables et non culpabilisantes.

#### F-NOT-003 — Notification de soumission

Un professionnel peut être notifié qu'un questionnaire a été soumis. La notification ne doit pas contenir le score si le canal n'est pas sécurisé.

#### F-NOT-004 — Notification de score élevé

Toute notification liée à un score élevé doit être soumise à un protocole clinique validé. À défaut, l'outil ne doit pas générer d'alerte automatique et doit seulement rendre le résultat disponible dans le dossier habilité.

### 5.9 Administration

#### F-ADM-001 — Gestion des organisations

L'application doit permettre de gérer plusieurs organisations ou services, avec cloisonnement des données.

#### F-ADM-002 — Gestion des rôles

Les rôles minimaux sont :

- répondant ;
- professionnel lecteur ;
- professionnel prescripteur d'invitation ;
- administrateur fonctionnel ;
- administrateur technique ;
- DPO/RSSI lecture audit ;
- analyste pseudonymisé.

#### F-ADM-003 — Paramétrage des résultats

L'administrateur fonctionnel peut configurer :

- affichage ou non du score à la personne ;
- affichage ou non des sous-scores ;
- messages d'accompagnement ;
- durée de validité des invitations ;
- fréquence des relances ;
- disponibilité des exports.

Les seuils et items ne doivent pas être modifiables en production sans création d'une nouvelle version clinique.

#### F-ADM-004 — Gestion de version

Le système doit interdire la suppression physique d'une version utilisée par des réponses. Les versions peuvent être archivées.

### 5.10 Journalisation et audit

#### F-AUD-001 — Événements à tracer

Les événements à tracer incluent :

- création d'invitation ;
- consultation d'invitation ;
- démarrage de passation ;
- sauvegarde de brouillon ;
- soumission ;
- calcul de score ;
- consultation du résultat ;
- export ;
- modification administrative ;
- suppression ou anonymisation ;
- échec d'authentification ;
- changement de droits ;
- accès bris de glace, si prévu.

#### F-AUD-002 — Intégrité des journaux

Les journaux doivent être protégés contre la modification non autorisée et conservés selon la politique de sécurité.

#### F-AUD-003 — Consultation des audits

Les audits doivent être consultables par des profils habilités, avec filtrage par patient, utilisateur, date, action et organisation.

---

## 6. Exigences UX et interface

### 6.1 Principes généraux

L'interface doit être :

- sobre ;
- lisible ;
- non anxiogène ;
- utilisable sur mobile ;
- compatible lecteur d'écran ;
- utilisable au clavier ;
- claire sur la période de référence ;
- transparente sur la confidentialité ;
- explicite sur le caractère non diagnostique du résultat.

### 6.2 Page d'accueil du questionnaire

La page d'accueil doit contenir :

- titre : Inventaire de Burns pour mesurer l'anxiété ;
- durée estimée ou indication « 33 questions » ;
- période de référence : dernière semaine ;
- consigne de réponse ;
- explication des quatre choix ;
- mention de confidentialité ;
- bouton « Commencer » ;
- lien « J'ai besoin d'aide pour répondre » ;
- lien « Confidentialité et utilisation de mes données ».

### 6.3 Présentation des questions

Chaque question doit afficher :

- numéro de question ;
- catégorie ;
- libellé ;
- échelle de réponse ;
- choix sélectionné ;
- boutons précédent/suivant ;
- progression.

Exemple :

```text
Question 18 sur 33
Catégorie III — Manifestations par des symptômes physiques

Cœur qui s'accélère, qui bat fort ou dont le rythme est parfois irrégulier (palpitations)

Dans la dernière semaine, ce symptôme vous a affecté :
[ ] Pas du tout (0)
[ ] Quelquefois (1)
[ ] Assez souvent (2)
[ ] Beaucoup (3)
```

### 6.4 Modes d'affichage

| Mode | Avantages | Limites | Recommandation |
|---|---|---|---|
| Une page complète | Ressemble au papier, rapide sur ordinateur | Dense, difficile sur mobile | Option professionnel |
| Par catégorie | Bon compromis | Peut masquer la progression fine | Recommandé desktop |
| Item par item | Accessible, mobile, faible charge cognitive | Plus long | Recommandé par défaut grand public |
| Tableau matriciel | Compact | Risque d'erreurs et accessibilité plus complexe | À réserver aux professionnels formés |

### 6.5 Gestion des erreurs

Les messages d'erreur doivent être précis et actionnables :

- « Veuillez choisir une réponse pour la question 12. »
- « Il reste 3 questions sans réponse. »
- « Votre session a expiré. Aucune réponse n'a été soumise. »
- « Le lien a déjà été utilisé. Demandez une nouvelle invitation si nécessaire. »

Les erreurs ne doivent pas effacer les réponses déjà saisies.

### 6.6 Page de relecture

La page de relecture doit afficher :

- résumé de progression ;
- liste des réponses ;
- liens de correction par question ;
- avertissement avant soumission ;
- bouton de soumission distinct du bouton de sauvegarde.

### 6.7 Page de résultat

La page de résultat peut afficher :

```text
Score total : 24 / 99
Interprétation : anxiété modérée

Ce résultat est une indication issue d'un questionnaire d'auto-évaluation. Il ne remplace pas un avis professionnel. Si certains symptômes vous inquiètent ou si vous vous sentez en danger, contactez un professionnel ou les services d'urgence adaptés.
```

Le texte exact doit être validé localement.

### 6.8 Visualisation longitudinale

Le graphique longitudinal doit :

- afficher les dates en abscisse ;
- afficher le score total en ordonnée ;
- indiquer les passations incomplètes ;
- signaler les changements de version ;
- éviter les termes « amélioration » ou « aggravation » sans validation clinique ;
- proposer une alternative textuelle accessible.

### 6.9 Responsive design

L'application doit être utilisable sur :

- smartphone portrait ;
- smartphone paysage ;
- tablette ;
- ordinateur portable ;
- grand écran professionnel.

Les zones tactiles doivent être suffisamment grandes. Les boutons radio doivent pouvoir être sélectionnés en cliquant sur le libellé complet.

### 6.10 Ton rédactionnel

Le ton doit être :

- direct ;
- rassurant ;
- non jugeant ;
- sans infantilisation ;
- sans dramatisation ;
- compatible avec une situation d'anxiété.

À éviter :

- « Votre score est grave » ;
- « Vous êtes anxieux » ;
- « Vous devez consulter » ;
- « Répondez correctement ».

À privilégier :

- « Votre résultat indique un niveau d'anxiété très marqué selon cette échelle. »
- « Ce résultat peut être discuté avec un professionnel. »
- « En cas de danger immédiat ou de symptôme physique inquiétant, contactez les urgences. »

---

## 7. Accessibilité

### 7.1 Référentiel cible

L'outil doit viser une conformité :

- RGAA applicable au contexte français lorsque l'organisation y est soumise ;
- WCAG 2.2 niveau AA comme cible internationale recommandée ;
- compatibilité avec les lecteurs d'écran courants ;
- navigation complète au clavier ;
- respect des préférences utilisateur concernant contraste, taille de texte et réduction des animations.

### 7.2 Exigences pour les formulaires

Chaque item doit être implémenté avec :

- un élément `fieldset` ;
- un `legend` contenant le numéro, la catégorie et le libellé ;
- des `input type="radio"` ;
- des `label` associés ;
- un état d'erreur lié par `aria-describedby` ;
- un ordre de tabulation logique.

### 7.3 Charge cognitive

Pour réduire la charge cognitive :

- utiliser une question par écran par défaut ;
- afficher une progression simple ;
- répéter discrètement la période de référence ;
- éviter les tableaux trop larges ;
- proposer une taille de texte confortable ;
- permettre une pause ;
- ne pas utiliser de compte à rebours.

### 7.4 Contraste et lisibilité

Les exigences minimales :

- contraste texte/fond conforme au niveau AA ;
- police lisible ;
- interligne suffisant ;
- pas de texte uniquement en capitales pour les longs contenus ;
- focus visible ;
- erreurs visibles autrement que par la couleur.

### 7.5 Langage et compréhension

L'outil doit pouvoir intégrer :

- une aide contextuelle sur les modalités de réponse ;
- une version facile à lire et à comprendre, si validée ;
- une lecture audio, si le contexte le justifie ;
- des explications distinctes des items officiels pour ne pas altérer le questionnaire.

### 7.6 Tests d'accessibilité

Les tests doivent couvrir :

- navigation clavier ;
- lecteur d'écran ;
- zoom 200 % et 400 % ;
- contraste ;
- affichage mobile ;
- erreurs de formulaire ;
- génération PDF accessible lorsque possible ;
- parcours complet sans souris.

---

## 8. Règles métier

### 8.1 Référentiel des réponses

Les seules valeurs autorisées sont :

| Valeur | Libellé | Signification applicative |
|---:|---|---|
| 0 | Pas du tout | symptôme absent ou non ressenti pendant la période |
| 1 | Quelquefois | symptôme présent occasionnellement |
| 2 | Assez souvent | symptôme présent fréquemment |
| 3 | Beaucoup | symptôme très présent ou fortement ressenti |

Le système ne doit pas accepter de valeur décimale, négative, supérieure à 3 ou non numérique.

### 8.2 Complétude

Règle par défaut :

```text
Un score total interprétable exige 33 réponses valides.
```

Si une ou plusieurs réponses manquent :

- statut de réponse : `incomplete` ;
- score total : non calculé ou calculé techniquement mais non interprété ;
- niveau : `not_available` ;
- message : « Le questionnaire n'est pas complet. »

### 8.3 Période de référence

La période de référence est la dernière semaine. Elle doit être enregistrée avec la réponse sous forme de métadonnée :

```json
{
  "timeframe": {
    "type": "relative_period",
    "label": "dernière semaine",
    "durationDays": 7
  }
}
```

### 8.4 Score total

Le total est un entier compris entre 0 et 99.

```text
total = q01 + q02 + ... + q33
```

### 8.5 Niveaux d'anxiété

| Condition | Niveau |
|---|---|
| `0 <= total <= 5` | anxiété minimale |
| `6 <= total <= 15` | anxiété légère |
| `16 <= total <= 30` | anxiété modérée |
| `31 <= total <= 50` | anxiété marquée |
| `51 <= total <= 99` | anxiété très marquée |

Aucun score supérieur à 99 ne doit être possible avec une passation valide.

### 8.6 Sous-scores descriptifs

Sous-scores optionnels :

| Sous-score | Items | Minimum | Maximum |
|---|---|---:|---:|
| Sentiments | 1 à 6 | 0 | 18 |
| Pensée | 7 à 17 | 0 | 33 |
| Symptômes physiques | 18 à 33 | 0 | 48 |

Ils doivent être étiquetés comme **descriptifs** si aucun seuil validé n'est défini.

### 8.7 Versions

Une réponse doit toujours référencer :

- `questionnaire_version_id` ;
- `scoring_config_id` ;
- `language` ;
- `item_count` ;
- `choice_scale_version`.

### 8.8 Modification après soumission

Une réponse soumise est immuable. Les corrections doivent être gérées par :

- annulation ;
- création d'une nouvelle passation ;
- correction administrative tracée avec justification.

### 8.9 Suppression et anonymisation

La suppression doit distinguer :

- suppression logique ;
- anonymisation irréversible ;
- suppression physique différée ;
- conservation des journaux nécessaires à la sécurité.

La politique doit être validée par le DPO et alignée avec les obligations applicables.

### 8.10 Règles de sécurité fonctionnelle

Le système doit empêcher :

- la consultation d'une réponse par un utilisateur non habilité ;
- l'export en masse sans autorisation spécifique ;
- la modification de seuils en production sans version ;
- la réutilisation d'un lien d'invitation expiré ;
- l'exposition du score dans un canal non sécurisé ;
- l'affichage de résultats d'une autre personne.

### 8.11 Règles relatives aux alertes

Aucune alerte clinique automatique ne doit être activée par défaut. Si une organisation souhaite une alerte pour un score élevé, elle doit définir :

- finalité ;
- base légale ;
- seuil ;
- destinataires ;
- délai de traitement ;
- procédure en dehors des heures ouvrées ;
- message affiché à la personne ;
- traçabilité ;
- validation clinique et juridique.

---

## 9. Spécification de score

### 9.1 Variables

Soit `A_i` la réponse numérique à l'item `i`, pour `i` compris entre 1 et 33.

```text
A_i ∈ {0, 1, 2, 3}
```

### 9.2 Formule principale

```text
score_total = Σ A_i, pour i = 1..33
```

### 9.3 Domaine de validité

```text
0 <= score_total <= 99
```

### 9.4 Règle de complétude par défaut

```text
si count(A_i valides) = 33 alors score_status = "complete"
sinon score_status = "incomplete"
```

L'interprétation ne doit être produite que si `score_status = complete`.

### 9.5 Seuils

```text
0  <= score_total <= 5   => minimal
6  <= score_total <= 15  => mild
16 <= score_total <= 30  => moderate
31 <= score_total <= 50  => marked
51 <= score_total <= 99  => very_marked
```

### 9.6 Pseudocode

```text
function scoreBurnsAnxietyInventory(answers):
    expected_items = [q01..q33]
    missing = []
    invalid = []

    for item in expected_items:
        if item not in answers:
            missing.append(item)
        else if answers[item] not in [0, 1, 2, 3]:
            invalid.append(item)

    if missing or invalid:
        return {
            scoreStatus: "incomplete",
            totalScore: null,
            severityBand: "not_available",
            missingItems: missing,
            invalidItems: invalid
        }

    total = sum(answers[item] for item in expected_items)

    if total <= 5:
        band = "minimal"
    else if total <= 15:
        band = "mild"
    else if total <= 30:
        band = "moderate"
    else if total <= 50:
        band = "marked"
    else:
        band = "very_marked"

    return {
        scoreStatus: "complete",
        totalScore: total,
        maxScore: 99,
        severityBand: band,
        subScores: {
            feelings: sum(q01..q06),
            thoughts: sum(q07..q17),
            physical: sum(q18..q33)
        }
    }
```

### 9.7 Implémentation TypeScript recommandée

```ts
type BurnsAnswerValue = 0 | 1 | 2 | 3;

type BurnsItemCode =
  | "q01" | "q02" | "q03" | "q04" | "q05" | "q06"
  | "q07" | "q08" | "q09" | "q10" | "q11" | "q12" | "q13" | "q14" | "q15" | "q16" | "q17"
  | "q18" | "q19" | "q20" | "q21" | "q22" | "q23" | "q24" | "q25" | "q26" | "q27" | "q28" | "q29" | "q30" | "q31" | "q32" | "q33";

type SeverityBand = "minimal" | "mild" | "moderate" | "marked" | "very_marked";

const ITEM_CODES: BurnsItemCode[] = [
  "q01", "q02", "q03", "q04", "q05", "q06",
  "q07", "q08", "q09", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17",
  "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "q26", "q27", "q28", "q29", "q30", "q31", "q32", "q33",
];

export function calculateBurnsScore(answers: Partial<Record<BurnsItemCode, number>>) {
  const missingItems: BurnsItemCode[] = [];
  const invalidItems: BurnsItemCode[] = [];

  for (const code of ITEM_CODES) {
    const value = answers[code];
    if (value === undefined || value === null) {
      missingItems.push(code);
      continue;
    }
    if (![0, 1, 2, 3].includes(value)) {
      invalidItems.push(code);
    }
  }

  if (missingItems.length > 0 || invalidItems.length > 0) {
    return {
      scoreStatus: "incomplete" as const,
      totalScore: null,
      maxScore: 99,
      severityBand: "not_available" as const,
      missingItems,
      invalidItems,
    };
  }

  const totalScore = ITEM_CODES.reduce((sum, code) => sum + (answers[code] as BurnsAnswerValue), 0);
  const severityBand: SeverityBand =
    totalScore <= 5 ? "minimal" :
    totalScore <= 15 ? "mild" :
    totalScore <= 30 ? "moderate" :
    totalScore <= 50 ? "marked" :
    "very_marked";

  const sumRange = (from: number, to: number) =>
    ITEM_CODES.slice(from - 1, to).reduce((sum, code) => sum + (answers[code] as BurnsAnswerValue), 0);

  return {
    scoreStatus: "complete" as const,
    totalScore,
    maxScore: 99,
    severityBand,
    missingItems: [],
    invalidItems: [],
    subScores: {
      feelings: { value: sumRange(1, 6), max: 18 },
      thoughts: { value: sumRange(7, 17), max: 33 },
      physical: { value: sumRange(18, 33), max: 48 },
    },
  };
}
```

### 9.8 Cas de test obligatoires

| Cas | Réponses | Score attendu | Niveau attendu |
|---|---|---:|---|
| Tout à 0 | 33 réponses à 0 | 0 | anxiété minimale |
| Seuil haut minimal | total 5 | 5 | anxiété minimale |
| Seuil bas légère | total 6 | 6 | anxiété légère |
| Seuil haut légère | total 15 | 15 | anxiété légère |
| Seuil bas modérée | total 16 | 16 | anxiété modérée |
| Seuil haut modérée | total 30 | 30 | anxiété modérée |
| Seuil bas marquée | total 31 | 31 | anxiété marquée |
| Seuil haut marquée | total 50 | 50 | anxiété marquée |
| Seuil bas très marquée | total 51 | 51 | anxiété très marquée |
| Maximum | 33 réponses à 3 | 99 | anxiété très marquée |
| Une réponse manquante | 32 réponses valides | null | non disponible |
| Valeur invalide | une réponse à 4 | null | non disponible |
| Valeur négative | une réponse à -1 | null | non disponible |
| Valeur texte | une réponse à `"2"` non convertie | null | non disponible |

### 9.9 Politique de proratisation

La proratisation n'est pas recommandée par défaut. Si une organisation souhaite l'utiliser, elle doit documenter une règle spécifique, par exemple :

```text
si missing_count <= 2 :
    prorated_total = round(sum_answered * 33 / answered_count)
sinon :
    score incomplet
```

Cette règle ne figure pas dans le formulaire source. Elle doit donc être désactivée par défaut, signalée dans l'export et validée cliniquement avant usage.

---

## 10. Architecture cible

### 10.1 Vue d'ensemble

Architecture recommandée :

```text
[Utilisateur web]
      |
      v
[Frontend Web React/Next.js]
      |
      v
[API Backend REST/GraphQL]
      |
      +--> [Service Questionnaire]
      +--> [Service Score]
      +--> [Service PDF/Export]
      +--> [Service Notification]
      +--> [Service Audit]
      +--> [Service Interopérabilité]
      |
      v
[Base PostgreSQL chiffrée]
      |
      +--> [Stockage objets chiffré pour exports]
      +--> [Bus événements interne]
      +--> [SI santé / DPI / FHIR, optionnel]
```

### 10.2 Composants applicatifs

| Composant | Responsabilités |
|---|---|
| Frontend | Affichage questionnaire, saisie, validation client, résultat, accessibilité |
| API Gateway | Routage, authentification, limitation débit, sécurité périmétrique |
| Service Questionnaire | Versions, items, choix, instructions, disponibilité |
| Service Passation | Sessions, brouillons, soumissions, statuts |
| Service Score | Calcul déterministe, seuils, sous-scores, tests de cohérence |
| Service Résultat | Restitution personne/professionnel, longitudinal |
| Service Export | PDF, CSV, JSON, génération et stockage temporaire |
| Service Notification | Invitations, relances, messages transactionnels |
| Service Audit | Journalisation et consultation des événements |
| Service IAM | Rôles, habilitations, organisation, délégations |
| Service Interop | Mapping FHIR ou connecteurs DPI |
| Backoffice | Paramétrage, supervision fonctionnelle, gestion versions |

### 10.3 Choix techniques recommandés

| Couche | Option recommandée | Commentaire |
|---|---|---|
| Frontend | Next.js ou React SPA | SSR utile mais attention aux données sensibles dans cache |
| Backend | NestJS, FastAPI, Spring Boot ou .NET | Choix selon socle existant |
| Base | PostgreSQL | Relationnel adapté au questionnaire et audit |
| Cache | Redis | Sessions, files temporaires, anti-rejeu |
| Stockage fichiers | S3 compatible chiffré | Exports PDF temporaires |
| Authentification | OIDC/OAuth2 | Compatible IAM entreprise |
| Déploiement | Kubernetes ou PaaS HDS | Selon stratégie hébergement |
| Observabilité | OpenTelemetry + SIEM | Traces techniques sans données sensibles |
| PDF | Génération serveur HTML-to-PDF | Contrôle rendu et archivage |
| IaC | Terraform/OpenTofu | Reproductibilité infra |

### 10.4 Environnements

Minimum :

- développement ;
- intégration ;
- recette fonctionnelle ;
- préproduction ;
- production ;
- environnement de formation ou démonstration avec données fictives.

Les données réelles ne doivent pas être copiées en environnement non production sans anonymisation robuste et validation DPO/RSSI.

### 10.5 Principes d'architecture

1. Séparation claire entre questionnaire, réponses, scores et exports.
2. Immutabilité des réponses soumises.
3. Versionnement explicite du contenu clinique.
4. Calcul de score côté serveur comme source de vérité.
5. Validation client uniquement comme aide utilisateur.
6. Journalisation systématique des accès.
7. Cloisonnement organisationnel.
8. Chiffrement au repos et en transit.
9. Réversibilité des données.
10. Éviter tout stockage de données sensibles dans logs, URL ou analytics tiers.

### 10.6 Disponibilité et résilience

L'application doit :

- tolérer la perte d'un worker sans perte de réponse soumise ;
- exécuter les calculs de score dans une transaction ;
- permettre la reprise après incident ;
- sauvegarder la base ;
- tester les restaurations ;
- empêcher la perte silencieuse d'un export ;
- surveiller les erreurs de soumission.

---

## 11. Modèle de données conceptuel

### 11.1 Entités principales

| Entité | Description |
|---|---|
| `Organization` | Structure utilisant l'outil |
| `User` | Compte applicatif |
| `Person` | Personne répondante ou patient |
| `Questionnaire` | Définition générale du questionnaire |
| `QuestionnaireVersion` | Version précise des items et règles |
| `QuestionnaireItem` | Item individuel |
| `ResponseChoice` | Choix de réponse |
| `AssessmentAssignment` | Invitation ou demande de passation |
| `AssessmentResponse` | Réponse globale soumise ou brouillon |
| `AssessmentAnswer` | Réponse à un item |
| `ScoringConfig` | Règle de calcul versionnée |
| `ScoreResult` | Résultat calculé |
| `ClinicalNote` | Note séparée d'un professionnel |
| `ExportFile` | Export généré |
| `Notification` | Invitation ou relance |
| `AuditEvent` | Journal d'événements |
| `ConsentRecord` | Information/consentement selon contexte |
| `AccessGrant` | Droit d'accès explicite ou organisationnel |

### 11.2 Relations clés

```text
Organization 1--N User
Organization 1--N Person
Questionnaire 1--N QuestionnaireVersion
QuestionnaireVersion 1--N QuestionnaireItem
QuestionnaireVersion 1--N ScoringConfig
Person 1--N AssessmentAssignment
AssessmentAssignment 0..1--1 AssessmentResponse
AssessmentResponse 1--N AssessmentAnswer
AssessmentResponse 1--1 ScoreResult
AssessmentResponse 0..N--N ExportFile
User 1--N AuditEvent
```

### 11.3 Statuts recommandés

#### Statuts d'invitation

- `draft` ;
- `scheduled` ;
- `sent` ;
- `opened` ;
- `started` ;
- `submitted` ;
- `expired` ;
- `cancelled`.

#### Statuts de réponse

- `draft` ;
- `submitted` ;
- `voided` ;
- `superseded` ;
- `deleted` ;
- `anonymized`.

#### Statuts de score

- `complete` ;
- `incomplete` ;
- `invalid` ;
- `not_calculated`.

### 11.4 Données sensibles

Données à considérer comme sensibles :

- identité ;
- réponses aux items ;
- score ;
- niveau d'anxiété ;
- historique de passations ;
- notes professionnelles ;
- métadonnées de consultation ;
- informations de contact ;
- liens entre personnes et organisations de soin.

### 11.5 Données dérivées

Données dérivées à stocker avec prudence :

- total ;
- sous-scores ;
- niveau ;
- évolution entre deux passations ;
- indicateurs de complétude ;
- statistiques populationnelles.

---

## 12. Modèle de données logique PostgreSQL

### 12.1 Extensions et types

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE assessment_mode AS ENUM (
  'self_administered',
  'assisted',
  'professional_administered',
  'paper_import'
);

CREATE TYPE assignment_status AS ENUM (
  'draft',
  'scheduled',
  'sent',
  'opened',
  'started',
  'submitted',
  'expired',
  'cancelled'
);

CREATE TYPE response_status AS ENUM (
  'draft',
  'submitted',
  'voided',
  'superseded',
  'deleted',
  'anonymized'
);

CREATE TYPE score_status AS ENUM (
  'complete',
  'incomplete',
  'invalid',
  'not_calculated'
);

CREATE TYPE severity_band AS ENUM (
  'minimal',
  'mild',
  'moderate',
  'marked',
  'very_marked',
  'not_available'
);
```

### 12.2 Organisations et utilisateurs

```sql
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id),
  external_subject text,
  email text,
  display_name text,
  role text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  mfa_enabled boolean NOT NULL DEFAULT false,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, external_subject)
);

CREATE INDEX idx_users_org_role ON users(organization_id, role);
```

### 12.3 Personnes répondantes

```sql
CREATE TABLE persons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  external_patient_id text,
  pseudonym text,
  family_name text,
  given_name text,
  birth_date date,
  email text,
  phone text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, external_patient_id)
);

CREATE INDEX idx_persons_org ON persons(organization_id);
CREATE INDEX idx_persons_pseudonym ON persons(pseudonym);
```

### 12.4 Questionnaire

```sql
CREATE TABLE questionnaires (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  default_language text NOT NULL DEFAULT 'fr-FR',
  rights_status text NOT NULL DEFAULT 'unknown',
  rights_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE questionnaire_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_id uuid NOT NULL REFERENCES questionnaires(id),
  version text NOT NULL,
  language text NOT NULL DEFAULT 'fr-FR',
  title text NOT NULL,
  subtitle text,
  instructions text NOT NULL,
  timeframe_label text NOT NULL DEFAULT 'dernière semaine',
  item_count integer NOT NULL CHECK (item_count = 33),
  status text NOT NULL DEFAULT 'draft',
  effective_from timestamptz,
  effective_to timestamptz,
  source_reference text,
  content_hash text NOT NULL,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (questionnaire_id, version, language)
);

CREATE TABLE questionnaire_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_version_id uuid NOT NULL REFERENCES questionnaire_versions(id) ON DELETE CASCADE,
  code text NOT NULL,
  label text NOT NULL,
  display_order integer NOT NULL,
  item_from integer NOT NULL,
  item_to integer NOT NULL,
  max_score integer NOT NULL,
  UNIQUE (questionnaire_version_id, code)
);

CREATE TABLE questionnaire_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_version_id uuid NOT NULL REFERENCES questionnaire_versions(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES questionnaire_categories(id),
  code text NOT NULL,
  item_number integer NOT NULL CHECK (item_number BETWEEN 1 AND 33),
  label text NOT NULL,
  help_text text,
  is_required boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL,
  UNIQUE (questionnaire_version_id, code),
  UNIQUE (questionnaire_version_id, item_number)
);

CREATE TABLE response_choices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_version_id uuid NOT NULL REFERENCES questionnaire_versions(id) ON DELETE CASCADE,
  code text NOT NULL,
  label text NOT NULL,
  numeric_value integer NOT NULL CHECK (numeric_value BETWEEN 0 AND 3),
  display_order integer NOT NULL,
  UNIQUE (questionnaire_version_id, code),
  UNIQUE (questionnaire_version_id, numeric_value)
);
```

### 12.5 Invitations et réponses

```sql
CREATE TABLE assessment_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  person_id uuid REFERENCES persons(id),
  questionnaire_version_id uuid NOT NULL REFERENCES questionnaire_versions(id),
  assigned_by uuid REFERENCES users(id),
  mode assessment_mode NOT NULL DEFAULT 'self_administered',
  status assignment_status NOT NULL DEFAULT 'draft',
  invitation_token_hash text,
  invitation_expires_at timestamptz,
  due_at timestamptz,
  sent_at timestamptz,
  opened_at timestamptz,
  started_at timestamptz,
  submitted_at timestamptz,
  cancelled_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_assignments_org_person ON assessment_assignments(organization_id, person_id);
CREATE INDEX idx_assignments_status ON assessment_assignments(status);
CREATE INDEX idx_assignments_token_hash ON assessment_assignments(invitation_token_hash);

CREATE TABLE assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  person_id uuid REFERENCES persons(id),
  assignment_id uuid REFERENCES assessment_assignments(id),
  questionnaire_version_id uuid NOT NULL REFERENCES questionnaire_versions(id),
  mode assessment_mode NOT NULL,
  status response_status NOT NULL DEFAULT 'draft',
  started_at timestamptz,
  submitted_at timestamptz,
  voided_at timestamptz,
  voided_by uuid REFERENCES users(id),
  void_reason text,
  client_context jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_context jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_responses_org_person ON assessment_responses(organization_id, person_id);
CREATE INDEX idx_responses_submitted_at ON assessment_responses(submitted_at);
CREATE INDEX idx_responses_questionnaire_version ON assessment_responses(questionnaire_version_id);

CREATE TABLE assessment_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL REFERENCES assessment_responses(id) ON DELETE CASCADE,
  questionnaire_item_id uuid NOT NULL REFERENCES questionnaire_items(id),
  item_code text NOT NULL,
  numeric_value integer NOT NULL CHECK (numeric_value BETWEEN 0 AND 3),
  choice_code text NOT NULL,
  answered_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (response_id, item_code)
);

CREATE INDEX idx_answers_response ON assessment_answers(response_id);
```

### 12.6 Score

```sql
CREATE TABLE scoring_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_version_id uuid NOT NULL REFERENCES questionnaire_versions(id),
  code text NOT NULL,
  version text NOT NULL,
  algorithm text NOT NULL,
  requires_complete_response boolean NOT NULL DEFAULT true,
  min_score integer NOT NULL DEFAULT 0,
  max_score integer NOT NULL DEFAULT 99,
  thresholds jsonb NOT NULL,
  subscore_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (questionnaire_version_id, code, version)
);

CREATE TABLE score_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL UNIQUE REFERENCES assessment_responses(id) ON DELETE CASCADE,
  scoring_config_id uuid NOT NULL REFERENCES scoring_configs(id),
  score_status score_status NOT NULL,
  answered_count integer NOT NULL,
  missing_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  invalid_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_score integer CHECK (total_score BETWEEN 0 AND 99),
  max_score integer NOT NULL DEFAULT 99,
  normalized_percent numeric(5,2),
  severity severity_band NOT NULL DEFAULT 'not_available',
  severity_label text,
  sub_scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  calculated_at timestamptz NOT NULL DEFAULT now(),
  calculation_trace jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_score_results_severity ON score_results(severity);
CREATE INDEX idx_score_results_total ON score_results(total_score);
```

### 12.7 Notes, exports et notifications

```sql
CREATE TABLE clinical_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  response_id uuid NOT NULL REFERENCES assessment_responses(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users(id),
  note_text text NOT NULL,
  visibility text NOT NULL DEFAULT 'care_team',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE export_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  response_id uuid REFERENCES assessment_responses(id),
  export_type text NOT NULL,
  storage_uri text NOT NULL,
  sha256 text NOT NULL,
  requested_by uuid NOT NULL REFERENCES users(id),
  purpose text NOT NULL,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  assignment_id uuid REFERENCES assessment_assignments(id),
  recipient_person_id uuid REFERENCES persons(id),
  recipient_user_id uuid REFERENCES users(id),
  channel text NOT NULL,
  template_code text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  scheduled_at timestamptz,
  sent_at timestamptz,
  error_message text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

### 12.8 Consentement, habilitations et audit

```sql
CREATE TABLE consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  person_id uuid REFERENCES persons(id),
  consent_type text NOT NULL,
  status text NOT NULL,
  text_version text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  recorded_by uuid REFERENCES users(id),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE access_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  person_id uuid REFERENCES persons(id),
  user_id uuid REFERENCES users(id),
  role text NOT NULL,
  scope text NOT NULL,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id),
  actor_user_id uuid REFERENCES users(id),
  actor_type text NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  person_id uuid REFERENCES persons(id),
  outcome text NOT NULL,
  reason text,
  ip_address inet,
  user_agent text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_person_created ON audit_events(person_id, created_at);
CREATE INDEX idx_audit_actor_created ON audit_events(actor_user_id, created_at);
CREATE INDEX idx_audit_action_created ON audit_events(action, created_at);
```

### 12.9 Contraintes complémentaires

Contraintes recommandées :

- vérifier que `assessment_answers.item_code` appartient à la version de questionnaire liée ;
- empêcher la soumission si le nombre de réponses valides est différent de 33 ;
- empêcher plusieurs `score_results` pour une même réponse ;
- empêcher la suppression d'une version utilisée ;
- créer des politiques Row-Level Security si la base est partagée entre organisations ;
- chiffrer applicativement les champs les plus sensibles si nécessaire.

---

## 13. Source de vérité du questionnaire en YAML

```yaml
questionnaire:
  code: burns_anxiety_inventory_fr
  title: "Inventaire de Burns"
  subtitle: "Pour mesurer l'anxiété"
  language: fr-FR
  version: "1.0.0"
  source: "PDF fourni : anxiete-inventaire-de-burns.pdf"
  timeframe:
    label: "durant la dernière semaine"
    duration_days: 7
  instructions: >
    Les symptômes de l'anxiété peuvent être divisés en trois catégories selon
    qu'ils se manifestent au niveau des sentiments, au niveau de la pensée ou
    par des symptômes physiques. Pour évaluer votre niveau d'anxiété, marquez
    la réponse décrivant le mieux comment chaque symptôme ou problème vous a
    affecté durant la dernière semaine. Additionnez le total de votre pointage,
    puis interprétez-le à l'aide de l'échelle fournie à la fin de l'inventaire.
  response_scale:
    - code: not_at_all
      label: "Pas du tout"
      value: 0
      order: 1
    - code: sometimes
      label: "Quelquefois"
      value: 1
      order: 2
    - code: fairly_often
      label: "Assez souvent"
      value: 2
      order: 3
    - code: a_lot
      label: "Beaucoup"
      value: 3
      order: 4
  categories:
    - code: feelings
      label: "Catégorie I : Manifestations au niveau des sentiments"
      item_from: 1
      item_to: 6
      max_score: 18
    - code: thoughts
      label: "Catégorie II : Manifestations au niveau de la pensée"
      item_from: 7
      item_to: 17
      max_score: 33
    - code: physical
      label: "Catégorie III : Manifestations par des symptômes physiques"
      item_from: 18
      item_to: 33
      max_score: 48
  items:
    - code: q01
      number: 1
      category: feelings
      label: "sentiment d'anxiété, de nervosité, d'inquiétude ou de peur"
    - code: q02
      number: 2
      category: feelings
      label: "ressentir votre environnement immédiat comme étrange, irréel ou embrouillé"
    - code: q03
      number: 3
      category: feelings
      label: "sentiment d'être séparé de l'ensemble ou d'une partie de votre corps"
    - code: q04
      number: 4
      category: feelings
      label: "périodes de panique soudaines et inattendues"
    - code: q05
      number: 5
      category: feelings
      label: "appréhension ou sens d'un danger imminent"
    - code: q06
      number: 6
      category: feelings
      label: "sentiment d'être tendu, stressé, oppressé, crispé"
    - code: q07
      number: 7
      category: thoughts
      label: "avoir des difficultés de concentration"
    - code: q08
      number: 8
      category: thoughts
      label: "avoir un flot de pensées rapides ou l'esprit qui saute constamment d'un sujet à l'autre"
    - code: q09
      number: 9
      category: thoughts
      label: "être songeur durant la journée ou être dérangé par des pensées effrayantes"
    - code: q10
      number: 10
      category: thoughts
      label: "sentir que vous êtes sur le point de perdre le contrôle"
    - code: q11
      number: 11
      category: thoughts
      label: "avoir peur de « craquer » ou de devenir fou"
    - code: q12
      number: 12
      category: thoughts
      label: "avoir peur de défaillir ou de vous évanouir"
    - code: q13
      number: 13
      category: thoughts
      label: "avoir peur de souffrir d'une maladie physique, d'une crise cardiaque ou de mourir"
    - code: q14
      number: 14
      category: thoughts
      label: "avoir peur de paraître ridicule ou inadéquat face aux autres"
    - code: q15
      number: 15
      category: thoughts
      label: "avoir peur d'être seul, isolé ou abandonné"
    - code: q16
      number: 16
      category: thoughts
      label: "avoir peur d'être critiqué ou désapprouvé"
    - code: q17
      number: 17
      category: thoughts
      label: "avoir peur qu'un événement tragique ne soit sur le point d'arriver"
    - code: q18
      number: 18
      category: physical
      label: "cœur qui s'accélère, qui bat fort ou dont le rythme est parfois irrégulier (palpitations)"
    - code: q19
      number: 19
      category: physical
      label: "douleurs ou serrements dans la poitrine"
    - code: q20
      number: 20
      category: physical
      label: "engourdissements ou fourmillements des extrémités"
    - code: q21
      number: 21
      category: physical
      label: "malaises ou « papillons » dans l'estomac"
    - code: q22
      number: 22
      category: physical
      label: "constipation et/ou diarrhée"
    - code: q23
      number: 23
      category: physical
      label: "sensations de fatigue et/ou réactions de sursaut"
    - code: q24
      number: 24
      category: physical
      label: "raideur ou tension musculaire"
    - code: q25
      number: 25
      category: physical
      label: "transpiration excessive non causée par la chaleur"
    - code: q26
      number: 26
      category: physical
      label: "sensation de « boule » dans la gorge"
    - code: q27
      number: 27
      category: physical
      label: "tremblements"
    - code: q28
      number: 28
      category: physical
      label: "jambes molles, en « guenille »"
    - code: q29
      number: 29
      category: physical
      label: "étourdissements, vertiges"
    - code: q30
      number: 30
      category: physical
      label: "sensation d'étouffement et/ou essoufflement rapide au repos et/ou difficulté à respirer"
    - code: q31
      number: 31
      category: physical
      label: "maux de tête ou douleurs dans le cou ou le dos"
    - code: q32
      number: 32
      category: physical
      label: "alternance de frissons et de chaleur"
    - code: q33
      number: 33
      category: physical
      label: "sensations de fatigue, de faiblesse ou sentiment d'être facilement épuisé"
  scoring:
    code: burns_anxiety_sum_v1
    method: sum
    requires_complete_response: true
    min_score: 0
    max_score: 99
    total_score:
      items: [q01, q02, q03, q04, q05, q06, q07, q08, q09, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32, q33]
    sub_scores:
      feelings:
        label: "Manifestations au niveau des sentiments"
        items: [q01, q02, q03, q04, q05, q06]
        max_score: 18
        interpretation: "descriptive_only"
      thoughts:
        label: "Manifestations au niveau de la pensée"
        items: [q07, q08, q09, q10, q11, q12, q13, q14, q15, q16, q17]
        max_score: 33
        interpretation: "descriptive_only"
      physical:
        label: "Manifestations par des symptômes physiques"
        items: [q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32, q33]
        max_score: 48
        interpretation: "descriptive_only"
    thresholds:
      - code: minimal
        label: "anxiété minimale"
        min: 0
        max: 5
      - code: mild
        label: "anxiété légère"
        min: 6
        max: 15
      - code: moderate
        label: "anxiété modérée"
        min: 16
        max: 30
      - code: marked
        label: "anxiété marquée"
        min: 31
        max: 50
      - code: very_marked
        label: "anxiété très marquée"
        min: 51
        max: 99
```

---

## 14. API REST

### 14.1 Principes

Les API doivent :

- utiliser HTTPS exclusivement ;
- exiger une authentification pour les usages professionnels ;
- utiliser des jetons temporaires pour les invitations sans compte ;
- ne jamais exposer de données sensibles dans l'URL ;
- retourner des erreurs structurées ;
- journaliser les accès ;
- appliquer une limitation de débit ;
- être versionnées.

### 14.2 Endpoints questionnaire

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| GET | `/api/v1/questionnaires` | Liste des questionnaires disponibles | professionnel |
| GET | `/api/v1/questionnaires/{code}` | Métadonnées d'un questionnaire | professionnel |
| GET | `/api/v1/questionnaire-versions/{id}` | Version complète | professionnel ou invitation |
| POST | `/api/v1/questionnaire-versions` | Créer une version | admin clinique |
| PATCH | `/api/v1/questionnaire-versions/{id}` | Modifier une version brouillon | admin clinique |
| POST | `/api/v1/questionnaire-versions/{id}/activate` | Activer une version | admin clinique + validation |
| POST | `/api/v1/questionnaire-versions/{id}/archive` | Archiver une version | admin clinique |

### 14.3 Endpoints invitations

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| POST | `/api/v1/assignments` | Créer une invitation | professionnel |
| GET | `/api/v1/assignments/{id}` | Consulter une invitation | professionnel |
| POST | `/api/v1/assignments/{id}/send` | Envoyer l'invitation | professionnel |
| POST | `/api/v1/assignments/{id}/cancel` | Annuler l'invitation | professionnel |
| GET | `/api/v1/public/invitations/{token}` | Ouvrir invitation | jeton |
| POST | `/api/v1/public/invitations/{token}/start` | Démarrer passation | jeton |

### 14.4 Endpoints réponses

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| POST | `/api/v1/responses` | Créer une réponse authentifiée | utilisateur |
| PATCH | `/api/v1/responses/{id}/draft` | Sauvegarder brouillon | utilisateur |
| POST | `/api/v1/responses/{id}/submit` | Soumettre réponse | utilisateur |
| POST | `/api/v1/public/invitations/{token}/submit` | Soumettre via invitation | jeton |
| GET | `/api/v1/responses/{id}` | Consulter réponse | professionnel habilité |
| POST | `/api/v1/responses/{id}/void` | Annuler réponse | professionnel habilité |

### 14.5 Endpoints scores

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| GET | `/api/v1/responses/{id}/score` | Score d'une réponse | habilitation |
| POST | `/api/v1/responses/{id}/score/recalculate` | Recalcul contrôlé | admin clinique/technique |
| GET | `/api/v1/persons/{id}/burns-scores` | Historique de scores | professionnel habilité |

### 14.6 Endpoints exports

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| POST | `/api/v1/responses/{id}/exports/pdf` | Générer PDF | habilitation |
| POST | `/api/v1/responses/{id}/exports/json` | Générer JSON | habilitation |
| POST | `/api/v1/exports/csv` | Export populationnel | habilitation renforcée |
| GET | `/api/v1/exports/{id}/download` | Télécharger export | habilitation + durée limitée |

### 14.7 Endpoints audit

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| GET | `/api/v1/audit-events` | Recherche dans les audits | DPO/RSSI/admin habilité |
| GET | `/api/v1/persons/{id}/audit-events` | Audit d'une personne | DPO/RSSI/profil autorisé |
| POST | `/api/v1/audit-events/export` | Export audit | DPO/RSSI |

### 14.8 Codes d'erreur standard

| Code | HTTP | Signification |
|---|---:|---|
| `QUESTIONNAIRE_VERSION_NOT_ACTIVE` | 409 | Version non active |
| `INVITATION_EXPIRED` | 410 | Lien expiré |
| `INVITATION_ALREADY_USED` | 409 | Lien déjà utilisé |
| `ANSWER_MISSING` | 422 | Une ou plusieurs réponses manquent |
| `ANSWER_INVALID_VALUE` | 422 | Valeur hors 0 à 3 |
| `RESPONSE_ALREADY_SUBMITTED` | 409 | Réponse déjà soumise |
| `ACCESS_DENIED` | 403 | Droits insuffisants |
| `EXPORT_NOT_READY` | 202 | Export en cours |
| `SCORING_CONFIG_MISMATCH` | 409 | Incohérence entre réponse et configuration de score |

---

## 15. Schémas JSON principaux

### 15.1 Soumission d'une réponse

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.org/schemas/burns-anxiety-submit-response.json",
  "title": "BurnsAnxietySubmitResponse",
  "type": "object",
  "required": ["questionnaireVersionId", "answers"],
  "properties": {
    "questionnaireVersionId": {
      "type": "string",
      "format": "uuid"
    },
    "assignmentId": {
      "type": ["string", "null"],
      "format": "uuid"
    },
    "mode": {
      "type": "string",
      "enum": ["self_administered", "assisted", "professional_administered", "paper_import"]
    },
    "answers": {
      "type": "array",
      "minItems": 33,
      "maxItems": 33,
      "items": {
        "type": "object",
        "required": ["itemCode", "value"],
        "properties": {
          "itemCode": {
            "type": "string",
            "pattern": "^q(0[1-9]|[12][0-9]|3[0-3])$"
          },
          "value": {
            "type": "integer",
            "minimum": 0,
            "maximum": 3
          }
        },
        "additionalProperties": false
      }
    },
    "clientContext": {
      "type": "object",
      "properties": {
        "startedAt": { "type": "string", "format": "date-time" },
        "completedAt": { "type": "string", "format": "date-time" },
        "completionSeconds": { "type": "integer", "minimum": 0 },
        "deviceType": { "type": "string" },
        "locale": { "type": "string" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": false
}
```

### 15.2 Résultat de score

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.org/schemas/burns-anxiety-score-result.json",
  "title": "BurnsAnxietyScoreResult",
  "type": "object",
  "required": ["scoreStatus", "answeredCount", "maxScore", "severity"],
  "properties": {
    "scoreStatus": {
      "type": "string",
      "enum": ["complete", "incomplete", "invalid", "not_calculated"]
    },
    "answeredCount": {
      "type": "integer",
      "minimum": 0,
      "maximum": 33
    },
    "missingItems": {
      "type": "array",
      "items": { "type": "string" }
    },
    "invalidItems": {
      "type": "array",
      "items": { "type": "string" }
    },
    "totalScore": {
      "type": ["integer", "null"],
      "minimum": 0,
      "maximum": 99
    },
    "maxScore": {
      "type": "integer",
      "const": 99
    },
    "normalizedPercent": {
      "type": ["number", "null"],
      "minimum": 0,
      "maximum": 100
    },
    "severity": {
      "type": "string",
      "enum": ["minimal", "mild", "moderate", "marked", "very_marked", "not_available"]
    },
    "severityLabel": {
      "type": ["string", "null"]
    },
    "subScores": {
      "type": "object",
      "properties": {
        "feelings": { "$ref": "#/$defs/subScore" },
        "thoughts": { "$ref": "#/$defs/subScore" },
        "physical": { "$ref": "#/$defs/subScore" }
      },
      "additionalProperties": false
    }
  },
  "$defs": {
    "subScore": {
      "type": "object",
      "required": ["value", "maxScore", "interpretation"],
      "properties": {
        "value": { "type": "integer", "minimum": 0 },
        "maxScore": { "type": "integer", "minimum": 1 },
        "interpretation": { "type": "string", "enum": ["descriptive_only"] }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

### 15.3 Réponse API complète

```json
{
  "responseId": "7d4a3b61-1aa1-4f7b-b65d-9b229c0f3a5b",
  "questionnaire": {
    "code": "burns_anxiety_inventory_fr",
    "version": "1.0.0",
    "language": "fr-FR"
  },
  "status": "submitted",
  "submittedAt": "2026-06-06T10:30:00Z",
  "score": {
    "scoreStatus": "complete",
    "answeredCount": 33,
    "totalScore": 24,
    "maxScore": 99,
    "normalizedPercent": 24.24,
    "severity": "moderate",
    "severityLabel": "anxiété modérée",
    "subScores": {
      "feelings": { "value": 5, "maxScore": 18, "interpretation": "descriptive_only" },
      "thoughts": { "value": 9, "maxScore": 33, "interpretation": "descriptive_only" },
      "physical": { "value": 10, "maxScore": 48, "interpretation": "descriptive_only" }
    }
  }
}
```

---

## 16. Extrait OpenAPI 3.1

```yaml
openapi: 3.1.0
info:
  title: Burns Anxiety Inventory API
  version: 1.0.0
  description: API de passation et cotation de l'Inventaire de Burns pour mesurer l'anxiété.
servers:
  - url: https://api.example.org/api/v1
security:
  - bearerAuth: []
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    SubmitBurnsResponse:
      type: object
      required:
        - questionnaireVersionId
        - answers
      properties:
        questionnaireVersionId:
          type: string
          format: uuid
        assignmentId:
          type: string
          format: uuid
          nullable: true
        mode:
          type: string
          enum:
            - self_administered
            - assisted
            - professional_administered
            - paper_import
        answers:
          type: array
          minItems: 33
          maxItems: 33
          items:
            type: object
            required: [itemCode, value]
            properties:
              itemCode:
                type: string
                pattern: '^q(0[1-9]|[12][0-9]|3[0-3])$'
              value:
                type: integer
                minimum: 0
                maximum: 3
    ScoreResult:
      type: object
      required: [scoreStatus, answeredCount, maxScore, severity]
      properties:
        scoreStatus:
          type: string
          enum: [complete, incomplete, invalid, not_calculated]
        answeredCount:
          type: integer
          minimum: 0
          maximum: 33
        totalScore:
          type: integer
          minimum: 0
          maximum: 99
          nullable: true
        maxScore:
          type: integer
          const: 99
        severity:
          type: string
          enum: [minimal, mild, moderate, marked, very_marked, not_available]
        severityLabel:
          type: string
          nullable: true
paths:
  /public/invitations/{token}/submit:
    post:
      summary: Soumettre une réponse via invitation publique sécurisée
      security: []
      parameters:
        - name: token
          in: path
          required: true
          schema:
            type: string
            minLength: 32
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitBurnsResponse'
      responses:
        '201':
          description: Réponse soumise et cotée
          content:
            application/json:
              schema:
                type: object
                properties:
                  responseId:
                    type: string
                    format: uuid
                  score:
                    $ref: '#/components/schemas/ScoreResult'
        '409':
          description: Invitation expirée, déjà utilisée ou réponse déjà soumise
        '422':
          description: Réponses manquantes ou invalides
  /responses/{id}/score:
    get:
      summary: Obtenir le score d'une réponse
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Score retourné
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ScoreResult'
        '403':
          description: Accès refusé
        '404':
          description: Réponse introuvable
```

---

## 17. Interopérabilité santé

### 17.1 Principes

L'interopérabilité doit être prévue sans être imposée au MVP. Le modèle interne doit pouvoir être converti vers des standards de santé lorsqu'une organisation en a besoin.

Objectifs :

- exporter une définition de questionnaire ;
- exporter une réponse structurée ;
- transmettre un score total ;
- conserver l'identifiant de version ;
- rattacher la passation à une personne et à un professionnel ;
- éviter la perte d'information.

### 17.2 Mapping FHIR indicatif

| Concept interne | Ressource FHIR possible | Commentaire |
|---|---|---|
| Questionnaire versionné | `Questionnaire` | Items avec `linkId` q01 à q33 |
| Réponse soumise | `QuestionnaireResponse` | Réponses item par item |
| Score total | `Observation` | Code local ou terminologie validée |
| Personne répondante | `Patient` | Selon DPI ou serveur FHIR |
| Professionnel | `Practitioner` / `PractitionerRole` | Selon contexte |
| Organisation | `Organization` | Structure de soin |
| Export PDF | `DocumentReference` | Si archivage documentaire |

### 17.3 Exemple FHIR QuestionnaireResponse simplifié

```json
{
  "resourceType": "QuestionnaireResponse",
  "status": "completed",
  "questionnaire": "Questionnaire/burns-anxiety-inventory-fr-1.0.0",
  "authored": "2026-06-06T10:30:00+02:00",
  "subject": {
    "reference": "Patient/example"
  },
  "item": [
    {
      "linkId": "q01",
      "text": "sentiment d'anxiété, de nervosité, d'inquiétude ou de peur",
      "answer": [
        { "valueInteger": 1 }
      ]
    }
  ]
}
```

### 17.4 Exemple FHIR Observation simplifié

```json
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [
      {
        "system": "https://example.org/fhir/CodeSystem/burns-anxiety",
        "code": "burns-anxiety-total-score",
        "display": "Inventaire de Burns anxiété - score total"
      }
    ]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "effectiveDateTime": "2026-06-06T10:30:00+02:00",
  "valueInteger": 24,
  "interpretation": [
    {
      "coding": [
        {
          "system": "https://example.org/fhir/CodeSystem/burns-anxiety-severity",
          "code": "moderate",
          "display": "anxiété modérée"
        }
      ]
    }
  ],
  "derivedFrom": [
    {
      "reference": "QuestionnaireResponse/example"
    }
  ]
}
```

### 17.5 Contraintes d'interopérabilité

- Ne pas supposer l'existence d'un code LOINC ou SNOMED sans vérification terminologique.
- Utiliser un système de codes local si aucune terminologie officielle validée n'est disponible.
- Conserver le libellé exact des items dans la ressource `Questionnaire`.
- Ne pas envoyer de réponses nominatives à un système tiers sans base légale et habilitation.
- Journaliser les transmissions.
- Gérer les échecs et rejets de messages.
- Versionner les mappings.

### 17.6 Interopérabilité non FHIR

L'outil peut également prévoir :

- export CSV pour analyse locale ;
- export JSON documenté ;
- webhooks internes ;
- messages HL7 v2 selon contraintes du SI ;
- connecteurs DPI spécifiques ;
- dépôt documentaire PDF.

---

## 18. Sécurité applicative

### 18.1 Référentiel de sécurité

La conception doit s'appuyer sur :

- OWASP ASVS comme base d'exigences techniques ;
- OWASP Top 10 pour la prévention des risques applicatifs courants ;
- bonnes pratiques de sécurité des API ;
- politique de sécurité du SI santé de l'organisation ;
- exigences HDS lorsque l'hébergement de données de santé est concerné.

### 18.2 Authentification

Exigences :

- OIDC/OAuth2 pour les comptes professionnels ;
- MFA pour les comptes à privilèges ;
- politique de mots de passe si authentification locale ;
- détection d'attaques par force brute ;
- expiration de session ;
- rotation des refresh tokens ;
- révocation immédiate possible.

### 18.3 Autorisation

Le modèle recommandé combine :

- RBAC : rôle de l'utilisateur ;
- ABAC : organisation, équipe, relation de soin, finalité ;
- consentement ou habilitation spécifique selon contexte ;
- journalisation systématique.

Exemples de décisions :

```text
peut_consulter_resultat =
  utilisateur.role in [professionnel_lecteur, professionnel_referent]
  AND utilisateur.organization_id = response.organization_id
  AND relation_de_soin_active = true
```

### 18.4 Protection des invitations

Les invitations doivent :

- utiliser un token aléatoire d'au moins 128 bits d'entropie ;
- être stockées sous forme hachée ;
- expirer automatiquement ;
- pouvoir être révoquées ;
- ne pas contenir d'identité ou de score ;
- être à usage unique si le contexte le permet ;
- être limitées en nombre d'essais.

### 18.5 Sécurité des sessions

- Cookies `HttpOnly`, `Secure`, `SameSite=Lax` ou `Strict` selon parcours.
- Protection CSRF pour les sessions cookie.
- Tokens Bearer stockés hors localStorage si possible.
- Déconnexion automatique après inactivité.
- Protection contre fixation de session.

### 18.6 Chiffrement

- TLS 1.2 minimum, TLS 1.3 recommandé.
- Chiffrement au repos des bases et stockages objets.
- Chiffrement applicatif des champs très sensibles si analyse de risque le justifie.
- Gestion des clés via KMS ou HSM.
- Rotation des clés documentée.
- Aucun secret dans le code source.

### 18.7 Sécurité des API

- Validation stricte des entrées.
- Limitation de débit.
- Protection contre injection SQL par requêtes paramétrées.
- Protection contre XSS par échappement et CSP.
- Protection contre IDOR par vérification d'autorisation ressource par ressource.
- Protection contre mass assignment.
- Taille maximale des payloads.
- Erreurs non bavardes.

### 18.8 Journalisation de sécurité

Journaliser :

- authentifications réussies/échouées ;
- élévations de privilèges ;
- accès à une réponse ;
- exports ;
- changement de configuration ;
- échecs d'autorisation ;
- création/révocation de liens ;
- suppressions/anonymisations.

Ne pas journaliser :

- réponses item par item dans les logs techniques ;
- tokens ;
- mots de passe ;
- secrets ;
- données de santé dans des services tiers non autorisés.

### 18.9 Sécurité frontend

- Content Security Policy stricte.
- Pas d'analytics tiers sans validation.
- Pas de stockage durable de réponses sensibles dans le navigateur.
- Nettoyage des données lors de la déconnexion.
- Protection contre clickjacking.
- Désactivation du cache HTTP pour pages sensibles.

### 18.10 Sécurité des exports

- Génération côté serveur.
- Stockage temporaire chiffré.
- URL de téléchargement courte durée.
- Contrôle d'accès au téléchargement.
- Empreinte SHA-256.
- Marquage de confidentialité.
- Suppression automatique selon politique.

### 18.11 Tests de sécurité

- SAST à chaque merge.
- Analyse dépendances.
- DAST sur préproduction.
- Tests IDOR.
- Tests d'injection.
- Tests d'authentification.
- Revue manuelle des endpoints sensibles.
- Pentest avant mise en production.

---

## 19. Protection des données et conformité

### 19.1 Qualification des données

Les réponses, scores et interprétations sont des données relatives à la santé mentale. Elles doivent être traitées comme données de santé ou données sensibles dès lors qu'elles sont rattachées à une personne identifiée ou identifiable.

### 19.2 Finalités possibles

Finalités à documenter :

- passation d'un questionnaire d'auto-évaluation ;
- suivi clinique individuel ;
- coordination de l'accompagnement ;
- export vers le dossier patient ;
- suivi qualité interne ;
- recherche ou évaluation, si base spécifique ;
- support technique, avec accès limité.

Chaque finalité doit avoir :

- une base légale ;
- une durée de conservation ;
- des destinataires ;
- des mesures de sécurité ;
- une information de la personne.

### 19.3 Base légale

La base légale dépend du contexte :

- soin et prise en charge par un professionnel ou établissement ;
- consentement explicite pour certains usages ;
- obligation légale ;
- intérêt public dans le domaine de la santé ;
- recherche encadrée.

Le consentement à répondre au questionnaire ne doit pas être confondu avec la base légale RGPD du traitement.

### 19.4 Information des personnes

L'information doit préciser :

- qui est responsable du traitement ;
- pourquoi les données sont collectées ;
- quelles données sont collectées ;
- qui peut les consulter ;
- combien de temps elles sont conservées ;
- les droits de la personne ;
- comment exercer ces droits ;
- si les données sont hébergées par un prestataire ;
- si des transferts hors UE existent ;
- si des décisions automatisées existent ;
- les limites cliniques du score.

### 19.5 Minimisation

Collecter uniquement :

- les informations nécessaires à l'identification dans le contexte ;
- les réponses ;
- le score ;
- les métadonnées nécessaires à la sécurité et à la preuve ;
- les notes professionnelles si activées.

Éviter :

- questions libres non nécessaires ;
- données sociales ou administratives sans finalité ;
- géolocalisation ;
- analytics tiers intrusifs ;
- stockage de traces de frappe.

### 19.6 Durée de conservation

La politique doit distinguer :

| Donnée | Durée recommandée à définir | Responsable de validation |
|---|---|---|
| Brouillons | courte durée | DPO + métier |
| Réponses soumises | alignée dossier patient ou politique locale | DPO + juridique + clinique |
| Exports PDF temporaires | durée courte, suppression automatique | RSSI + DPO |
| Journaux d'audit | durée de sécurité définie | RSSI + DPO |
| Données anonymisées | selon finalité | DPO + gouvernance |

### 19.7 Droits des personnes

L'outil doit permettre ou faciliter :

- accès ;
- rectification selon règles métier ;
- effacement lorsque applicable ;
- limitation ;
- opposition lorsque applicable ;
- portabilité lorsque applicable ;
- information sur les accès ;
- retrait du consentement lorsque le consentement est la base.

### 19.8 AIPD

Une analyse d'impact relative à la protection des données est fortement recommandée et peut être obligatoire selon le contexte, car l'outil traite des données sensibles de santé mentale, peut impliquer un suivi longitudinal et peut être utilisé par des professionnels.

L'AIPD doit couvrir :

- risques d'accès non autorisé ;
- risques de divulgation familiale ou professionnelle ;
- risques liés aux invitations ;
- risques de mauvaise interprétation du score ;
- risques d'usage secondaire ;
- risques sur mineurs ou personnes vulnérables, si concernés ;
- mesures techniques et organisationnelles.

### 19.9 Hébergement de données de santé

Si le service est utilisé pour le compte d'acteurs de santé et héberge des données de santé à caractère personnel, l'hébergement doit être analysé au regard des exigences HDS applicables. Le choix d'infrastructure doit être validé avant la production.

### 19.10 Sous-traitants

Tout sous-traitant doit faire l'objet :

- d'un contrat ;
- d'une analyse de sécurité ;
- d'une analyse de localisation des données ;
- d'une procédure d'audit ;
- d'une clause d'assistance aux droits des personnes ;
- d'une clause d'incident ;
- d'une clause de réversibilité.

### 19.11 Données de recherche

L'utilisation à des fins de recherche ou d'évaluation doit être séparée de la finalité de soin. Elle nécessite :

- protocole ;
- base légale ;
- information ;
- minimisation ;
- pseudonymisation ou anonymisation ;
- gouvernance d'accès ;
- avis ou autorisations selon cadre applicable.

### 19.12 Analyse dispositif médical

Si l'outil est destiné à fournir une information utilisée pour des décisions diagnostiques ou thérapeutiques, une analyse réglementaire doit déterminer s'il entre dans le champ du règlement européen relatif aux dispositifs médicaux. Le MVP doit éviter les fonctionnalités de recommandation thérapeutique automatisée tant que cette analyse n'est pas réalisée.

---

## 20. Hébergement et exploitation

### 20.1 Exigences d'hébergement

L'hébergement doit :

- être adapté aux données de santé ;
- garantir la localisation et la maîtrise des données selon exigences ;
- fournir des sauvegardes chiffrées ;
- fournir une supervision ;
- permettre la journalisation ;
- permettre la réversibilité ;
- documenter la chaîne de sous-traitance ;
- respecter les exigences contractuelles et réglementaires.

### 20.2 Disponibilité

Cibles à définir :

| Indicateur | MVP | Cible production mature |
|---|---:|---:|
| Disponibilité mensuelle | 99,5 % | 99,9 % |
| RPO | 24 h max | 4 h ou moins |
| RTO | 24 h max | 4 h ou moins |
| Temps de réponse p95 | < 800 ms hors export | < 500 ms hors export |
| Durée génération PDF p95 | < 15 s | < 5 s |

### 20.3 Sauvegardes

Les sauvegardes doivent :

- être chiffrées ;
- être testées ;
- être isolées ;
- couvrir base et stockage fichiers ;
- respecter la durée de conservation ;
- faire l'objet d'exercices de restauration.

### 20.4 Observabilité

Surveiller :

- taux d'erreurs API ;
- latence ;
- échecs de soumission ;
- erreurs de score ;
- erreurs PDF ;
- échecs notifications ;
- échecs authentification ;
- volumes d'export ;
- jobs bloqués ;
- anomalies d'accès.

### 20.5 Logs

Les logs doivent être structurés et contenir :

- identifiant de corrélation ;
- service ;
- action ;
- statut ;
- durée ;
- identifiants techniques pseudonymisés.

Ils ne doivent pas contenir les réponses ou les scores, sauf journal métier explicitement protégé et justifié.

### 20.6 Déploiement

Le déploiement doit inclure :

- pipeline CI/CD ;
- tests automatisés ;
- migration de base contrôlée ;
- rollback ;
- validation de configuration ;
- scan d'images conteneur ;
- approbation manuelle pour production ;
- journal de release.

### 20.7 Réversibilité

Prévoir :

- export complet des questionnaires ;
- export des réponses ;
- export des scores ;
- export des audits nécessaires ;
- documentation du schéma ;
- procédure de destruction des données après transfert.

---

## 21. Notifications

### 21.1 Canaux

Canaux possibles :

- courriel ;
- SMS ;
- notification espace patient ;
- notification professionnelle interne ;
- courrier ou impression hors outil.

### 21.2 Contenu des notifications

Les notifications doivent minimiser les informations sensibles.

Exemple de courriel :

```text
Bonjour,

Un questionnaire vous est proposé par votre service de suivi. Vous pouvez y répondre en utilisant le lien sécurisé ci-dessous avant le [date].

[Accéder au questionnaire]

Ce lien est personnel. Si vous avez une question, contactez votre service.
```

Éviter :

- le score ;
- le niveau d'anxiété ;
- les réponses ;
- des détails de santé dans l'objet.

### 21.3 Relances

Règles :

- maximum configurable ;
- délai minimal entre deux relances ;
- arrêt automatique après soumission ;
- arrêt après expiration ;
- possibilité de désactivation ;
- journalisation.

### 21.4 Notifications internes

Les notifications internes peuvent indiquer qu'une réponse est disponible. Le score ne doit être inclus que dans un environnement sécurisé et selon paramétrage validé.

### 21.5 Messages de sécurité

L'outil peut envoyer :

- notification de nouveau login ;
- notification de changement d'adresse ;
- notification d'export si pertinent ;
- alerte administrateur en cas d'activité suspecte.

---

## 22. Administration

### 22.1 Backoffice clinique

Fonctions :

- consulter les versions du questionnaire ;
- créer une version brouillon ;
- comparer deux versions ;
- valider la règle de score ;
- activer/archiver une version ;
- définir les messages de résultat ;
- activer ou non l'affichage des sous-scores ;
- consulter les tests de score associés.

### 22.2 Backoffice organisationnel

Fonctions :

- gérer les organisations ;
- gérer les équipes ;
- gérer les utilisateurs ;
- attribuer les rôles ;
- configurer les invitations ;
- configurer les exports ;
- configurer les durées de conservation ;
- consulter les statistiques d'usage.

### 22.3 Backoffice sécurité

Fonctions :

- visualiser les événements d'audit ;
- exporter les journaux ;
- gérer les accès d'urgence si prévus ;
- révoquer des sessions ;
- désactiver un compte ;
- révoquer des invitations ;
- consulter les anomalies.

### 22.4 Paramètres non modifiables sans gouvernance

Les éléments suivants ne doivent pas être modifiables librement :

- items ;
- ordre des items ;
- valeurs numériques ;
- seuils ;
- méthode de score ;
- libellés d'interprétation ;
- avertissements réglementaires ;
- statut des droits d'utilisation.

### 22.5 Gestion des modèles de messages

Les modèles doivent être :

- versionnés ;
- relus ;
- non stigmatisants ;
- testés sur mobile ;
- compatibles avec la confidentialité ;
- traduisibles si besoin.

---

## 23. Tableau de bord professionnel

### 23.1 Vue liste

Colonnes recommandées :

| Colonne | Description |
|---|---|
| Personne | Identité ou pseudonyme |
| Date | Date de passation |
| Statut | Brouillon, soumis, incomplet, annulé |
| Score | Total si disponible |
| Niveau | Minimal à très marqué |
| Mode | Autonome, accompagné, papier |
| Version | Version du questionnaire |
| Action | Voir, exporter, noter |

### 23.2 Vue individuelle

La vue individuelle doit afficher :

- identité ;
- dernières passations ;
- score actuel ;
- niveau actuel ;
- évolution graphique ;
- détails item par item ;
- notes professionnelles séparées ;
- exports disponibles ;
- audit d'accès si l'utilisateur est habilité.

### 23.3 Vue populationnelle

Pour les profils autorisés :

- nombre de passations ;
- taux de complétude ;
- répartition des niveaux ;
- score moyen ou médian ;
- évolution agrégée ;
- filtres par période, service, type de passation.

Les vues populationnelles doivent masquer les identités si elles ne sont pas nécessaires.

### 23.4 Graphiques

Graphiques possibles :

- score total dans le temps ;
- répartition des niveaux ;
- taux de complétude ;
- sous-scores descriptifs ;
- délai moyen de réponse.

Chaque graphique doit avoir une alternative textuelle et une exportabilité maîtrisée.

### 23.5 Alertes visuelles

Les niveaux élevés peuvent être visuellement distingués, mais sans dramatisation. Les couleurs doivent être accompagnées d'un texte.

### 23.6 Filtres

Filtres recommandés :

- période ;
- statut ;
- niveau ;
- professionnel référent ;
- service ;
- mode de passation ;
- version du questionnaire.

### 23.7 Actions professionnelles

Actions possibles selon droits :

- créer une invitation ;
- consulter un résultat ;
- ajouter une note ;
- exporter PDF ;
- exporter données structurées ;
- annuler une réponse ;
- demander une nouvelle passation ;
- consulter l'audit.

---

## 24. Gestion des risques cliniques et éthiques

### 24.1 Risque de confusion avec un diagnostic

Mesure : afficher systématiquement une mention indiquant que le résultat est issu d'un auto-questionnaire et ne remplace pas une évaluation professionnelle.

### 24.2 Risque de minimisation ou d'alarmisme

Un score faible ne doit pas être présenté comme une absence certaine de difficulté. Un score élevé ne doit pas être présenté comme une urgence automatiquement. Les messages doivent être prudents.

### 24.3 Risque lié aux symptômes physiques

Les items physiques peuvent recouvrir des symptômes médicaux non psychiatriques. L'outil doit afficher un avertissement non intrusif indiquant que des symptômes physiques intenses, inhabituels ou inquiétants nécessitent un avis médical approprié.

### 24.4 Risque de mauvaise utilisation institutionnelle

Interdire ou encadrer :

- usage disciplinaire ;
- sélection d'accès aux soins ;
- notation de performance individuelle ;
- partage avec employeur ou assureur ;
- usage sans information de la personne ;
- décision automatisée défavorable.

### 24.5 Risque pour les mineurs ou majeurs protégés

Si ces publics sont concernés, définir :

- modalités d'information ;
- autorisations parentales ou représentants légaux ;
- confidentialité ;
- accès des professionnels ;
- messages adaptés ;
- durée de conservation.

### 24.6 Risque d'accessibilité émotionnelle

Le questionnaire peut exposer à des contenus anxiogènes. L'interface doit permettre :

- pause ;
- sortie rapide ;
- sauvegarde ;
- information de contact ;
- absence de compte à rebours ;
- messages rassurants.

### 24.7 Risque d'automatisation excessive

Ne pas générer automatiquement :

- diagnostic ;
- prescription ;
- priorisation d'urgence ;
- message alarmiste à un tiers ;
- recommandation thérapeutique personnalisée.

### 24.8 Gouvernance clinique

Mettre en place :

- comité de validation du contenu ;
- revue régulière des messages ;
- validation des seuils ;
- gestion des incidents de mauvaise interprétation ;
- revue des statistiques d'usage ;
- implication d'usagers ou représentants lorsque possible.

---

## 25. Tests et assurance qualité

### 25.1 Stratégie globale

Les tests doivent couvrir :

- exactitude du questionnaire ;
- exactitude du score ;
- sécurité ;
- accessibilité ;
- performance ;
- interopérabilité ;
- exports ;
- audit ;
- conformité ;
- expérience utilisateur.

### 25.2 Tests unitaires de score

Les tests unitaires doivent couvrir tous les seuils :

```ts
expect(score(allZeros()).totalScore).toBe(0);
expect(score(withTotal(5)).severity).toBe("minimal");
expect(score(withTotal(6)).severity).toBe("mild");
expect(score(withTotal(15)).severity).toBe("mild");
expect(score(withTotal(16)).severity).toBe("moderate");
expect(score(withTotal(30)).severity).toBe("moderate");
expect(score(withTotal(31)).severity).toBe("marked");
expect(score(withTotal(50)).severity).toBe("marked");
expect(score(withTotal(51)).severity).toBe("very_marked");
expect(score(allThrees()).totalScore).toBe(99);
expect(score(missingOne()).scoreStatus).toBe("incomplete");
```

### 25.3 Tests d'intégrité du questionnaire

Vérifier automatiquement :

- 33 items présents ;
- codes `q01` à `q33` uniques ;
- ordre correct ;
- catégories correctes ;
- 4 choix de réponse ;
- valeurs 0 à 3 ;
- score max 99 ;
- seuils couvrant 0 à 99 sans trou ni chevauchement ;
- libellés attendus.

### 25.4 Tests API

Scénarios :

- soumission valide ;
- réponse incomplète ;
- valeur invalide ;
- token expiré ;
- token réutilisé ;
- accès non autorisé ;
- export sans droit ;
- recalcul avec version incompatible ;
- accès inter-organisation interdit.

### 25.5 Tests E2E

Parcours :

- passation autonome complète ;
- passation mobile ;
- passation accompagnée ;
- invitation expirée ;
- sauvegarde brouillon ;
- soumission ;
- consultation professionnelle ;
- export PDF ;
- lecture d'un résultat historique.

### 25.6 Tests d'accessibilité

- Axe ou équivalent en CI ;
- tests manuels clavier ;
- lecteur d'écran ;
- zoom ;
- contraste ;
- erreurs ;
- focus ;
- formulaire radio ;
- PDF exporté si exigence documentaire.

### 25.7 Tests de sécurité

- SAST ;
- SCA ;
- DAST ;
- pentest ;
- tests anti-IDOR ;
- tests CSRF ;
- tests XSS ;
- tests injection SQL ;
- tests de jetons ;
- tests de cloisonnement multi-tenant ;
- tests d'absence de données sensibles dans logs.

### 25.8 Tests de performance

Cibles :

- 100 passations simultanées en MVP ;
- latence API p95 < 800 ms hors export ;
- génération PDF p95 < 15 s ;
- aucun blocage sur score ;
- soumission transactionnelle sous charge.

### 25.9 Tests d'export

Vérifier :

- exactitude des réponses ;
- exactitude du score ;
- présence des avertissements ;
- pagination ;
- lisibilité ;
- absence de données d'une autre personne ;
- marquage de confidentialité ;
- empreinte ;
- journalisation.

### 25.10 Recette clinique

La recette clinique doit vérifier :

- fidélité des libellés ;
- pertinence des messages ;
- non-confusion diagnostique ;
- seuils ;
- restitution ;
- risques d'interprétation ;
- lisibilité pour les personnes ;
- lisibilité pour professionnels.

---

## 26. Stratégie de migration depuis le papier

### 26.1 Inventaire initial

Avant numérisation :

- identifier la version papier exacte ;
- vérifier la source ;
- vérifier les droits ;
- valider les libellés ;
- valider les seuils ;
- définir le contexte d'utilisation ;
- définir qui peut voir le score.

### 26.2 Saisie de l'historique

Si des passations papier anciennes doivent être intégrées :

- saisir manuellement les réponses ;
- conserver la date réelle de passation ;
- indiquer `source = paper_import` ;
- journaliser le saisissant ;
- contrôler un échantillon ;
- éviter l'OCR non vérifié pour les scores.

### 26.3 Contrôle qualité

Contrôles :

- double saisie sur échantillon ;
- comparaison score papier / score web ;
- détection réponses manquantes ;
- validation des dates ;
- audit des imports.

### 26.4 Communication de changement

Informer les utilisateurs :

- de la disponibilité web ;
- du maintien possible du papier si nécessaire ;
- des modalités de confidentialité ;
- des avantages : moins d'erreurs de calcul, historique, export.

### 26.5 Reprise des données

La reprise doit être limitée aux données utiles. Elle doit éviter de créer un stock historique nominatif si la finalité ne le justifie pas.

---

## 27. Déploiement MVP

### 27.1 Phase 0 — Cadrage

Livrables :

- validation droits d'utilisation ;
- validation clinique ;
- validation RGPD ;
- validation HDS/hébergement ;
- validation sécurité ;
- validation accessibilité ;
- choix d'affichage du score ;
- choix du périmètre pilote.

### 27.2 Phase 1 — Prototype

Fonctions :

- questionnaire statique ;
- passation locale ;
- calcul du score ;
- page de résultat ;
- tests de score ;
- revue UX.

### 27.3 Phase 2 — MVP sécurisé

Fonctions :

- authentification ;
- invitation ;
- stockage sécurisé ;
- consultation professionnelle ;
- export PDF ;
- audit ;
- backoffice minimal ;
- supervision.

### 27.4 Phase 3 — Pilote

Actions :

- formation d'une petite équipe ;
- suivi des incidents ;
- retours usagers ;
- comparaison papier/web ;
- audit accessibilité ;
- revue sécurité ;
- correction avant généralisation.

### 27.5 Phase 4 — Généralisation

Actions :

- déploiement multi-service ;
- automatisation des relances ;
- intégration DPI ;
- tableaux de bord ;
- politique d'exports ;
- gouvernance récurrente.

### 27.6 Critères Go/No-Go

Go si :

- score testé et validé ;
- droits validés ;
- hébergement validé ;
- AIPD réalisée ou décision documentée ;
- sécurité validée ;
- accessibilité testée ;
- support prêt ;
- procédure incident prête.

No-Go si :

- droits incertains ;
- seuils non validés ;
- absence de cloisonnement ;
- absence de journalisation ;
- exports non sécurisés ;
- messages cliniques non validés ;
- vulnérabilité critique non corrigée.

---

## 28. Formation et support

### 28.1 Formation des professionnels

Contenus :

- objectif du questionnaire ;
- période de référence ;
- lecture du score ;
- limites ;
- accompagnement sans influencer ;
- confidentialité ;
- export ;
- conduite à tenir selon protocole local ;
- droits des personnes ;
- gestion des incidents.

### 28.2 Formation des administrateurs

Contenus :

- gestion des utilisateurs ;
- droits ;
- invitations ;
- versions ;
- exports ;
- audits ;
- paramétrages ;
- supervision.

### 28.3 Aide utilisateur

Prévoir :

- FAQ ;
- aide contextuelle ;
- contact support ;
- guide PDF ;
- tutoriel court ;
- mentions confidentialité ;
- page « que faire si je me sens en danger » validée localement.

### 28.4 Support technique

Niveaux :

- niveau 1 : accès, invitation, navigation ;
- niveau 2 : erreurs applicatives, export ;
- niveau 3 : incident sécurité, base de données, intégration.

### 28.5 Support clinique

Le support technique ne doit pas interpréter les scores. Les demandes cliniques doivent être orientées vers les professionnels compétents.

---

## 29. Documentation technique attendue

La livraison doit inclure :

- documentation d'installation ;
- documentation d'exploitation ;
- schéma d'architecture ;
- modèle de données ;
- dictionnaire de données ;
- documentation API ;
- documentation de score ;
- registre des versions du questionnaire ;
- procédure de sauvegarde/restauration ;
- procédure d'export ;
- procédure de suppression/anonymisation ;
- procédure incident ;
- matrice des droits ;
- guide d'audit ;
- rapport de tests ;
- rapport d'accessibilité ;
- rapport de sécurité ;
- dossier de conformité RGPD ;
- analyse dispositif médical si nécessaire.

---

## 30. Registre des décisions à prendre

| Décision | Options | Responsable | Criticité |
|---|---|---|---|
| Droits d'utilisation du questionnaire | autorisé / restreint / interdit | juridique + clinique | bloquante |
| Affichage du score à la personne | oui / non / selon contexte | clinique + éthique | élevée |
| Affichage des sous-scores | oui / non | clinique | moyenne |
| Proratisation | désactivée / activée sous conditions | clinique | élevée |
| Alertes score élevé | aucune / protocole local | clinique + DPO + RSSI | très élevée |
| Hébergement | HDS ou autre selon analyse | DSI + DPO | bloquante |
| Base légale | soin / consentement / autre | DPO + juridique | bloquante |
| Durée de conservation | politique locale | DPO + métier | élevée |
| Export CSV | autorisé / interdit / restreint | DPO + RSSI | élevée |
| Interopérabilité FHIR | MVP / phase 2 / non | SI santé | moyenne |
| Public mineur | inclus / exclu | clinique + juridique | élevée |
| Usage recherche | oui / non | gouvernance | élevée |
| Classification dispositif médical | hors champ / à qualifier | réglementaire | très élevée |

---

## 31. Checklist de mise en production

### 31.1 Produit et clinique

- [ ] Items validés.
- [ ] Ordre validé.
- [ ] Choix de réponse validés.
- [ ] Score total validé.
- [ ] Seuils validés.
- [ ] Messages de résultat validés.
- [ ] Avertissement non diagnostique validé.
- [ ] Politique sur sous-scores validée.
- [ ] Politique sur alertes validée.
- [ ] Droits d'utilisation validés.

### 31.2 Technique

- [ ] Tests unitaires score complets.
- [ ] Tests E2E réussis.
- [ ] Tests API réussis.
- [ ] Migrations de base testées.
- [ ] Export PDF validé.
- [ ] Monitoring en place.
- [ ] Backups en place.
- [ ] Restauration testée.
- [ ] Rollback testé.
- [ ] Documentation d'exploitation prête.

### 31.3 Sécurité

- [ ] Authentification validée.
- [ ] Autorisations testées.
- [ ] Cloisonnement multi-tenant testé.
- [ ] Tokens invitation sécurisés.
- [ ] Données sensibles absentes des logs.
- [ ] Chiffrement activé.
- [ ] SAST/SCA réalisés.
- [ ] Pentest ou revue sécurité réalisé.
- [ ] Plan incident prêt.
- [ ] Audit activé.

### 31.4 Données et conformité

- [ ] Registre de traitement complété.
- [ ] Information des personnes prête.
- [ ] AIPD réalisée ou décision documentée.
- [ ] Contrats sous-traitants validés.
- [ ] HDS analysé et validé.
- [ ] Durées de conservation validées.
- [ ] Procédure droits personnes prête.
- [ ] Procédure suppression/anonymisation prête.
- [ ] Politique d'exports validée.

### 31.5 Accessibilité

- [ ] Parcours clavier complet.
- [ ] Lecteur d'écran testé.
- [ ] Contrastes conformes.
- [ ] Zoom testé.
- [ ] Erreurs accessibles.
- [ ] Formulaires radio conformes.
- [ ] Mobile testé.
- [ ] PDF accessible évalué si requis.

### 31.6 Support

- [ ] Guide utilisateur disponible.
- [ ] Guide professionnel disponible.
- [ ] FAQ disponible.
- [ ] Support technique formé.
- [ ] Support clinique identifié.
- [ ] Procédure de révocation d'invitation prête.
- [ ] Procédure de correction de réponse prête.

---

## 32. Annexes

### Annexe A — Exemple de structure de dépôt

```text
burns-anxiety-web/
  apps/
    web/                    # Frontend Next.js ou React
    api/                    # Backend API
    worker/                 # Jobs exports/notifications
  packages/
    questionnaire-core/      # Définition questionnaire + score
    ui/                      # Composants UI partagés
    config/                  # Configuration typée
    fhir-mapping/            # Mapping optionnel FHIR
  infrastructure/
    terraform/
    kubernetes/
  docs/
    api/
    security/
    privacy/
    clinical-governance/
    user-guides/
  tests/
    unit/
    e2e/
    accessibility/
    security/
    performance/
```

### Annexe B — Exemple de composant React simplifié

```tsx
import { useId } from "react";

type Choice = {
  code: string;
  label: string;
  numericValue: 0 | 1 | 2 | 3;
};

type QuestionProps = {
  number: number;
  total: number;
  category: string;
  label: string;
  choices: Choice[];
  value?: number;
  error?: string;
  onChange: (value: 0 | 1 | 2 | 3) => void;
};

export function BurnsQuestion({
  number,
  total,
  category,
  label,
  choices,
  value,
  error,
  onChange,
}: QuestionProps) {
  const groupId = useId();
  const errorId = `${groupId}-error`;
  const hintId = `${groupId}-hint`;

  return (
    <fieldset aria-invalid={Boolean(error)} aria-describedby={error ? `${hintId} ${errorId}` : hintId}>
      <legend>
        <span>Question {number} sur {total}</span>
        <span>{category}</span>
        <strong>{label}</strong>
      </legend>

      <p id={hintId}>Durant la dernière semaine, ce symptôme vous a affecté :</p>

      {choices.map((choice) => (
        <label key={choice.code}>
          <input
            type="radio"
            name={groupId}
            value={choice.numericValue}
            checked={value === choice.numericValue}
            onChange={() => onChange(choice.numericValue)}
          />
          {choice.label}
        </label>
      ))}

      {error && <p id={errorId} role="alert">{error}</p>}
    </fieldset>
  );
}
```

### Annexe C — Exemple de service de soumission

```ts
async function submitBurnsResponse(input: SubmitBurnsResponseInput, context: SessionContext) {
  await assertSessionIsValid(context);
  await assertQuestionnaireVersionIsActive(input.questionnaireVersionId);
  await assertUserCanSubmit(context, input.assignmentId);

  const normalizedAnswers = normalizeAnswers(input.answers);
  const score = calculateBurnsScore(normalizedAnswers);

  if (score.scoreStatus !== "complete") {
    throw new ValidationError("QUESTIONNAIRE_INCOMPLETE", {
      missingItems: score.missingItems,
      invalidItems: score.invalidItems,
    });
  }

  return await db.transaction(async (tx) => {
    const response = await tx.assessmentResponse.create({
      data: {
        organizationId: context.organizationId,
        personId: context.personId,
        assignmentId: input.assignmentId ?? null,
        questionnaireVersionId: input.questionnaireVersionId,
        mode: input.mode ?? "self_administered",
        status: "submitted",
        startedAt: input.clientContext?.startedAt ?? context.startedAt,
        submittedAt: new Date(),
        clientContext: sanitizeClientContext(input.clientContext),
      },
    });

    await tx.assessmentAnswer.createMany({
      data: Object.entries(normalizedAnswers).map(([itemCode, value]) => ({
        responseId: response.id,
        itemCode,
        choiceCode: choiceCodeFromValue(value),
        numericValue: value,
      })),
    });

    await tx.scoreResult.create({
      data: {
        responseId: response.id,
        scoringConfigId: "burns_anxiety_sum_v1",
        scoreStatus: score.scoreStatus,
        answeredCount: 33,
        missingItems: [],
        invalidItems: [],
        totalScore: score.totalScore,
        maxScore: 99,
        normalizedPercent: Number(((score.totalScore / 99) * 100).toFixed(2)),
        severity: score.severityBand,
        severityLabel: severityLabel(score.severityBand),
        subScores: score.subScores,
      },
    });

    if (input.assignmentId) {
      await tx.assessmentAssignment.update({
        where: { id: input.assignmentId },
        data: {
          status: "submitted",
          submittedAt: new Date(),
          invitationTokenHash: null,
        },
      });
    }

    await audit(tx, {
      action: "burns_response.submitted",
      resourceType: "assessment_response",
      resourceId: response.id,
      personId: context.personId,
      outcome: "success",
    });

    return response;
  });
}
```

### Annexe D — Exemple de dictionnaire de données export

| Champ | Type | Description | Identifiant direct ? |
|---|---|---|---|
| `organization_id` | uuid | Organisation productrice | indirect |
| `person_pseudonym` | string | Pseudonyme stable | non direct |
| `assessment_id` | uuid | Identifiant de passation | indirect |
| `questionnaire_code` | string | `burns_anxiety_inventory_fr` | non |
| `questionnaire_version` | string | Version utilisée | non |
| `mode` | enum | Mode de passation | non |
| `submitted_at` | datetime | Date de soumission | indirect |
| `q01` | integer | Item 01 — Sentiments — sentiment d'anxiété, de nervosité, d'inquiétude ou de peur. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q02` | integer | Item 02 — Sentiments — ressentir votre environnement immédiat comme étrange, irréel ou embrouillé. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q03` | integer | Item 03 — Sentiments — sentiment d'être séparé de l'ensemble ou d'une partie de votre corps. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q04` | integer | Item 04 — Sentiments — périodes de panique soudaines et inattendues. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q05` | integer | Item 05 — Sentiments — appréhension ou sens d'un danger imminent. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q06` | integer | Item 06 — Sentiments — sentiment d'être tendu, stressé, oppressé, crispé. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q07` | integer | Item 07 — Pensée — avoir des difficultés de concentration. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q08` | integer | Item 08 — Pensée — avoir un flot de pensées rapides ou l'esprit qui saute constamment d'un sujet à l'autre. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q09` | integer | Item 09 — Pensée — être songeur durant la journée ou être dérangé par des pensées effrayantes. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q10` | integer | Item 10 — Pensée — sentir que vous êtes sur le point de perdre le contrôle. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q11` | integer | Item 11 — Pensée — avoir peur de « craquer » ou de devenir fou. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q12` | integer | Item 12 — Pensée — avoir peur de défaillir ou de vous évanouir. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q13` | integer | Item 13 — Pensée — avoir peur de souffrir d'une maladie physique, d'une crise cardiaque ou de mourir. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q14` | integer | Item 14 — Pensée — avoir peur de paraître ridicule ou inadéquat face aux autres. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q15` | integer | Item 15 — Pensée — avoir peur d'être seul, isolé ou abandonné. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q16` | integer | Item 16 — Pensée — avoir peur d'être critiqué ou désapprouvé. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q17` | integer | Item 17 — Pensée — avoir peur qu'un événement tragique ne soit sur le point d'arriver. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q18` | integer | Item 18 — Symptômes physiques — cœur qui s'accélère, qui bat fort ou dont le rythme est parfois irrégulier (palpitations). Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q19` | integer | Item 19 — Symptômes physiques — douleurs ou serrements dans la poitrine. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q20` | integer | Item 20 — Symptômes physiques — engourdissements ou fourmillements des extrémités. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q21` | integer | Item 21 — Symptômes physiques — malaises ou « papillons » dans l'estomac. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q22` | integer | Item 22 — Symptômes physiques — constipation et/ou diarrhée. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q23` | integer | Item 23 — Symptômes physiques — sensations de fatigue et/ou réactions de sursaut. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q24` | integer | Item 24 — Symptômes physiques — raideur ou tension musculaire. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q25` | integer | Item 25 — Symptômes physiques — transpiration excessive non causée par la chaleur. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q26` | integer | Item 26 — Symptômes physiques — sensation de « boule » dans la gorge. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q27` | integer | Item 27 — Symptômes physiques — tremblements. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q28` | integer | Item 28 — Symptômes physiques — jambes molles, en « guenille ». Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q29` | integer | Item 29 — Symptômes physiques — étourdissements, vertiges. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q30` | integer | Item 30 — Symptômes physiques — sensation d'étouffement et/ou essoufflement rapide au repos et/ou difficulté à respirer. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q31` | integer | Item 31 — Symptômes physiques — maux de tête ou douleurs dans le cou ou le dos. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q32` | integer | Item 32 — Symptômes physiques — alternance de frissons et de chaleur. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `q33` | integer | Item 33 — Symptômes physiques — sensations de fatigue, de faiblesse ou sentiment d'être facilement épuisé. Valeurs autorisées : 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup. | donnée de santé |
| `total_score` | integer | Score total 0 à 99 | donnée de santé |
| `severity` | enum | Niveau calculé | donnée de santé |
| `feelings_score` | integer | Sous-score descriptif sentiments | donnée de santé |
| `thoughts_score` | integer | Sous-score descriptif pensée | donnée de santé |
| `physical_score` | integer | Sous-score descriptif symptômes physiques | donnée de santé |
| `score_status` | enum | Complet/incomplet | donnée de santé |
| `exported_at` | datetime | Date d'export | indirect |


### Annexe D bis — Dictionnaire Notion item par item

Cette annexe complète l'Annexe D pour l'import Notion. Elle transforme la ligne agrégée `q01 à q33` en 33 propriétés distinctes. Chaque ligne peut devenir une propriété de base Notion ou une ligne d'une table de référence.

| Propriété Notion | Type Notion conseillé | N° item | Catégorie | Code catégorie | Libellé complet | Réponses autorisées | Calcul score |
|---|---|---:|---|---|---|---|---|
| q01 | Nombre ou sélection | 1 | Sentiments | feelings | sentiment d'anxiété, de nervosité, d'inquiétude ou de peur | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q01 = valeur numérique choisie |
| q02 | Nombre ou sélection | 2 | Sentiments | feelings | ressentir votre environnement immédiat comme étrange, irréel ou embrouillé | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q02 = valeur numérique choisie |
| q03 | Nombre ou sélection | 3 | Sentiments | feelings | sentiment d'être séparé de l'ensemble ou d'une partie de votre corps | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q03 = valeur numérique choisie |
| q04 | Nombre ou sélection | 4 | Sentiments | feelings | périodes de panique soudaines et inattendues | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q04 = valeur numérique choisie |
| q05 | Nombre ou sélection | 5 | Sentiments | feelings | appréhension ou sens d'un danger imminent | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q05 = valeur numérique choisie |
| q06 | Nombre ou sélection | 6 | Sentiments | feelings | sentiment d'être tendu, stressé, oppressé, crispé | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q06 = valeur numérique choisie |
| q07 | Nombre ou sélection | 7 | Pensée | thoughts | avoir des difficultés de concentration | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q07 = valeur numérique choisie |
| q08 | Nombre ou sélection | 8 | Pensée | thoughts | avoir un flot de pensées rapides ou l'esprit qui saute constamment d'un sujet à l'autre | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q08 = valeur numérique choisie |
| q09 | Nombre ou sélection | 9 | Pensée | thoughts | être songeur durant la journée ou être dérangé par des pensées effrayantes | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q09 = valeur numérique choisie |
| q10 | Nombre ou sélection | 10 | Pensée | thoughts | sentir que vous êtes sur le point de perdre le contrôle | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q10 = valeur numérique choisie |
| q11 | Nombre ou sélection | 11 | Pensée | thoughts | avoir peur de « craquer » ou de devenir fou | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q11 = valeur numérique choisie |
| q12 | Nombre ou sélection | 12 | Pensée | thoughts | avoir peur de défaillir ou de vous évanouir | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q12 = valeur numérique choisie |
| q13 | Nombre ou sélection | 13 | Pensée | thoughts | avoir peur de souffrir d'une maladie physique, d'une crise cardiaque ou de mourir | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q13 = valeur numérique choisie |
| q14 | Nombre ou sélection | 14 | Pensée | thoughts | avoir peur de paraître ridicule ou inadéquat face aux autres | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q14 = valeur numérique choisie |
| q15 | Nombre ou sélection | 15 | Pensée | thoughts | avoir peur d'être seul, isolé ou abandonné | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q15 = valeur numérique choisie |
| q16 | Nombre ou sélection | 16 | Pensée | thoughts | avoir peur d'être critiqué ou désapprouvé | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q16 = valeur numérique choisie |
| q17 | Nombre ou sélection | 17 | Pensée | thoughts | avoir peur qu'un événement tragique ne soit sur le point d'arriver | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q17 = valeur numérique choisie |
| q18 | Nombre ou sélection | 18 | Symptômes physiques | physical | cœur qui s'accélère, qui bat fort ou dont le rythme est parfois irrégulier (palpitations) | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q18 = valeur numérique choisie |
| q19 | Nombre ou sélection | 19 | Symptômes physiques | physical | douleurs ou serrements dans la poitrine | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q19 = valeur numérique choisie |
| q20 | Nombre ou sélection | 20 | Symptômes physiques | physical | engourdissements ou fourmillements des extrémités | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q20 = valeur numérique choisie |
| q21 | Nombre ou sélection | 21 | Symptômes physiques | physical | malaises ou « papillons » dans l'estomac | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q21 = valeur numérique choisie |
| q22 | Nombre ou sélection | 22 | Symptômes physiques | physical | constipation et/ou diarrhée | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q22 = valeur numérique choisie |
| q23 | Nombre ou sélection | 23 | Symptômes physiques | physical | sensations de fatigue et/ou réactions de sursaut | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q23 = valeur numérique choisie |
| q24 | Nombre ou sélection | 24 | Symptômes physiques | physical | raideur ou tension musculaire | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q24 = valeur numérique choisie |
| q25 | Nombre ou sélection | 25 | Symptômes physiques | physical | transpiration excessive non causée par la chaleur | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q25 = valeur numérique choisie |
| q26 | Nombre ou sélection | 26 | Symptômes physiques | physical | sensation de « boule » dans la gorge | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q26 = valeur numérique choisie |
| q27 | Nombre ou sélection | 27 | Symptômes physiques | physical | tremblements | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q27 = valeur numérique choisie |
| q28 | Nombre ou sélection | 28 | Symptômes physiques | physical | jambes molles, en « guenille » | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q28 = valeur numérique choisie |
| q29 | Nombre ou sélection | 29 | Symptômes physiques | physical | étourdissements, vertiges | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q29 = valeur numérique choisie |
| q30 | Nombre ou sélection | 30 | Symptômes physiques | physical | sensation d'étouffement et/ou essoufflement rapide au repos et/ou difficulté à respirer | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q30 = valeur numérique choisie |
| q31 | Nombre ou sélection | 31 | Symptômes physiques | physical | maux de tête ou douleurs dans le cou ou le dos | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q31 = valeur numérique choisie |
| q32 | Nombre ou sélection | 32 | Symptômes physiques | physical | alternance de frissons et de chaleur | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q32 = valeur numérique choisie |
| q33 | Nombre ou sélection | 33 | Symptômes physiques | physical | sensations de fatigue, de faiblesse ou sentiment d'être facilement épuisé | 0 Pas du tout ; 1 Quelquefois ; 2 Assez souvent ; 3 Beaucoup | q33 = valeur numérique choisie |


### Annexe D ter — Table Notion des options de réponse

| Valeur | Libellé | Ordre | Description d'import |
|---:|---|---:|---|
| 0 | Pas du tout | 1 | Option de sélection ou valeur numérique minimale |
| 1 | Quelquefois | 2 | Option de sélection ou valeur numérique occasionnelle |
| 2 | Assez souvent | 3 | Option de sélection ou valeur numérique fréquente |
| 3 | Beaucoup | 4 | Option de sélection ou valeur numérique maximale |

### Annexe D quater — Formules Notion proposées

| Propriété calculée | Formule conceptuelle | Résultat attendu |
|---|---|---|
| `score_total` | `q01 + q02 + ... + q33` | Entier de 0 à 99 |
| `score_sentiments` | `q01 + q02 + q03 + q04 + q05 + q06` | Entier de 0 à 18 |
| `score_pensee` | `q07 + q08 + q09 + q10 + q11 + q12 + q13 + q14 + q15 + q16 + q17` | Entier de 0 à 33 |
| `score_physique` | `q18 + q19 + q20 + q21 + q22 + q23 + q24 + q25 + q26 + q27 + q28 + q29 + q30 + q31 + q32 + q33` | Entier de 0 à 48 |
| `interpretation` | Si total <= 5 : anxiété minimale ; si <= 15 : anxiété légère ; si <= 30 : anxiété modérée ; si <= 50 : anxiété marquée ; sinon : anxiété très marquée | Libellé source |

### Annexe E — Exemple de matrice des droits

| Action | Répondant | Professionnel lecteur | Professionnel référent | Admin fonctionnel | DPO/RSSI | Analyste |
|---|---:|---:|---:|---:|---:|---:|
| Répondre | oui | non | oui, accompagné | non | non | non |
| Voir son résultat | selon paramétrage | non | non | non | non | non |
| Voir résultat patient | non | oui si habilité | oui si habilité | non par défaut | audit uniquement | pseudonymisé |
| Créer invitation | non | selon rôle | oui | non | non | non |
| Export PDF individuel | selon paramétrage | oui si habilité | oui si habilité | non par défaut | audit | non |
| Export CSV populationnel | non | non | non | selon rôle renforcé | audit | oui pseudonymisé |
| Modifier questionnaire | non | non | non | brouillon seulement | non | non |
| Activer version | non | non | non | avec validation | non | non |
| Consulter audit | non | non | limité | limité | oui | non |

### Annexe F — Références normatives et guides à consulter

- W3C — Web Content Accessibility Guidelines 2.2 : https://www.w3.org/TR/WCAG22/
- W3C — WCAG Overview : https://www.w3.org/WAI/standards-guidelines/wcag/
- DINUM — RGAA, Référentiel général d'amélioration de l'accessibilité : https://accessibilite.numerique.gouv.fr/
- OWASP — Application Security Verification Standard : https://owasp.org/www-project-application-security-verification-standard/
- OWASP — ASVS GitHub, versions de référence : https://github.com/OWASP/ASVS
- OWASP — Top 10 Web Application Security Risks : https://owasp.org/www-project-top-ten/
- CNIL — Santé : https://www.cnil.fr/fr/thematiques/sante
- CNIL — Analyse d'impact relative à la protection des données : https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd
- CNIL — Formalités pour les traitements de données de santé : https://www.cnil.fr/fr/quelles-formalites-pour-les-traitements-de-donnees-de-sante
- Agence du Numérique en Santé — Certification HDS : https://esante.gouv.fr/labels-certifications/hds/certification-des-hebergeurs-de-donnees-de-sante
- Agence du Numérique en Santé — Référentiels HDS : https://esante.gouv.fr/services/hebergeurs-de-donnees-de-sante/les-referentiels-de-la-procedure-de-certification
- HL7 — FHIR Questionnaire : https://hl7.org/fhir/questionnaire.html
- HL7 — FHIR QuestionnaireResponse : https://hl7.org/fhir/questionnaireresponse.html
- HL7 — FHIR Observation : https://hl7.org/fhir/observation.html
- Commission européenne — Guidance MDCG MDR/IVDR : https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en

---

## 33. Conclusion

La numérisation de l'Inventaire de Burns pour mesurer l'anxiété doit être traitée comme un projet de santé numérique complet : fidélité au questionnaire source, exactitude de la cotation, clarté de l'interprétation, protection des données, accessibilité, auditabilité et prudence clinique.

Le cœur du MVP peut rester simple — invitation, passation, réponses, score, résultat et export — mais la mise en production exige une gouvernance rigoureuse sur les droits d'utilisation, les seuils, la sécurité, la confidentialité et le cadre réglementaire.

Les points les plus importants avant développement sont :

1. confirmer les droits d'utilisation et de diffusion numérique du questionnaire ;
2. valider les libellés et les seuils avec un référent clinique ;
3. définir la politique d'affichage du score à la personne ;
4. valider la base légale, l'AIPD et l'hébergement ;
5. tester exhaustivement la fonction de score ;
6. s'assurer que l'outil ne sera pas présenté comme un diagnostic ou un triage d'urgence ;
7. garantir que les symptômes physiques inquiétants seront accompagnés d'un message de prudence approprié.
