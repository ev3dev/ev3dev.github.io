Notes for site maintenance
===

Document with notes on the structure and maintenance of this site.

Bootstrap, Bootswatch, and styling
---
- Built on Twitter Bootstrap
- Styling based on Bootswatch's "Darkly" theme
- Custom modifications to defaults from Bootstrap and Bootswatch are stored in `/_sass/_custom-variables.scss` and `/stylesheets/bootstrap.scss`
- Jekyll builds Bootstrap, Bootswatch and custom modifications manually on every build. We don't use a pre-built release CSS file.
- Bootstrap and Bootswatch files are spread across 3 different directories. In all cases, the files are unmodified from the versions found in official releases.
  - `/_sass/`
    - `/_sass/bootstrap/`: Core Bootstrap Sass styles. New copies can be found in official releases under `bootstrap-sass-<version>.zip/bootstrap-sass-<version>/assets/stylesheets/`.
    - `/_sass/_bootswatch.scss`: Bootswatch's functional changes to Bootstrap styling. Can be found on the Bootswatch website or GitHub repo.
    - `/_sass/_variables.scss`: Bootswatch's coloring and other visual styles. Can be found on the Bootswatch website or GitHub repo.
  - `/javascripts/bootstrap/`: Bootstrap JavaScript helpers. Found in `bootstrap-sass-<version>.zip/bootstrap-sass-<version>/assets/javascripts/`.
  - `/fonts/bootstrap`: Bootstrap font files. Found in `bootstrap-sass-<version>.zip/bootstrap-sass-<version>/assets/fonts/bootstrap`.
- File structure here is different from Bootstrap's `assets` directory because we need to have a separate `sass_dir` that contains all our partials.
- If updating to a new version of any of these dependencies, make sure that no variable names have changed -- we override some key variables.
- Always upgrade all of the Bootstrap files and all of the Bootswatch files at the same time, and keep their versions matching.
