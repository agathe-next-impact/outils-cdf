# Graphiques par outil — recommandations & registre

> Registre des graphiques pertinents pour chaque outil, et de leur statut
> d'intégration. Le **socle** est implémenté dans `src/components/charts/`
> (sur Recharts). Aucune intégration par outil n'est encore branchée :
> ce fichier sert de feuille de route.

## Socle disponible (`src/components/charts/`)

| Composant | Usage | Props principales |
|---|---|---|
| `RadarProfile` | Profil multi-facteurs | `data: {axis,value}[]`, `max?`, `accent` |
| `HBarRanking` | Classement (barres horizontales) | `data: {label,value}[]`, `max?`, `accent` |
| `BeforeAfterBars` | Comparaison avant/après | `data: {label,before,after}[]`, `max?` |
| `TrendLine` | Série temporelle | `data: {x,value}[]`, `area?`, `max?` |
| `DistributionDonut` | Répartition **≤ 3 catégories** | `data: {label,value}[]` |
| `ScoreGauge` | Score unique vs max / bande | `value`, `max`, `bandLabel?`, `bandTone?`, `unit?` |

### Contraintes respectées par le socle (à conserver à l'intégration)
- **Charte** : barres carrées (`radius={0}`), palette bleu/rouge/jaune + noir/blanc, zéro ombre, mode sombre (variables `--foreground`/`--background`), le jaune jamais en texte.
- **A11y (WCAG 2.2 AA)** : table `sr-only` équivalente, légende + libellés de valeur (jamais la couleur seule), animation coupée si `prefers-reduced-motion`, chart visuel `aria-hidden`.
- **Éthique** : afficher le graphe **uniquement sur l'écran de synthèse/fin** (jamais pendant la saisie) + rappel « repère, pas un diagnostic ». Jamais de gamification sur les outils de crise.
- **Confidentialité** : rendu 100 % client depuis `sessionStorage` — aucune donnée réseau.

---

## 🟢 Forte valeur (à brancher en priorité)

| Outil | Composant | Source de données (champs réels) | Notes d'intégration |
|---|---|---|---|
| **recovery-assessment-scale** | `RadarProfile` (+ `ScoreGauge`) | 5 `subscores` calculés par le moteur (confiance-espoir, demander-aide, orientation, symptômes, soutien), `mean` 1–5 ; jauge sur `mean` global (3 bandes) | Brancher dans `ScoredResult` quand `result.subscores.length > 0`. `max={5}` |
| **situations-evitees** | `HBarRanking` | table `situations` : `label=situation`, `value=anxiete` (0–100), déjà triable | Hiérarchie d'exposition. `max={100}`, `accent="blue"` |
| **gaap-attaques-panique** | `TrendLine` | table horodatée `entries` : `x=_createdAt` (formaté), `value=intensite` (0–10) | `max={10}`. Seule vraie série temporelle |
| **pensees-negatives** | `BeforeAfterBars` (×2) | `beliefBefore/After` (0–100) ; `emotionIntensity/emotionAfter` (0–10) | 2 graphes (échelles différentes) ou normaliser en %. `beforeLabel="Avant"`, `afterLabel="Après"` |
| **dealing-with-psychosis** | `TrendLine`, `BeforeAfterBars`, `HBarRanking`, `ScoreGauge` | sommeil : `date`+`sleep_quality` (TrendLine) ; stress/détresse/confiance avant/après (`pratiques_table`, `preparer`, `competences_table`, `pensees-difficiles`) ; `cercle_table` `support_level` par personne (HBar) ; `reperer` 0–20 (gauge, 2 bandes) | Plusieurs vues, une par segment concerné. ⚠️ tables NON `timestamped` : utiliser la colonne `date` saisie |
| **inventaire-burns-anxiete** | `HBarRanking` (3 thèmes) + `ScoreGauge` (total) | total 0–99 (6 bandes) ; thèmes via `group` : « Sentiments anxieux » (6 items), « Pensées anxieuses » (11), « Symptômes physiques » (16) | ⚠️ le moteur n'agrège PAS `group` → sommer côté affichage. Cadrage non-diagnostique strict (bande « sévère/extrême ») |

## 🟡 Optionnel (utile, plus léger)

| Outil | Composant | Source | Notes |
|---|---|---|---|
| **gerer-vos-inquietudes** | `DistributionDonut` | journal `worries.type` (pratique / hypothétique / peu d'emprise) — 3 modalités | Comptage d'occurrences |
| **recovery-craig** | `HBarRanking` (comptage) | table `moyens.categorie` (6 modalités) | 6 catégories → barres (pas donut, > 3 couleurs) |
| **escape** (métacognition) | `RadarProfile` ou `DistributionDonut` | table `hypotheses.type` (moi / les autres / la situation) — 3 axes | « Équilibre des attributions ». Comptage |
| **je-suis-le-centre-de-ma-vie** | `ScoreGauge` | segment `estime` 10–40 (3 bandes) | `unit=" / 40"` |
| **resolution-problemes** | `RadarProfile` (3 axes) ou `HBarRanking` | sliders `severity`, `urgency`, `confidence` (1–5) | Valeur modeste (3 points) |

## ⚪ Pas de graphique (assumé)

| Outil | Raison |
|---|---|
| **plan-de-crise** | Document de crise qualitatif — ton sobre, pas de gamification |
| **directives-anticipees-psychiatrie** | Document de préférences, aucune donnée chiffrée |
| **fleur-de-patricia** | Que du texte/tagList, aucune note par pétale. *Possibilité future* : ajouter une note 0–10 par pétale → `RadarProfile` « en fleur » (11 axes) |

---

## Notes techniques
- Dépendance : `recharts@^2.15` (compatible React 19). Non bundlé tant qu'aucun outil ne l'importe.
- Brancher les charts via `next/dynamic` (`ssr: false`) pour garder le bundle initial léger.
- Source d'inventaire des données : voir l'analyse du 2026-06-07 (mémoire projet).
