import { Instrument_Sans } from 'next/font/google'

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
})


export const fonts = `${instrumentSans.variable}`
