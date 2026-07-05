const { EmbedBuilder } = require('discord.js');
const {
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
} = require('../config');

function coin(amount) {
  return `**${amount.toLocaleString()}** coins`;
}

function ghostBuybackEmbed() {
  return new EmbedBuilder()
    .setTitle('Ghost Buyback')
    .setDescription(
      'When a player loses all **3 lives**, they become a **Ghost** — eliminated from normal survival.\n\n' +
        'Ghosts can **buy back** into the server using coins. Each buyback returns you with **1 life** only.'
    )
    .addFields(
      { name: '👻 What Is a Ghost?', value: 'You are fully dead and cannot play normal survival until you buy back.' },
      {
        name: '💰 Buyback Prices',
        value:
          `**1st buyback:** ${coin(ghost.buyback1)}\n` +
          `**2nd buyback:** ${coin(ghost.buyback2)}\n` +
          `**3rd buyback:** ${coin(ghost.buyback3)}`,
      },
      { name: '📅 Season Limit', value: `**${ghost.maxBuybacksPerSeason}** ghost buybacks per player per season.` },
      { name: '❤️ Lives Returned', value: `Each buyback gives **${ghost.livesPerBuyback} life** only.` },
      {
        name: '🗡️ Your Heads',
        value: 'Buyback does **not** return your heads. Your Common, Rare, and Legendary heads stay wherever they are — held by players, on the market, in bases, or lost in the world.',
      },
      {
        name: '🔄 After Buyback',
        value: 'Once alive again, you can steal, buy, trade for, or recover your own heads. See **#head-reclaiming**.',
      }
    )
    .setColor(colors.red)
    .setFooter({ text: 'Ghosts cannot reclaim heads until they buy back and become alive again.' })
    .setTimestamp();
}

function headReclaimingEmbed() {
  return new EmbedBuilder()
    .setTitle('Head Reclaiming')
    .setDescription(
      'After buying back from Ghost status, you can recover **your own heads** to restore lives.\n\n' +
        `For MVP, reclaiming your own head is **free** — the challenge is getting the head back, not paying another fee.`
    )
    .addFields(
      { name: '✅ Reclaim Your Own Head', value: 'Restores **+1 life**. The head is destroyed/removed from circulation.' },
      { name: '🚫 Other Players\' Heads', value: 'You **cannot** reclaim another player\'s head for lives.' },
      { name: '⚔️ Combat Tag', value: 'You **cannot** reclaim heads while combat tagged.' },
      { name: '👻 Ghosts', value: 'Ghosts **cannot** reclaim heads until they buy back and become alive again.' },
      {
        name: '📍 Where Heads Can Be',
        value: 'Player inventories, market listings, bases, stashes, or the open world — you must get them back yourself.',
      }
    )
    .setColor(colors.gold)
    .setFooter({ text: 'Reclaiming destroys that head permanently.' })
    .setTimestamp();
}

function marketPricesEmbed() {
  return new EmbedBuilder()
    .setTitle('Base Market Prices')
    .setDescription('Core market rules and fees for HeadHunt Survival.')
    .addFields(
      { name: '🪙 Starter Coins', value: coin(market.starterCoins) },
      { name: '📋 Listing Fee', value: coin(market.listingFee) },
      { name: '📉 Sale Tax', value: `**${market.saleTaxPercent}%**` },
      { name: '📦 Max Listings', value: `**${market.maxListingsPerPlayer}** active listings per player` },
      { name: '➕ Extra Listing Slot', value: coin(market.extraListingSlot) },
      {
        name: '🔴 Outlaw Tax',
        value: `Outlaws pay **${outlaw.marketTaxPercent}%** market tax instead of **${market.saleTaxPercent}%**.`,
      },
      {
        name: '✨ Special Market Items',
        value:
          `Death Compass: ${coin(specialItems.deathCompass)}\n` +
          `Head Tracker: ${coin(specialItems.headTracker)}\n` +
          `Bounty Tracker: ${coin(specialItems.bountyTracker)}\n` +
          `Extra Market Slot: ${coin(specialItems.extraMarketSlot)}`,
      }
    )
    .setColor(colors.green)
    .setTimestamp();
}

