export const breakpoints = {
  //                 less then 320  |   1 column
  sm: 320, //   equal or over  320  |  4 columns
  m: 672, //    equal or over  672  |  8 columns
  l: 1056, //   equal or over 1055  | 16 columns
  xl: 1312, //  equal or over 1311  | 16 columns
  max: 1584, // equal or over 1583  | 16 columns
};

export const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | string) =>
    `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};
