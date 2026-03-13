import Image from "next/image";

interface Props {
  settings: Record<string, string>;
}

export default function FooterBlock({ settings }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          {settings.site_logo ? (
            <Image
              src={settings.site_logo}
              alt={settings.site_name || "Annisa Dalimunthe"}
              width={160}
              height={56}
              className="h-14 w-auto object-contain brightness-0 invert opacity-90"
              unoptimized
            />
          ) : (
            <>
              <span className="text-xl">👑</span>
              <span className="font-bold text-white">{settings.site_name || "Precious Annisa"}</span>
            </>
          )}
        </div>
        <p className="text-sm mb-4">{settings.site_tagline}</p>
        <div className="flex justify-center gap-4 mb-4">
          {settings.instagram_url && (
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              Instagram
            </a>
          )}
          {settings.youtube_url && settings.youtube_url !== "#" && (
            <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
              YouTube
            </a>
          )}
        </div>
        <p className="text-xs text-gray-500">
          &copy; {year} {settings.site_name || "Precious Annisa"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
