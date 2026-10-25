# Portfolio — Maël Donnart

Site statique (HTML/CSS/JS) présentant mon parcours, mes projets et ma méthode de
travail avec les workflows IA.

## Lancer en local

```bash
python3 -m http.server 8080
# http://localhost:8080
```

Aucun build n'est nécessaire : les données des projets, compétences et
contributions sont dans `data/*.json`.

## Structure

- `index.html` — page unique (hero, à propos, IA, projets, parcours, open source,
  témoignages, contact)
- `css/style.css` / `css/style.min.css` — base du template dopefolio
- `css/custom.css` — sections ajoutées (IA, timeline, formation)
- `assets/js/` — rendu des données, filtres, modale, menu mobile
- `data/` — projets, compétences, contributions, témoignages, icônes
- `assets/` — images et portraits

## Déploiement

Site statique. Le `package.json` contient un script `build` volontairement vide
(`echo`) pour les hébergeurs qui exigent une commande de build. Le déploiement
actuel est sur Vercel.

## Crédits

Template [dopefolio](https://github.com/rammcodes/dopefolio) par Ram Maheshwari,
sous GPL-3.0. Contenu, structure et sections ajoutées : Maël Donnart.
