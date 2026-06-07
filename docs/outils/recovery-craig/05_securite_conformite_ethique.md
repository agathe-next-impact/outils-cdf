# Sécurité, conformité, éthique et risques

## 1. Classification des données

| Classe | Exemples | Sensibilité | Contrôles |
|---|---|---|---|
| Public | page accueil, présentation | faible | intégrité, disponibilité. |
| Contenu sous licence | modules, textes, questions | juridique | contrôle de publication, DRM léger, audit. |
| Données compte | e-mail, pseudonyme | personnel | chiffrement, accès restreint. |
| Données santé mentale | réponses, journal, plan | très élevée | chiffrement champ, HDS si applicable, AIPD, accès minimal. |
| Données crise | ressources, contacts d’aide | très élevée | haute disponibilité, confidentialité, sobriété. |
| Données groupe | participations, partages | élevée | consentement explicite, révocation, audit. |
| Logs | erreurs, audit | moyenne à élevée | minimisation, pseudonymisation. |

## 2. RGPD et données de santé

### 2.1 Pourquoi ces données sont sensibles

Les réponses libres, journaux, plans de rétablissement, contacts de soutien, mentions de trauma, anxiété, dépression, pensées extrêmes, crises ou moyens d’adaptation peuvent révéler des informations sur la santé mentale passée, présente ou future d’une personne. Elles doivent être traitées comme des données sensibles.

### 2.2 Bases légales possibles

À valider juridiquement :

| Traitement | Base article 6 | Condition article 9 possible | Remarque |
|---|---|---|---|
| Compte utilisateur | contrat ou consentement | non applicable si pas santé | minimisation. |
| Stockage des réponses | consentement explicite | consentement explicite art. 9.2.a ou autre base selon contexte | consentement granulaire. |
| Groupe animé par association | contrat/mission/intérêt légitime selon cas | à valider | prudence élevée. |
| Sécurité applicative | intérêt légitime | minimisation | logs sans contenu. |
| Ressources de crise | intérêt vital si interaction de crise ? | à valider | ne pas surinterpréter. |
| Analytics | consentement ou exempt strict | éviter données sensibles | agrégation. |

### 2.3 AIPD / DPIA

Une analyse d’impact relative à la protection des données est fortement recommandée et probablement nécessaire dès que l’outil stocke des données de santé mentale, permet des groupes, ou utilise IA/algorithmes.

Structure d’AIPD :

1. finalités ;
2. données collectées ;
3. personnes concernées ;
4. flux ;
5. sous-traitants ;
6. risques droits et libertés ;
7. mesures techniques ;
8. mesures organisationnelles ;
9. résidu de risque ;
10. validation DPO ;
11. réévaluation périodique.

### 2.4 Droits des personnes

Obligatoire :

- accès ;
- rectification ;
- effacement ;
- portabilité ;
- limitation ;
- opposition selon base ;
- retrait du consentement ;
- information claire ;
- contact DPO.

Fonctions produit correspondantes :

- export complet ;
- suppression compte ;
- suppression entrée ;
- historique consentements ;
- désactivation partage ;
- désactivation notifications ;
- retrait IA.

## 3. HDS et hébergement

Si l’application héberge des données de santé à caractère personnel recueillies à l’occasion d’activités de prévention, de suivi, de soins ou d’accompagnement médico-social pour le compte de personnes ou d’organisations, l’hébergement HDS doit être analysé et probablement exigé en France.

Recommandation :

- choisir un hébergeur certifié HDS dès le MVP si le service conserve les réponses cloud ;
- signer DPA/sous-traitance ;
- documenter localisation ;
- vérifier sauvegardes, logs, support, accès administrateur ;
- éviter transferts hors UE ;
- contrôler les accès support.

## 4. Dispositif médical logiciel

### 4.1 Positionnement non médical par défaut

Pour réduire le risque de qualification comme dispositif médical :

- ne pas revendiquer traitement, diagnostic, prévention personnalisée ou surveillance médicale ;
- ne pas classer les utilisateurs selon un état clinique ;
- ne pas fournir de recommandations thérapeutiques ;
- ne pas orienter automatiquement une prise en charge ;
- présenter l’outil comme cahier personnel et support de réflexion.

### 4.2 Déclencheurs de requalification possible

Analyse réglementaire nécessaire si :

- algorithme d’évaluation du risque suicidaire ;
- diagnostic ou suggestion de diagnostic ;
- recommandations personnalisées de soin ;
- suivi par professionnel dans un protocole médical ;
- intégration au dossier patient ;
- IA qui analyse les réponses pour aider à une décision clinique ;
- finalité annoncée de traitement d’un trouble.

### 4.3 Si qualification dispositif médical

Prévoir :

- système qualité ;
- gestion des risques ;
- évaluation clinique ;
- cybersécurité médicale ;
- surveillance après mise sur le marché ;
- documentation technique ;
- marquage CE selon classe ;
- gestion incidents/vigilance.

## 5. AI Act si IA activée

### 5.1 IA absente du MVP

