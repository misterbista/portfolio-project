"use client"

import React from 'react';
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
  SiTiktok,
  SiGithub,
  SiGitlab,
  SiDiscord,
  SiReddit,
  SiPinterest,
  SiSnapchat,
  SiWhatsapp,
  SiTelegram,
  SiThreads,
  SiBluesky,
  SiMastodon,
  SiTwitch,
  SiSpotify,
  SiSoundcloud,
  SiMedium,
  SiDevdotto,
  SiStackoverflow,
  SiDribbble,
  SiBehance,
  SiFlickr,
  SiTumblr,
  SiVk,
  SiVimeo,
  SiKick,
  SiPatreon,
  SiBuymeacoffee,
  SiKofi,
  SiQuora,
  SiGoodreads,
  SiLetterboxd,
  SiSteam,
  SiGoogle,
  SiApple,
  SiProducthunt,
  SiCodeforces,
  SiHackerrank,
  SiHashnode,
  SiGmail,
  SiMessenger,
  SiSignal,
  SiLine,
  SiWechat,
  SiBilibili,
  SiDouban,
  SiZhihu,
  SiOdnoklassniki,
  SiRss, SiPaypal,
} from '@icons-pack/react-simple-icons';

class SocialMediaIconConfig {
  names: string[];
  iconRenderer: (size: number) => React.ReactNode;
}

