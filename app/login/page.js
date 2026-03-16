
"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/"
    })

    if (!result?.error) {
      window.location.href = "/"
    }
  }

  return (
    <main style={{ padding:40 }}>
      <h1>Login Suárez IA</h1>

      <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:320 }}>
        <input placeholder="Usuario" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </main>
  )
}