function heartsPricingEmbed() {
  return new EmbedBuilder()
    .setTitle('Hearts Pricing')
    .setDescription('Hearts are **max-health upgrades**, not extra lives.')
    .addFields(
      { name: '❤️ Default Health', value: `**${hearts.defaultHealth}** Minecraft hearts` },
      { name: '📈 MVP Max Health', value: `**${hearts.maxHealthCap}** hearts` },
      { name: '🔢 Season Supply', value: `**${hearts.startingExtraCirculation}** extra hearts in the server market at season start` },
      { name: '💰 Starting Price', value: coin(hearts.startingPrice) },
      { name: '📉 Minimum Resale', value: coin(hearts.minimumResale) },
      { name: '🚫 Minimum Health', value: `Players cannot sell below **${hearts.defaultHealth}** hearts.` },
      { name: '⚠️ Important', value: 'Hearts do **not** restore lives or undo deaths.' }
    )
    .setColor(colors.green)
    .setTimestamp();
}

function headPricingEmbed() {
  return new EmbedBuilder()
    .setTitle('Head Pricing')
    .setDescription('Suggested values for player heads on the market.')
    .addFields(
      {
        name: '🟢 Common Head',
        value:
          `Quick-sell: ${coin(heads.commonQuickSell)}\n` +
          `Market range: ${coin(heads.commonMarketMin)}–${coin(heads.commonMarketMax)}\n` +
          `Own head min listing: ${coin(heads.ownCommonMinListing)}`,
      },
      {
        name: '🔵 Rare Head',
        value:
          `Quick-sell: ${coin(heads.rareQuickSell)}\n` +
          `Market range: ${coin(heads.rareMarketMin)}–${coin(heads.rareMarketMax)}\n` +
          `Own head min listing: ${coin(heads.ownRareMinListing)}`,
      },
      {
        name: '🟡 Legendary Head',
        value:
          `Quick-sell: ${coin(heads.legendaryQuickSell)}\n` +
          `Market range: ${coin(heads.legendaryMarketMin)}–${coin(heads.legendaryMarketMax)}\n` +
          `Own head: **Cannot sell**`,
      },
      {
        name: '💸 Selling Your Own Head',
        value: 'Listing your own Common or Rare head costs **1 life**. Legendary heads cannot be sold.',
      }
    )
    .setColor(colors.gold)
    .setTimestamp();
}

function teamPricingEmbed() {
  return new EmbedBuilder()
    .setTitle('Team Pricing')
    .setDescription('Costs for creating and upgrading teams.')
    .addFields(
      { name: '👥 Max Team Size', value: `**${teams.maxSize}** players — you and 2 others` },
      { name: '🏷️ Create Team', value: coin(teams.create) },
      { name: '🏠 Team Home', value: coin(teams.home) },
      { name: '🔐 Team Vault', value: coin(teams.vault) },
      { name: '⚔️ Team War Declaration', value: coin(teams.warDeclaration) },
      { name: '📜 Rules', value: 'No mega-teaming. No secret alliances above the team limit.' }
    )
    .setColor(colors.green)
    .setTimestamp();
}

function bountyPricingEmbed() {
  return new EmbedBuilder()
    .setTitle('Bounty Pricing')
    .setDescription('How bounties work and what they cost.')
    .addFields(
      { name: '💵 Minimum Bounty', value: coin(bounties.minimum) },
      { name: '📋 Posting Fee', value: `**${bounties.postingFeePercent}%** of bounty value` },
      { name: '🕵️ Anonymous Bounty Fee', value: `**+${bounties.anonymousFeePercent}%** extra` },
      { name: '💰 Who Gets Paid', value: 'The **killer** receives the bounty reward.' },
      { name: '🗡️ Who Gets The Head', value: 'The **killer** gets the head — not the bounty creator, unless they personally killed the target.' },
      {
        name: '🕊️ Peace Contracts',
        value:
          `24h: ${coin(peace.hours24)}\n` +
          `72h: ${coin(peace.hours72)}\n` +
          `7 days: ${coin(peace.days7)}\n` +
          `Break peace penalty: ${coin(peace.breakPenalty)} + possible **Outlaw** status`,
      },
      {
        name: '🔴 Outlaw Clear Fines',
        value:
          `1st: ${coin(outlaw.clearFine1)}\n` +
          `2nd: ${coin(outlaw.clearFine2)}\n` +
          `3rd: ${coin(outlaw.clearFine3)}`,
      }
    )
    .setColor(colors.red)
    .setTimestamp();
}