const socialMediaIconConfig: SocialMediaIconConfig[] = [
  {
    names: ['facebook', 'fb'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#1877F2] transition-all duration-200 ease-out hover:scale-110 hover:text-[#166FE5] active:scale-95">
        <SiFacebook size={size} />
      </span>
    ),
  },

  {
    names: ['instagram', 'ig'],
    iconRenderer: (size) => (
      <span
        className="inline-flex items-center justify-center cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-95"
        style={{
          color: '#E4405F',
        }}
      >
        <SiInstagram size={size} />
      </span>
    ),
  },

  {
    names: ['twitter', 'x', 'x.com'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-black transition-all duration-200 ease-out hover:scale-110 hover:text-neutral-600 active:scale-95">
        <SiX size={size} />
      </span>
    ),
  },

  {
    names: ['youtube', 'yt'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FF0000] transition-all duration-200 ease-out hover:scale-110 hover:text-[#CC0000] active:scale-95">
        <SiYoutube size={size} />
      </span>
    ),
  },

  {
    names: ['tiktok', 'tik tok'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#000000] transition-all duration-200 ease-out hover:scale-110 hover:text-[#FE2C55] active:scale-95">
        <SiTiktok size={size} />
      </span>
    ),
  },

  {
    names: ['threads'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-black transition-all duration-200 ease-out hover:scale-110 hover:text-neutral-600 active:scale-95">
        <SiThreads size={size} />
      </span>
    ),
  },

  {
    names: ['bluesky', 'bsky'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#1185FE] transition-all duration-200 ease-out hover:scale-110 hover:text-[#0066CC] active:scale-95">
        <SiBluesky size={size} />
      </span>
    ),
  },

  {
    names: ['mastodon'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#6364FF] transition-all duration-200 ease-out hover:scale-110 hover:text-[#4F50D8] active:scale-95">
        <SiMastodon size={size} />
      </span>
    ),
  },

  {
    names: ['reddit'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FF4500] transition-all duration-200 ease-out hover:scale-110 hover:text-[#D93F00] active:scale-95">
        <SiReddit size={size} />
      </span>
    ),
  },

  {
    names: ['pinterest', 'pin'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#E60023] transition-all duration-200 ease-out hover:scale-110 hover:text-[#BD081C] active:scale-95">
        <SiPinterest size={size} />
      </span>
    ),
  },

  {
    names: ['snapchat', 'snap'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FFFC00] transition-all duration-200 ease-out hover:scale-110 hover:text-[#CCC900] active:scale-95">
        <SiSnapchat size={size} />
      </span>
    ),
  },

  {
    names: ['whatsapp', 'wa'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#25D366] transition-all duration-200 ease-out hover:scale-110 hover:text-[#1DA851] active:scale-95">
        <SiWhatsapp size={size} />
      </span>
    ),
  },

  {
    names: ['telegram', 'tg'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#26A5E4] transition-all duration-200 ease-out hover:scale-110 hover:text-[#168AC1] active:scale-95">
        <SiTelegram size={size} />
      </span>
    ),
  },

  {
    names: ['discord'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#5865F2] transition-all duration-200 ease-out hover:scale-110 hover:text-[#4752C4] active:scale-95">
        <SiDiscord size={size} />
      </span>
    ),
  },

  {
    names: ['messenger', 'facebook messenger'],
    iconRenderer: (size) => (
      <span
        className="inline-flex items-center justify-center cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-95"
        style={{
          color: '#0084FF',
        }}
      >
        <SiMessenger size={size} />
      </span>
    ),
  },

  {
    names: ['signal'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#3A76F0] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiSignal size={size} />
      </span>
    ),
  },

  {
    names: ['line'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#00C300] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiLine size={size} />
      </span>
    ),
  },

  {
    names: ['wechat'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#07C160] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiWechat size={size} />
      </span>
    ),
  },

  {
    names: ['github', 'gh'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#181717] transition-all duration-200 ease-out hover:scale-110 hover:text-[#333333] active:scale-95">
        <SiGithub size={size} />
      </span>
    ),
  },

  {
    names: ['gitlab'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FC6D26] transition-all duration-200 ease-out hover:scale-110 hover:text-[#E24329] active:scale-95">
        <SiGitlab size={size} />
      </span>
    ),
  },

  {
    names: ['stackoverflow', 'stack overflow', 'so'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#F48024] transition-all duration-200 ease-out hover:scale-110 hover:text-[#D66F1C] active:scale-95">
        <SiStackoverflow size={size} />
      </span>
    ),
  },

  {
    names: ['dev.to', 'devto', 'dev'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-black transition-all duration-200 ease-out hover:scale-110 hover:text-neutral-600 active:scale-95">
        <SiDevdotto size={size} />
      </span>
    ),
  },

  {
    names: ['codeforces'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#1F8ACB] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiCodeforces size={size} />
      </span>
    ),
  },

  {
    names: ['hackerrank', 'hacker rank'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#00EA64] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiHackerrank size={size} />
      </span>
    ),
  },

  {
    names: ['hashnode'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#2962FF] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiHashnode size={size} />
      </span>
    ),
  },

  {
    names: ['twitch'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#9146FF] transition-all duration-200 ease-out hover:scale-110 hover:text-[#772CE8] active:scale-95">
        <SiTwitch size={size} />
      </span>
    ),
  },

  {
    names: ['kick'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#53FC18] transition-all duration-200 ease-out hover:scale-110 hover:text-[#3DD10D] active:scale-95">
        <SiKick size={size} />
      </span>
    ),
  },

  {
    names: ['spotify'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#1DB954] transition-all duration-200 ease-out hover:scale-110 hover:text-[#1AA34A] active:scale-95">
        <SiSpotify size={size} />
      </span>
    ),
  },

  {
    names: ['soundcloud'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FF5500] transition-all duration-200 ease-out hover:scale-110 hover:text-[#CC4400] active:scale-95">
        <SiSoundcloud size={size} />
      </span>
    ),
  },

  {
    names: ['vimeo'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#1AB7EA] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiVimeo size={size} />
      </span>
    ),
  },

  {
    names: ['bilibili'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#00AEEC] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiBilibili size={size} />
      </span>
    ),
  },

  {
    names: ['dribbble'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#EA4C89] transition-all duration-200 ease-out hover:scale-110 hover:text-[#C32361] active:scale-95">
        <SiDribbble size={size} />
      </span>
    ),
  },

  {
    names: ['behance'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#1769FF] transition-all duration-200 ease-out hover:scale-110 hover:text-[#0057FF] active:scale-95">
        <SiBehance size={size} />
      </span>
    ),
  },

  {
    names: ['flickr'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FF0084] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiFlickr size={size} />
      </span>
    ),
  },

  {
    names: ['tumblr'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#36465D] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiTumblr size={size} />
      </span>
    ),
  },

  {
    names: ['patreon'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FF424D] transition-all duration-200 ease-out hover:scale-110 hover:text-[#E23A44] active:scale-95">
        <SiPatreon size={size} />
      </span>
    ),
  },

  {
    names: ['buymeacoffee', 'buy me a coffee', 'bmac'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FFDD00] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiBuymeacoffee size={size} />
      </span>
    ),
  },

  {
    names: ['kofi', 'ko-fi'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#FF5E5B] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiKofi size={size} />
      </span>
    ),
  },

  {
    names: ['medium'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-black transition-all duration-200 ease-out hover:scale-110 hover:text-neutral-600 active:scale-95">
        <SiMedium size={size} />
      </span>
    ),
  },

  {
    names: ['quora'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#B92B27] transition-all duration-200 ease-out hover:scale-110 hover:text-[#8E211E] active:scale-95">
        <SiQuora size={size} />
      </span>
    ),
  },

  {
    names: ['goodreads'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#372213] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiGoodreads size={size} />
      </span>
    ),
  },

  {
    names: ['letterboxd'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#00E054] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiLetterboxd size={size} />
      </span>
    ),
  },

  {
    names: ['steam'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#171A21] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiSteam size={size} />
      </span>
    ),
  },

  {
    names: ['producthunt', 'product hunt', 'ph'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#DA552F] transition-all duration-200 ease-out hover:scale-110 hover:text-[#B64225] active:scale-95">
        <SiProducthunt size={size} />
      </span>
    ),
  },

  {
    names: ['vk', 'vkontakte'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#0077FF] transition-all duration-200 ease-out hover:scale-110 hover:text-[#0066DD] active:scale-95">
        <SiVk size={size} />
      </span>
    ),
  },

  {
    names: ['douban'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#00B51D] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiDouban size={size} />
      </span>
    ),
  },

  {
    names: ['zhihu'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#0084FF] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiZhihu size={size} />
      </span>
    ),
  },

  {
    names: ['odnoklassniki', 'ok.ru', 'ok'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#EE8208] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiOdnoklassniki size={size} />
      </span>
    ),
  },

  {
    names: ['google'],
    iconRenderer: (size) => (
      <span
        className="inline-flex items-center justify-center cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-95"
        style={{
          color: '#4285F4',
        }}
      >
        <SiGoogle size={size} />
      </span>
    ),
  },

  {
    names: ['apple', 'apple id'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-black transition-all duration-200 ease-out hover:scale-110 hover:text-neutral-600 active:scale-95">
        <SiApple size={size} />
      </span>
    ),
  },

  {
    names: ['gmail', 'google mail'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#EA4335] transition-all duration-200 ease-out hover:scale-110 active:scale-95">
        <SiGmail size={size} />
      </span>
    ),
  },

  {
    names: ['rss', 'feed', 'rss feed'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#F26522] transition-all duration-200 ease-out hover:scale-110 hover:text-[#D9541B] active:scale-95">
        <SiRss size={size} />
      </span>
    ),
  },

  {
    // will get back to it later
    names: ['linkedin', 'linkedin.com', 'in'],
    iconRenderer: (size) => (
      <>in</>
    ),
  },

  {
    names: ['paypal', 'paypal.me'],
    iconRenderer: (size) => (
      <span className="inline-flex items-center justify-center cursor-pointer text-[#003087] transition-all duration-200 ease-out hover:scale-110 hover:text-[#002060] active:scale-95">
        <SiPaypal size={size} />
      </span>
    ),
  }
];

function SocialLinks(
  {
    links,
    iconSize
  }: {
    links: { name: string, url: string }[],
    iconSize?: number;
  }
) {
  return (
    <div className={"flex flex-row gap-2 justify-center align-middle"}>
      {
        links.map((link, index) => {
          const config = socialMediaIconConfig.find(config => config.names.includes(link.name.toLowerCase()));
          if (!config) {
            return null;
          }
          return (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              {config.iconRenderer(iconSize || 24)}
            </a>
          );
        })
      }
    </div>
  );
}

export default SocialLinks;
