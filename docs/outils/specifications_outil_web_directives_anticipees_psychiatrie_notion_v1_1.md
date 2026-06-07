---
titre: "Spécifications fonctionnelles et techniques — DAP web, version corrigée Notion"
version: "1.1"
date: "2026-06-06"
langue: "fr-FR"
statut: "Version corrigée après analyse du Markdown initial — import Notion"
source_principale: "DOCX fourni : 2022.09_19___dap_vierges___grises.docx"
format_cible: "Markdown compatible import Notion"
---

# Spécifications fonctionnelles et techniques — Directives Anticipées en Psychiatrie, version corrigée pour import Notion

## 1. Synthèse de l'analyse du Markdown initial

Le Markdown initial couvrait largement les besoins fonctionnels, techniques, sécurité, conformité et UX de l'outil web. L'analyse de compatibilité avec un import Notion a toutefois mis en évidence un point important : plusieurs éléments présents dans le formulaire source étaient décrits en texte ou dans des sections générales, mais n'étaient pas toujours matérialisés comme **lignes de tableau importables**.

Cette version corrige ce point en intégrant tous les items source sous forme de tables plates, compatibles avec l'import Notion. L'objectif est que Notion crée des blocs structurés ou des bases de données exploitables sans perdre les lignes numérotées, les colonnes du formulaire, les mentions, les contacts, les traitements, les lieux, les accompagnants et les zones de remarques.

### 1.1 Corrections principales intégrées

| Correction | Ce qui a été ajouté | Impact Notion |
| --- | --- | --- |
| Contacts page 1 | Personne de confiance + personnes à prévenir n°1 à n°3, avec colonnes Nom / Prénom, Coordonnées, Nature du lien, Qui fait quoi | Import en base DAP Contacts avec une ligne par rôle source |
| Identité et signatures | Je soussigné(e), né(e) le, à, Fait le, Fait à, témoins, signatures | Chaque champ devient une propriété ou une relation Notion |
| Passage de relais | Rubrique IMPORTANT : Je suis capable de décider sauf quand… + zone de continuation | Champ long visible en mode crise |
| Page 2 | Items 1 à 4 pour signes avant-coureurs, ce qui aide, ce qui ne m aide pas, signaux de fin de crise | Chaque item numéroté devient une ligne importable |
| Mise en danger | Colonnes A FAIRE et A NE PAS FAIRE + continuations | Deux champs distincts et prioritaires en synthèse crise |
| Page 3 crise | Ce qui m aide / ce qui ne m aide pas en cas de crise | Deux champs distincts visibles en mode crise |
| Traitements / soins | Deux tableaux complets : aidants et non aidants, avec colonnes traitement/soin, posologie, usage/effet, remarques | Création d une base DAP Traitements |
| Lieu de soin | Souhait d être conduit(e) dans un lieu de soin : OUI | Champ booléen ou select ajouté |
| Page 4 lieux | Lieux souhaités 1 et 2, lieux refusés 1 et 2, remarques, alternatives | Création d une base DAP Lieux |
| Accompagnement | Personnel médical et paramédical/social souhaité ou non souhaité | Création d une base DAP Accompagnants |
| Page 5 | Autres remarques personnelles, choses à savoir, notes | Champ final long ajouté |

### 1.2 Pages source couvertes

| Page source | Contenu intégré dans les tables |
| --- | --- |
| 1 | Identité, désignation de la personne de confiance, mention non contraignante, date/lieu, témoins, signatures, tableau contacts et passage de relais |
| 2 | Signes avant-coureurs, ce qui aide, ce qui ne m aide pas, signaux de fin de crise, mise en danger à faire/ne pas faire |
| 3 | En cas de crise, traitements ou soins qui aident ou non, tableaux traitement/soin-posologie-usage/effet-remarques, souhait d être conduit en lieu de soin |
| 4 | Lieux de soin souhaités/refusés, remarques, alternatives, accompagnants médicaux et paramédicaux/social souhaités ou refusés |
| 5 | Continuation accompagnants et autres remarques personnelles, choses à savoir, notes |

## 2. Conventions d'import Notion

Pour améliorer l'import Notion, cette version applique les conventions suivantes :

- toutes les lignes du formulaire source sont représentées par des lignes de tableau ;
- les cellules de tableaux ne contiennent pas de retours à la ligne ;
- les barres verticales sont remplacées par des slashs pour éviter de casser le Markdown ;
- les identifiants stables sont lisibles et réutilisables dans une base Notion ;
- les champs répétables sont explicités avec un nombre de lignes par défaut ;
- les champs qui doivent être visibles en mode crise sont marqués ;
- les mentions juridiques sont conservées comme items séparés à relire juridiquement ;
- les zones blanches du formulaire papier sont modélisées comme champs longs ou listes extensibles.

### 2.1 Bases Notion recommandées

| Base Notion | Rôle | Pourquoi séparer cette base |
| --- | --- | --- |
| DAP Documents | Document principal par personne et périmètre | Évite de mélanger les versions, contacts et contenus |
| DAP Versions | Version signée ou brouillon du document | Permet historique, révocation, remplacement et signature |
| DAP Contacts | Personne de confiance, personnes à prévenir, témoins | Reprend exactement le tableau page 1 |
| DAP Items | Champs textuels et listes simples | Reprend les items numérotés et zones libres |
| DAP Traitements | Traitements ou soins aidants ou non aidants | Respecte les colonnes traitement/soin, posologie, usage/effet, remarques |
| DAP Lieux | Lieux souhaités, refusés et alternatives | Reprend la page 4 sans perte |
| DAP Accompagnants | Personnel médical, paramédical, médiateurs, travailleurs sociaux | Gère souhaité et non souhaité séparément |
| DAP Signatures | Signatures personne, personne de confiance, témoin | Préserve la preuve et les rôles |
| DAP Partages et Audit | Partages, consultations, exports, bris de glace | Traçabilité sécurité et conformité |

## 3. Tableau maître complet des items source à importer dans Notion

Ce tableau est la correction principale. Il reprend les items source page par page et les transforme en lignes importables.