function serverShopEmbed() {
  return new EmbedBuilder()
    .setTitle('Server Shop')
    .setDescription('Starter buy prices from the server shop.')
    .addFields(
      { name: '🍞 Food & Light', value: `Bread x16: ${coin(serverShop.bread16)}\nCooked Beef x16: ${coin(serverShop.cookedBeef16)}\nTorch x32: ${coin(serverShop.torch32)}` },
      { name: '⚔️ Iron Gear', value: `Shield: ${coin(serverShop.shield)}\nIron Pickaxe: ${coin(serverShop.ironPickaxe)}\nIron Sword: ${coin(serverShop.ironSword)}\nBow: ${coin(serverShop.bow)}\nArrows x32: ${coin(serverShop.arrows32)}` },
      { name: '🛡️ Iron Set', value: coin(serverShop.fullIronSet) },
      { name: '💎 Diamond Gear', value: `Diamond Sword: ${coin(serverShop.diamondSword)}\nDiamond Pickaxe: ${coin(serverShop.diamondPickaxe)}` },
      { name: '💎 Diamond Set', value: coin(serverShop.fullDiamondSet) },
      {
        name: '✨ Special Items',
        value:
          `Supply Drop Key: ${coin(specialItems.supplyDropKey)}\n` +
          `Name Color Cosmetic: ${coin(specialItems.nameColorCosmetic)}\n` +
          `Particle Cosmetic: ${coin(specialItems.particleCosmetic)}`,
      }
    )
    .setColor(colors.gray)
    .setTimestamp();
}

function resourcePricesEmbed() {
  return new EmbedBuilder()
    .setTitle('Resource Sell Prices')
    .setDescription('Quick-sell values when selling resources to the server.')
    .addFields(
      {
        name: '⛏️ Ores & Materials',
        value:
          `Coal: ${coin(resourceSell.coal)}\n` +
          `Copper Ingot: ${coin(resourceSell.copperIngot)}\n` +
          `Iron Ingot: ${coin(resourceSell.ironIngot)}\n` +
          `Redstone Dust: ${coin(resourceSell.redstoneDust)}\n` +
          `Lapis Lazuli: ${coin(resourceSell.lapisLazuli)}\n` +
          `Gold Ingot: ${coin(resourceSell.goldIngot)}\n` +
          `Diamond: ${coin(resourceSell.diamond)}\n` +
          `Emerald: ${coin(resourceSell.emerald)}\n` +
          `Ancient Debris: ${coin(resourceSell.ancientDebris)}\n` +
          `Netherite Scrap: ${coin(resourceSell.netheriteScrap)}\n` +
          `Netherite Ingot: ${coin(resourceSell.netheriteIngot)}`,
      },
      {
        name: '🧟 Mob Drops',
        value:
          `Rotten Flesh: ${coin(resourceSell.rottenFlesh)}\n` +
          `Bone: ${coin(resourceSell.bone)}\n` +
          `String: ${coin(resourceSell.string)}\n` +
          `Gunpowder: ${coin(resourceSell.gunpowder)}\n` +
          `Ender Pearl: ${coin(resourceSell.enderPearl)}\n` +
          `Blaze Rod: ${coin(resourceSell.blazeRod)}\n` +
          `Ghast Tear: ${coin(resourceSell.ghastTear)}`,
      },
      {
        name: '🌾 Farming',
        value:
          `Wheat: ${coin(resourceSell.wheat)}\n` +
          `Carrot: ${coin(resourceSell.carrot)}\n` +
          `Potato: ${coin(resourceSell.potato)}\n` +
          `Sugar Cane: ${coin(resourceSell.sugarCane)}\n` +
          `Pumpkin: ${coin(resourceSell.pumpkin)}\n` +
          `Melon: ${coin(resourceSell.melon)}`,
      }
    )
    .setColor(colors.gold)
    .setTimestamp();
}

const economyEmbedPosts = [
  { key: 'ghost-buyback', fn: ghostBuybackEmbed, label: 'Ghost Buyback' },
  { key: 'head-reclaiming', fn: headReclaimingEmbed, label: 'Head Reclaiming' },
  { key: 'market-prices', fn: marketPricesEmbed, label: 'Market Prices' },
  { key: 'hearts-pricing', fn: heartsPricingEmbed, label: 'Hearts Pricing' },
  { key: 'head-pricing', fn: headPricingEmbed, label: 'Head Pricing' },
  { key: 'team-pricing', fn: teamPricingEmbed, label: 'Team Pricing' },
  { key: 'bounty-pricing', fn: bountyPricingEmbed, label: 'Bounty Pricing' },
  { key: 'server-shop', fn: serverShopEmbed, label: 'Server Shop' },
  { key: 'resource-prices', fn: resourcePricesEmbed, label: 'Resource Prices' },
];

module.exports = {
  ghostBuybackEmbed,
  headReclaimingEmbed,
  marketPricesEmbed,
  heartsPricingEmbed,
  headPricingEmbed,
  teamPricingEmbed,
  bountyPricingEmbed,
  serverShopEmbed,
  resourcePricesEmbed,
  economyEmbedPosts,
};
