import Typography from 'typography'

const typography = new Typography({
  title: 'Sektor909',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Montserrat', 'sans-serif'],
  bodyFontFamily: ['Istok Web', 'sans-serif'],
  scaleRatio: 2.441,
  headerWeight: 700,
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['700', '400'],
    },
    {
      name: 'Istok Web',
      styles: ['400', 'cyrillic'],
    },
  ],
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
  }),
})
const { rhythm, scale } = typography
export { rhythm, scale, typography as default }
