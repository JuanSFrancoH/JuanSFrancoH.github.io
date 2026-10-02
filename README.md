# Juan Franco | Portfolio

Personal portfolio built with [Quarto](https://quarto.org) and published with GitHub Pages.

**Live site:** https://juansfrancoh.github.io

## Pages

- **About**: background, experience, education and skills
- **Projects**: academic and work projects with detail pages and category filters
- **CV**: summary and downloadable PDF
- **Contact**: email, LinkedIn and GitHub

## Build locally

```bash
quarto render      # builds the site into _site/
quarto preview     # live preview while editing
```

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/`, which
publishes the prebuilt `_site` folder to the `gh-pages` branch.

The version of this site submitted for AD688 Assignment 1 is preserved at the
[`a1-submission`](https://github.com/JuanSFrancoH/JuanSFrancoH.github.io/tree/a1-submission) tag.
