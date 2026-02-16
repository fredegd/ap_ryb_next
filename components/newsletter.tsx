"use client"

import { useState, FormEvent } from "react"

export function Newsletter() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("loading")
        setMessage("")

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus("success")
                setMessage("Grazie! Ti sei iscritto con successo alla newsletter.")
                setEmail("")
            } else {
                setStatus("error")
                setMessage(data.error || "Si è verificato un errore. Riprova.")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Si è verificato un errore. Riprova.")
        }
    }

    return (
        <section className="bg-primary/10 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-cormorant-garamond font-medium text-foreground mb-6">Rimani Aggiornato</h2>
                <p className="text-lg font-onest text-foreground/70 mb-8">
                    Iscriviti alla newsletter per ricevere i nuovi articoli direttamente nella tua casella di posta.
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex gap-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="La tua email"
                            disabled={status === "loading"}
                            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-passion-one font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                        >
                            {status === "loading" ? "..." : "Iscriviti"}
                        </button>
                    </div>
                    {message && (
                        <p
                            className={`mt-4 text-sm ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    )
}