| Ordre | ID stable | Page source | Section source | Item / ligne source | Libellé ou champ à créer | Type Notion recommandé | Lignes par défaut | Base Notion cible | Propriété Notion | Obligatoire publication | Mode crise | Correction intégrée |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 001 | dap.title | 1 | Titre | ● DIRECTIVES ANTICIPEES EN PSYCHIATRIE ● | Titre du document DAP | Title | 1 | DAP Documents | Nom | Oui | Oui | Titre ajouté comme item source pour éviter sa perte à l import |
| 002 | patient.full_name | 1 | Personne concernée | Je soussigné(e) | Nom et prénom de la personne concernée | Text | 1 | DAP Documents | Personne concernée | Oui | Oui | Champ source explicité |
| 003 | patient.birth_date | 1 | Personne concernée | né(e) le / / | Date de naissance de la personne concernée | Date | 1 | DAP Documents | Date de naissance | Selon contexte | Oui | Champ source explicité |
| 004 | patient.birth_place | 1 | Personne concernée | à | Lieu de naissance de la personne concernée | Text | 1 | DAP Documents | Lieu de naissance | Non | Non | Champ source explicité |
| 005 | trusted_person.inline_designation | 1 | Personne de confiance | désigne comme personne de confiance | Personne de confiance désignée dans la phrase d introduction | Relation | 1 | DAP Contacts | Personne de confiance liée | Recommandé | Oui | Relié au tableau des contacts |
| 006 | legal.trusted_person_reference | 1 | Mention légale | article 1111-6 du Code de Santé Publique | Référence à la personne de confiance | Text | 1 | DAP Mentions | Référence personne de confiance | Oui | Non | Conservé comme mention textuelle à relire juridiquement |
| 007 | legal.non_binding_notice | 1 | Mention limite | n ont pas de valeur contraignante | Mention que les DAP ne sont pas contraignantes pour proches et soignant(e)s | Text | 1 | DAP Mentions | Limite juridique | Oui | Oui | Mention source rendue explicite |
| 008 | document.creation_date | 1 | Fait le | Fait le : / / | Date de rédaction ou validation | Date | 1 | DAP Versions | Fait le | Oui | Oui | Champ source explicité |
| 009 | document.creation_place | 1 | Fait à | à | Lieu de rédaction ou validation | Text | 1 | DAP Versions | Fait à | Non | Non | Champ source explicité |
| 010 | witnesses.present_names | 1 | Témoins | Seul(e) ou avec/en présence de la/du/des témoin(s) | Témoin(s) présent(s) lors de la rédaction | Multi-select ou Relation | 0..n | DAP Signatures | Témoins | Non | Non | Champ source explicité |
| 011 | signatures.block | 1 | Signatures | SIGNATURES : Personne de confiance + témoin + propriétaire des DAP | Bloc signatures avec rôle du signataire | Relation | 0..n | DAP Signatures | Signatures liées | Oui publication | Oui | Bloc complet ajouté |
| 012 | contact.trusted_person | 1 | Table contacts | Personne de confiance | Ligne contact personne de confiance | Relation / Table | 1 | DAP Contacts | Rôle contact | Recommandé | Oui | Ligne source ajoutée dans les tables Notion |
| 013 | contact.notify_1 | 1 | Table contacts | Personne à prévenir n°1 | Ligne contact personne à prévenir n°1 | Relation / Table | 1 | DAP Contacts | Rôle contact | Non | Oui | Ligne source ajoutée |
| 014 | contact.notify_2 | 1 | Table contacts | Personne à prévenir n°2 | Ligne contact personne à prévenir n°2 | Relation / Table | 1 | DAP Contacts | Rôle contact | Non | Oui | Ligne source ajoutée |
| 015 | contact.notify_3 | 1 | Table contacts | Personne à prévenir n°3 | Ligne contact personne à prévenir n°3 | Relation / Table | 1 | DAP Contacts | Rôle contact | Non | Oui | Ligne source ajoutée |
| 016 | contact.full_name_column | 1 | Table contacts | Nom / Prénom | Colonne Nom / Prénom pour chaque contact | Text | 4 | DAP Contacts | Nom / Prénom | Oui si contact | Oui | Colonne source matérialisée |
| 017 | contact.coordinates_column | 1 | Table contacts | Coordonnées | Colonne coordonnées pour chaque contact | Text | 4 | DAP Contacts | Coordonnées | Recommandé | Oui | Colonne source matérialisée |
| 018 | contact.relationship_column | 1 | Table contacts | Nature du Lien | Colonne nature du lien pour chaque contact | Text ou Select | 4 | DAP Contacts | Nature du lien | Recommandé | Oui | Colonne source matérialisée |
| 019 | contact.role_column | 1 | Table contacts | Qui fait quoi ? | Colonne rôle ou consigne pour chaque contact | Text | 4 | DAP Contacts | Qui fait quoi | Recommandé | Oui | Colonne source matérialisée |
| 020 | relay.conditions_header | 1 | Passage de relais | IMPORTANT : Je suis capable de décider sauf quand… | Déclencheurs du passage de relais à la personne de confiance | Text long | 1 | DAP Items | Passage de relais | Recommandé | Oui | Rubrique critique conservée |
| 021 | relay.conditions_continuation | 1-2 | Passage de relais | Grand espace libre sous la rubrique IMPORTANT | Développement libre du passage de relais | Text long | 1 | DAP Items | Développement passage de relais | Recommandé | Oui | Zone blanche de continuation ajoutée |
| 022 | warning_sign.1 | 2 | Signes avant-coureurs | 1 – | Signe avant-coureur n°1 | Text | 1 | DAP Items | Signes avant-coureurs | Non | Oui | Item numéroté source ajouté |
| 023 | warning_sign.2 | 2 | Signes avant-coureurs | 2 – | Signe avant-coureur n°2 | Text | 1 | DAP Items | Signes avant-coureurs | Non | Oui | Item numéroté source ajouté |
| 024 | warning_sign.3 | 2 | Signes avant-coureurs | 3 – | Signe avant-coureur n°3 | Text | 1 | DAP Items | Signes avant-coureurs | Non | Oui | Item numéroté source ajouté |
| 025 | warning_sign.4 | 2 | Signes avant-coureurs | 4 – | Signe avant-coureur n°4 | Text | 1 | DAP Items | Signes avant-coureurs | Non | Oui | Item numéroté source ajouté |
| 026 | help_before_crisis.1 | 2 | Ce qui m aide avant crise | 1 – | Ce qui m aide n°1 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui m aide avant crise | Non | Oui | Item numéroté source ajouté |
| 027 | help_before_crisis.2 | 2 | Ce qui m aide avant crise | 2 – | Ce qui m aide n°2 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui m aide avant crise | Non | Oui | Item numéroté source ajouté |
| 028 | help_before_crisis.3 | 2 | Ce qui m aide avant crise | 3 – | Ce qui m aide n°3 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui m aide avant crise | Non | Oui | Item numéroté source ajouté |
| 029 | help_before_crisis.4 | 2 | Ce qui m aide avant crise | 4 – | Ce qui m aide n°4 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui m aide avant crise | Non | Oui | Item numéroté source ajouté |
| 030 | does_not_help_before_crisis.1 | 2 | Ce qui ne m aide pas avant crise | 1 – | Ce qui ne m aide pas n°1 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui ne m aide pas avant crise | Non | Oui | Item numéroté source ajouté |
| 031 | does_not_help_before_crisis.2 | 2 | Ce qui ne m aide pas avant crise | 2 – | Ce qui ne m aide pas n°2 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui ne m aide pas avant crise | Non | Oui | Item numéroté source ajouté |
| 032 | does_not_help_before_crisis.3 | 2 | Ce qui ne m aide pas avant crise | 3 – | Ce qui ne m aide pas n°3 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui ne m aide pas avant crise | Non | Oui | Item numéroté source ajouté |
| 033 | does_not_help_before_crisis.4 | 2 | Ce qui ne m aide pas avant crise | 4 – | Ce qui ne m aide pas n°4 à relier aux signes avant-coureurs | Text | 1 | DAP Items | Ce qui ne m aide pas avant crise | Non | Oui | Item numéroté source ajouté |
| 034 | end_crisis_signal.1 | 2 | Signaux de fin de crise | 1 – | Signal de fin de crise n°1 | Text | 1 | DAP Items | Signaux de fin de crise | Non | Oui | Item numéroté source ajouté |
| 035 | end_crisis_signal.2 | 2 | Signaux de fin de crise | 2 – | Signal de fin de crise n°2 | Text | 1 | DAP Items | Signaux de fin de crise | Non | Oui | Item numéroté source ajouté |
| 036 | end_crisis_signal.3 | 2 | Signaux de fin de crise | 3 – | Signal de fin de crise n°3 | Text | 1 | DAP Items | Signaux de fin de crise | Non | Oui | Item numéroté source ajouté |
| 037 | end_crisis_signal.4 | 2 | Signaux de fin de crise | 4 – | Signal de fin de crise n°4 | Text | 1 | DAP Items | Signaux de fin de crise | Non | Oui | Item numéroté source ajouté |
| 038 | danger.do | 2 | Mise en danger | A FAIRE | Consignes à faire en cas de mise en danger auto ou hétéro agressivité | Text long ou liste | 1..n | DAP Items | Mise en danger - à faire | Recommandé | Oui | Colonne source ajoutée |
| 039 | danger.do_not | 2 | Mise en danger | A NE PAS FAIRE | Consignes à ne pas faire en cas de mise en danger auto ou hétéro agressivité | Text long ou liste | 1..n | DAP Items | Mise en danger - à ne pas faire | Recommandé | Oui | Colonne source ajoutée |
| 040 | danger.do_continuation | 3 | Mise en danger | ▪ colonne gauche | Continuation éventuelle de la rubrique à faire | Text long | 1 | DAP Items | Mise en danger - continuation à faire | Non | Oui | Zone de continuation page 3 ajoutée |
| 041 | danger.do_not_continuation | 3 | Mise en danger | ▪ colonne droite | Continuation éventuelle de la rubrique à ne pas faire | Text long | 1 | DAP Items | Mise en danger - continuation à ne pas faire | Non | Oui | Zone de continuation page 3 ajoutée |
| 042 | during_crisis.header | 3 | En cas de crise | ••• EN CAS DE « CRISE » ••• | Section en cas de crise | Heading | 1 | DAP Sections | En cas de crise | Non | Oui | Titre source ajouté |
| 043 | during_crisis.helps | 3 | En cas de crise | CE QUI M AIDE | Ce qui m aide pendant la crise | Text long ou liste | 1..n | DAP Items | En crise - ce qui m aide | Recommandé | Oui | Colonne source ajoutée |
| 044 | during_crisis.does_not_help | 3 | En cas de crise | CE QUI NE M AIDE PAS | Ce qui ne m aide pas pendant la crise | Text long ou liste | 1..n | DAP Items | En crise - ce qui ne m aide pas | Recommandé | Oui | Colonne source ajoutée |
| 045 | treatments.legal_choice | 3 | Traitements ou soins | Relatif à l article 1111.4 du Code de la Santé Publique sur le choix du traitement | Mention relative au choix du traitement à vérifier juridiquement | Text | 1 | DAP Mentions | Mention choix traitement | Oui | Non | Mention source ajoutée |
| 046 | treatments.help_header | 3 | Traitements ou soins | LES TRAITEMENTS QUI M AIDENT, QUI PEUVENT ETRE UTILISES | Table traitements ou soins aidants | Heading | 1 | DAP Traitements | Groupe traitements aidants | Non | Oui | Titre source ajouté |
| 047 | treatment_help.row_1 | 3 | Traitements aidants | Ligne 1 | Traitement ou soin aidant n°1 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = aide | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 048 | treatment_help.row_2 | 3 | Traitements aidants | Ligne 2 | Traitement ou soin aidant n°2 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = aide | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 049 | treatment_help.row_3 | 3 | Traitements aidants | Ligne 3 | Traitement ou soin aidant n°3 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = aide | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 050 | treatment_help.row_4 | 3 | Traitements aidants | Ligne 4 | Traitement ou soin aidant n°4 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = aide | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 051 | treatment_help.row_5 | 3 | Traitements aidants | Ligne 5 | Traitement ou soin aidant n°5 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = aide | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 052 | treatments.avoid_header | 3 | Traitements ou soins | LES TRAITEMENTS QUI NE M AIDENT PAS, QUI NE DOIVENT PAS ETRE UTILISES | Table traitements ou soins non aidants ou à éviter | Heading | 1 | DAP Traitements | Groupe traitements à éviter | Non | Oui | Titre source ajouté |
| 053 | treatment_avoid.row_1 | 3 | Traitements non aidants | Ligne 1 | Traitement ou soin non aidant n°1 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = ne m aide pas | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 054 | treatment_avoid.row_2 | 3 | Traitements non aidants | Ligne 2 | Traitement ou soin non aidant n°2 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = ne m aide pas | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 055 | treatment_avoid.row_3 | 3 | Traitements non aidants | Ligne 3 | Traitement ou soin non aidant n°3 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = ne m aide pas | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 056 | treatment_avoid.row_4 | 3 | Traitements non aidants | Ligne 4 | Traitement ou soin non aidant n°4 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = ne m aide pas | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 057 | treatment_avoid.row_5 | 3 | Traitements non aidants | Ligne 5 | Traitement ou soin non aidant n°5 avec traitement/soin, posologie, usage/effet, remarques | Table row | 1 | DAP Traitements | Préférence = ne m aide pas | Non | Oui | Ligne vide du tableau matérialisée pour Notion |
| 058 | care_place.want_care_place | 3 | Lieu de soin | JE SOUHAITE ETRE CONDUIT(E) DANS UN LIEU DE SOIN : OUI | Souhait d être conduit(e) dans un lieu de soin | Checkbox / Select oui-non-inconnu | 1 | DAP Versions | Souhaite lieu de soin | Recommandé | Oui | Item booléen source ajouté |
| 059 | care_place.legal_place_choice | 3 | Lieu de soin | Relatif à l article 175 2016-41 du 26/01/2016 | Mention relative au choix du lieu de soin à vérifier juridiquement | Text | 1 | DAP Mentions | Mention choix lieu de soin | Oui | Non | Mention source ajoutée |
| 060 | care_place.preferred_1 | 4 | Lieux souhaités | 1. | Lieu de soin souhaité n°1 | Text ou Relation lieu | 1 | DAP Lieux | Lieu souhaité | Non | Oui | Ligne numérotée source ajoutée |
| 061 | care_place.preferred_2 | 4 | Lieux souhaités | 2. | Lieu de soin souhaité n°2 | Text ou Relation lieu | 1 | DAP Lieux | Lieu souhaité | Non | Oui | Ligne numérotée source ajoutée |
| 062 | care_place.preferred_remarks | 4 | Lieux souhaités | REMARQUES : | Remarques sur les lieux souhaités | Text long | 1 | DAP Lieux | Remarques lieux souhaités | Non | Oui | Champ remarques ajouté |
| 063 | care_place.refused_1 | 4 | Lieux refusés | 1. | Lieu de soin refusé n°1 | Text ou Relation lieu | 1 | DAP Lieux | Lieu refusé | Non | Oui | Ligne numérotée source ajoutée |
| 064 | care_place.refused_2 | 4 | Lieux refusés | 2. | Lieu de soin refusé n°2 | Text ou Relation lieu | 1 | DAP Lieux | Lieu refusé | Non | Oui | Ligne numérotée source ajoutée |
| 065 | care_place.refused_remarks | 4 | Lieux refusés | REMARQUES : | Remarques sur les lieux refusés | Text long | 1 | DAP Lieux | Remarques lieux refusés | Non | Oui | Champ remarques ajouté |
| 066 | care_place.alternative_1 | 4 | Alternative au lieu de soin | ligne vide | Alternative au lieu de soin n°1 ou solution d attente | Text | 1 | DAP Lieux | Alternative au lieu de soin | Non | Oui | Ligne libre source ajoutée |
| 067 | care_place.alternative_2 | 4 | Alternative au lieu de soin | ligne vide | Alternative au lieu de soin n°2 ou solution d attente | Text | 1 | DAP Lieux | Alternative au lieu de soin | Non | Oui | Ligne libre source ajoutée |
| 068 | care_place.alternative_3 | 4 | Alternative au lieu de soin | ligne vide | Alternative au lieu de soin n°3 ou solution d attente | Text | 1 | DAP Lieux | Alternative au lieu de soin | Non | Oui | Ligne libre source ajoutée |
| 069 | care_place.alternative_4 | 4 | Alternative au lieu de soin | ligne vide | Alternative au lieu de soin n°4 ou solution d attente | Text | 1 | DAP Lieux | Alternative au lieu de soin | Non | Oui | Ligne libre source ajoutée |
| 070 | care_place.alternative_5 | 4 | Alternative au lieu de soin | ligne vide | Alternative au lieu de soin n°5 ou solution d attente | Text | 1 | DAP Lieux | Alternative au lieu de soin | Non | Oui | Ligne libre source ajoutée |
| 071 | care_place.alternative_6 | 4 | Alternative au lieu de soin | ligne vide | Alternative au lieu de soin n°6 ou solution d attente | Text | 1 | DAP Lieux | Alternative au lieu de soin | Non | Oui | Ligne libre source ajoutée |
| 072 | accompaniment.header | 4 | Accompagnement | PAR QUI JE SOUHAITE / JE REFUSE D ETRE ACCOMPAGNE(E) - SUIVI(E) | Section accompagnement souhaité ou refusé | Heading | 1 | DAP Sections | Accompagnement | Non | Oui | Titre source ajouté |
| 073 | accompaniment.legal_patient_rights | 4 | Accompagnement | loi n° 2002-303 du 4 mars 2002 | Mention relative aux droits des malades | Text | 1 | DAP Mentions | Mention droits des malades | Oui | Non | Mention source ajoutée |
| 074 | accompaniment.medical_legal_choice | 4 | Personnel médical | article 6,R.4127-6 du code de la santé publique | Mention relative au choix du médecin à vérifier juridiquement | Text | 1 | DAP Mentions | Mention choix médecin | Oui | Non | Mention source ajoutée |
| 075 | accompaniment.medical_wanted | 4 | Personnel médical | Par qui je souhaite être accompagné(e) | Personnel médical souhaité | Text long ou liste | 1..n | DAP Accompagnants | Personnel médical souhaité | Non | Oui | Colonne source ajoutée |
| 076 | accompaniment.medical_not_wanted | 4 | Personnel médical | Par qui je ne souhaite pas être accompagné(e) | Personnel médical non souhaité | Text long ou liste | 1..n | DAP Accompagnants | Personnel médical non souhaité | Non | Oui | Colonne source ajoutée |
| 077 | accompaniment.paramedical_wanted | 4-5 | Personnel paramédical, médiateurs, travailleurs sociaux | Par qui je souhaite être accompagné(e) | Personnel paramédical ou social souhaité | Text long ou liste | 1..n | DAP Accompagnants | Personnel paramédical souhaité | Non | Oui | Colonne source ajoutée |
| 078 | accompaniment.paramedical_not_wanted | 4-5 | Personnel paramédical, médiateurs, travailleurs sociaux | Par qui je ne souhaite pas être accompagné(e) | Personnel paramédical ou social non souhaité | Text long ou liste | 1..n | DAP Accompagnants | Personnel paramédical non souhaité | Non | Oui | Colonne source ajoutée |
| 079 | accompaniment.paramedical_continuation | 5 | Personnel paramédical, médiateurs, travailleurs sociaux | ▪ ▪ | Continuation des deux colonnes paramédical/social | Text long | 1 | DAP Accompagnants | Continuation paramédical/social | Non | Oui | Continuation page 5 ajoutée |
| 080 | personal_notes.text | 5 | Autres remarques | AUTRES REMARQUES PERSONNELLES, CHOSES A SAVOIR, NOTES… | Remarques personnelles et choses à savoir | Text long | 1 | DAP Items | Autres remarques personnelles | Non | Selon partage | Champ final source ajouté |

