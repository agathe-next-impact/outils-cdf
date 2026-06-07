---
titre: "Spécifications fonctionnelles et techniques — Outil web d'administration de l'Échelle de Rétablissement"
version: "1.0"
date: "2026-06-06"
langue: "fr-FR"
statut: "Document de cadrage technique"
source_principale: "PDF fourni : Évaluation du Rétablissement / Recovery Assessment Scale — Échelle version courte FR"
---

# Spécifications fonctionnelles et techniques — Outil web d'administration de l'Échelle de Rétablissement

## 1. Objet du document

Ce document décrit de manière détaillée un outil web permettant d'utiliser en ligne l'auto-questionnaire **Recovery Assessment Scale — Échelle version courte FR**, ci-après nommé **Échelle de Rétablissement** ou **RAS courte FR**.

L'objectif est de fournir aux équipes produit, design, développement, sécurité, conformité, hébergement et exploitation un cahier des charges suffisamment complet pour concevoir, développer, déployer, maintenir et auditer une solution web.

Le document couvre :

- la description du questionnaire et de son usage attendu ;
- les exigences fonctionnelles ;
- les règles métier et les règles de score ;
- l'expérience utilisateur pour les personnes accompagnées et les professionnels ;
- l'architecture applicative ;
- le modèle de données ;
- les API ;
- la sécurité ;
- la protection des données ;
- l'accessibilité ;
- l'interopérabilité ;
- les tests, la mise en production et l'exploitation.

> **Avertissement important** : le PDF source ne fournit pas explicitement de méthode de cotation, de seuil clinique, de règle d'interprétation ni de licence d'utilisation. Toute mise en ligne doit être validée par le responsable clinique, le responsable de traitement, le DPO et, le cas échéant, par les détenteurs des droits de l'échelle.

---

## 2. Résumé du formulaire source

### 2.1 Nature de l'outil

Le formulaire source est une évaluation du rétablissement en santé mentale. Il est présenté comme un **auto-questionnaire** permettant :

- d'apprécier l'évolution individuelle d'une personne suivie ;
- d'évaluer la capacité du pôle à remplir sa mission ;
- d'être complété idéalement au début du suivi, à la fin du suivi ou une fois par an.

Le questionnaire comporte :

- un champ **Date** ;
- un champ **Nom** ;
- 24 questions ;
- 5 modalités de réponse de type Likert :
  1. Pas du tout d'accord ;
  2. Pas d'accord ;
  3. Ni en désaccord ni d'accord ;
  4. D'accord ;
  5. Tout à fait d'accord.

### 2.2 Définition du rétablissement reprise du formulaire source

Le formulaire source définit le rétablissement comme un processus personnel de changement, non linéaire, de révélation du potentiel, permettant de donner du sens à sa vie et de vivre de manière aussi épanouie que possible, malgré d'éventuelles contraintes liées à la maladie.

Dans l'outil web, cette définition doit être affichée sous forme claire, non stigmatisante et accessible avant le démarrage du questionnaire.

### 2.3 Questions du questionnaire

| N° | Libellé exact à afficher |
|---:|---|
| 01 | La peur ne m'empêche pas de vivre ma vie comme je le veux. |
| 02 | Je peux faire face à ce qui m'arrive dans la vie. |
| 03 | Je m'apprécie moi-même. |
| 04 | Si les gens me connaissaient vraiment, ils m'apprécieraient. |
| 05 | J'ai une idée de qui je veux devenir. |
| 06 | Quelque chose de bien arrivera éventuellement. |
| 07 | J'ai espoir en l'avenir. |
| 08 | Je continue d'avoir de nouveaux intérêts. |
| 09 | Je peux faire face au stress. |
| 10 | Je sais quand demander de l'aide. |
| 11 | Je peux volontiers demander de l'aide. |
| 12 | Je demande de l'aide, quand j'en ai besoin. |
| 13 | J'ai un désir de réussir. |
| 14 | J'ai mon propre plan sur comment être bien et le rester. |
| 15 | J'ai des buts dans la vie que je veux atteindre. |
| 16 | Je crois que je peux réaliser mes buts personnels. |
| 17 | J'ai une raison d'être dans la vie. |
| 18 | Même quand je ne tiens plus à moi, d'autres le font. |
| 19 | Je connais des personnes sur lesquelles je peux compter. |
| 20 | Même quand je ne crois plus en moi-même, d'autres gardent confiance en moi. |
| 21 | C'est important d'avoir une variété d'amis. |
| 22 | Faire face à ma maladie mentale n'est plus l'objectif principal de ma vie. |
| 23 | Mes symptômes interfèrent de moins en moins dans ma vie. |
| 24 | Chaque fois qu'ils surviennent, mes symptômes me paraissent être un problème pour de plus courtes périodes de temps. |

### 2.4 Regroupements visuels observés sur le formulaire source

Le formulaire papier utilise des couleurs par blocs de questions. Les blocs ne sont pas nommés dans la source ; les libellés ci-dessous sont donc **des libellés internes provisoires** destinés au design et aux statistiques, à valider par l'équipe clinique.

| Bloc interne | Items | Couleur papier observée | Libellé interne proposé | Usage recommandé |
|---|---:|---|---|---|
| G1 | 01–09 | vert clair | Peur, confiance, estime, espoir, intérêts, stress | Affichage, filtres analytiques, sous-scores exploratoires si validés |
| G2 | 10–12 | jaune clair | Demande d'aide | Affichage, filtres analytiques, sous-scores exploratoires si validés |
| G3 | 13–17 | pêche/orange clair | Objectifs, projet personnel, sens | Affichage, filtres analytiques, sous-scores exploratoires si validés |
| G4 | 18–21 | bleu clair | Soutien social et confiance d'autrui | Affichage, filtres analytiques, sous-scores exploratoires si validés |
| G5 | 22–24 | gris clair | Place de la maladie et des symptômes | Affichage, filtres analytiques, sous-scores exploratoires si validés |

> **Règle de prudence** : ne pas présenter ces blocs comme des dimensions psychométriques officielles sans documentation clinique validée.

---

## 3. Objectifs produit

### 3.1 Objectif général

Mettre à disposition un outil web sécurisé, accessible et simple d'utilisation permettant à une personne accompagnée de compléter l'Échelle de Rétablissement en ligne, puis permettant aux professionnels habilités de consulter les résultats, suivre l'évolution dans le temps, exporter les données et piloter l'utilisation de l'outil.

### 3.2 Objectifs détaillés

1. **Numériser le questionnaire** sans modifier le sens des questions.
2. **Réduire la charge administrative** liée à la saisie papier.
3. **Améliorer la complétude** des réponses grâce à des contrôles non intrusifs.
4. **Permettre le suivi longitudinal** : début de suivi, fin de suivi, annuel, ou autre échéance paramétrée.
5. **Produire un score exploitable** selon une règle configurable et validée.
6. **Garantir la confidentialité** des données de santé et des données personnelles.
7. **Permettre l'usage autonome** par les personnes accompagnées, y compris sur mobile.
8. **Permettre l'usage assisté** en présence d'un professionnel.
9. **Favoriser l'accessibilité** pour des utilisateurs ayant des difficultés cognitives, visuelles, motrices ou linguistiques.
10. **Permettre une exploitation agrégée** par le service sans exposer d'informations identifiantes inutiles.

### 3.3 Non-objectifs

L'outil ne doit pas :

- établir un diagnostic psychiatrique ;
- remplacer l'évaluation clinique ;
- se substituer à un dispositif d'urgence ;
- interpréter automatiquement une situation individuelle sans validation professionnelle ;
- afficher des seuils cliniques non validés ;
- décider d'un parcours de soins sans intervention humaine ;
- être utilisé comme dispositif médical sans analyse réglementaire préalable.

---

## 4. Périmètre fonctionnel

### 4.1 Utilisateurs cibles

| Profil | Description | Besoins principaux |
|---|---|---|
| Personne accompagnée | Usager/patient complétant l'auto-questionnaire | Comprendre l'objectif, répondre simplement, être rassuré sur la confidentialité |
| Professionnel | Soignant, psychologue, infirmier, éducateur, pair-aidant habilité ou autre professionnel du service | Créer une invitation, consulter les résultats, suivre l'évolution |
| Coordinateur de parcours | Professionnel ayant une vue globale sur un groupe de personnes suivies | Planifier les évaluations, relancer, visualiser la progression |
| Administrateur fonctionnel | Gestionnaire de structure ou chef de service | Paramétrer établissements, équipes, droits, versions du questionnaire |
| Administrateur technique | Exploitant ou DevOps | Superviser la plateforme, gérer incidents, sauvegardes, déploiements |
| DPO / Référent conformité | Responsable de la conformité RGPD et santé | Contrôler les traitements, exports, droits des personnes, durées de conservation |
| Chercheur / statisticien autorisé | Utilisateur de données anonymisées ou pseudonymisées | Accéder à des jeux de données agrégés ou minimisés selon autorisation |

### 4.2 Parcours principaux

#### 4.2.1 Parcours personne accompagnée — lien d'invitation

1. La personne reçoit un lien sécurisé par SMS, email, courrier imprimé ou QR code.
2. Elle accède à une page d'accueil présentant :
   - le nom du questionnaire ;
   - l'objectif ;
   - la durée estimée ;
   - les informations de confidentialité ;
   - la possibilité de demander de l'aide.
3. Elle confirme avoir compris les informations.
4. Elle répond aux 24 questions.
5. Elle vérifie ses réponses sur un écran récapitulatif.
6. Elle soumet le questionnaire.
7. Elle reçoit un message de confirmation.
8. Selon le paramétrage, elle peut :
   - voir ou non son score ;
   - télécharger une copie de ses réponses ;
   - recevoir des informations sur la suite du suivi.

#### 4.2.2 Parcours personne accompagnée — saisie en salle ou en entretien

1. Le professionnel ouvre une session de passation sur une tablette ou un poste partagé.
2. L'outil active un mode **kiosque** ou **saisie accompagnée**.
3. La personne répond elle-même ou dicte ses réponses.
4. Le professionnel ne peut pas modifier les réponses après soumission sans procédure d'amendement tracée.
5. À la fin, la session est automatiquement fermée.

#### 4.2.3 Parcours professionnel — création d'une évaluation

1. Le professionnel recherche la personne accompagnée dans son périmètre d'habilitation.
2. Il crée une évaluation :
   - type : début de suivi, annuel, fin de suivi, ponctuel ;
   - date cible ;
   - mode de passation : lien distant, en présentiel, papier à ressaisir ;
   - professionnel référent.
3. Le système génère une invitation unique.
4. Le professionnel suit le statut : non envoyée, envoyée, ouverte, en cours, complétée, expirée, annulée.

#### 4.2.4 Parcours professionnel — consultation des résultats

