import './globals.css'

export const metadata = {
  title: 'Olymptrade X Fintrix',
  description: 'Mock Trading Competition',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="bg-black">
      <body>{children}</body>
    </html>
  )
}