## 4. Table Notion — contacts de la page 1

Le formulaire source comporte un tableau avec quatre lignes et quatre colonnes. Le Markdown initial décrivait la logique, mais l'import Notion pouvait perdre les rôles exacts. La table suivante force la création des quatre lignes source.

| Ordre | Rôle source | Nom / Prénom | Coordonnées | Nature du lien | Qui fait quoi | Base Notion | Mode crise | Remarque import |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Personne de confiance | contact.full_name | contact.coordinates | contact.relationship | contact.role_description | DAP Contacts | Oui | Créer une ligne par rôle source, pas seulement un champ global |
| 2 | Personne à prévenir n°1 | contact.full_name | contact.coordinates | contact.relationship | contact.role_description | DAP Contacts | Oui | Créer une ligne par rôle source, pas seulement un champ global |
| 3 | Personne à prévenir n°2 | contact.full_name | contact.coordinates | contact.relationship | contact.role_description | DAP Contacts | Oui | Créer une ligne par rôle source, pas seulement un champ global |
| 4 | Personne à prévenir n°3 | contact.full_name | contact.coordinates | contact.relationship | contact.role_description | DAP Contacts | Oui | Créer une ligne par rôle source, pas seulement un champ global |

## 5. Table Notion — groupes répétables et lignes par défaut