1. Le professionnel ouvre la fiche de la personne.
2. Il visualise la liste des évaluations RAS.
3. Pour chaque évaluation :
   - date ;
   - contexte ;
   - complétude ;
   - score total ;
   - score moyen ;
   - réponses par item ;
   - évolution depuis l'évaluation précédente ;
   - éventuelles notes cliniques ajoutées séparément.
4. Les résultats peuvent être exportés selon les droits.

#### 4.2.5 Parcours administrateur

1. Paramétrer les structures et équipes.
2. Gérer les rôles et habilitations.
3. Activer/désactiver les modes de passation.
4. Paramétrer la durée de validité des liens.
5. Paramétrer la règle de score.
6. Paramétrer les exports autorisés.
7. Consulter les journaux d'audit.
8. Gérer les versions du questionnaire.

---

## 5. Exigences fonctionnelles détaillées

### 5.1 Gestion du questionnaire

#### 5.1.1 Versionnement

Le questionnaire doit être stocké comme une ressource versionnée.

Chaque version doit contenir :

- un identifiant stable ;
- un numéro de version ;
- la langue ;
- le titre ;
- l'introduction ;
- les questions ;
- les modalités de réponse ;
- les règles de score ;
- la date d'activation ;
- la date de retrait éventuelle ;
- le statut : brouillon, actif, retiré, archivé.

**Règle obligatoire** : une réponse soumise doit toujours référencer exactement la version du questionnaire utilisée lors de la passation.

#### 5.1.2 Modification du questionnaire

Toute modification d'un libellé, d'une modalité de réponse ou d'une règle de score doit créer une nouvelle version.

Les réponses existantes ne doivent jamais être recalculées automatiquement sur une nouvelle version sans opération explicite, tracée et réversible.

#### 5.1.3 Modes d'affichage

L'application doit proposer au minimum :

- **Mode question par question** : recommandé sur mobile et pour l'accessibilité cognitive.
- **Mode tableau** : proche du formulaire papier, recommandé sur écran large.
- **Mode professionnel** : saisie rapide en entretien, avec raccourcis clavier.
- **Mode relecture** : affichage des réponses avant soumission.

### 5.2 Gestion des passations

#### 5.2.1 Statuts d'une passation

| Statut | Description | Transition possible |
|---|---|---|
| `created` | Passation créée mais non envoyée | `sent`, `cancelled` |
| `sent` | Invitation envoyée | `opened`, `expired`, `cancelled` |
| `opened` | Lien ouvert au moins une fois | `in_progress`, `expired`, `cancelled` |
| `in_progress` | Des réponses brouillon existent | `submitted`, `expired`, `cancelled` |
| `submitted` | Réponses soumises par la personne | `validated`, `amended` |
| `validated` | Résultat vérifié par professionnel habilité | `amended`, `archived` |
| `amended` | Correction ou annotation après soumission | `validated`, `archived` |
| `expired` | Lien expiré | `resent`, `cancelled` |
| `cancelled` | Passation annulée | aucun sauf réouverture admin exceptionnelle |
| `archived` | Passation archivée selon politique | lecture restreinte |

#### 5.2.2 Expiration des liens

Paramètre recommandé :

- lien valable 7 à 30 jours selon l'organisation ;
- expiration immédiate après soumission ;
- jeton non réutilisable ;
- possibilité de renvoyer une invitation en générant un nouveau jeton ;
- journalisation des ouvertures et soumissions.

#### 5.2.3 Brouillons

Le système peut enregistrer un brouillon si :

- l'utilisateur a explicitement accepté la sauvegarde temporaire ;
- le lien est encore valide ;
- aucune donnée sensible inutile n'est stockée côté navigateur ;
- les réponses brouillon sont chiffrées ou protégées de la même manière que les réponses finales.

#### 5.2.4 Reprise après interruption

La personne doit pouvoir reprendre le questionnaire tant que :

- le lien n'a pas expiré ;
- la passation n'a pas été soumise ;
- la politique de sécurité autorise la reprise.

Sur un poste partagé, la reprise automatique doit être désactivée par défaut.

### 5.3 Réponses

#### 5.3.1 Modalités

| Code interne | Libellé | Valeur numérique proposée | Ordre |
|---|---|---:|---:|
| `strongly_disagree` | Pas du tout d'accord | 1 | 1 |
| `disagree` | Pas d'accord | 2 | 2 |
| `neutral` | Ni en désaccord ni d'accord | 3 | 3 |
| `agree` | D'accord | 4 | 4 |
| `strongly_agree` | Tout à fait d'accord | 5 | 5 |

> La valeur numérique 1–5 est une convention technique proposée. Elle doit être validée par le responsable clinique et documentaire avant activation en production.

#### 5.3.2 Complétude

Deux politiques sont possibles :

| Politique | Description | Recommandation |
|---|---|---|
| Complétude stricte | Les 24 réponses sont obligatoires pour soumettre | Recommandée pour la version MVP |
| Complétude souple | La soumission partielle est autorisée avec score partiel | À activer seulement avec règles de score validées |

Pour la version initiale, utiliser la **complétude stricte** afin d'éviter une interprétation ambiguë des scores.

#### 5.3.3 Correction après soumission

Une réponse soumise doit être considérée comme immuable.

Si une correction est nécessaire :

1. créer une nouvelle révision ;
2. conserver la version originale ;
3. enregistrer le motif ;
4. enregistrer l'auteur de la correction ;
5. enregistrer l'horodatage ;
6. recalculer le score dans une entrée séparée ;
7. afficher clairement qu'une correction a eu lieu.

### 5.4 Scores et restitution

#### 5.4.1 Score total proposé

Sous réserve de validation clinique :

- chaque item vaut de 1 à 5 ;
- total minimal : 24 ;
- total maximal : 120 ;
- score total = somme des 24 réponses ;
- score moyen = score total / 24 ;
- score normalisé en pourcentage = `(score_moyen - 1) / 4 * 100`.

#### 5.4.2 Sous-scores exploratoires

Des sous-scores par bloc visuel peuvent être calculés à titre exploratoire seulement si l'équipe clinique valide leur usage.

| Sous-score interne | Items | Min | Max | Moyenne |
|---|---|---:|---:|---:|
| `g1_peur_confiance_espoir` | 01–09 | 9 | 45 | somme / 9 |
| `g2_demande_aide` | 10–12 | 3 | 15 | somme / 3 |
| `g3_objectifs_sens` | 13–17 | 5 | 25 | somme / 5 |
| `g4_soutien_social` | 18–21 | 4 | 20 | somme / 4 |
| `g5_symptomes_maladie` | 22–24 | 3 | 15 | somme / 3 |

#### 5.4.3 Interprétation

L'application ne doit pas afficher d'interprétation clinique automatique non validée.

Formulations autorisées par défaut :

- « Score total : X / 120 » ;
- « Score moyen : X / 5 » ;
- « Évolution depuis la précédente passation : +X points » ;
- « Les résultats sont à discuter avec un professionnel. »

Formulations à éviter sans validation :

- « Rétablissement faible / moyen / élevé » ;
- « Patient à risque » ;
- « Amélioration cliniquement significative » ;
- « Échec du suivi » ;
- « Score normal / anormal ».

#### 5.4.4 Visualisation individuelle

L'écran professionnel doit proposer :

- un graphique d'évolution du score total ;
- un tableau des passations ;
- une comparaison item par item entre deux dates ;
- la mise en évidence des variations absolues par item ;
- une indication de complétude ;
- un export PDF ou HTML imprimable si validé.

#### 5.4.5 Visualisation agrégée

Le tableau de bord de service peut proposer :

- nombre de passations créées ;
- taux de complétion ;
- délai médian de complétion ;
- score moyen par période ;
- évolution moyenne entre première et dernière passation ;
- distribution des réponses par item ;
- segmentation par structure, équipe, période, type de passation.

**Protection contre la ré-identification** : masquer ou agréger les groupes contenant moins d'un seuil minimal de personnes, par exemple `n < 10`, sauf justification documentée.

---

## 6. Exigences UX et interface

### 6.1 Principes UX

L'outil doit être :

- simple ;
- rassurant ;
- sans jugement ;
- lisible ;
- utilisable sur smartphone ;
- compatible avec une passation en contexte de fragilité psychique ;
- explicite sur la confidentialité ;
- capable d'être utilisé avec assistance humaine.

### 6.2 Page d'accueil du questionnaire

Contenu minimal :

1. Titre : « Échelle de Rétablissement ».
2. Sous-titre : « Auto-questionnaire — Recovery Assessment Scale, version courte FR ».
3. Objectif : « Ce questionnaire permet de suivre votre évolution personnelle dans le temps. »
4. Durée estimée : « Environ 5 à 10 minutes. »
5. Confidentialité : « Vos réponses seront accessibles uniquement aux professionnels habilités de votre accompagnement. »
6. Non-urgence : « Cet outil n'est pas un service d'urgence. En cas de danger immédiat, contactez les services d'urgence ou un professionnel. »
7. Bouton principal : « Commencer ».
8. Lien secondaire : « J'ai besoin d'aide pour répondre ».

### 6.3 Présentation des questions

#### 6.3.1 Mode question par question

Chaque écran affiche :

- le numéro de question : « Question 3 sur 24 » ;
- le libellé de la question ;
- les 5 réponses sous forme de boutons radio ;
- un bouton « Précédent » ;
- un bouton « Suivant » ;
- une barre de progression ;
- une option « Enregistrer et reprendre plus tard » si autorisée.

#### 6.3.2 Mode tableau

Le mode tableau doit respecter :

- une première colonne de numéros ;
- une colonne de questions ;
- cinq colonnes de réponse ;
- des libellés de colonne lisibles horizontalement sur le web, plutôt que verticalement comme le formulaire papier ;
- une disposition responsive : sur mobile, basculer automatiquement en mode question par question.

#### 6.3.3 Accessibilité des choix

Chaque modalité doit être associée à la question par un groupe radio accessible.

Exemple de libellé accessible :

```html
<fieldset aria-describedby="q01-help">
  <legend>Question 1 sur 24 : La peur ne m'empêche pas de vivre ma vie comme je le veux.</legend>
  <p id="q01-help">Sélectionnez une seule réponse.</p>
  <label><input type="radio" name="q01" value="1"> Pas du tout d'accord</label>
  <label><input type="radio" name="q01" value="2"> Pas d'accord</label>
  <label><input type="radio" name="q01" value="3"> Ni en désaccord ni d'accord</label>
  <label><input type="radio" name="q01" value="4"> D'accord</label>
  <label><input type="radio" name="q01" value="5"> Tout à fait d'accord</label>
</fieldset>
```

### 6.4 Écran de relecture

Avant la soumission, afficher :

