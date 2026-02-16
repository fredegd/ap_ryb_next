import { Mail, Phone, Instagram, Facebook, Twitter, Linkedin, Github } from 'lucide-react'
import { getAuthorContactDetails } from "@/lib/contentful"

const SOCIAL_ICONS: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
}

export async function Footer() {
  const authorId = process.env.AUTHOR_ENTRY_ID
  const author = authorId ? await getAuthorContactDetails(authorId) : null

  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16">
      <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-passion-one font-normal text-xl mb-4 uppercase tracking-wide">Reset Your Body</h3>
            <p className="font-onest text-primary-foreground/80">Professional wellness and therapeutic services</p>
          </div>

          <div>
            <h4 className="font-cormorant-garamond font-medium text-lg mb-4">Servizi</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="/servizi/#massoterapia" className="hover:text-primary-foreground transition-colors">
                  Massoterapia
                </a>
              </li>
              <li>
                <a href="/servizi/#chinesiologia" className="hover:text-primary-foreground transition-colors">
                  Chinesiologia
                </a>
              </li>
              <li>
                <a href="/servizi/#sport" className="hover:text-primary-foreground transition-colors">
                  Personal Training
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant-garamond font-medium text-lg mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {author?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${author.email}`}>
                    <span>{author.email}</span>
                  </a>
                </li>
              )}
              {author?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${author.phone}`}>
                    <span>{author.phone}</span>
                  </a>
                </li>
              )}

              {author?.socialLinks && Object.entries(author.socialLinks).map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform.toLowerCase()] || Instagram
                // formatting the handle for display (e.g. from https://instagram.com/user -> @user)
                // simpler approach: just show the platform name or "Follow us" content?
                // The design showed "@massoterapista_paradise".
                // I'll try to extract the handle if possible or just show the platform name if not.
                // Actually the previous code had specific text. Let's start with just linking the icon + platform name if we can't parse easily.
                // Or better, for now just show the URL or a generic text if we can't extract the handle. 
                // Let's assume the value in Contentful is a full URL.

                // If it's instagram, let's try to extract handle.
                let displayText = platform
                if (url.includes('instagram.com/')) {
                  const parts = url.split('instagram.com/')
                  if (parts[1]) displayText = '@' + parts[1].replace(/\/$/, '')
                } else {
                  displayText = platform.charAt(0).toUpperCase() + platform.slice(1)
                }

                return (
                  <li key={platform} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <a href={url} target='_blank' rel="noopener noreferrer">
                      <span>{displayText}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Massoterapista Paradise. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