Cette table sert à configurer les formulaires et bases Notion. Elle précise combien de lignes doivent être créées par défaut à l'import, tout en laissant les sections extensibles.

| Groupe source | Préfixe ID stable | Lignes ou champs par défaut | Base Notion | Mode crise | Remarque |
| --- | --- | --- | --- | --- | --- |
| Passage de relais | relay.conditions_text | 1 champ long + continuation | DAP Items | Oui | Zone source page 1 et grand espace page 2 |
| Signes avant-coureurs | warning_sign | 4 lignes par défaut, extensible | DAP Items | Oui | Items 1 à 4 explicités |
| Ce qui m aide avant crise | help_before_crisis | 4 lignes par défaut, extensible | DAP Items | Oui | Items 1 à 4 explicités |
| Ce qui ne m aide pas avant crise | does_not_help_before_crisis | 4 lignes par défaut, extensible | DAP Items | Oui | Items 1 à 4 explicités |
| Signaux de fin de crise | end_crisis_signal | 4 lignes par défaut, extensible | DAP Items | Oui | Items 1 à 4 explicités |
| Mise en danger - à faire | danger.do | 1 champ long ou lignes extensibles | DAP Items | Oui | Colonne source à faire |
| Mise en danger - à ne pas faire | danger.do_not | 1 champ long ou lignes extensibles | DAP Items | Oui | Colonne source à ne pas faire |
| En cas de crise - ce qui m aide | during_crisis.helps | 1 champ long ou lignes extensibles | DAP Items | Oui | Colonne source |
| En cas de crise - ce qui ne m aide pas | during_crisis.does_not_help | 1 champ long ou lignes extensibles | DAP Items | Oui | Colonne source |
| Traitements qui m aident | treatment_help | 5 lignes par défaut, extensible | DAP Traitements | Oui | Colonnes traitement/soin, posologie, usage/effet, remarques |
| Traitements qui ne m aident pas | treatment_avoid | 5 lignes par défaut, extensible | DAP Traitements | Oui | Colonnes traitement/soin, posologie, usage/effet, remarques |
| Souhait lieu de soin | care_place.want_care_place | 1 choix | DAP Versions | Oui | Source indique OUI |
| Lieux de soin souhaités | care_place.preferred | 2 lignes par défaut, extensible | DAP Lieux | Oui | Items 1 et 2 + remarques |
| Lieux de soin refusés | care_place.refused | 2 lignes par défaut, extensible | DAP Lieux | Oui | Items 1 et 2 + remarques |
| Alternative au lieu de soin | care_place.alternative | 6 lignes par défaut, extensible | DAP Lieux | Oui | Grand espace source page 4 |
| Personnel médical souhaité | accompaniment.medical_wanted | 1..n | DAP Accompagnants | Oui | Colonne source |
| Personnel médical non souhaité | accompaniment.medical_not_wanted | 1..n | DAP Accompagnants | Oui | Colonne source |
| Personnel paramédical/social souhaité | accompaniment.paramedical_wanted | 1..n | DAP Accompagnants | Oui | Colonne source avec continuation page 5 |
| Personnel paramédical/social non souhaité | accompaniment.paramedical_not_wanted | 1..n | DAP Accompagnants | Oui | Colonne source avec continuation page 5 |
| Autres remarques personnelles | personal_notes.text | 1 champ long | DAP Items | Selon partage | Page 5 |

## 6. Dictionnaire de champs compatible CSV ou Notion database

Ce dictionnaire est plus compact que le tableau maître. Il peut être copié dans une base Notion nommée `DAP — Dictionnaire des champs`.