- la date ;
- le type de passation ;
- les 24 questions avec la réponse sélectionnée ;
- un indicateur de complétude ;
- un bouton « Modifier mes réponses » ;
- un bouton « Envoyer mes réponses ».

### 6.5 Message de confirmation

Exemple :

> Merci. Vos réponses ont bien été enregistrées. Elles pourront être discutées avec un professionnel de votre accompagnement.

Ne pas afficher de score à la personne par défaut sans validation de l'organisation.

### 6.6 Messages d'erreur

Les messages doivent être précis et non culpabilisants.

| Situation | Message recommandé |
|---|---|
| Question non répondue | « Merci de choisir une réponse pour continuer. » |
| Lien expiré | « Ce lien n'est plus valide. Vous pouvez demander un nouveau lien à votre professionnel. » |
| Session indisponible | « Le questionnaire n'est pas disponible pour le moment. Veuillez réessayer plus tard. » |
| Erreur de soumission | « Vos réponses n'ont pas pu être envoyées. Elles n'ont pas été perdues. Veuillez réessayer. » |

### 6.7 Design system

Recommandations :

- taille de police minimale : 16 px ;
- interligne confortable ;
- boutons radio larges et cliquables ;
- contraste conforme à l'objectif d'accessibilité ;
- pas de couleur comme unique moyen de transmettre une information ;
- éviter les animations non nécessaires ;
- mode sombre optionnel ;
- impression possible côté professionnel.

---

## 7. Accessibilité

### 7.1 Objectif

L'objectif recommandé est une conformité **WCAG 2.2 niveau AA**, sauf exigences nationales plus strictes applicables au projet.

### 7.2 Exigences détaillées

| Domaine | Exigence |
|---|---|
| Navigation clavier | Toutes les fonctionnalités doivent être utilisables sans souris. |
| Focus visible | Le focus clavier doit être visible et contrasté. |
| Lecteurs d'écran | Les questions doivent être structurées avec `fieldset`, `legend`, labels et messages d'erreur associés. |
| Contraste | Le texte et les contrôles doivent respecter les ratios requis. |
| Taille de cible | Les choix de réponse doivent être facilement sélectionnables sur mobile. |
| Langue | Déclarer `lang="fr"`. |
| Erreurs | Les erreurs doivent être identifiées textuellement et associées au champ concerné. |
| Temps | Prévenir avant expiration de session et permettre une prolongation si compatible avec la sécurité. |
| Cognition | Utiliser des phrases courtes, une progression claire et éviter la surcharge. |
| Responsive | Le questionnaire doit être utilisable à 320 px de large. |

### 7.3 Tests d'accessibilité

Inclure :

- tests automatisés avec axe-core ou équivalent ;
- tests clavier manuels ;
- tests lecteur d'écran ;
- tests de zoom navigateur à 200 % ;
- tests mobile ;
- revue avec utilisateurs si possible.

---

## 8. Règles métier

### 8.1 Identification de la personne

Trois modèles sont possibles :

| Modèle | Description | Avantages | Risques |
|---|---|---|---|
| Nom saisi librement | Reprise du formulaire papier | Simple | Risque d'erreur, données identifiantes inutiles |
| Personne préexistante | Questionnaire lié à un dossier interne | Fiable pour le suivi | Nécessite contrôle d'accès strict |
| Pseudonyme / code | Code d'inclusion ou identifiant non directement nominatif | Réduit l'identification | Besoin d'une table de correspondance sécurisée |

Recommandation : éviter de demander le nom dans le formulaire public si la personne est déjà identifiée par un lien sécurisé. Afficher éventuellement les initiales ou un libellé de confirmation non sensible.

### 8.2 Date de passation

La date doit être générée automatiquement côté serveur à la soumission.

Un champ « date de passation réelle » peut être modifiable par un professionnel en cas de ressaisie papier, avec justification et audit.

### 8.3 Typologie des passations

Types recommandés :

- `baseline` : début de suivi ;
- `annual` : annuel ;
- `end_of_care` : fin de suivi ;
- `ad_hoc` : ponctuel ;
- `paper_backfill` : ressaisie d'un questionnaire papier.

### 8.4 Gestion des doublons

Empêcher par défaut deux soumissions actives pour :

- la même personne ;
- le même questionnaire ;
- le même type de passation ;
- la même date cible.

Autoriser une dérogation administrateur avec justification.

### 8.5 Annotations professionnelles

Les annotations doivent être séparées des réponses brutes.

Une annotation contient :

- texte ;
- auteur ;
- rôle ;
- horodatage ;
- visibilité ;
- possibilité de correction via nouvelle version, pas écrasement.

### 8.6 Export

Formats recommandés :

- CSV pour analyses statistiques ;
- XLSX si demandé par les équipes métier ;
- JSON pour intégration ;
- PDF/HTML pour restitution individuelle ;
- FHIR `QuestionnaireResponse` optionnel pour interopérabilité santé.

Chaque export doit être journalisé.

### 8.7 Conservation

Définir une durée de conservation selon :

- finalité de prise en charge ;
- obligations légales ;
- politique documentaire de l'établissement ;
- information fournie aux personnes ;
- recommandations du DPO.

Prévoir des mécanismes :

- archivage ;
- suppression ;
- anonymisation ;
- gel légal si nécessaire ;
- preuve d'effacement.

---

## 9. Spécification de score

### 9.1 Configuration de score recommandée

```yaml
scoring:
  id: ras_short_fr_default_likert_sum_v1
  status: draft_to_validate
  value_range:
    min: 1
    max: 5
  missing_policy: require_all_items
  reverse_scored_items: []
  total:
    method: sum
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    min: 24
    max: 120
  mean:
    method: total_divided_by_answered_count
    min: 1
    max: 5
  normalized_percent:
    formula: "((mean - 1) / 4) * 100"
    min: 0
    max: 100
  interpretation:
    enabled: false
    reason: "No interpretation thresholds in source PDF. Requires clinical validation."
```

### 9.2 Pseudo-code de calcul

```ts
type LikertValue = 1 | 2 | 3 | 4 | 5;

type AnswerMap = Record<`q${string}`, LikertValue | null>;

interface ScoreResult {
  answeredCount: number;
  missingItems: number[];
  total: number | null;
  mean: number | null;
  normalizedPercent: number | null;
  subScores: Record<string, {
    answeredCount: number;
    total: number | null;
    mean: number | null;
  }>;
  scoreStatus: "complete" | "incomplete" | "invalid";
}

const ITEMS = Array.from({ length: 24 }, (_, i) => i + 1);

const GROUPS = {
  g1_peur_confiance_espoir: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  g2_demande_aide: [10, 11, 12],
  g3_objectifs_sens: [13, 14, 15, 16, 17],
  g4_soutien_social: [18, 19, 20, 21],
  g5_symptomes_maladie: [22, 23, 24],
} as const;

function calculateScore(answers: AnswerMap): ScoreResult {
  const values: number[] = [];
  const missingItems: number[] = [];

  for (const item of ITEMS) {
    const value = answers[`q${String(item).padStart(2, "0")}`];
    if (value === null || value === undefined) {
      missingItems.push(item);
    } else if (![1, 2, 3, 4, 5].includes(value)) {
      return {
        answeredCount: values.length,
        missingItems,
        total: null,
        mean: null,
        normalizedPercent: null,
        subScores: {},
        scoreStatus: "invalid",
      };
    } else {
      values.push(value);
    }
  }

  if (missingItems.length > 0) {
    return {
      answeredCount: values.length,
      missingItems,
      total: null,
      mean: null,
      normalizedPercent: null,
      subScores: calculateSubScores(answers, false),
      scoreStatus: "incomplete",
    };
  }

  const total = values.reduce((acc, value) => acc + value, 0);
  const mean = total / ITEMS.length;
  const normalizedPercent = ((mean - 1) / 4) * 100;

  return {
    answeredCount: ITEMS.length,
    missingItems: [],
    total,
    mean,
    normalizedPercent,
    subScores: calculateSubScores(answers, true),
    scoreStatus: "complete",
  };
}

function calculateSubScores(answers: AnswerMap, requireComplete: boolean) {
  const result: ScoreResult["subScores"] = {};

  for (const [groupId, items] of Object.entries(GROUPS)) {
    const groupValues = items
      .map((item) => answers[`q${String(item).padStart(2, "0")}`])
      .filter((value): value is LikertValue => typeof value === "number");

    if (requireComplete && groupValues.length !== items.length) {
      result[groupId] = { answeredCount: groupValues.length, total: null, mean: null };
      continue;
    }

    const total = groupValues.reduce((acc, value) => acc + value, 0);
    result[groupId] = {
      answeredCount: groupValues.length,
      total: groupValues.length ? total : null,
      mean: groupValues.length ? total / groupValues.length : null,
    };
  }

  return result;
}
```

### 9.3 Cas de test de score

| Cas | Réponses | Résultat attendu |
|---|---|---|
| Toutes les réponses = 1 | 24 items à 1 | total 24, moyenne 1, pourcentage 0 |
| Toutes les réponses = 3 | 24 items à 3 | total 72, moyenne 3, pourcentage 50 |
| Toutes les réponses = 5 | 24 items à 5 | total 120, moyenne 5, pourcentage 100 |
| Une réponse manquante | 23 réponses | statut `incomplete`, pas de total officiel |
| Valeur = 6 | au moins une valeur hors 1–5 | statut `invalid` |

---

## 10. Architecture cible

### 10.1 Vue d'ensemble

Architecture recommandée :

```text
[Utilisateur]
    |
    | HTTPS + HSTS
    v
[Frontend Web / PWA]
    |
    | API JSON HTTPS
    v
[API Backend / BFF]
    |
    | RBAC / ABAC / validation / audit
    v
[Services métier]
    |        |          |
    |        |          +--> [Service notifications]
    |        +------------> [Service score]
    +---------------------> [Service export]
    |
    v
[Base PostgreSQL chiffrée]
    |
    +--> [Stockage fichiers chiffré]
    +--> [Journal d'audit append-only]
    +--> [Sauvegardes chiffrées]
```

### 10.2 Choix technologiques possibles

Le projet peut être réalisé avec plusieurs piles. Une proposition robuste :

| Couche | Option recommandée | Alternatives |
|---|---|---|
| Frontend | Next.js / React / TypeScript | Vue, SvelteKit, Angular |
| Backend | NestJS / Node.js / TypeScript | FastAPI, Django, Spring Boot, .NET |
| Base de données | PostgreSQL | MariaDB, SQL Server |
| Cache / files | Redis pour files courtes et verrous | Valkey, RabbitMQ si workflows plus complexes |
| Fichiers | Stockage objet S3 compatible chiffré | Azure Blob, GCS, MinIO |
| Auth | OIDC/OAuth2 + MFA | SAML2, Pro Santé Connect selon contexte |
| Infrastructure | Kubernetes ou PaaS HDS | VM durcies, Docker Compose pour petit périmètre |
| Observabilité | OpenTelemetry + Prometheus/Grafana + logs structurés | Datadog, ELK, Grafana Cloud |
| CI/CD | GitHub Actions/GitLab CI + scans sécurité | Azure DevOps, Jenkins |

