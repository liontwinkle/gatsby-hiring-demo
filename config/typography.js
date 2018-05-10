import Typography from 'typography';
import deYoungTheme from 'typography-theme-de-young'

// const typography = new Typography({
//   title: 'Sektor909',
//   baseFontSize: '18px',
//   baseLineHeight: 1.45,
//   headerFontFamily: ['Montserrat', 'sans-serif'],
//   bodyFontFamily: ['Istok Web', 'sans-serif'],
//   scaleRatio: 2.441,
//   headerWeight: 700,
//   googleFonts: [
//     {
//       name: 'Montserrat',
//       styles: ['700', '400'],
//     },
//     {
//       name: 'Istok Web',
//       styles: ['400', 'cyrillic',],
//     },
//   ],
//   overrideStyles: () => ({
//     img: {
//       marginBottom: 0,
//     },
//   }),
// });
const typography = new Typography(deYoungTheme)
export default typography;