Le MVP recommandé n’utilise pas d’IA générative. Cela simplifie conformité, sécurité, coût et risque clinique.

### 5.2 IA rédactionnelle optionnelle

Si IA activée :

- consentement explicite ;
- transparence : “réponse générée par IA” ;
- pas de diagnostic ;
- pas de traitement ;
- pas d’autonomie d’action ;
- journalisation minimale ;
- possibilité de supprimer l’historique ;
- information sur le provider ;
- interdiction contractuelle d’entraînement sur données utilisateur ;
- revue des obligations AI Act, GPAI, DSA selon modèle et rôle.

### 5.3 Risques IA spécifiques

| Risque | Exemple | Mitigation |
|---|---|---|
| Prompt injection | utilisateur ou contenu externe détourne l’assistant | policy engine, pas d’outils dangereux, validation sortie. |
| Fuite de données | données personnelles envoyées au modèle | redaction, consentement, DPA, no-training. |
| Hallucination | conseil faux | avertissement, sources limitées, pas de conseil médical. |
| Surconfiance | utilisateur remplace aide humaine | messages clairs, ressources humaines visibles. |
| Ton inadapté | réponse culpabilisante | tests, filtres, modèles de réponses, human review. |
| Agency excessive | IA envoie messages ou contacte tiers | aucune action sans validation explicite. |

## 6. Sécurité applicative

### 6.1 Référentiel cible

- OWASP ASVS 5.0 niveau 2 pour l’application principale.
- Niveau 3 pour fonctions très sensibles : chiffrement, auth, accès admin, exports, partages.
- OWASP Top 10 Web et API.
- OWASP Top 10 LLM si IA.

### 6.2 Contrôles essentiels

| Domaine | Contrôles |
|---|---|
| Auth | MFA/passkeys, rotation refresh token, rate limiting, protection brute force. |
| Session | cookies sécurisés, expiration, révocation. |
| Accès | RBAC/ABAC, vérifications côté serveur, tests IDOR. |
| Entrées | validation stricte, sanitation Markdown, limites taille. |
| Sorties | échappement HTML, CSP, anti-XSS. |
| Données | chiffrement champ, KMS, sauvegardes chiffrées. |
| Secrets | vault, rotation, pas de secrets dans CI logs. |
| Exports | liens signés, expiration, worker isolé. |
| Admin | accès restreint, MFA obligatoire, audit. |
| Logs | pas de contenu sensible, pseudonymisation. |
| Supply chain | lockfiles, SBOM, scans, signature images. |
| Infra | WAF, segmentation réseau, principe moindre privilège. |

### 6.3 Menaces prioritaires

| Menace | Impact | Mesure |
|---|---|---|
| Compromission compte utilisateur | exposition journal/plan | MFA, alertes connexion, chiffrement. |
| IDOR partage | fuite de réponses | tests autorisation systématiques. |
| Admin abuse | accès indésirable | séparation rôles, audit, chiffrement, break-glass. |
| XSS via Markdown | vol session | sanitizer, CSP, cookies HttpOnly. |
| Export exposé | fuite archive | liens courts, auth, suppression automatique. |
| Logs contaminés | fuite massive | redaction middleware. |
| Mauvais droit contenu | violation copyright | workflow droits bloquant. |
| Défaillance crise | ressource inaccessible | cache statique, monitoring, page offline. |

## 7. Confidentialité fonctionnelle

### 7.1 Politique de partage

- privé par défaut ;
- partage explicite ;
- portée claire ;
- révocation facile ;
- journal d’accès visible ;
- aucune copie permanente chez le destinataire si révoquée, sauf export déjà réalisé clairement signalé.

### 7.2 Écran “qui peut voir quoi”

Un écran dédié doit lister :

- réponses privées ;
- éléments partagés ;
- destinataires ;
- date de partage ;
- bouton révoquer ;
- historique accès si disponible.

## 8. Gestion de crise et sécurité des personnes

### 8.1 Principes

- ressources humaines visibles ;
- pas de détection cachée intrusive ;
- pas de promesse d’intervention si l’équipe n’a pas capacité 24/7 ;
- pas d’obligation de se connecter ;
- page aide immédiate disponible offline/PWA.

### 8.2 Configuration France

Ressources à configurer :

- 3114 — numéro national de prévention du suicide, gratuit et accessible 24 h/24 et 7 j/7 en France ;
- urgences locales en cas de danger immédiat ;
- possibilité d’ajouter ressources locales associatives vérifiées.

### 8.3 Bannière de détresse

Déclenchement possible :

- clic volontaire “J’ai besoin d’aide” ;
- module marqué crise ;
- détection locale de mots clés très limitée et transparente, si activée.

Texte recommandé :

> Vous n’avez pas à gérer cela seul·e. Si vous êtes en danger immédiat, contactez les urgences locales. En France, vous pouvez aussi contacter le 3114, accessible gratuitement 24 h/24 et 7 j/7.

Ne pas dire :

- “vous êtes suicidaire” ;
- “nous avons détecté un risque élevé” ;
- “ne faites pas ceci/cela” de façon culpabilisante ;
- “l’application va vous sauver”.