| ID stable | Page source | Section source | Libellé ou champ à créer | Type Notion recommandé | Base Notion cible | Propriété Notion | Mode crise |
| --- | --- | --- | --- | --- | --- | --- | --- |
| dap.title | 1 | Titre | Titre du document DAP | Title | DAP Documents | Nom | Oui |
| patient.full_name | 1 | Personne concernée | Nom et prénom de la personne concernée | Text | DAP Documents | Personne concernée | Oui |
| patient.birth_date | 1 | Personne concernée | Date de naissance de la personne concernée | Date | DAP Documents | Date de naissance | Oui |
| patient.birth_place | 1 | Personne concernée | Lieu de naissance de la personne concernée | Text | DAP Documents | Lieu de naissance | Non |
| trusted_person.inline_designation | 1 | Personne de confiance | Personne de confiance désignée dans la phrase d introduction | Relation | DAP Contacts | Personne de confiance liée | Oui |
| legal.trusted_person_reference | 1 | Mention légale | Référence à la personne de confiance | Text | DAP Mentions | Référence personne de confiance | Non |
| legal.non_binding_notice | 1 | Mention limite | Mention que les DAP ne sont pas contraignantes pour proches et soignant(e)s | Text | DAP Mentions | Limite juridique | Oui |
| document.creation_date | 1 | Fait le | Date de rédaction ou validation | Date | DAP Versions | Fait le | Oui |
| document.creation_place | 1 | Fait à | Lieu de rédaction ou validation | Text | DAP Versions | Fait à | Non |
| witnesses.present_names | 1 | Témoins | Témoin(s) présent(s) lors de la rédaction | Multi-select ou Relation | DAP Signatures | Témoins | Non |
| signatures.block | 1 | Signatures | Bloc signatures avec rôle du signataire | Relation | DAP Signatures | Signatures liées | Oui |
| contact.trusted_person | 1 | Table contacts | Ligne contact personne de confiance | Relation / Table | DAP Contacts | Rôle contact | Oui |
| contact.notify_1 | 1 | Table contacts | Ligne contact personne à prévenir n°1 | Relation / Table | DAP Contacts | Rôle contact | Oui |
| contact.notify_2 | 1 | Table contacts | Ligne contact personne à prévenir n°2 | Relation / Table | DAP Contacts | Rôle contact | Oui |
| contact.notify_3 | 1 | Table contacts | Ligne contact personne à prévenir n°3 | Relation / Table | DAP Contacts | Rôle contact | Oui |
| contact.full_name_column | 1 | Table contacts | Colonne Nom / Prénom pour chaque contact | Text | DAP Contacts | Nom / Prénom | Oui |
| contact.coordinates_column | 1 | Table contacts | Colonne coordonnées pour chaque contact | Text | DAP Contacts | Coordonnées | Oui |
| contact.relationship_column | 1 | Table contacts | Colonne nature du lien pour chaque contact | Text ou Select | DAP Contacts | Nature du lien | Oui |
| contact.role_column | 1 | Table contacts | Colonne rôle ou consigne pour chaque contact | Text | DAP Contacts | Qui fait quoi | Oui |
| relay.conditions_header | 1 | Passage de relais | Déclencheurs du passage de relais à la personne de confiance | Text long | DAP Items | Passage de relais | Oui |
| relay.conditions_continuation | 1-2 | Passage de relais | Développement libre du passage de relais | Text long | DAP Items | Développement passage de relais | Oui |
| warning_sign.1 | 2 | Signes avant-coureurs | Signe avant-coureur n°1 | Text | DAP Items | Signes avant-coureurs | Oui |
| warning_sign.2 | 2 | Signes avant-coureurs | Signe avant-coureur n°2 | Text | DAP Items | Signes avant-coureurs | Oui |
| warning_sign.3 | 2 | Signes avant-coureurs | Signe avant-coureur n°3 | Text | DAP Items | Signes avant-coureurs | Oui |
| warning_sign.4 | 2 | Signes avant-coureurs | Signe avant-coureur n°4 | Text | DAP Items | Signes avant-coureurs | Oui |
| help_before_crisis.1 | 2 | Ce qui m aide avant crise | Ce qui m aide n°1 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui m aide avant crise | Oui |
| help_before_crisis.2 | 2 | Ce qui m aide avant crise | Ce qui m aide n°2 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui m aide avant crise | Oui |
| help_before_crisis.3 | 2 | Ce qui m aide avant crise | Ce qui m aide n°3 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui m aide avant crise | Oui |
| help_before_crisis.4 | 2 | Ce qui m aide avant crise | Ce qui m aide n°4 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui m aide avant crise | Oui |
| does_not_help_before_crisis.1 | 2 | Ce qui ne m aide pas avant crise | Ce qui ne m aide pas n°1 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui ne m aide pas avant crise | Oui |
| does_not_help_before_crisis.2 | 2 | Ce qui ne m aide pas avant crise | Ce qui ne m aide pas n°2 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui ne m aide pas avant crise | Oui |
| does_not_help_before_crisis.3 | 2 | Ce qui ne m aide pas avant crise | Ce qui ne m aide pas n°3 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui ne m aide pas avant crise | Oui |
| does_not_help_before_crisis.4 | 2 | Ce qui ne m aide pas avant crise | Ce qui ne m aide pas n°4 à relier aux signes avant-coureurs | Text | DAP Items | Ce qui ne m aide pas avant crise | Oui |
| end_crisis_signal.1 | 2 | Signaux de fin de crise | Signal de fin de crise n°1 | Text | DAP Items | Signaux de fin de crise | Oui |
| end_crisis_signal.2 | 2 | Signaux de fin de crise | Signal de fin de crise n°2 | Text | DAP Items | Signaux de fin de crise | Oui |
| end_crisis_signal.3 | 2 | Signaux de fin de crise | Signal de fin de crise n°3 | Text | DAP Items | Signaux de fin de crise | Oui |
| end_crisis_signal.4 | 2 | Signaux de fin de crise | Signal de fin de crise n°4 | Text | DAP Items | Signaux de fin de crise | Oui |
| danger.do | 2 | Mise en danger | Consignes à faire en cas de mise en danger auto ou hétéro agressivité | Text long ou liste | DAP Items | Mise en danger - à faire | Oui |
| danger.do_not | 2 | Mise en danger | Consignes à ne pas faire en cas de mise en danger auto ou hétéro agressivité | Text long ou liste | DAP Items | Mise en danger - à ne pas faire | Oui |
| danger.do_continuation | 3 | Mise en danger | Continuation éventuelle de la rubrique à faire | Text long | DAP Items | Mise en danger - continuation à faire | Oui |
| danger.do_not_continuation | 3 | Mise en danger | Continuation éventuelle de la rubrique à ne pas faire | Text long | DAP Items | Mise en danger - continuation à ne pas faire | Oui |
| during_crisis.header | 3 | En cas de crise | Section en cas de crise | Heading | DAP Sections | En cas de crise | Oui |
| during_crisis.helps | 3 | En cas de crise | Ce qui m aide pendant la crise | Text long ou liste | DAP Items | En crise - ce qui m aide | Oui |
| during_crisis.does_not_help | 3 | En cas de crise | Ce qui ne m aide pas pendant la crise | Text long ou liste | DAP Items | En crise - ce qui ne m aide pas | Oui |
| treatments.legal_choice | 3 | Traitements ou soins | Mention relative au choix du traitement à vérifier juridiquement | Text | DAP Mentions | Mention choix traitement | Non |
| treatments.help_header | 3 | Traitements ou soins | Table traitements ou soins aidants | Heading | DAP Traitements | Groupe traitements aidants | Oui |
| treatment_help.row_1 | 3 | Traitements aidants | Traitement ou soin aidant n°1 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = aide | Oui |
| treatment_help.row_2 | 3 | Traitements aidants | Traitement ou soin aidant n°2 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = aide | Oui |
| treatment_help.row_3 | 3 | Traitements aidants | Traitement ou soin aidant n°3 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = aide | Oui |
| treatment_help.row_4 | 3 | Traitements aidants | Traitement ou soin aidant n°4 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = aide | Oui |
| treatment_help.row_5 | 3 | Traitements aidants | Traitement ou soin aidant n°5 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = aide | Oui |
| treatments.avoid_header | 3 | Traitements ou soins | Table traitements ou soins non aidants ou à éviter | Heading | DAP Traitements | Groupe traitements à éviter | Oui |
| treatment_avoid.row_1 | 3 | Traitements non aidants | Traitement ou soin non aidant n°1 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = ne m aide pas | Oui |
| treatment_avoid.row_2 | 3 | Traitements non aidants | Traitement ou soin non aidant n°2 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = ne m aide pas | Oui |
| treatment_avoid.row_3 | 3 | Traitements non aidants | Traitement ou soin non aidant n°3 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = ne m aide pas | Oui |
| treatment_avoid.row_4 | 3 | Traitements non aidants | Traitement ou soin non aidant n°4 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = ne m aide pas | Oui |
| treatment_avoid.row_5 | 3 | Traitements non aidants | Traitement ou soin non aidant n°5 avec traitement/soin, posologie, usage/effet, remarques | Table row | DAP Traitements | Préférence = ne m aide pas | Oui |
| care_place.want_care_place | 3 | Lieu de soin | Souhait d être conduit(e) dans un lieu de soin | Checkbox / Select oui-non-inconnu | DAP Versions | Souhaite lieu de soin | Oui |
| care_place.legal_place_choice | 3 | Lieu de soin | Mention relative au choix du lieu de soin à vérifier juridiquement | Text | DAP Mentions | Mention choix lieu de soin | Non |
| care_place.preferred_1 | 4 | Lieux souhaités | Lieu de soin souhaité n°1 | Text ou Relation lieu | DAP Lieux | Lieu souhaité | Oui |
| care_place.preferred_2 | 4 | Lieux souhaités | Lieu de soin souhaité n°2 | Text ou Relation lieu | DAP Lieux | Lieu souhaité | Oui |
| care_place.preferred_remarks | 4 | Lieux souhaités | Remarques sur les lieux souhaités | Text long | DAP Lieux | Remarques lieux souhaités | Oui |
| care_place.refused_1 | 4 | Lieux refusés | Lieu de soin refusé n°1 | Text ou Relation lieu | DAP Lieux | Lieu refusé | Oui |
| care_place.refused_2 | 4 | Lieux refusés | Lieu de soin refusé n°2 | Text ou Relation lieu | DAP Lieux | Lieu refusé | Oui |
| care_place.refused_remarks | 4 | Lieux refusés | Remarques sur les lieux refusés | Text long | DAP Lieux | Remarques lieux refusés | Oui |
| care_place.alternative_1 | 4 | Alternative au lieu de soin | Alternative au lieu de soin n°1 ou solution d attente | Text | DAP Lieux | Alternative au lieu de soin | Oui |
| care_place.alternative_2 | 4 | Alternative au lieu de soin | Alternative au lieu de soin n°2 ou solution d attente | Text | DAP Lieux | Alternative au lieu de soin | Oui |
| care_place.alternative_3 | 4 | Alternative au lieu de soin | Alternative au lieu de soin n°3 ou solution d attente | Text | DAP Lieux | Alternative au lieu de soin | Oui |
| care_place.alternative_4 | 4 | Alternative au lieu de soin | Alternative au lieu de soin n°4 ou solution d attente | Text | DAP Lieux | Alternative au lieu de soin | Oui |
| care_place.alternative_5 | 4 | Alternative au lieu de soin | Alternative au lieu de soin n°5 ou solution d attente | Text | DAP Lieux | Alternative au lieu de soin | Oui |
| care_place.alternative_6 | 4 | Alternative au lieu de soin | Alternative au lieu de soin n°6 ou solution d attente | Text | DAP Lieux | Alternative au lieu de soin | Oui |
| accompaniment.header | 4 | Accompagnement | Section accompagnement souhaité ou refusé | Heading | DAP Sections | Accompagnement | Oui |
| accompaniment.legal_patient_rights | 4 | Accompagnement | Mention relative aux droits des malades | Text | DAP Mentions | Mention droits des malades | Non |
| accompaniment.medical_legal_choice | 4 | Personnel médical | Mention relative au choix du médecin à vérifier juridiquement | Text | DAP Mentions | Mention choix médecin | Non |
| accompaniment.medical_wanted | 4 | Personnel médical | Personnel médical souhaité | Text long ou liste | DAP Accompagnants | Personnel médical souhaité | Oui |
| accompaniment.medical_not_wanted | 4 | Personnel médical | Personnel médical non souhaité | Text long ou liste | DAP Accompagnants | Personnel médical non souhaité | Oui |
| accompaniment.paramedical_wanted | 4-5 | Personnel paramédical, médiateurs, travailleurs sociaux | Personnel paramédical ou social souhaité | Text long ou liste | DAP Accompagnants | Personnel paramédical souhaité | Oui |
| accompaniment.paramedical_not_wanted | 4-5 | Personnel paramédical, médiateurs, travailleurs sociaux | Personnel paramédical ou social non souhaité | Text long ou liste | DAP Accompagnants | Personnel paramédical non souhaité | Oui |
| accompaniment.paramedical_continuation | 5 | Personnel paramédical, médiateurs, travailleurs sociaux | Continuation des deux colonnes paramédical/social | Text long | DAP Accompagnants | Continuation paramédical/social | Oui |
| personal_notes.text | 5 | Autres remarques | Remarques personnelles et choses à savoir | Text long | DAP Items | Autres remarques personnelles | Selon partage |

