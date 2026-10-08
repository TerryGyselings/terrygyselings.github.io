# terrygyselings.github.io

Portfolio de Terry Gyselings — https://terrygyselings.github.io

Site statique : HTML, CSS et JavaScript, sans dépendance ni étape de build.

## Tester en local

Les scripts sont des modules ES : il faut passer par un petit serveur web
(ouvrir `index.html` directement en `file://` bloque leur chargement).

```bash
# au choix
python -m http.server 8000
npx serve .
```

Puis ouvrir http://localhost:8000. L'extension « Live Server » de VS Code fait aussi l'affaire.

## Organisation

| Dossier | Contenu |
| --- | --- |
| `index.html` | Tout le contenu de la page |
| `css/` | Une feuille par zone (`hero`, `projects`, `timeline`…) ; les couleurs et la police sont dans `base.css`, les adaptations mobile dans `responsive.css` |
| `js/` | `main.js` importe les modules : menu mobile, thème, langue, défilement, frise du parcours, carrousel des projets |
| `fonts/` | Police Archivo (licence OFL), hébergée ici |
| `images/` | Visuels des projets (WebP), logos, favicon, image de partage |
| `Terry_Gyselings_CV.pdf`, `Terry_Gyselings_Resume.pdf` | CV français et CV anglais : le bouton de téléchargement suit la langue du site |

## Modifier le contenu

**Traductions.** Le français s'écrit dans `index.html`. La version anglaise se met
dans l'attribut `data-en` du même élément (`data-en-label` pour un `aria-label`,
`data-en-alt` pour le `alt` d'une image, `data-en-href` pour un lien qui change
avec la langue, comme le CV).

**Ajouter un projet.** Dupliquer un bloc `<article class="project-slide">` dans le
carrousel, à sa place chronologique (le plus récent en premier). Les points de
navigation se créent tout seuls. Sans visuel, utiliser la couverture typographique :
`<div class="project-image project-cover cover-blue"><span>Nom</span></div>`
(`cover-amber` pour la version ambre). La durée de la lecture automatique se règle
en haut de `js/carousel.js`.

**Frise du parcours (en haut de page).** Chaque étape est un `<li class="traj-item">`
dont `--start` et `--end` sont des numéros de colonne : colonne 1 = 2011, une colonne
par année. Le repère « aujourd'hui » se place tout seul (`js/hero.js`). La classe
`traj-parallel` sert aux étapes menées en même temps qu'une autre.

**Couleurs.** Tout passe par les variables en haut de `css/base.css`
(`:root` pour le thème clair, `.dark` pour le thème sombre). Chaque section est une
bande `.band` ; son fond se choisit avec `band-surface`, `band-dark`, `band-tint` ou
`band-accent` (voir `css/sections.css`).