### 10.3 Environnements

Prévoir :

- `local` : environnement développeur avec données factices ;
- `dev` : intégration continue ;
- `staging` / `preprod` : environnement représentatif sans données réelles ou avec données pseudonymisées ;
- `prod` : production ;
- `sandbox` : démonstration sans données personnelles.

Règle : aucune donnée réelle en environnement local ou dev sans validation formelle.

### 10.4 Frontend

Responsabilités :

- rendu du questionnaire ;
- validation de premier niveau ;
- expérience responsive ;
- accessibilité ;
- gestion de session utilisateur ;
- appels API ;
- absence de logique de sécurité critique côté client ;
- absence de stockage local persistant de données sensibles par défaut.

### 10.5 Backend

Responsabilités :

- authentification et autorisation ;
- gestion des passations ;
- validation canonique des réponses ;
- calcul des scores ;
- audit ;
- exports ;
- notifications ;
- application des politiques de conservation ;
- protection contre abus et automatisation.

### 10.6 Base de données

Responsabilités :

- stockage transactionnel ;
- intégrité référentielle ;
- historisation ;
- chiffrement au repos ;
- indexation ;
- séparation logique multi-organisation si nécessaire.

### 10.7 Stockage objet

Utilisé uniquement pour :

- exports générés ;
- PDF de restitution ;
- pièces justificatives éventuelles ;
- archives chiffrées.

Les fichiers doivent avoir :

- durée de vie limitée ;
- URL signées à courte durée ;
- chiffrement ;
- contrôle d'accès ;
- journalisation d'accès.

---

## 11. Modèle de données conceptuel

### 11.1 Entités principales

| Entité | Description |
|---|---|
| `Organization` | Structure porteuse : établissement, pôle, association, service |
| `Site` | Site géographique ou unité |
| `Team` | Équipe opérationnelle |
| `User` | Compte professionnel ou administrateur |
| `Patient` | Personne accompagnée ou usager |
| `Questionnaire` | Définition générale de l'échelle |
| `QuestionnaireVersion` | Version précise du questionnaire |
| `QuestionnaireItem` | Question individuelle |
| `ResponseChoice` | Modalité Likert |
| `AssessmentAssignment` | Invitation ou demande de passation |
| `AssessmentResponse` | Réponse soumise ou brouillon |
| `AssessmentAnswer` | Réponse item par item |
| `ScoreResult` | Score calculé |
| `ProfessionalNote` | Note séparée d'un professionnel |
| `ConsentRecord` | Information/consentement ou trace d'information |
| `ExportJob` | Demande et résultat d'export |
| `AuditEvent` | Journal d'audit |
| `Notification` | Email/SMS/courrier/relance |

### 11.2 Relations principales

```text
Organization 1---n Site
Organization 1---n Team
Team n---n User
Organization 1---n Patient
Patient 1---n AssessmentAssignment
Questionnaire 1---n QuestionnaireVersion
QuestionnaireVersion 1---n QuestionnaireItem
QuestionnaireVersion 1---n ResponseChoice
AssessmentAssignment 0---1 AssessmentResponse
AssessmentResponse 1---n AssessmentAnswer
AssessmentResponse 1---1 ScoreResult
AssessmentResponse 0---n ProfessionalNote
User 1---n AuditEvent
```

---

## 12. Modèle de données logique PostgreSQL

### 12.1 Types énumérés

```sql
CREATE TYPE user_role AS ENUM (
  'patient',
  'professional',
  'coordinator',
  'functional_admin',
  'technical_admin',
  'dpo',
  'researcher'
);

CREATE TYPE questionnaire_status AS ENUM (
  'draft',
  'active',
  'retired',
  'archived'
);

CREATE TYPE assignment_status AS ENUM (
  'created',
  'sent',
  'opened',
  'in_progress',
  'submitted',
  'validated',
  'amended',
  'expired',
  'cancelled',
  'archived'
);

CREATE TYPE assessment_type AS ENUM (
  'baseline',
  'annual',
  'end_of_care',
  'ad_hoc',
  'paper_backfill'
);

CREATE TYPE response_status AS ENUM (
  'draft',
  'submitted',
  'amended',
  'voided'
);

CREATE TYPE score_status AS ENUM (
  'complete',
  'incomplete',
  'invalid'
);
```

### 12.2 Tables principales

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  legal_name TEXT,
  siret TEXT,
  data_controller_name TEXT,
  dpo_contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  site_id UUID REFERENCES sites(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  email CITEXT UNIQUE,
  display_name TEXT NOT NULL,
  role user_role NOT NULL,
  oidc_subject TEXT UNIQUE,
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE team_memberships (
  team_id UUID NOT NULL REFERENCES teams(id),
  user_id UUID NOT NULL REFERENCES users(id),
  role_in_team TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  external_reference TEXT,
  display_name TEXT,
  birth_date DATE,
  contact JSONB,
  pseudonym TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ,
  UNIQUE (organization_id, external_reference)
);

CREATE TABLE patient_team_assignments (
  patient_id UUID NOT NULL REFERENCES patients(id),
  team_id UUID NOT NULL REFERENCES teams(id),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  PRIMARY KEY (patient_id, team_id, start_date)
);
```

### 12.3 Questionnaire et versionnement

```sql
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE questionnaire_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_id UUID NOT NULL REFERENCES questionnaires(id),
  version_label TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'fr-FR',
  status questionnaire_status NOT NULL DEFAULT 'draft',
  introduction_md TEXT,
  scoring_config JSONB NOT NULL,
  source_reference TEXT,
  activated_at TIMESTAMPTZ,
  retired_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES users(id),
  UNIQUE(questionnaire_id, version_label)
);

CREATE TABLE questionnaire_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_version_id UUID NOT NULL REFERENCES questionnaire_versions(id),
  item_number INT NOT NULL CHECK (item_number BETWEEN 1 AND 24),
  item_code TEXT NOT NULL,
  label TEXT NOT NULL,
  group_code TEXT,
  display_order INT NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT true,
  reverse_scored BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(questionnaire_version_id, item_number),
  UNIQUE(questionnaire_version_id, item_code)
);

CREATE TABLE response_choices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_version_id UUID NOT NULL REFERENCES questionnaire_versions(id),
  choice_code TEXT NOT NULL,
  label TEXT NOT NULL,
  numeric_value INT NOT NULL CHECK (numeric_value BETWEEN 1 AND 5),
  display_order INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(questionnaire_version_id, choice_code),
  UNIQUE(questionnaire_version_id, numeric_value)
);
```

### 12.4 Passations et réponses

```sql
CREATE TABLE assessment_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  questionnaire_version_id UUID NOT NULL REFERENCES questionnaire_versions(id),
  created_by UUID REFERENCES users(id),
  responsible_professional_id UUID REFERENCES users(id),
  assessment_type assessment_type NOT NULL,
  status assignment_status NOT NULL DEFAULT 'created',
  target_date DATE,
  invitation_token_hash TEXT UNIQUE,
  invitation_sent_at TIMESTAMPTZ,
  first_opened_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assignments_patient ON assessment_assignments(patient_id);
CREATE INDEX idx_assignments_status ON assessment_assignments(status);
CREATE INDEX idx_assignments_expires_at ON assessment_assignments(expires_at);

CREATE TABLE assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assessment_assignments(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  questionnaire_version_id UUID NOT NULL REFERENCES questionnaire_versions(id),
  status response_status NOT NULL DEFAULT 'draft',
  response_revision INT NOT NULL DEFAULT 1,
  started_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  submitted_ip_hash TEXT,
  user_agent_hash TEXT,
  completion_seconds INT,
  locale TEXT DEFAULT 'fr-FR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, response_revision)
);

CREATE TABLE assessment_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID NOT NULL REFERENCES assessment_responses(id) ON DELETE CASCADE,
  questionnaire_item_id UUID NOT NULL REFERENCES questionnaire_items(id),
  item_code TEXT NOT NULL,
  numeric_value INT NOT NULL CHECK (numeric_value BETWEEN 1 AND 5),
  choice_code TEXT NOT NULL,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(response_id, questionnaire_item_id)
);

CREATE INDEX idx_answers_response ON assessment_answers(response_id);
```

### 12.5 Scores

```sql
CREATE TABLE score_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID NOT NULL UNIQUE REFERENCES assessment_responses(id) ON DELETE CASCADE,
  scoring_config_id TEXT NOT NULL,
  score_status score_status NOT NULL,
  answered_count INT NOT NULL,
  missing_items INT[] NOT NULL DEFAULT ARRAY[]::INT[],
  total_score NUMERIC(6,2),
  mean_score NUMERIC(5,3),
  normalized_percent NUMERIC(5,2),
  sub_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  calculated_by TEXT NOT NULL DEFAULT 'system'
);
```

### 12.6 Notes, exports et audit

```sql
CREATE TABLE professional_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID NOT NULL REFERENCES assessment_responses(id),
  author_id UUID NOT NULL REFERENCES users(id),
  note_md TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'care_team',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  amended_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);

CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  assignment_id UUID REFERENCES assessment_assignments(id),
  version_label TEXT NOT NULL,
  information_text_hash TEXT NOT NULL,
  accepted BOOLEAN NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  recorded_by UUID REFERENCES users(id),
  channel TEXT NOT NULL DEFAULT 'web'
);

CREATE TABLE export_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  requested_by UUID NOT NULL REFERENCES users(id),
  export_type TEXT NOT NULL,
  filters JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  file_object_key TEXT,
  file_sha256 TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  actor_user_id UUID REFERENCES users(id),
  actor_role TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  patient_id UUID,
  ip_hash TEXT,
  user_agent_hash TEXT,
  outcome TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_patient ON audit_events(patient_id);
