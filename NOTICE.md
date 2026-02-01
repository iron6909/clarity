# NOTICE

## Clarity Hugo Theme

Copyright (C) 2026 iron6909

This theme is based on the Mainroad theme:
- Original: Mainroad (https://github.com/Vimux/Mainroad)
- Original Author: Vimux (https://github.com/vimux)
- Original License: GPLv2

## Modifications

This derivative work includes the following significant modifications from the original Mainroad theme:

### Added Features (2026-02-01)

1. **Dark Mode Support**
   - Added automatic dark mode via `prefers-color-scheme: dark` media query
   - Designed dark color palette using Zinc color scale
   - Ensured WCAG AA+ contrast compliance for all color combinations

2. **CSS Custom Properties**
   - Converted all hardcoded colors to CSS Custom Properties (CSS Variables)
   - Defined 19 CSS variables (17 colors + 2 fonts)
   - Replaced 100+ instances of hardcoded color values
   - Maintained compatibility with Hugo template variables

3. **Modernization**
   - Removed legacy vendor prefixes (-webkit-, -ms-, -o-) for Flexbox and Transform
   - Simplified placeholder pseudo-elements to standard `::placeholder`
   - Removed IE8 hacks and compatibility code
   - Added `color-scheme: light dark` declaration

4. **Documentation**
   - Updated README.md with dark mode information
   - Created README.zh-CN.md (Chinese translation)
   - Updated DESIGN-SYSTEM.md with CSS Custom Properties documentation
   - Created IMPLEMENTATION-REPORT.md with detailed change log

### Removed Features

1. **Legacy Browser Support**
   - Dropped support for IE8-11
   - Dropped support for Safari 6-8
   - Dropped support for old Opera versions
   - Updated minimum browser requirements to 2020+ versions

### Modified Files

- `assets/css/style.css` - Major refactoring with CSS Custom Properties
- `DESIGN-SYSTEM.md` - Complete rewrite
- `README.md` - Updated with new features
- `theme.toml` - Updated theme metadata

## License

This derivative work is released under the same GPLv2 license as the original Mainroad theme.

See LICENSE.md for the full license text.

## Acknowledgments

Special thanks to Vimux for creating the original Mainroad theme, which serves as the foundation for Clarity.
