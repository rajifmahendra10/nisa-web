import { getFirst } from "@/lib/data";
import {
  getSettings,
  getActiveTalents,
  getActivePortfolios,
  getActiveMusic,
  getActiveMediaCoverages,
  getActiveGallery,
  getStatsRibbon,
  getInstagramStats,
} from "@/lib/data";
import { HeroSection, AboutSection, Talent, Portfolio, Music, MediaCoverage, GalleryItem, StatsRibbon, InstagramStat } from "@/lib/types";
import HeroBlock from "@/components/frontend/Hero";
import AboutBlock from "@/components/frontend/About";
import TalentsBlock from "@/components/frontend/Talents";
import StatsRibbonBlock from "@/components/frontend/StatsRibbon";
import PortfolioBlock from "@/components/frontend/Portfolio";
import MusicBlock from "@/components/frontend/Music";
import InstagramBlock from "@/components/frontend/Instagram";
import MediaBlock from "@/components/frontend/MediaCoverage";
import GalleryBlock from "@/components/frontend/Gallery";
import ContactBlock from "@/components/frontend/Contact";
import FooterBlock from "@/components/frontend/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, about, settings, talents, portfolios, musicList, mediaCoverages, gallery, statsRibbon, instagramStats] = await Promise.all([
    getFirst<HeroSection>("hero_section"),
    getFirst<AboutSection>("about_section"),
    getSettings(),
    getActiveTalents() as Promise<Talent[]>,
    getActivePortfolios() as Promise<Portfolio[]>,
    getActiveMusic() as Promise<Music[]>,
    getActiveMediaCoverages() as Promise<MediaCoverage[]>,
    getActiveGallery() as Promise<GalleryItem[]>,
    getStatsRibbon() as Promise<StatsRibbon[]>,
    getInstagramStats() as Promise<InstagramStat[]>,
  ]);

  return (
    <div className="bg-white min-h-screen">
      <HeroBlock data={hero} settings={settings} />
      <AboutBlock data={about} />
      <TalentsBlock talents={talents} />
      <StatsRibbonBlock stats={statsRibbon} />
      <PortfolioBlock portfolios={portfolios} />
      <MusicBlock music={musicList} />
      <InstagramBlock stats={instagramStats} />
      <MediaBlock coverages={mediaCoverages} />
      <GalleryBlock items={gallery} />
      <ContactBlock settings={settings} />
      <FooterBlock settings={settings} />
    </div>
  );
}