## 7. Schémas des bases Notion

### 7.1 Base `DAP Documents`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Titre lisible de la DAP |
| Personne concernée | Text ou Relation | Identité ou lien vers base Patients |
| Statut | Select | Brouillon, active, active partielle, révoquée, remplacée, archivée |
| Version active | Relation | Lien vers DAP Versions |
| Date de création | Date | Création du document |
| Date dernière mise à jour | Date | Dernière modification |
| Date révision prévue | Date | Rappel de relecture |
| Synthèse crise disponible | Checkbox | Indicateur non clinique |

### 7.2 Base `DAP Versions`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Version de DAP |
| Document DAP | Relation | Lien vers DAP Documents |
| Numéro de version | Number | 1, 2, 3... |
| Modèle source | Select | dap_fr_v1_1_notion |
| Statut | Select | Brouillon, en relecture, active, révoquée, remplacée |
| Fait le | Date | Date du formulaire source |
| Fait à | Text | Lieu de rédaction |
| Hash contenu | Text | Hash canonique si signature |
| PDF complet | Files & media | Export contrôlé |
| PDF synthèse crise | Files & media | Export contrôlé |

### 7.3 Base `DAP Contacts`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Nom / Prénom source |
| Document DAP | Relation | Lien vers DAP Documents |
| Rôle source | Select | Personne de confiance, Personne à prévenir n°1, n°2, n°3, Témoin |
| Coordonnées | Text | Téléphone, email, adresse selon saisie |
| Nature du lien | Text ou Select | Lien avec la personne concernée |
| Qui fait quoi | Text | Rôle concret en cas de crise ou de relais |
| Acceptation | Status | Non invitée, invitée, acceptée, refusée, expirée |
| Mode crise | Checkbox | Visible dans synthèse crise si autorisé |

### 7.4 Base `DAP Items`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Nom court de l item |
| Document DAP | Relation | Lien vers DAP Documents |
| Version DAP | Relation | Lien vers DAP Versions |
| ID stable | Text | Identifiant stable du champ |
| Page source | Select | 1, 2, 3, 4, 5 |
| Section source | Select | Rubrique source |
| Ordre | Number | Ordre d affichage |
| Texte saisi | Text | Contenu de la personne |
| Mode crise | Checkbox | À afficher dans la synthèse crise |
| Vide volontairement | Checkbox | La personne confirme laisser vide |

