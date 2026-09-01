import localFont from 'next/font/local';

export const overusedGrotesk = localFont({
  src: [
    {
      path: './OverusedGrotesk-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './OverusedGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './OverusedGrotesk-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-overused',
  display: 'swap',
});