CREATE INDEX idx_audit_actor ON audit_events(actor_user_id);
CREATE INDEX idx_audit_created_at ON audit_events(created_at);
```

---

## 13. Source de vérité du questionnaire en YAML

Cette section peut être utilisée comme base pour initialiser la table `questionnaire_versions`.

```yaml
questionnaire:
  code: RAS_SHORT_FR
  title: "Recovery Assessment Scale — Échelle version courte FR"
  display_title: "Échelle de Rétablissement"
  language: fr-FR
  version_label: "source-pdf-2026-06-06"
  source: "PDF fourni : Évaluation du Rétablissement"
  introduction: |
    Le rétablissement est un processus personnel de changement, non linéaire,
    de révélation de son potentiel, permettant de donner du sens à sa vie et de
    vivre de manière la plus épanouie possible, même s'il reste parfois des
    contraintes liées à la maladie.
  fields:
    - code: assessment_date
      label: Date
      type: date
      source_form_field: true
      implementation_note: "À générer côté serveur à la soumission."
    - code: display_name
      label: Nom
      type: text
      source_form_field: true
      implementation_note: "À éviter dans le formulaire public si l'identité est déjà connue par lien sécurisé."
  choices:
    - code: strongly_disagree
      label: "Pas du tout d'accord"
      numeric_value: 1
      order: 1
    - code: disagree
      label: "Pas d'accord"
      numeric_value: 2
      order: 2
    - code: neutral
      label: "Ni en désaccord ni d'accord"
      numeric_value: 3
      order: 3
    - code: agree
      label: "D'accord"
      numeric_value: 4
      order: 4
    - code: strongly_agree
      label: "Tout à fait d'accord"
      numeric_value: 5
      order: 5
  item_groups:
    - code: g1
      item_range: [1, 9]
      label_internal: "Peur, confiance, estime, espoir, intérêts, stress"
      official_dimension: false
    - code: g2
      item_range: [10, 12]
      label_internal: "Demande d'aide"
      official_dimension: false
    - code: g3
      item_range: [13, 17]
      label_internal: "Objectifs, projet personnel, sens"
      official_dimension: false
    - code: g4
      item_range: [18, 21]
      label_internal: "Soutien social et confiance d'autrui"
      official_dimension: false
    - code: g5
      item_range: [22, 24]
      label_internal: "Place de la maladie et des symptômes"
      official_dimension: false
  items:
    - number: 1
      code: q01
      group: g1
      label: "La peur ne m'empêche pas de vivre ma vie comme je le veux."
      required: true
    - number: 2
      code: q02
      group: g1
      label: "Je peux faire face à ce qui m'arrive dans la vie."
      required: true
    - number: 3
      code: q03
      group: g1
      label: "Je m'apprécie moi-même."
      required: true
    - number: 4
      code: q04
      group: g1
      label: "Si les gens me connaissaient vraiment, ils m'apprécieraient."
      required: true
    - number: 5
      code: q05
      group: g1
      label: "J'ai une idée de qui je veux devenir."
      required: true
    - number: 6
      code: q06
      group: g1
      label: "Quelque chose de bien arrivera éventuellement."
      required: true
    - number: 7
      code: q07
      group: g1
      label: "J'ai espoir en l'avenir."
      required: true
    - number: 8
      code: q08
      group: g1
      label: "Je continue d'avoir de nouveaux intérêts."
      required: true
    - number: 9
      code: q09
      group: g1
      label: "Je peux faire face au stress."
      required: true
    - number: 10
      code: q10
      group: g2
      label: "Je sais quand demander de l'aide."
      required: true
    - number: 11
      code: q11
      group: g2
      label: "Je peux volontiers demander de l'aide."
      required: true
    - number: 12
      code: q12
      group: g2
      label: "Je demande de l'aide, quand j'en ai besoin."
      required: true
    - number: 13
      code: q13
      group: g3
      label: "J'ai un désir de réussir."
      required: true
    - number: 14
      code: q14
      group: g3
      label: "J'ai mon propre plan sur comment être bien et le rester."
      required: true
    - number: 15
      code: q15
      group: g3
      label: "J'ai des buts dans la vie que je veux atteindre."
      required: true
    - number: 16
      code: q16
      group: g3
      label: "Je crois que je peux réaliser mes buts personnels."
      required: true
    - number: 17
      code: q17
      group: g3
      label: "J'ai une raison d'être dans la vie."
      required: true
    - number: 18
      code: q18
      group: g4
      label: "Même quand je ne tiens plus à moi, d'autres le font."
      required: true
    - number: 19
      code: q19
      group: g4
      label: "Je connais des personnes sur lesquelles je peux compter."
      required: true
    - number: 20
      code: q20
      group: g4
      label: "Même quand je ne crois plus en moi-même, d'autres gardent confiance en moi."
      required: true
    - number: 21
      code: q21
      group: g4
      label: "C'est important d'avoir une variété d'amis."
      required: true
    - number: 22
      code: q22
      group: g5
      label: "Faire face à ma maladie mentale n'est plus l'objectif principal de ma vie."
      required: true
    - number: 23
      code: q23
      group: g5
      label: "Mes symptômes interfèrent de moins en moins dans ma vie."
      required: true
    - number: 24
      code: q24
      group: g5
      label: "Chaque fois qu'ils surviennent, mes symptômes me paraissent être un problème pour de plus courtes périodes de temps."
      required: true
```

---

## 14. API REST

### 14.1 Principes

- API JSON sur HTTPS uniquement.
- Versionnement d'API : `/api/v1`.
- Validation stricte des entrées.
- Codes d'erreur standardisés.
- Pas de données personnelles inutiles dans les URLs.
- Pagination obligatoire sur listes.
- Journalisation des accès sensibles.

### 14.2 Authentification

| Endpoint | Méthode | Description |
|---|---|---|
| `/api/v1/auth/login` | POST | Connexion professionnelle si auth locale autorisée |
| `/api/v1/auth/oidc/callback` | GET | Retour OIDC |
| `/api/v1/auth/logout` | POST | Déconnexion |
| `/api/v1/auth/me` | GET | Profil courant |
| `/api/v1/invitations/{token}/resolve` | GET | Résolution d'un lien public sans exposer le token en logs applicatifs |

### 14.3 Questionnaires

| Endpoint | Méthode | Rôle | Description |
|---|---|---|---|
| `/api/v1/questionnaires` | GET | professionnel | Liste des questionnaires actifs |
| `/api/v1/questionnaires/{code}/versions/active` | GET | professionnel | Version active |
| `/api/v1/questionnaire-versions/{id}` | GET | professionnel | Détail version |
| `/api/v1/questionnaire-versions` | POST | admin | Créer une version |
| `/api/v1/questionnaire-versions/{id}/activate` | POST | admin | Activer une version |
| `/api/v1/questionnaire-versions/{id}/retire` | POST | admin | Retirer une version |

### 14.4 Passations

| Endpoint | Méthode | Rôle | Description |
|---|---|---|---|
| `/api/v1/patients/{patientId}/assignments` | POST | professionnel | Créer une passation |
| `/api/v1/assignments/{assignmentId}` | GET | professionnel | Détail d'une passation |
| `/api/v1/assignments/{assignmentId}/send` | POST | professionnel | Envoyer une invitation |
| `/api/v1/assignments/{assignmentId}/cancel` | POST | professionnel | Annuler |
| `/api/v1/assignments/{assignmentId}/resend` | POST | professionnel | Renvoyer un lien |
| `/api/v1/assignments` | GET | professionnel | Liste filtrée |

### 14.5 Réponse publique via invitation

| Endpoint | Méthode | Description |
|---|---|---|
| `/api/v1/public/assessments/{publicSessionId}` | GET | Obtenir le questionnaire public minimal |
| `/api/v1/public/assessments/{publicSessionId}/draft` | PUT | Sauvegarder brouillon si autorisé |
| `/api/v1/public/assessments/{publicSessionId}/submit` | POST | Soumettre réponses |

**Important** : ne jamais exposer l'identifiant interne patient dans les endpoints publics.

### 14.6 Résultats

| Endpoint | Méthode | Rôle | Description |
|---|---|---|---|
| `/api/v1/patients/{patientId}/responses` | GET | professionnel | Réponses d'une personne |
| `/api/v1/responses/{responseId}` | GET | professionnel | Détail réponse |
| `/api/v1/responses/{responseId}/score` | GET | professionnel | Score |
| `/api/v1/responses/{responseId}/notes` | POST | professionnel | Ajouter note |
| `/api/v1/responses/{responseId}/amend` | POST | professionnel habilité | Créer correction tracée |

### 14.7 Exports

| Endpoint | Méthode | Rôle | Description |
|---|---|---|---|
| `/api/v1/exports` | POST | professionnel selon droit | Créer export |
| `/api/v1/exports/{exportId}` | GET | demandeur/admin | Statut export |
| `/api/v1/exports/{exportId}/download` | GET | demandeur/admin | Télécharger via URL courte |

### 14.8 Audit

| Endpoint | Méthode | Rôle | Description |
|---|---|---|---|
| `/api/v1/audit-events` | GET | admin/DPO | Recherche journalisée |
| `/api/v1/audit-events/{id}` | GET | admin/DPO | Détail événement |

---

## 15. Schémas JSON principaux

### 15.1 Soumission de questionnaire

```json
{
  "publicSessionId": "ps_7fZ...",
  "questionnaireVersionId": "7a1e5e34-2d42-4a93-bc43-7a58c3959d92",
  "answers": [
    { "itemCode": "q01", "choiceCode": "agree", "numericValue": 4 },
    { "itemCode": "q02", "choiceCode": "strongly_agree", "numericValue": 5 }
  ],
  "clientContext": {
    "locale": "fr-FR",
    "completionSeconds": 432,
    "mode": "question_by_question"
  },
  "informationAccepted": true
}
```

### 15.2 Réponse de soumission

```json
{
  "responseId": "4d422244-9cc4-4594-85a6-2146982322a3",
  "status": "submitted",
  "submittedAt": "2026-06-06T10:15:00Z",
  "message": "Vos réponses ont bien été enregistrées."
}
```

### 15.3 Score

```json
{
  "responseId": "4d422244-9cc4-4594-85a6-2146982322a3",
  "questionnaireCode": "RAS_SHORT_FR",
  "questionnaireVersion": "source-pdf-2026-06-06",
  "scoreStatus": "complete",
  "answeredCount": 24,
  "missingItems": [],
  "totalScore": 94,
  "meanScore": 3.917,
  "normalizedPercent": 72.92,
  "subScores": {
    "g1_peur_confiance_espoir": { "total": 34, "mean": 3.778, "answeredCount": 9 },
    "g2_demande_aide": { "total": 12, "mean": 4.0, "answeredCount": 3 },
    "g3_objectifs_sens": { "total": 20, "mean": 4.0, "answeredCount": 5 },
    "g4_soutien_social": { "total": 16, "mean": 4.0, "answeredCount": 4 },
    "g5_symptomes_maladie": { "total": 12, "mean": 4.0, "answeredCount": 3 }
  },
  "interpretationEnabled": false,
  "calculatedAt": "2026-06-06T10:15:01Z"
}
```

---

## 16. Extrait OpenAPI 3.1

```yaml
openapi: 3.1.0
info:
  title: RAS Short FR API
  version: 1.0.0
servers:
  - url: https://example.org/api/v1
