require('dotenv').config();

const colors = {
  charcoal: 0x111827,
  red: 0xef4444,
  gold: 0xf59e0b,
  green: 0x22c55e,
  gray: 0x9ca3af,
};

const hearts = {
  defaultHealth: 10,
  maxHealthCap: 15,
  startingExtraCirculation: 20,
  startingPrice: 2500,
  minimumResale: 2000,
};

const ghost = {
  maxBuybacksPerSeason: 3,
  buyback1: 5000,
  buyback2: 10000,
  buyback3: 20000,
  livesPerBuyback: 1,
  headReclaimCostMvp: 0,
};

const market = {
  starterCoins: 250,
  listingFee: 25,
  saleTaxPercent: 5,
  maxListingsPerPlayer: 5,
  extraListingSlot: 500,
};

const heads = {
  commonQuickSell: 250,
  rareQuickSell: 750,
  legendaryQuickSell: 1750,
  commonMarketMin: 500,
  commonMarketMax: 1000,
  rareMarketMin: 1250,
  rareMarketMax: 2500,
  legendaryMarketMin: 3000,
  legendaryMarketMax: 7500,
  ownCommonMinListing: 1000,
  ownRareMinListing: 2500,
  ownLegendaryCanSell: false,
};

const teams = {
  create: 1500,
  maxSize: 3,
  home: 1000,
  vault: 2500,
  warDeclaration: 2500,
};

const bounties = {
  minimum: 500,
  postingFeePercent: 10,
  anonymousFeePercent: 20,
};

const peace = {
  hours24: 500,
  hours72: 1200,
  days7: 2500,
  breakPenalty: 2500,
};

const outlaw = {
  clearFine1: 2500,
  clearFine2: 5000,
  clearFine3: 10000,
  marketTaxPercent: 10,
};

const serverShop = {
  bread16: 100,
  cookedBeef16: 250,
  torch32: 75,
  shield: 300,
  ironPickaxe: 300,
  ironSword: 350,
  bow: 300,
  arrows32: 150,
  fullIronSet: 1250,
  diamondSword: 1500,
  diamondPickaxe: 1750,
  fullDiamondSet: 5500,
};

const resourceSell = {
  coal: 1,
  copperIngot: 2,
  ironIngot: 3,
  redstoneDust: 2,
  lapisLazuli: 3,
  goldIngot: 8,
  diamond: 60,
  emerald: 75,
  ancientDebris: 200,
  netheriteScrap: 250,
  netheriteIngot: 1000,
  rottenFlesh: 1,
  bone: 2,
  string: 2,
  gunpowder: 8,
  enderPearl: 25,
  blazeRod: 35,
  ghastTear: 100,
  wheat: 1,
  carrot: 1,
  potato: 1,
  sugarCane: 1,
  pumpkin: 5,
  melon: 5,
};

const specialItems = {
  deathCompass: 750,
  headTracker: 2500,
  bountyTracker: 3000,
  extraMarketSlot: 500,
  supplyDropKey: 1500,
  nameColorCosmetic: 1000,
  particleCosmetic: 2500,
};

/** @deprecated use market/heads/ghost — kept for older embed references */
const prices = {
  starterCoins: market.starterCoins,
  teamCreation: teams.create,
  bountyMinimum: bounties.minimum,
  marketTaxPercent: market.saleTaxPercent,
  commonHeadQuickSell: heads.commonQuickSell,
  rareHeadQuickSell: heads.rareQuickSell,
  legendaryHeadQuickSell: heads.legendaryQuickSell,
  commonHeadMarketMin: heads.commonMarketMin,
  commonHeadMarketMax: heads.commonMarketMax,
  rareHeadMarketMin: heads.rareMarketMin,
  rareHeadMarketMax: heads.rareMarketMax,
  legendaryHeadMarketMin: heads.legendaryMarketMin,
  legendaryHeadMarketMax: heads.legendaryMarketMax,
};

const roles = [
  { name: 'Owner', color: 0x8b0000, hoist: true },
  { name: 'Admin', color: 0xef4444, hoist: true },
  { name: 'Moderator', color: 0x3b82f6, hoist: true },
  { name: 'Developer', color: 0xa855f7, hoist: true },
  { name: 'HeadHunt Staff', color: 0xf59e0b, hoist: true },
  { name: 'Player', color: 0x22c55e, hoist: false },
  { name: 'Team Leader', color: 0x06b6d4, hoist: true },
  { name: 'Outlaw', color: 0x6b7280, hoist: true },
  { name: 'Bounty Hunter', color: 0xf97316, hoist: true },
  { name: 'Eliminated', color: 0x9ca3af, hoist: true },
  { name: 'Verified', color: 0x22c55e, hoist: false },
];

const staffRoleNames = ['Owner', 'Admin', 'Moderator', 'Developer', 'HeadHunt Staff'];

const joinRoleId = process.env.JOIN_ROLE_ID || '1523436417148260512';
const fullAccessRoleNames = ['Player'];

