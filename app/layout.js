
export const metadata = {
  title: "Suarez IA Dashboard",
  description: "Panel interno"
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ background:"#0f172a", color:"white", fontFamily:"Arial", margin:0 }}>
        {children}
      </body>
    </html>
  )
}
