
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../lib/auth";

async function getApiStatus() {
  try {
    const res = await fetch("https://api.suarezia.com", { cache: "no-store" })
    if (!res.ok) throw new Error("API error")
    return await res.json()
  } catch {
    return { status: "API no disponible" }
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const api = await getApiStatus()

  return (
    <main style={{ padding: 32 }}>
      <h1>Suárez IA · Dashboard</h1>
      <p>Panel interno inicial de la agencia.</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, minmax(220px,1fr))", gap:16, marginTop:24 }}>
        <div style={{ background:"#151b2e", padding:20, borderRadius:12 }}>
          <h3>API</h3>
          <p>{api.status}</p>
        </div>

        <div style={{ background:"#151b2e", padding:20, borderRadius:12 }}>
          <h3>n8n</h3>
          <a href="https://n8n.suarezia.com" target="_blank">Abrir n8n</a>
        </div>

        <div style={{ background:"#151b2e", padding:20, borderRadius:12 }}>
          <h3>Clientes</h3>
          <p>0 clientes cargados</p>
        </div>

        <div style={{ background:"#151b2e", padding:20, borderRadius:12 }}>
          <h3>Automatizaciones</h3>
          <p>0 workflows conectados</p>
        </div>
      </div>
    </main>
  )
}
