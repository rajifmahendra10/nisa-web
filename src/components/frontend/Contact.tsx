interface Props {
  settings: Record<string, string>;
}

export default function ContactBlock({ settings }: Props) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
          Get In Touch 💌
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Let&apos;s Create Something Amazing!
        </h2>
        <p className="text-white/80 mb-8 max-w-lg mx-auto">
          For collaborations, bookings, and business inquiries, reach out to our management team.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {settings.contact_email && (
            <a
              href={`mailto:${settings.contact_email}`}
              className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-colors shadow-lg"
            >
              📧 {settings.contact_email}
            </a>
          )}
          {settings.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              📸 Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
