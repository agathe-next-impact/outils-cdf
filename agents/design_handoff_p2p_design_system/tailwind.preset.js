/**
 * Tailwind preset for the Peer to Peer Design System.
 * Usage:  // tailwind.config.js
 *   module.exports = { presets: [require('./design_handoff_p2p_design_system/tailwind.preset.js')] }
 *
 * Colors map to CSS variables so light/dark switch with [data-theme] — set the
 * variables from design-system.css (or copy the :root blocks into your globals).
 * Toggle dark by setting <html data-theme="dark"> (darkMode: ['selector','[data-theme="dark"]']).
 */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:            'var(--bg)',
        surface:       'var(--surface)',
        'surface-2':   'var(--surface-2)',
        tint:          'var(--tint)',
        ink:           'var(--ink)',
        'ink-soft':    'var(--ink-soft)',
        'ink-faint':   'var(--ink-faint)',
        line:          'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent:        'var(--accent)',
        'accent-deep': 'var(--accent-deep)',
        'accent-soft': 'var(--accent-soft)',
        'on-accent':   'var(--on-accent)',
        'hero-bg':     'var(--hero-bg)',
        'hero-ink':    'var(--hero-ink)',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body:    ['Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Geometry = "Net" (sharp)
        DEFAULT: '5px',
        sm:      '4px',
        box:     '5px',
        chip:    '4px',
      },
      borderWidth: { hairline: '1px' },
      transitionTimingFunction: { ds: 'cubic-bezier(.2,.6,.2,1)' },
    },
  },
};