## 9. Accessibilité

Objectif : WCAG 2.2 AA.

### 9.1 Exigences UI

- navigation clavier complète ;
- focus visible ;
- contraste AA ;
- taille de texte ajustable ;
- labels formulaires ;
- erreurs explicites ;
- pas de dépendance couleur seule ;
- pas d’animations forcées ;
- mode faible stimulation ;
- compatibilité lecteur écran ;
- langue déclarée ;
- zones tactiles suffisantes ;
- sauvegarde visible.

### 9.2 Exigences cognitives

- phrases courtes ;
- un choix principal par écran ;
- possibilité de revenir ;
- pas de timer ;
- résumé des actions ;
- brouillon auto ;
- bouton pause ;
- avertissements doux ;
- aide contextuelle.

## 10. Trauma-informed design

Principes :

1. choix ;
2. contrôle ;
3. collaboration ;
4. sécurité ;
5. confiance ;
6. transparence ;
7. non-jugement ;
8. reconnaissance du vécu.

Concrètement :

- afficher “vous pouvez passer cette question” ;
- ne pas demander de raconter un trauma ;
- proposer un module doux après un module intense ;
- ne jamais afficher des badges de performance sur la souffrance ;
- permettre de masquer les titres sensibles ;
- ne pas pousser de notifications sur des thèmes sensibles ;
- proposer un bouton sortie rapide si usage dans environnement non sûr.

## 11. Droits d’auteur et licences

### 11.1 Règles générales

- conserver la preuve des droits ;
- ne publier que ce qui est autorisé ;
- distinguer titre, résumé original, texte source, question source ;
- empêcher export de contenus protégés non autorisés ;
- journaliser publication ;
- faciliter retrait rapide.

### 11.2 Statuts de licence

```yaml
rights_status:
  unknown: "Droits non analysés, publication interdite."
  permission_required: "Autorisation requise avant publication."
  cleared: "Autorisation vérifiée."
  restricted: "Usage limité, contrôler contexte."
  expired: "Autorisation expirée, retirer."
```

### 11.3 Workflow juridique

1. identifier titulaire ;
2. demander autorisation écrite ;
3. préciser usages : web, mobile, export, audio, groupe, commercial/non commercial ;
4. préciser territoires/langues ;
5. définir durée ;
6. conserver contrat ;
7. configurer droits dans back-office ;
8. réviser avant renouvellement.

## 12. Conditions d’utilisation

À inclure :

- outil de réflexion, pas urgence ni thérapie ;
- confidentialité et limites ;
- partage volontaire ;
- responsabilité utilisateur ;
- contact urgence ;
- propriété intellectuelle ;
- règles groupes ;
- interdiction de harcèlement ;
- suppression de compte ;
- support.

## 13. Politique de confidentialité

À inclure :

- responsable traitement ;
- DPO/contact ;
- données collectées ;
- finalités ;
- bases légales ;
- données sensibles ;
- hébergement ;
- sous-traitants ;
- transferts ;
- durées ;
- droits ;
- sécurité ;
- IA si activée ;
- cookies ;
- contact CNIL.

## 14. Cookies et traceurs

MVP :

- cookies strictement nécessaires ;
- pas de publicité ;
- analytics exemptés seulement si strictement anonymes et configurés ;
- consentement si analytics non exemptés ;
- pas de pixels tiers sur pages sensibles.

## 15. Politique incidents

### 15.1 Classification

| Niveau | Exemple | Réaction |
|---|---|---|
| S1 | fuite données sensibles | cellule crise, DPO, notification autorités/personnes si requis. |
| S2 | indisponibilité aide immédiate | correctif prioritaire, page statique fallback. |
| S3 | vulnérabilité admin | patch urgent. |
| S4 | bug mineur UI | backlog. |

### 15.2 Playbook fuite données

1. isoler ;
2. préserver preuves ;
3. évaluer volume et catégories ;
4. informer DPO ;
5. notifier autorité si requis ;
6. notifier personnes si risque élevé ;
7. corriger ;
8. post-mortem ;
9. renforcer contrôles.

## 16. Politique de modération groupe

Si groupes activés :

- charte claire ;
- pas de messages privés non contrôlés MVP ;
- signalement ;
- facilitateur formé ;
- pas de conseil médical entre pairs ;
- protocole en cas de détresse ;
- conservation limitée ;
- droit de retrait.

## 17. Check-list pré-production

- [ ] Autorisation contenu signée.
- [ ] AIPD réalisée.
- [ ] Hébergement HDS validé si nécessaire.
- [ ] DPA sous-traitants signés.
- [ ] Politique confidentialité validée.
- [ ] CGU validées.
- [ ] Tests OWASP ASVS niveau cible.
- [ ] Tests accessibilité.
- [ ] Tests suppression/export.
- [ ] Plan incident.
- [ ] Page crise testée offline.
- [ ] Sauvegarde/restauration testée.
- [ ] Admin MFA obligatoire.
- [ ] Logs sans données sensibles.
- [ ] Monitoring disponibilité.
- [ ] Formation support.