### 7.5 Base `DAP Traitements`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Traitement/Soin |
| Document DAP | Relation | Lien vers DAP Documents |
| Préférence | Select | M aide, ne m aide pas, à éviter, à discuter |
| Posologie | Text | Colonne source posologie |
| Usage/Effet | Text | Colonne source usage/effet |
| Remarques | Text | Colonne source remarques |
| Ordre | Number | Ordre dans le tableau |
| Validation clinique requise | Checkbox | À discuter avec un professionnel |

### 7.6 Base `DAP Lieux`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Nom du lieu ou alternative |
| Document DAP | Relation | Lien vers DAP Documents |
| Type de préférence | Select | Souhaité, refusé, alternative |
| Ordre | Number | Ordre source |
| Remarques | Text | Remarques associées |
| Coordonnées lieu | Text | Adresse ou téléphone si utile |
| Mode crise | Checkbox | Visible dans synthèse crise |

### 7.7 Base `DAP Accompagnants`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Personne, fonction ou équipe |
| Document DAP | Relation | Lien vers DAP Documents |
| Catégorie | Select | Personnel médical, personnel paramédical/social, autre |
| Préférence | Select | Souhaité, non souhaité |
| Détails | Text | Précisions |
| Ordre | Number | Ordre source |
| Mode crise | Checkbox | Visible dans synthèse crise |

### 7.8 Base `DAP Signatures`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Signature |
| Version DAP | Relation | Lien vers DAP Versions |
| Rôle signataire | Select | Propriétaire des DAP, personne de confiance, témoin, professionnel accompagnant |
| Nom signataire | Text | Nom affiché |
| Date signature | Date | Horodatage |
| Méthode signature | Select | Attestation, signature manuscrite, e-signature simple, scan papier |
| Hash contenu signé | Text | Empreinte du contenu |
| Statut | Status | Valide, révoquée, invalidée |

### 7.9 Base `DAP Partages et Audit`

| Propriété | Type Notion | Description |
| --- | --- | --- |
| Nom | Title | Événement ou partage |
| Document DAP | Relation | Lien vers DAP Documents |
| Type | Select | Partage, consultation, export, bris de glace, révocation |
| Acteur | Text ou Relation | Utilisateur ou tiers |
| Niveau accès | Select | Synthèse, crise, complet, admin |
| Motif | Text | Obligatoire en bris de glace |
| Date | Date | Horodatage |
| Résultat | Status | Succès, refusé, erreur |

## 8. Modèle fonctionnel corrigé des sections

### 8.1 Page 1 — personne concernée, personne de confiance et contacts

La page 1 doit être modélisée en trois parties : identité, désignation/signature, contacts. La correction importante est de ne pas fusionner les personnes à prévenir dans un simple champ texte. Elles doivent devenir des lignes dans une base contact, car le formulaire source distingue explicitement la personne de confiance et trois personnes à prévenir.

| Bloc | Éléments source | Modélisation corrigée |
| --- | --- | --- |
| Identité | Je soussigné(e), né(e) le, à | Propriétés du document ou relation patient |
| Désignation | désigne comme personne de confiance | Relation vers DAP Contacts avec rôle Personne de confiance |
| Mention consentement | avec mon consentement lors de sa rédaction | Mention conservée dans DAP Mentions ou modèle |
| Mention limite | n ont pas de valeur contraignante | Mention visible en relecture et export PDF |
| Fait le / à | Date et lieu | Propriétés de DAP Versions |
| Témoins | Seul(e) ou avec/en présence de témoins | Relation vers DAP Signatures ou DAP Contacts rôle Témoin |
| Signatures | Personne de confiance + témoin + propriétaire des DAP | Base DAP Signatures |
| Table contacts | Nom / Prénom, Coordonnées, Nature du Lien, Qui fait quoi | Base DAP Contacts avec quatre lignes source |
| Passage de relais | Je suis capable de décider sauf quand… | Champ long prioritaire en mode crise |

### 8.2 Page 2 — avant crise et mise en danger

Les quatre listes numérotées de la page 2 doivent être représentées comme lignes répétables. Pour Notion, il est préférable de créer une ligne par item plutôt que de stocker les quatre lignes dans une seule cellule.

| Section | Items obligatoires à créer pour l import | Base cible | Priorité mode crise |
| --- | --- | --- | --- |
| Signes avant-coureurs | Signe avant-coureur n°1 à n°4 | DAP Items | Haute |
| Ce qui m aide avant crise | Ce qui m aide n°1 à n°4 | DAP Items | Haute |
| Ce qui ne m aide pas avant crise | Ce qui ne m aide pas n°1 à n°4 | DAP Items | Haute |
| Signaux de fin de crise | Signal de fin de crise n°1 à n°4 | DAP Items | Moyenne |
| Mise en danger | À faire et À ne pas faire | DAP Items | Critique |

### 8.3 Page 3 — en cas de crise, traitements et lieu de soin

Le formulaire source comporte deux zones à ne pas perdre : la zone `En cas de crise` avec deux colonnes, puis les tableaux de traitements/soins avec quatre colonnes. La correction Notion consiste à créer une base spécialisée `DAP Traitements`, car les lignes de traitements ne sont pas de simples textes libres.

| Élément source | Lignes / colonnes à créer | Base cible | Remarque |
| --- | --- | --- | --- |
| En cas de crise - ce qui m aide | Liste ou champ long | DAP Items | Visible en synthèse crise |
| En cas de crise - ce qui ne m aide pas | Liste ou champ long | DAP Items | Visible en synthèse crise |
| Traitements qui m aident | 5 lignes par défaut avec 4 colonnes | DAP Traitements | Extensible |
| Traitements qui ne m aident pas | 5 lignes par défaut avec 4 colonnes | DAP Traitements | Extensible |
| Souhait d être conduit(e) dans un lieu de soin | Choix OUI / NON / à discuter | DAP Versions | La source affiche OUI |

### 8.4 Page 4 — lieux et accompagnants

Les lieux de soin et accompagnants sont souvent perdus lors d'un import Markdown si tout est rédigé en paragraphes. Cette version les convertit en bases Notion dédiées.

| Élément source | Lignes à créer | Base cible | Remarque |
| --- | --- | --- | --- |
| Lieux où je veux être pris(e) en soin | Lieu souhaité n°1, lieu souhaité n°2, remarques | DAP Lieux | Extensible |
| Lieux où je refuse d être pris(e) en soin | Lieu refusé n°1, lieu refusé n°2, remarques | DAP Lieux | Extensible |
| Alternative au lieu de soin | 6 lignes par défaut ou champ long | DAP Lieux | Inclure les solutions d attente |
| Personnel médical souhaité | Liste souhaitée | DAP Accompagnants | Mode crise si autorisé |
| Personnel médical non souhaité | Liste non souhaitée | DAP Accompagnants | Mode crise si autorisé |
| Personnel paramédical/social souhaité | Liste souhaitée avec continuation page 5 | DAP Accompagnants | Mode crise si autorisé |
| Personnel paramédical/social non souhaité | Liste non souhaitée avec continuation page 5 | DAP Accompagnants | Mode crise si autorisé |

### 8.5 Page 5 — remarques personnelles

La page 5 doit rester un champ long distinct. Elle ne doit pas être fusionnée avec les accompagnants, même si le haut de page peut contenir une continuation graphique de la section précédente.

| Élément source | Modélisation | Partage recommandé |
| --- | --- | --- |
| Continuation paramédical/social | Champ ou liste dans DAP Accompagnants | Mode crise selon autorisation |
| Autres remarques personnelles, choses à savoir, notes | Champ long dans DAP Items | Partage paramétrable, pas forcément visible en mode crise |

## 9. Règles d'import Notion à appliquer