security:
  - bearerAuth: []
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    LikertValue:
      type: integer
      minimum: 1
      maximum: 5
    SubmitAnswer:
      type: object
      required: [itemCode, choiceCode, numericValue]
      properties:
        itemCode:
          type: string
          pattern: '^q(0[1-9]|1[0-9]|2[0-4])$'
        choiceCode:
          type: string
          enum: [strongly_disagree, disagree, neutral, agree, strongly_agree]
        numericValue:
          $ref: '#/components/schemas/LikertValue'
    SubmitAssessmentRequest:
      type: object
      required: [questionnaireVersionId, answers, informationAccepted]
      properties:
        questionnaireVersionId:
          type: string
          format: uuid
        answers:
          type: array
          minItems: 24
          maxItems: 24
          items:
            $ref: '#/components/schemas/SubmitAnswer'
        informationAccepted:
          type: boolean
    ScoreResult:
      type: object
      properties:
        scoreStatus:
          type: string
          enum: [complete, incomplete, invalid]
        totalScore:
          type: number
          nullable: true
        meanScore:
          type: number
          nullable: true
        normalizedPercent:
          type: number
          nullable: true
paths:
  /public/assessments/{publicSessionId}/submit:
    post:
      summary: Submit a public assessment response
      parameters:
        - name: publicSessionId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitAssessmentRequest'
      responses:
        '201':
          description: Submitted
        '400':
          description: Invalid input
        '404':
          description: Public session not found
        '410':
          description: Link expired
        '429':
          description: Too many requests
```

---

## 17. Interopérabilité santé

### 17.1 FHIR

Une exportation FHIR est recommandée si l'outil doit s'intégrer à un système d'information de santé.

Mapping proposé :

| Concept applicatif | Ressource FHIR possible |
|---|---|
| Définition du questionnaire | `Questionnaire` |
| Réponse à une passation | `QuestionnaireResponse` |
| Score calculé | `Observation` dérivée de `QuestionnaireResponse` |
| Personne accompagnée | `Patient` |
| Professionnel | `Practitioner` ou `PractitionerRole` |
| Organisation | `Organization` |

### 17.2 Exemple `QuestionnaireResponse` simplifié

```json
{
  "resourceType": "QuestionnaireResponse",
  "status": "completed",
  "questionnaire": "Questionnaire/RAS_SHORT_FR|source-pdf-2026-06-06",
  "subject": {
    "reference": "Patient/example"
  },
  "authored": "2026-06-06T10:15:00Z",
  "item": [
    {
      "linkId": "q01",
      "text": "La peur ne m'empêche pas de vivre ma vie comme je le veux.",
      "answer": [{ "valueInteger": 4 }]
    }
  ]
}
```

### 17.3 Exports CSV

Colonnes recommandées :

```text
organization_id,site_id,team_id,patient_pseudonym,assessment_id,assessment_type,
questionnaire_code,questionnaire_version,submitted_at,answered_count,total_score,
mean_score,normalized_percent,q01,q02,q03,q04,q05,q06,q07,q08,q09,q10,q11,q12,
q13,q14,q15,q16,q17,q18,q19,q20,q21,q22,q23,q24
```

Règle : l'export nominatif doit être séparé de l'export statistique pseudonymisé.

---

## 18. Sécurité applicative

### 18.1 Classification des données

Les réponses au questionnaire, liées à une personne suivie en santé mentale, doivent être traitées comme données sensibles.

Classification recommandée :

| Type de donnée | Niveau | Exemples |
|---|---|---|
| Données publiques | faible | page d'information générique |
| Données internes | moyen | configuration non sensible |
| Données personnelles | élevé | nom, contact, identifiant patient |
| Données de santé / suivi | critique | réponses, scores, notes professionnelles |
| Secrets | critique | clés de chiffrement, tokens, mots de passe |

### 18.2 Contrôles de sécurité essentiels

| Risque | Contrôle obligatoire |
|---|---|
| Accès non autorisé | RBAC/ABAC, MFA professionnels, sessions courtes, journalisation |
| Lien public transmis | Token long, aléatoire, expirant, à usage unique après soumission |
| Fuite de données dans logs | Masquage des réponses, identifiants indirects, IP hashées |
| Injection | Requêtes paramétrées, ORM contrôlé, validation serveur |
| XSS | échappement HTML, CSP stricte, sanitisation Markdown |
| CSRF | SameSite cookies, tokens CSRF si cookies de session |
| Bruteforce | rate limiting, détection d'anomalies |
| Mauvaise configuration | IaC revue, durcissement, scan de configuration |
| Exfiltration export | droits dédiés, exports temporaires, filigrane, audit |
| Compromission secrets | coffre de secrets, rotation, pas de secrets dans Git |

### 18.3 Authentification

#### Professionnels

- OIDC ou SAML2 recommandé.
- MFA obligatoire pour les rôles professionnels et administrateurs.
- Durée de session limitée.
- Déconnexion automatique après inactivité.
- Possibilité d'intégration à Pro Santé Connect selon contexte français de santé.

#### Personnes accompagnées

Options :

1. lien unique à durée limitée ;
2. lien + date de naissance ou code court ;
3. portail patient authentifié.

Pour un MVP, lien unique + expiration courte peut suffire pour un questionnaire simple, mais une analyse de risque doit décider si un second facteur est nécessaire.

### 18.4 Autorisation

Mettre en œuvre :

- contrôle par organisation ;
- contrôle par équipe ;
- contrôle par relation de prise en charge ;
- contrôle par rôle ;
- séparation lecture/export/administration ;
- impossibilité pour un professionnel de consulter hors périmètre ;
- journaux d'accès patient consultables par le DPO.

Exemple de règles :

```text
Un professionnel peut lire une réponse si :
  - il appartient à la même organisation que le patient ;
  - et il appartient à une équipe active associée au patient ;
  - et son rôle contient la permission responses:read ;
  - et la réponse n'est pas archivée avec restriction supérieure.
```

### 18.5 Chiffrement

Exigences :

- TLS 1.2 minimum, TLS 1.3 recommandé ;
- HSTS activé ;
- chiffrement au repos base de données ;
- chiffrement des sauvegardes ;
- chiffrement des exports ;
- rotation des clés ;
- séparation des clés par environnement ;
- pas de clé dans le code source.

Chiffrement applicatif champ par champ recommandé pour :

- contact patient ;
- notes professionnelles ;
- réponses si le modèle de menace l'exige.

### 18.6 Journalisation d'audit

Événements à journaliser :

- connexion réussie/échouée ;
- consultation d'une fiche patient ;
- création de passation ;
- envoi d'invitation ;
- ouverture de lien ;
- soumission ;
- consultation de résultat ;
- export ;
- modification de configuration ;
- changement de rôle ;
- suppression/anonymisation ;
- accès administrateur.

Chaque événement contient :

- identifiant acteur ;
- rôle ;
- action ;
- ressource ;
- horodatage serveur ;
- résultat ;
- contexte technique minimisé ;
- patient concerné si applicable.

Ne pas journaliser :

- réponses item par item en clair ;
- token d'invitation ;
- mots de passe ;
- secrets ;
- données inutiles.

### 18.7 Protection des liens publics

Bonnes pratiques :

- générer un token aléatoire d'au moins 128 bits d'entropie ;
- stocker uniquement un hash du token ;
- ne jamais afficher le token dans les logs ;
- limiter les tentatives ;
- invalider après soumission ;
- invalider après expiration ;
- permettre la révocation par professionnel.

### 18.8 Rate limiting

Exemples :

| Endpoint | Limite recommandée |
|---|---|
| Résolution invitation | 20 tentatives / IP / 15 min |
| Soumission publique | 10 tentatives / session / heure |
| Connexion professionnelle | 5 échecs / compte / 15 min |
| Export | 5 exports / utilisateur / heure |

### 18.9 En-têtes HTTP

Recommandations :

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; base-uri 'self'
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Adapter la CSP si des services tiers sont nécessaires, en évitant les scripts tiers non essentiels.

---

## 19. Protection des données et conformité

### 19.1 Principes

Le projet traite potentiellement des données de santé et des données de personnes vulnérables. Il doit être conçu selon les principes :

- minimisation ;
- finalité déterminée ;
- information claire ;
- confidentialité ;
- intégrité ;
- durée de conservation limitée ;
- traçabilité ;
- droits des personnes ;
- protection des données dès la conception et par défaut.

### 19.2 Acteurs RGPD à identifier

| Rôle | À préciser |
|---|---|
| Responsable de traitement | Établissement, association, pôle ou structure porteuse |
| Sous-traitant | Éditeur, hébergeur, prestataire SMS/email |
| DPO | Contact et procédure |
| Utilisateurs habilités | Professionnels, administrateurs |
| Personnes concernées | Personnes accompagnées |

### 19.3 Base légale

À déterminer par le responsable de traitement avec le DPO.

Possibilités à étudier :

- prise en charge sanitaire/sociale/médico-sociale ;
- mission d'intérêt public ;
- obligation légale ;
- consentement explicite si requis par le contexte ;
- recherche, si exploitation secondaire autorisée.

Ne pas présumer la base légale dans le code : la plateforme doit permettre de configurer les textes d'information et les traces correspondantes.

### 19.4 Information des personnes

La page d'information doit préciser :

- qui traite les données ;
- pourquoi ;
- quelles données sont collectées ;
- qui y a accès ;
- combien de temps elles sont conservées ;
- quels sont les droits ;
- comment exercer ces droits ;
- si les données sont hébergées par un prestataire ;
- si des données agrégées peuvent être utilisées à des fins d'amélioration du service ;
- si la réponse est obligatoire ou facultative dans le parcours.

### 19.5 Analyse d'impact

Une AIPD/DPIA est fortement recommandée et peut être obligatoire selon le contexte, notamment en raison de la nature des données, de la vulnérabilité possible des personnes et de la finalité de prise en charge.

L'AIPD doit couvrir :

- description du traitement ;
- nécessité et proportionnalité ;
- risques pour les personnes ;
- mesures de réduction ;
- risques résiduels ;
- avis du DPO ;
- validation par le responsable de traitement.

### 19.6 Hébergement

Pour un usage en France impliquant des données de santé à caractère personnel hébergées par un tiers, vérifier l'obligation de recourir à un hébergeur certifié HDS et les exigences de localisation, de contractualisation et de sous-traitance.

### 19.7 Sous-traitants

Tous les sous-traitants doivent être listés :

- hébergeur ;
- fournisseur email ;
- fournisseur SMS ;
- outil d'observabilité ;
- outil support ;
- prestataire de sauvegarde ;
- outil d'analyse.

Aucun outil analytique tiers ne doit recevoir de données de santé ou d'identifiants directs sans base légale, contrat et configuration conforme.

### 19.8 Droits des personnes

Prévoir procédures et endpoints internes pour :

- accès ;
- rectification ;
- opposition si applicable ;
- limitation ;
- effacement si applicable ;
- portabilité si applicable ;
- traçabilité des demandes.

### 19.9 Anonymisation et pseudonymisation

- Pseudonymisation : remplacement des identifiants directs par codes, avec table de correspondance séparée.
- Anonymisation : irréversibilité suffisante ; à valider par DPO/statisticien.
- Exports de pilotage : privilégier des données agrégées.

### 19.10 Politique de cookies

Si l'outil n'utilise que des cookies strictement nécessaires à la sécurité et à la session, une bannière de consentement cookies n'est généralement pas nécessaire, mais une information doit être fournie.

Éviter les cookies marketing ou mesure d'audience non essentiels.

---

## 20. Hébergement et exploitation

### 20.1 Exigences d'infrastructure

- Hébergement dans une zone géographique conforme aux exigences du projet.
- Isolation réseau entre frontend, backend et base de données.
- Accès administratif via VPN ou bastion.
- MFA obligatoire pour l'administration.
- Journalisation centralisée.
- Sauvegardes chiffrées.
- Tests de restauration réguliers.
- Supervision disponibilité/performance/sécurité.

### 20.2 Déploiement

Pipeline recommandé :

```text
commit -> tests unitaires -> lint -> SAST -> build image -> scan image -> tests intégration -> déploiement staging -> tests e2e -> approbation -> déploiement prod -> smoke tests -> monitoring renforcé
```

### 20.3 Sauvegardes

Politique indicative :

- base de données : sauvegarde quotidienne complète + WAL continu ;
- rétention courte : 30 jours ;
- rétention longue : selon politique ;
- chiffrement ;
- test de restauration mensuel ;
- séparation des droits sauvegarde/restauration.

### 20.4 Plan de reprise

Définir :

- RPO : perte de données maximale acceptable ;
- RTO : délai maximal de reprise ;
- responsables d'astreinte ;
- procédure de bascule ;
- communication incident ;
- critères de retour nominal.

### 20.5 Observabilité

Métriques :

- disponibilité ;
- taux d'erreur API ;
- latence p95/p99 ;
- nombre de passations créées ;
- taux de soumission ;
- erreurs de validation ;
- expiration des invitations ;
- jobs d'export en échec ;
- tentatives d'accès refusées ;
- volume d'audit.

Logs structurés :

```json
{
  "timestamp": "2026-06-06T10:15:00Z",
  "level": "INFO",
  "event": "assessment_submitted",
  "organizationId": "org_...",
  "assignmentId": "ass_...",
  "responseId": "res_...",
  "actorType": "public_invitation",
  "outcome": "success",
  "durationMs": 134
}
```

Ne jamais inclure les réponses en clair dans les logs.

---

## 21. Notifications

### 21.1 Canaux

- Email ;
- SMS ;
- courrier imprimé avec QR code ;
- notification portail patient ;
- remise directe en entretien.

### 21.2 Contenu minimal d'une invitation

Éviter les détails sensibles.

Exemple :

> Bonjour, votre service vous propose de compléter un questionnaire de suivi. Accédez au lien sécurisé ci-dessous. Ce lien est personnel et expire le JJ/MM/AAAA.

Ne pas inclure :

- score ;
- diagnostic ;
- mention explicite de trouble ou maladie si le canal n'est pas jugé suffisamment confidentiel ;
- réponses ;
- identifiants internes.

### 21.3 Relances

Paramètres :

- une relance à J+3 ;
- une relance à J+7 ;
- pas plus de deux relances sans action professionnelle ;
- possibilité de désactiver pour une personne ;
- journalisation.

---

## 22. Administration

### 22.1 Paramètres organisation

| Paramètre | Type | Exemple |
|---|---|---|
| Nom affiché | texte | Pôle de santé mentale |
| Logo | fichier | PNG/SVG |
| Contact support | email/téléphone | support@example.org |
| Contact DPO | email | dpo@example.org |
| Durée invitation | durée | 14 jours |
| Affichage score à la personne | booléen | false |
| Mode brouillon | booléen | true |
| Complétude stricte | booléen | true |
| Exports nominaux | booléen + permission | false par défaut |
| Seuil agrégation | entier | 10 |

### 22.2 Gestion des rôles

Permissions recommandées :

```yaml
permissions:
  questionnaire:read:
  questionnaire:write:
  assignment:create:
  assignment:send:
  assignment:cancel:
  response:read:
  response:read_identifying:
  response:amend:
  score:read:
  note:create:
  export:create_aggregate:
  export:create_identified:
  audit:read:
  users:manage:
  org:configure:
```

### 22.3 Matrice de permissions

| Permission | Personne | Professionnel | Coordinateur | Admin fonctionnel | DPO | Admin technique |
|---|---:|---:|---:|---:|---:|---:|
| Répondre à son questionnaire | oui | non | non | non | non | non |
| Créer passation | non | oui | oui | oui | non | non |
| Lire résultat individuel | selon portail | oui périmètre | oui périmètre | oui selon besoin | oui audit/conformité | non par défaut |
| Export agrégé | non | selon droit | oui | oui | oui | non |
| Export nominatif | non | selon droit fort | selon droit fort | oui | oui | non |
| Lire audit | non | non | non | partiel | oui | technique sans contenu santé |
| Gérer utilisateurs | non | non | non | oui | non | technique limité |
| Gérer infrastructure | non | non | non | non | non | oui |

---

## 23. Tableau de bord professionnel

### 23.1 Vue liste

Filtres :

- personne ;
- équipe ;
- professionnel référent ;
- statut ;
- période ;
- type de passation ;
- questionnaire ;
- complétude ;
- score disponible.

Colonnes :

- personne ou pseudonyme ;
- date cible ;
- date d'envoi ;
- statut ;
- date de soumission ;
- score total ;
- évolution depuis précédente passation ;
- actions.

### 23.2 Vue fiche personne

Sections :

1. Informations minimales d'identification.
2. Historique des passations.
3. Graphique d'évolution.
4. Détail de la dernière passation.
5. Notes professionnelles.
6. Actions : nouvelle passation, export, imprimer.

### 23.3 Vue détail réponse

Afficher :

- métadonnées ;
- score ;
- item/réponse ;
- sous-scores si activés ;
- comparaison avec passation précédente ;
- journaux associés ;
- notes.

### 23.4 Vue pilotage agrégé

Indicateurs :

- passations par mois ;
- taux de complétion ;
- score moyen par période ;
- évolution moyenne ;
- distribution des réponses par item ;
- taux de données manquantes si soumission partielle activée ;
- relances envoyées ;
- délais de réponse.

---

## 24. Gestion des risques cliniques et éthiques

### 24.1 Risques identifiés

| Risque | Impact | Mitigation |
|---|---|---|
| Mauvaise interprétation du score | Décision inadaptée | Pas de seuil automatique, validation clinique, formation |
| Réponse influencée par le contexte | Données biaisées | Expliquer auto-questionnaire, mode confidentiel |
| Détresse pendant la passation | Inconfort ou risque | Message d'aide, possibilité d'arrêter, contact professionnel |
| Stigmatisation | Perte de confiance | Langage neutre, non jugeant, contrôle des accès |
| Usage de pilotage punitif | Effet pervers institutionnel | Indicateurs agrégés prudents, gouvernance éthique |
| Ré-identification dans agrégats | Atteinte confidentialité | Seuil minimal d'agrégation, pseudonymisation |

### 24.2 Message d'aide

Prévoir un lien « Besoin d'aide ? » affiché pendant toute la passation.

Contenu configurable :

- contact du service ;
- horaires ;
- consigne en cas d'urgence ;
- possibilité de demander une passation accompagnée.

### 24.3 Gouvernance

Mettre en place :

- comité clinique ;
- comité données/conformité ;
- référent accessibilité ;
- processus de revue des indicateurs ;
- revue annuelle du questionnaire et de ses usages.

---

## 25. Tests et assurance qualité

### 25.1 Tests unitaires

À couvrir :

- calcul score ;
- validation valeurs Likert ;
- règles de complétude ;
- expiration des liens ;
- transitions de statut ;
- permissions ;
- anonymisation exports ;
- formatage CSV/FHIR.

### 25.2 Tests d'intégration

Scénarios :

- création passation -> envoi -> ouverture -> soumission -> score ;
- invitation expirée ;
- tentative de deuxième soumission ;
- professionnel hors périmètre ;
- export agrégé ;
- correction avec audit ;
- suppression/anonymisation.

### 25.3 Tests end-to-end

Parcours critiques :

1. Personne répond sur mobile.
2. Personne répond sur desktop.
3. Professionnel crée une invitation.
4. Professionnel consulte le score.
5. Coordinateur exporte des agrégats.
6. DPO consulte l'audit.

### 25.4 Tests d'accessibilité

- Navigation clavier complète.
- Lecteur d'écran.
- Zoom 200 %.
- Contraste.
- Erreurs accessibles.
- Responsive 320 px.

### 25.5 Tests sécurité

- SAST ;
- dependency scanning ;
- DAST ;
- pentest avant production ;
- revue de configuration cloud ;
- tests d'autorisation horizontale et verticale ;
- vérification absence de données sensibles dans logs ;
- vérification tokens ;
- tests rate limiting.

### 25.6 Tests de performance

Objectifs indicatifs :

| Action | Objectif p95 |
|---|---:|
| Charger questionnaire public | < 800 ms côté API |
| Soumettre questionnaire | < 1 500 ms côté API |
| Charger détail résultat | < 1 000 ms côté API |
| Export agrégé standard | < 60 s pour 50 000 réponses |

### 25.7 Critères d'acceptation Gherkin

```gherkin
Feature: Soumission complète du questionnaire

  Scenario: Une personne complète les 24 questions
    Given une invitation valide pour le questionnaire RAS courte FR
    When la personne répond aux 24 questions avec des valeurs entre 1 et 5
    And elle confirme la soumission
    Then la réponse est enregistrée avec le statut "submitted"
    And un score complet est calculé
    And l'invitation ne peut plus être utilisée

  Scenario: Une personne tente de soumettre une réponse incomplète
    Given une invitation valide
    When la personne répond à 23 questions seulement
    And elle tente de soumettre
    Then la soumission est refusée
    And un message indique la question manquante

  Scenario: Un professionnel hors périmètre tente de consulter un résultat
    Given un professionnel non membre de l'équipe de la personne
    When il demande le détail d'une réponse
    Then l'accès est refusé
    And un événement d'audit est enregistré