const categories = [
  {
    name: 'PRE-SERVER',
    channels: [
      { name: 'server-preview', type: 'text' },
      { name: 'community-chat', type: 'text' },
      { name: 'launch-updates', type: 'text' },
    ],
  },
  {
    name: 'START HERE',
    channels: [
      { name: 'welcome', type: 'text' },
      { name: 'announcements', type: 'text' },
    ],
  },
  {
    name: 'SERVER BASICS',
    channels: [
      { name: 'what-is-headhunt', type: 'text' },
      { name: 'quick-rules', type: 'text' },
      { name: 'lives-heads-hearts', type: 'text' },
      { name: 'market-teams-bounties', type: 'text' },
      { name: 'how-to-start', type: 'text' },
    ],
  },
  {
    name: 'ECONOMY',
    channels: [
      { name: 'ghost-buyback', type: 'text' },
      { name: 'head-reclaiming', type: 'text' },
      { name: 'market-prices', type: 'text' },
      { name: 'hearts-pricing', type: 'text' },
      { name: 'head-pricing', type: 'text' },
      { name: 'team-pricing', type: 'text' },
      { name: 'bounty-pricing', type: 'text' },
      { name: 'server-shop', type: 'text' },
      { name: 'resource-prices', type: 'text' },
    ],
  },
];

const legacyCategories = [
  'HEADHUNT SYSTEM',
  'BOUNTIES',
  'TEAMS',
  'SURVIVAL',
  'SUPPORT',
  'VOICE',
  'STAFF ONLY',
];

const legacyChannels = [
  'server-info',
  'rules',
  'how-to-join',
  'faq',
  'lives-system',
  'head-rarities',
  'hearts-system',
  'death-rules',
  'eliminated-players',
  'economy-info',
  'market-info',
  'player-market',
  'price-guide',
  'coin-guide',
  'trade-logs',
  'bounty-board',
  'place-bounties',
  'bounty-rules',
  'completed-bounties',
  'team-info',
  'create-a-team',
  'team-recruitment',
  'team-list',
  'team-wars',
  'survival-chat',
  'base-showcase',
  'coords-and-travel',
  'questions',
  'suggestions',
  'create-ticket',
  'report-player',
  'appeal-elimination',
  'bug-reports',
  'General VC',
  'Team VC 1',
  'Team VC 2',
  'Team VC 3',
  'Staff VC',
  'staff-chat',
  'staff-logs',
  'punishment-logs',
  'market-admin',
  'bot-commands',
];

const newcomerVisibleChannels = categories.flatMap((category) =>
  category.channels.filter((ch) => ch.type === 'text').map((ch) => ch.name)
);

const preServerChatChannels = ['community-chat'];

/** @type {Record<string, 'info' | 'pre-info' | 'pre-chat'>} */
const channelPermissions = {
  'server-preview': 'pre-info',
  'community-chat': 'pre-chat',
  'launch-updates': 'pre-info',
  welcome: 'info',
  announcements: 'info',
  'what-is-headhunt': 'info',
  'quick-rules': 'info',
  'lives-heads-hearts': 'info',
  'market-teams-bounties': 'info',
  'how-to-start': 'info',
  'ghost-buyback': 'info',
  'head-reclaiming': 'info',
  'market-prices': 'info',
  'hearts-pricing': 'info',
  'head-pricing': 'info',
  'team-pricing': 'info',
  'bounty-pricing': 'info',
  'server-shop': 'info',
  'resource-prices': 'info',
};

const embedChannels = {
  preServer: 'server-preview',
  welcome: 'welcome',
  announcements: 'announcements',
  whatIsHeadhunt: 'what-is-headhunt',
  quickRules: 'quick-rules',
  livesHeadsHearts: 'lives-heads-hearts',
  marketTeamsBounties: 'market-teams-bounties',
  howToStart: 'how-to-start',
  ghostBuyback: 'ghost-buyback',
  headReclaiming: 'head-reclaiming',
  marketPrices: 'market-prices',
  heartsPricing: 'hearts-pricing',
  headPricing: 'head-pricing',
  teamPricing: 'team-pricing',
  bountyPricing: 'bounty-pricing',
  serverShop: 'server-shop',
  resourcePrices: 'resource-prices',
};

module.exports = {
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.GUILD_ID,
  clientId: process.env.CLIENT_ID,
  serverIp: process.env.SERVER_IP || 'Put server IP here',
  serverPort: process.env.SERVER_PORT || '19132',
  colors,
  hearts,
  ghost,
  market,
  heads,
  teams,
  bounties,
  peace,
  outlaw,
  serverShop,
  resourceSell,
  specialItems,
  prices,
  roles,
  staffRoleNames,
  joinRoleId,
  fullAccessRoleNames,
  newcomerVisibleChannels,
  preServerChatChannels,
  channelPermissions,
  categories,
  legacyCategories,
  legacyChannels,
  embedChannels,
};
