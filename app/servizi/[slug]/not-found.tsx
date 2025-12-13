import Link from "next/link"
import { Footer } from "@/components/footer"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold text-primary mb-6">404 - Servizio Non Trovato</h1>
                        <p className="text-lg text-foreground/70 mb-8">
                            Mi dispiace, il servizio che stai cercando non esiste.
                        </p>
                        <Link href="/servizi">
                            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                                Torna ai Servizi
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