| Règle | Détail | Raison |
| --- | --- | --- |
| Créer les bases avant l import | DAP Documents, Versions, Contacts, Items, Traitements, Lieux, Accompagnants, Signatures, Partages/Audit | Les relations Notion sont plus propres si les bases existent |
| Importer le tableau maître | Utiliser la section 3 comme dictionnaire initial | Tous les items source sont présents |
| Créer des modèles de page | Un modèle DAP complet et un modèle Synthèse crise | Accélère la saisie réelle |
| Ne pas utiliser une seule page texte | Éviter de coller toute la DAP dans un champ long | Perte des contacts, traitements et lieux |
| Conserver les ID stables | Ne pas renommer les ID stable après import | Permet export, API, migration et audit |
| Créer les traitements dans une base dédiée | Chaque ligne de traitement devient une fiche | Évite la perte des colonnes posologie et usage/effet |
| Marquer le mode crise | Propriété checkbox ou select | Permet une vue filtrée synthèse crise |
| Garder les mentions juridiques séparées | Base DAP Mentions ou propriétés modèle | Permet relecture juridique sans toucher aux contenus personnels |

## 10. Vues Notion recommandées

| Vue Notion | Base | Filtre / tri | Utilité |
| --- | --- | --- | --- |
| DAP actives | DAP Documents | Statut = active | Vue opérationnelle |
| DAP à réviser | DAP Documents | Date révision prévue <= aujourd hui | Relances |
| Synthèse crise | DAP Items | Mode crise = Oui, tri par Ordre | Vue rapide en situation de crise |
| Contacts crise | DAP Contacts | Mode crise = Oui | Personne de confiance et personnes à prévenir |
| Traitements crise | DAP Traitements | Préférence = M aide ou Ne m aide pas | Consultation rapide |
| Lieux crise | DAP Lieux | Mode crise = Oui | Lieux souhaités/refusés/alternatives |
| Accompagnants crise | DAP Accompagnants | Mode crise = Oui | Souhaité / non souhaité |
| Audit accès | DAP Partages et Audit | Type = consultation ou bris de glace | Contrôle conformité |

## 11. Recommandations techniques conservées du Markdown initial

Les corrections Notion ne remplacent pas les exigences techniques du cahier des charges initial. Elles doivent être intégrées avec les principes suivants :

- versionnement immuable des DAP publiées ;
- distinction entre brouillon, version active, version remplacée et version révoquée ;
- séparation entre contenu de la personne et commentaires professionnels ;
- audit des consultations, exports, partages et accès exceptionnels ;
- droits d'accès par rôle, relation de soin, section et contexte ;
- chiffrement en transit et au repos ;
- hébergement adapté aux données de santé ;
- accessibilité RGAA/WCAG ;
- export PDF complet et export synthèse crise ;
- absence de score clinique ou d'interprétation automatique ;
- pas de transformation des préférences en prescription automatique ;
- validation juridique des mentions légales avant production.

## 12. Checklist de vérification après import Notion

| Contrôle | Attendu | Statut |
| --- | --- | --- |
| Page 1 contacts | 4 lignes existent : personne de confiance, personne à prévenir n°1, n°2, n°3 | À vérifier |
| Page 1 signatures | Rôles propriétaire des DAP, personne de confiance, témoin disponibles | À vérifier |
| Passage de relais | Champ IMPORTANT présent et visible en mode crise | À vérifier |
| Signes avant-coureurs | 4 lignes par défaut créées | À vérifier |
| Ce qui m aide avant crise | 4 lignes par défaut créées | À vérifier |
| Ce qui ne m aide pas avant crise | 4 lignes par défaut créées | À vérifier |
| Signaux fin de crise | 4 lignes par défaut créées | À vérifier |
| Mise en danger | Deux champs distincts : à faire / à ne pas faire | À vérifier |
| En cas de crise | Deux champs distincts : ce qui m aide / ce qui ne m aide pas | À vérifier |
| Traitements aidants | 5 lignes par défaut avec colonnes complètes | À vérifier |
| Traitements non aidants | 5 lignes par défaut avec colonnes complètes | À vérifier |
| Souhait lieu de soin | Champ oui/non/à discuter présent | À vérifier |
| Lieux souhaités | 2 lignes + remarques | À vérifier |
| Lieux refusés | 2 lignes + remarques | À vérifier |
| Alternatives | 6 lignes ou champ long présent | À vérifier |
| Accompagnement médical | Souhaité et non souhaité séparés | À vérifier |
| Accompagnement paramédical/social | Souhaité et non souhaité séparés, continuation prise en compte | À vérifier |
| Autres remarques | Champ long final présent | À vérifier |
| Mode crise | Vue filtrée affiche contacts, passage relais, danger, crise, traitements, lieux, accompagnants | À vérifier |
| Audit | Base partages/audit présente | À vérifier |

## 13. Changelog v1.1

| Version | Date | Changement |
| --- | --- | --- |
| 1.1 | 2026-06-06 | Ajout du tableau maître complet des items source pour import Notion |
| 1.1 | 2026-06-06 | Ajout des 4 lignes de contacts source page 1 |
| 1.1 | 2026-06-06 | Ajout des items numérotés 1 à 4 de la page 2 |
| 1.1 | 2026-06-06 | Ajout des tableaux traitements aidants/non aidants avec lignes par défaut |
| 1.1 | 2026-06-06 | Ajout des lieux souhaités/refusés, remarques et alternatives |
| 1.1 | 2026-06-06 | Ajout de la séparation accompagnants médicaux et paramédicaux/social souhaités/refusés |
| 1.1 | 2026-06-06 | Ajout du champ autres remarques personnelles page 5 |
| 1.1 | 2026-06-06 | Ajout des schémas de bases Notion et checklist de contrôle |

## 14. Annexe — ordre d'affichage recommandé en mode crise

| Ordre crise | Bloc | Source | Base Notion |
| --- | --- | --- | --- |
| 1 | Statut DAP, date, version, mention non contraignante | Page 1 | DAP Documents / DAP Versions |
| 2 | Personne de confiance | Page 1 | DAP Contacts |
| 3 | Personnes à prévenir n°1 à n°3 | Page 1 | DAP Contacts |
| 4 | Je suis capable de décider sauf quand… | Page 1-2 | DAP Items |
| 5 | En cas de mise en danger : à faire | Page 2-3 | DAP Items |
| 6 | En cas de mise en danger : à ne pas faire | Page 2-3 | DAP Items |
| 7 | Signes avant-coureurs | Page 2 | DAP Items |
| 8 | Ce qui m aide avant crise | Page 2 | DAP Items |
| 9 | Ce qui ne m aide pas avant crise | Page 2 | DAP Items |
| 10 | En cas de crise : ce qui m aide | Page 3 | DAP Items |
| 11 | En cas de crise : ce qui ne m aide pas | Page 3 | DAP Items |
| 12 | Traitements ou soins qui m aident | Page 3 | DAP Traitements |
| 13 | Traitements ou soins qui ne m aident pas | Page 3 | DAP Traitements |
| 14 | Lieux souhaités, refusés, alternatives | Page 3-4 | DAP Lieux |
| 15 | Accompagnants souhaités ou non souhaités | Page 4-5 | DAP Accompagnants |
| 16 | Signaux de fin de crise | Page 2 | DAP Items |
| 17 | Autres remarques personnelles si partage autorisé | Page 5 | DAP Items |

## 15. Conclusion

Cette version résout le problème principal d'import Notion : les items qui étaient implicites, groupés ou décrits en prose sont désormais explicitement intégrés dans des tableaux. Les contacts, les items numérotés, les colonnes de traitements, les lieux, les alternatives, les accompagnants et les remarques finales peuvent être importés sans perte structurelle.

Le fichier reste un cahier des charges et un modèle d'import. Avant utilisation en production, les mentions juridiques, la sécurité, l'hébergement, la conformité des données de santé, la signature et les droits de partage doivent être validés par les responsables compétents.
