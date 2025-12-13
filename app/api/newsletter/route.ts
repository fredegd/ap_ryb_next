import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validierung
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    // Studio Email-Adresse aus Environment Variable
    const studioEmail = process.env.STUDIO_EMAIL || "your-studio@example.com";

    // Email an Studio senden
    await resend.emails.send({
      from: "Newsletter <onboarding@resend.dev>", // Resend Demo-Adresse
      to: studioEmail,
      subject: "Nuovo iscritto alla newsletter",
      html: `
                <h2>Nuova iscrizione alla newsletter</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString(
                  "it-IT"
                )}</p>
                <br/>
                <p>Ora é il momento di aggiungere il nuovo iscritto alla tua lista!</p>
                <br/>
            `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Errore durante l'iscrizione" },
      { status: 500 }
    );
  }
}
