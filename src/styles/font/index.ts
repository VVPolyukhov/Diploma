import localFont from 'next/font/local';

export const font = localFont({
  src: [
    {
      path: './Onest-Thin.woff',
      weight: '100',
    },
    {
      path: './Onest-Light.woff',
      weight: '300',
    },
    {
      path: './Onest-Regular.woff',
      weight: '400',
    },
    {
      path: './Onest-Medium.woff',
      weight: '500',
    },
    {
      path: './Onest-Bold.woff',
      weight: '700',
    },
    {
      path: './Onest-ExtraBold.woff',
      weight: '800',
    },
    {
      path: './Onest-Black.woff',
      weight: '900',
    },
  ],
});
