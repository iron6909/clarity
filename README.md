# Clarity

English | [简体中文](README.zh-CN.md)

**Clarity** is a modern, responsive, clean and content-focused [Hugo](https://gohugo.io/) theme with automatic dark mode support and CSS Custom Properties.

> **Based on [Mainroad](https://github.com/Vimux/Mainroad)** by [Vimux](https://github.com/vimux)
> Clarity is a modernized fork that adds dark mode support, CSS Custom Properties, and removes legacy browser support.

**[Demo](https://iron6909.github.io/clarity/)** • **[Docs](https://iron6909.github.io/clarity/docs/)**

![screenshot](https://raw.githubusercontent.com/iron6909/clarity/main/images/screenshot.png)

**Features:**

+ Responsive design
+ **Automatic dark mode** support via `prefers-color-scheme`
+ **CSS Custom Properties** for runtime theme customization
+ Main & secondary menus
+ Widgetized sidebar
+ Translations. Over 15 languages and counting
+ Configurable theme settings (sidebar position, author box, post navigation, highlight color) via `config.toml`
+ Hugo internal templates (Open Graph, Schema, Twitter Cards, Disqus, Google Analytics)
+ Modern browser compatibility
  + *Desktop: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+*
  + *Mobile: Modern Android browsers, Safari (iOS 14+), Chrome Mobile*
+ Custom Google Fonts support, MathJax, Table of Contents, SVG icons and much more…

## Installation

*Before starting, please be sure that you have
[installed Hugo](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) and
[created a new site](https://gohugo.io/getting-started/quick-start/#step-2-create-a-new-site). After that, you are ready
to install **Clarity**.*

From your project's root directory, run:

```bash
git clone https://github.com/iron6909/clarity.git themes/clarity
```

Or, if you don't plan to make any significant changes but want to track and update the theme, you can add it as a git
submodule via the following command:

```bash
git submodule add https://github.com/iron6909/clarity.git themes/clarity
```

Next, open `config.toml` in the base of the Hugo site and ensure the theme option is set to `clarity`:

```toml
theme = "clarity"
```

## Configuration

### Config.toml example

```toml
baseurl = "/"
title = "Clarity"
languageCode = "en-us"
paginate = "10" # Number of posts per page
theme = "clarity"
disqusShortname = "" # DEPRECATED! Use .Services.Disqus.Shortname
googleAnalytics = "" # DEPRECATED! Use .Services.googleAnalytics.ID

[services.disqus]
  shortname = "" # Enable Disqus by entering your Disqus shortname
[services.googleAnalytics]
  ID = "" # Enable Google Analytics by entering your tracking ID

[Author] # Used in authorbox
  name = "John Doe"
  bio = "John Doe's true identity is unknown. Maybe he is a successful blogger or writer. Nobody knows it."
  avatar = "img/avatar.png"

[Params]
  description = "John Doe's Personal blog about everything" # Site description. Used in meta description
  copyright = "John Doe" # Footer copyright holder, otherwise will use site title
  opengraph = true # Enable OpenGraph if true
  schema = true # Enable Schema
  twitter_cards = true # Enable Twitter Cards if true
  readmore = false # Show "Read more" button in list if true
  authorbox = true # Show authorbox at bottom of pages if true
  toc = true # Enable Table of Contents
  pager = true # Show pager navigation (prev/next links) at the bottom of pages if true
  post_meta = ["author", "date", "categories", "translations"] # Order of post meta information
  mainSections = ["post", "blog", "news"] # Specify section pages to show on home page and the "Recent articles" widget
  dateformat = "2006-01-02" # Change the format of dates
  mathjax = true # Enable MathJax
  mathjaxPath = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js" # Specify MathJax path
  mathjaxConfig = "TeX-AMS-MML_HTMLorMML" # Specify MathJax config
  googleFontsLink = "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" # Load Google Fonts
  customCSS = ["css/custom.css"] # Include custom CSS files
  customJS = ["js/custom.js"] # Include custom JS files

  # DEPRECATED PARAMS
  subtitle = "" # Deprecated in favor of .Site.Params.logo.subtitle
  highlightColor = "" # Deprecated in favor of .Site.Params.style.vars.highlightColor

[Params.style.vars]
  highlightColor = "#2563EB" # Override highlight color (default: #2563EB)

  # Override font-family sets
  # Take care of different quotes OR escaping symbols in these params if necessary
  fontFamilyPrimary = "'Open Sans', Helvetica, Arial, sans-serif"
  # Secondary font-family set responsible for pre, code, kbd, and samp tags font
  fontFamilySecondary = "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"

[Params.logo]
  image = "img/placeholder.png" # Logo image. Path relative to "static"
  title = "Clarity" # Logo title, otherwise will use site title
  subtitle = "Just another site" # Logo subtitle

[Params.thumbnail]
  visibility = ["list", "post"] # Control thumbnail visibility

[Params.sidebar]
  home = "right" # Configure layout for home page
  list = "left"  # Configure layout for list pages
  single = false # Configure layout for single pages
  # Enable widgets in given order
  widgets = ["search", "recent", "categories", "taglist", "social", "languages"]

[Params.widgets]
  recent_num = 5 # Set the number of articles in the "Recent articles" widget
  categories_counter = false # Enable counter for each category in "Categories" widget
  tags_counter = false # Enable counter for each tag in "Tags" widget

[Params.widgets.social]
  cached = false # activate cache if true
  # Enable parts of social widget
  facebook = "username"
  twitter = "username"
  instagram = "username"
  linkedin = "username"
  telegram = "username"
  github = "username"
  gitlab = "username"
  bitbucket = "username"
  email = "example@example.com"

# Custom social links
[[Params.widgets.social.custom]]
  title = "Youtube"
  url = "https://youtube.com/user/username"
  icon = "youtube.svg" # Optional. Path relative to "layouts/partials"
  rel = "noopener noreferrer" # Set to false to remove the rel attribute

[[Params.widgets.social.custom]]
  title = "My Home Page"
  url = "https://example.com"

[Params.widgets.search]
  cached = false # activate cache if true
  url = "https://google.com/search"
  [Params.widgets.search.input]
    name = "sitesearch"
    pre = ""
```

**Do not copy example config as-is**. Use only those parameters that you need.

For more information about all available standard configuration settings, please read
[All Hugo Configuration Settings](https://gohugo.io/getting-started/configuration/#all-configuration-settings).

### Front Matter example

```yaml
---
# Common-Defined params
title: "Example article title"
date: "2017-08-21"
description: "Example article description"
categories:
  - "Category 1"
  - "Category 2"
tags:
  - "Test"
  - "Another test"
menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/placeholder.png" # Thumbnail image
lead: "Example lead - highlighted near the title" # Lead text
comments: false # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: true # Enable Table of Contents for specific page
mathjax: true # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
widgets: # Enable sidebar widgets in given order per page
  - "search"
  - "recent"
  - "taglist"
---
```

For more information about all available standard front matter variables, please read
[Hugo Front Matter](https://gohugo.io/content-management/front-matter).

## Dark Mode

The theme automatically supports system-level dark mode preferences. When a user's operating system is set to dark mode, the website will automatically switch to a dark color scheme.

Dark mode uses a carefully designed color palette that ensures:
- WCAG AA+ contrast ratio compliance
- Maintains the same visual hierarchy as light mode
- Accent colors remain readable on dark backgrounds

All colors are defined using CSS Custom Properties, providing a foundation for future runtime theme switching capabilities.

## Documentation

For detailed documentation, please visit the [`docs/`](docs/) directory:

- **[Quick Start Guide](docs/QUICK-START.md)** - Get started in 5 minutes
- **[Publishing Guide](docs/PUBLISHING-GUIDE.md)** - Complete guide to publishing your theme
- **[Release Checklist](docs/RELEASE-CHECKLIST.md)** - Pre-release checklist
- **[Design System](docs/DESIGN-SYSTEM.md)** - Design principles and customization guide

## Credits

Clarity is based on the [Mainroad](https://github.com/Vimux/Mainroad) theme by [Vimux](https://github.com/vimux).

### Major Changes from Mainroad

- ✨ Added automatic dark mode support via `prefers-color-scheme`
- 🎨 Converted all colors to CSS Custom Properties
- 🚀 Removed legacy browser support (IE8-11, Safari 6-8)
- 🧹 Removed outdated vendor prefixes (-webkit-, -ms-, -o-)
- 📱 Updated browser support to modern browsers (2020+)
- 🎯 Modernized CSS with standard properties

## Contributing

Have you found a bug or got an idea for a new feature? Feel free to use the
[issue tracker](https://github.com/iron6909/clarity/issues) to let me know. Or make directly a
[pull request](https://github.com/iron6909/clarity/pulls).

## License

This theme is released under the [GPLv2 license](https://github.com/iron6909/clarity/blob/master/LICENSE.md).

Original Mainroad theme: Copyright (C) Vimux - [GPLv2 license](https://github.com/Vimux/Mainroad/blob/master/LICENSE.md)