```

---

## 26. Stratégie de migration depuis le papier

### 26.1 Ressaisie papier

Prévoir un mode `paper_backfill` pour saisir d'anciens formulaires papier.

Champs supplémentaires :

- date réelle de remplissage ;
- date de ressaisie ;
- personne ayant ressaisi ;
- source papier conservée ou non ;
- niveau de confiance de la saisie ;
- double saisie si données critiques.

### 26.2 Contrôle qualité de ressaisie

Options :

- double saisie indépendante ;
- échantillonnage aléatoire ;
- détection de valeurs manquantes ;
- journal d'erreurs ;
- rapprochement avec PDF scanné si autorisé.

---

## 27. Déploiement MVP

### 27.1 MVP recommandé

Fonctions incluses :

- questionnaire RAS courte FR versionné ;
- invitation par lien sécurisé ;
- passation responsive ;
- soumission complète obligatoire ;
- calcul score total/moyen ;
- consultation professionnelle ;
- export CSV agrégé ;
- audit minimal ;
- authentification professionnelle ;
- hébergement sécurisé ;
- information RGPD ;
- tests accessibilité et sécurité de base.

Fonctions reportées :

- portail patient complet ;
- FHIR ;
- exports PDF avancés ;
- analyse longitudinale poussée ;
- notifications multi-canaux ;
- anonymisation avancée ;
- intégration DPI SIH.

### 27.2 Roadmap indicative

| Phase | Durée indicative | Contenu |
|---|---:|---|
| Cadrage | 2–4 semaines | validation clinique, juridique, DPO, architecture |
| Prototype UX | 2–3 semaines | maquettes, test utilisateur, accessibilité |
| MVP technique | 6–10 semaines | frontend, backend, DB, auth, score, audit |
| Sécurité/conformité | 2–4 semaines | AIPD, pentest, hébergement, politiques |
| Pilote | 4–8 semaines | usage réel limité, retours, corrections |
| Généralisation | variable | formation, support, tableaux de bord |

---

## 28. Formation et support

### 28.1 Formation professionnels

Contenus :

- objectif du questionnaire ;
- limites d'interprétation ;
- création d'une passation ;
- lecture des résultats ;
- confidentialité ;
- réponse aux questions des personnes ;
- procédure incident ;
- bonnes pratiques d'export.

### 28.2 Support utilisateur

Prévoir :

- FAQ ;
- contact support ;
- procédure en cas de lien expiré ;
- procédure en cas d'erreur de réponse ;
- assistance accessibilité ;
- support technique professionnel.

---

## 29. Documentation technique attendue

Livrables :

- README développeur ;
- guide d'installation locale ;
- guide de déploiement ;
- guide d'administration ;
- dictionnaire de données ;
- documentation API ;
- politique de sécurité ;
- registre des traitements ;
- AIPD ;
- plan de sauvegarde/restauration ;
- plan d'incident ;
- guide utilisateur professionnel ;
- guide de passation pour personnes accompagnées.

---

## 30. Registre des décisions à prendre

| Sujet | Décision requise | Responsable |
|---|---|---|
| Licence d'utilisation de l'échelle | Autorisation de diffusion web | Direction / juridique |
| Score officiel | Validation somme 1–5 ou autre méthode | Référent clinique |
| Affichage du score à la personne | Oui/non, modalités | Comité clinique |
| Sous-scores | Activer ou non | Comité clinique |
| Base légale RGPD | Détermination | Responsable traitement + DPO |
| AIPD | Obligatoire et contenu | DPO |
| Hébergement HDS | Oui/non selon contexte | DSI + DPO |
| Auth patient | Lien simple ou lien + second facteur | RSSI/DPO |
| Durée conservation | Politique | Direction/DPO |
| Exports | Qui peut exporter quoi | Direction/RSSI/DPO |
| Interopérabilité FHIR | Requise ou non | DSI |
| Accessibilité cible | WCAG 2.2 AA ou autre | Produit + référent accessibilité |

---

## 31. Checklist de mise en production

### 31.1 Produit et clinique

- [ ] Libellés validés.
- [ ] Introduction validée.
- [ ] Modalités de réponse validées.
- [ ] Règle de score validée.
- [ ] Politique d'affichage des résultats validée.
- [ ] Formation professionnels réalisée.
- [ ] Support utilisateur prêt.

### 31.2 Conformité

- [ ] Registre de traitement mis à jour.
- [ ] Information des personnes validée.
- [ ] AIPD réalisée si nécessaire.
- [ ] Contrats sous-traitants signés.
- [ ] Hébergement conforme validé.
- [ ] Politique de conservation validée.
- [ ] Procédure droits des personnes prête.

### 31.3 Sécurité

- [ ] MFA professionnels activée.
- [ ] RBAC testé.
- [ ] Tests d'accès horizontal réalisés.
- [ ] Tokens d'invitation hashés.
- [ ] Rate limiting actif.
- [ ] CSP/HSTS actifs.
- [ ] Logs sans données sensibles.
- [ ] Sauvegardes chiffrées.
- [ ] Test de restauration réalisé.
- [ ] Scan dépendances OK.
- [ ] Pentest ou revue sécurité réalisé.

### 31.4 Accessibilité

- [ ] Navigation clavier validée.
- [ ] Lecteur d'écran testé.
- [ ] Contraste validé.
- [ ] Mobile 320 px validé.
- [ ] Zoom 200 % validé.
- [ ] Messages d'erreur accessibles.

### 31.5 Exploitation

- [ ] Monitoring actif.
- [ ] Alertes configurées.
- [ ] Procédure incident prête.
- [ ] Runbook déploiement disponible.
- [ ] Runbook rollback disponible.
- [ ] Support informé.

---

## 32. Annexes

### Annexe A — Exemple de structure de dépôt

```text
ras-web/
  apps/
    web/                    # Frontend Next.js
    api/                    # Backend NestJS
  packages/
    questionnaire-core/      # Définition questionnaire + score
    ui/                      # Composants UI partagés
    config/                  # Config typée
  infrastructure/
    terraform/
    kubernetes/
  docs/
    api/
    security/
    privacy/
    user-guides/
  tests/
    e2e/
    accessibility/
    security/
```

### Annexe B — Exemple de composant React simplifié

```tsx
import { useId } from "react";

type Choice = {
  code: string;
  label: string;
  numericValue: 1 | 2 | 3 | 4 | 5;
};

type QuestionProps = {
  number: number;
  total: number;
  label: string;
  choices: Choice[];
  value?: number;
  error?: string;
  onChange: (value: number) => void;
};

export function LikertQuestion({
  number,
  total,
  label,
  choices,
  value,
  error,
  onChange,
}: QuestionProps) {
  const groupId = useId();
  const errorId = `${groupId}-error`;

  return (
    <fieldset aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}>
      <legend>
        Question {number} sur {total} : {label}
      </legend>

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
async function submitAssessment(input: SubmitAssessmentInput, context: PublicSessionContext) {
  await assertSessionIsValid(context);
  await assertNotExpired(context.assignment);
  await assertNotAlreadySubmitted(context.assignment);
  validateAnswerCompleteness(input.answers, 24);
  validateAnswerValues(input.answers);

  return await db.transaction(async (tx) => {
    const response = await tx.assessmentResponse.create({
      data: {
        assignmentId: context.assignment.id,
        patientId: context.assignment.patientId,
        questionnaireVersionId: input.questionnaireVersionId,
        status: "submitted",
        startedAt: context.startedAt,
        submittedAt: new Date(),
        completionSeconds: input.clientContext?.completionSeconds ?? null,
      },
    });

    await tx.assessmentAnswer.createMany({
      data: input.answers.map((answer) => ({
        responseId: response.id,
        itemCode: answer.itemCode,
        choiceCode: answer.choiceCode,
        numericValue: answer.numericValue,
      })),
    });

    const score = calculateScore(toAnswerMap(input.answers));

    await tx.scoreResult.create({
      data: {
        responseId: response.id,
        scoringConfigId: "ras_short_fr_default_likert_sum_v1",
        scoreStatus: score.scoreStatus,
        answeredCount: score.answeredCount,
        missingItems: score.missingItems,
        totalScore: score.total,
        meanScore: score.mean,
        normalizedPercent: score.normalizedPercent,
        subScores: score.subScores,
      },
    });

    await tx.assessmentAssignment.update({
      where: { id: context.assignment.id },
      data: { status: "submitted", submittedAt: new Date(), invitationTokenHash: null },
    });

    await audit(tx, {
      action: "assessment.submitted",
      resourceType: "assessment_response",
      resourceId: response.id,
      patientId: context.assignment.patientId,
      outcome: "success",
    });

    return response;
  });
}
```

### Annexe D — Exemple de dictionnaire de données export

| Champ | Type | Description | Identifiant direct ? |
|---|---|---|---|
| `patient_pseudonym` | string | Pseudonyme stable pour analyses | non direct |
| `assessment_id` | uuid | Identifiant passation | indirect |
| `assessment_type` | enum | Type de passation | non |
| `submitted_at` | datetime | Date de soumission | indirect |
| `total_score` | number | Somme des réponses | donnée de santé |
| `mean_score` | number | Moyenne 1–5 | donnée de santé |
| `q01` à `q24` | integer | Réponse Likert | donnée de santé |

### Annexe E — Références normatives et guides à consulter

- W3C — Web Content Accessibility Guidelines 2.2 : https://www.w3.org/TR/WCAG22/
- W3C — How to Meet WCAG, quick reference : https://www.w3.org/WAI/WCAG22/quickref/
- OWASP — Application Security Verification Standard : https://owasp.org/www-project-application-security-verification-standard/
- OWASP — Top 10 Web Application Security Risks : https://owasp.org/www-project-top-ten/
- CNIL — RGPD appliqué au secteur de la santé : https://www.cnil.fr/fr/le-rgpd-applique-au-secteur-de-la-sante
- CNIL — Analyse d'impact relative à la protection des données : https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd
- CNIL — Sécurité des données de santé : https://www.cnil.fr/fr/securite-des-donnees-de-sante
- Agence du Numérique en Santé — HDS, présentation : https://esante.gouv.fr/produits-services/hds
- Agence du Numérique en Santé — HDS, référentiels de certification : https://esante.gouv.fr/services/hebergeurs-de-donnees-de-sante/les-referentiels-de-la-procedure-de-certification
- Agence du Numérique en Santé — PGSSI-S : https://esante.gouv.fr/produits-services/pgssi-s
- HL7 — FHIR QuestionnaireResponse : https://hl7.org/fhir/questionnaireresponse.html

---

## 33. Conclusion

La numérisation de l'Échelle de Rétablissement doit être traitée comme un projet de santé numérique à part entière : simplicité d'usage, robustesse des données, confidentialité, accessibilité, auditabilité et prudence clinique. Le cœur du MVP peut être relativement simple — questionnaire, invitation, réponses, score, consultation — mais la mise en production exige une gouvernance sérieuse sur le score, les droits d'utilisation, la protection des données et l'hébergement.

Le point le plus important avant développement est la validation formelle de quatre éléments :

1. l'autorisation d'utiliser et diffuser la version courte FR en ligne ;
2. la règle de score officielle ;
3. le cadre RGPD/HDS applicable ;
4. le choix d'afficher ou non les scores aux personnes accompagnées.
