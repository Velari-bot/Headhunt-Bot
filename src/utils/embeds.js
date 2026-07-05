const { EmbedBuilder } = require('discord.js');
const { colors, hearts, ghost } = require('../config');

function welcomeEmbed() {
  return new EmbedBuilder()
    .setTitle('Welcome to HeadHunt Survival')
    .setDescription(
      'A custom Minecraft Bedrock survival server — **3 lives**, **player heads**, **bounties**, **teams**, and a player-driven market.\n\n' +
        'The Minecraft server is **not live yet**. Use this Discord to learn what HeadHunt is about before launch.'
    )
    .addFields(
      { name: '📖 New here?', value: 'Read **SERVER BASICS**, then **ECONOMY** for full pricing and the Ghost system.' },
      { name: '💬 Chat', value: 'Talk with others in **#community-chat**.' },
      { name: '🚀 Launch', value: 'Watch **#launch-updates** for when the Minecraft server goes live.' }
    )
    .setColor(colors.red)
    .setFooter({ text: 'Start with SERVER BASICS if you want the quick version.' })
    .setTimestamp();
}

function announcementsEmbed() {
  return new EmbedBuilder()
    .setTitle('Announcements')
    .setDescription('Important updates about HeadHunt Survival will be posted here by staff.')
    .addFields(
      { name: 'Current Status', value: '🟡 **Pre-launch** — Discord is open, Minecraft server coming soon.' }
    )
    .setColor(colors.gray)
    .setTimestamp();
}

function rulesEmbed() {
  return new EmbedBuilder()
    .setTitle('HeadHunt Survival Rules')
    .setDescription('These rules keep the server competitive, fair, and fun.')
    .addFields(
      {
        name: '1. Respect Players',
        value: 'No harassment, slurs, real-life threats, doxxing, or targeted hate.',
      },
      {
        name: '2. No Cheating',
        value: 'No hacked clients, x-ray, autoclickers, toolbox, illegal mods, dupes, or exploits.',
      },
      {
        name: '3. No Combat Logging',
        value: 'Leaving during combat can count as a death.',
      },
      {
        name: '4. Heads Matter',
        value: 'Every player only has 3 possible heads. Do not attempt to fake, duplicate, rename, or exploit heads.',
      },
      {
        name: '5. Market Scamming',
        value: 'Basic trading risk is allowed, but bug abuse, fake bot listings, impersonation, or staff impersonation is not.',
      },
      {
        name: '6. Bounties',
        value: 'The killer earns the bounty. The person who placed the bounty does not receive the target\'s head unless they personally kill the target.',
      },
      {
        name: '7. Teams',
        value: 'Teams are limited to 3 players max. No unofficial mega-teaming.',
      },
      {
        name: '8. Staff Decisions',
        value: 'Staff can reverse bugged deaths, punish exploiters, and fix economy-breaking issues.',
      }
    )
    .setColor(colors.red)
    .setFooter({ text: 'Breaking rules can lead to coin wipes, life resets, elimination, or bans.' })
    .setTimestamp();
}

function livesEmbed() {
  return new EmbedBuilder()
    .setTitle('3 Lives System')
    .setDescription('Every player starts with **3 lives**. Each death drops one version of your head.')
    .addFields(
      {
        name: '💀 Death 1',
        value: "Drops **Common {PlayerName}'s Head**. You now have **2 lives** left.",
      },
      {
        name: '💀 Death 2',
        value: "Drops **Rare {PlayerName}'s Head**. You now have **1 life** left.",
      },
      {
        name: '💀 Death 3',
        value: "Drops **Legendary {PlayerName}'s Head**. You are now **fully dead**.",
      },
      {
        name: '☠️ Fully Dead',
        value: 'Once your Legendary head drops, you are **eliminated**. Hearts do not revive you — only a separate staff-approved revive system can.',
      },
      {
        name: '❤️ Hearts vs Lives',
        value: '**Lives** = how many deaths you can take.\n**Hearts** = your Minecraft max health.\nLosing all health causes a death. Losing all 3 lives causes elimination.',
      },
      {
        name: '⚠️ Important',
        value: 'There are only **3 heads per player**. No more. No less.',
      }
    )
    .setColor(colors.gold)
    .setTimestamp();
}

function headRaritiesEmbed() {
  return new EmbedBuilder()
    .setTitle('Head Rarities')
    .setDescription('Your head becomes more valuable the closer you are to elimination.')
    .addFields(
      {
        name: '🟢 Common Head',
        value: 'Dropped on your **first death**. Lowest rarity, but still limited.',
      },
      {
        name: '🔵 Rare Head',
        value: 'Dropped on your **second death**. More valuable and more dangerous to lose.',
      },
      {
        name: '🟡 Legendary Head',
        value: 'Dropped on your **third death**. This means you are **fully dead**.',
      },
      {
        name: '📦 Head Rule',
        value: 'Heads **never despawn**. If a head is not picked up, it should stay in the world or be stored in a permanent head crate system.',
      },
      {
        name: '💸 Selling Your Own Head',
        value: 'You may sell your own **Common** or **Rare** head, but you **lose one life** when doing so.',
      },
      {
        name: '🚫 Cannot Sell',
        value: 'You **cannot** sell your own **Legendary** head.',
      }
    )
    .setColor(colors.gray)
    .setTimestamp();
}

function heartsEmbed() {
  return new EmbedBuilder()
    .setTitle('Hearts System')
    .setDescription('Hearts are extra max-health upgrades. They do **not** give extra lives.')
    .addFields(
      {
        name: 'Default Health',
        value: `Every player starts with the normal Minecraft **${hearts.defaultHealth} hearts**.`,
      },
      {
        name: 'Extra Hearts',
        value: 'Players can buy, earn, trade, or sell extra hearts to increase their **max health**.',
      },
      {
        name: 'Starting Circulation',
        value: `Only **${hearts.startingExtraCirculation} extra hearts** are available in the market at the start of the season.`,
      },
      {
        name: 'Heart Cap',
        value: `Players can only go up to **${hearts.maxHealthCap} max hearts** during MVP.`,
      },
      {
        name: 'Selling Hearts',
        value: 'Players can sell extra hearts, but doing so lowers their max health by **1 heart**.',
      },
      {
        name: 'Minimum Health',
        value: `Players cannot sell hearts below the default **${hearts.defaultHealth}-heart** minimum.`,
      },
      {
        name: 'Important',
        value: 'Hearts are **not lives**. Hearts do **not** undo deaths. Hearts do **not** revive eliminated players.',
      },
      {
        name: 'Recommended Value',
        value: 'Extra hearts are expected to be one of the most valuable items on the server.',
      }
    )
    .setColor(colors.green)
    .setTimestamp();
}

function economyEmbed() {
  return new EmbedBuilder()
    .setTitle('Economy Overview')
    .setDescription(
      'Coins are the everyday currency. Heads are rare death-drop collectibles. Hearts are rare max-health upgrades.'
    )
    .addFields(
      {
        name: '🪙 Coins',
        value: 'Used to buy heads, extra hearts, items, team creation, bounties, and market listings.',
      },
      {
        name: '🗡️ Heads',
        value: 'Rare collectible death-drop items. There are only **3 per player**.',
      },
      {
        name: '❤️ Hearts',
        value: `Extra max-health upgrades — **not lives**. Only **${hearts.startingExtraCirculation} extra hearts** exist in the market at season start.`,
      },
      {
        name: '📊 How to Earn Coins',
        value: 'Mining, farming, mob drops, trading, selling items, selling heads, bounties, and market sales.',
      },
      {
        name: '💵 Coin Value',
        value:
          '**100 coins** — small money\n' +
          '**500 coins** — useful money\n' +
          '**1,000 coins** — serious money\n' +
          '**2,500 coins** — major purchase\n' +
          '**5,000+ coins** — you are rich',
      }
    )
    .setColor(colors.gold)
    .setTimestamp();
}

function marketEmbed() {
  return new EmbedBuilder()
    .setTitle('Market System')
    .setDescription('The market is where players buy and sell valuable items.')
    .addFields(
      {
        name: '📤 You Can Sell',
        value: 'Heads, extra max-health hearts (+1 Max Heart), survival items, rare items, and valuable resources.',
      },
      {
        name: '📥 You Can Buy',
        value: 'Heads, extra hearts, gear, materials, and player-listed items.',
      },
      {
        name: '❤️ Extra Max Health Heart',
        value: `Market listings should be labeled **"+1 Max Heart"** or **"Extra Max Health Heart"**. Selling one lowers your max health by 1 (minimum **${hearts.defaultHealth}** hearts).`,
      },
      {
        name: '💸 Selling Your Own Head',
        value: 'You may list your own **Common** or **Rare** head. Doing this removes **1 life** from you.',
      },
      { name: '🏷️ Custom Pricing', value: 'Players choose their own listing price.' },
      {
        name: '📉 Market Tax',
        value: 'A small tax may be taken from successful sales to control inflation.',
      },
      {
        name: '⚠️ Important',
        value: 'Buying a player\'s head does **not** give you their life. Hearts increase max health — they do **not** restore lives or revive eliminated players.',
      }
    )
    .setColor(colors.green)
    .setTimestamp();
}

function priceGuideEmbed() {
  return new EmbedBuilder()
    .setTitle('Recommended Price Guide')
    .setDescription('These are suggested values. Player market prices can change depending on demand.')
    .addFields(
      { name: '🪙 Starter Coins', value: `${prices.starterCoins} coins per player` },
      {
        name: '❤️ Extra Max Health Heart (+1)',
        value:
          `Starting price: **${hearts.startingPrice.toLocaleString()}** coins\n` +
          `Minimum resale: **${hearts.minimumResale.toLocaleString()}** coins\n` +
          `Player market range: **${hearts.startingPrice.toLocaleString()}** to **${hearts.marketMax.toLocaleString()}** coins\n` +
          `Season supply: **${hearts.startingExtraCirculation}** extra hearts`,
      },
      {
        name: '🩺 Health Limits',
        value: `Default: **${hearts.defaultHealth}** hearts | MVP cap: **${hearts.maxHealthCap}** hearts`,
      },
      {
        name: '🟢 Common Head',
        value: `Quick-sell: **${prices.commonHeadQuickSell}** coins\nMarket range: **${prices.commonHeadMarketMin}** to **${prices.commonHeadMarketMax}** coins`,
      },
      {
        name: '🔵 Rare Head',
        value: `Quick-sell: **${prices.rareHeadQuickSell}** coins\nMarket range: **${prices.rareHeadMarketMin.toLocaleString()}** to **${prices.rareHeadMarketMax.toLocaleString()}** coins`,
      },
      {
        name: '🟡 Legendary Head',
        value: `Quick-sell: **${prices.legendaryHeadQuickSell.toLocaleString()}** coins\nMarket range: **${prices.legendaryHeadMarketMin.toLocaleString()}** to **${prices.legendaryHeadMarketMax.toLocaleString()}** coins`,
      },
      { name: '🤝 Team Creation', value: `${prices.teamCreation.toLocaleString()} coins` },
      { name: '🎯 Bounty Minimum', value: `${prices.bountyMinimum} coins` },
      { name: '📉 Market Tax', value: `${prices.marketTaxPercent}%` }
    )
    .setColor(colors.gold)
    .setTimestamp();
}

function bountiesEmbed() {
  return new EmbedBuilder()
    .setTitle('Bounty Rules')
    .setDescription('Bounties are used to pay other players to hunt a target.')
    .addFields(
      {
        name: '🎯 How It Works',
        value: 'A player places a bounty on a target using coins.',
      },
      {
        name: '💰 Who Gets Paid',
        value: 'The **player who kills the target** receives the bounty.',
      },
      {
        name: '🗡️ Who Gets The Head',
        value: 'The **killer** gets the head, not the person who placed the bounty.',
      },
      {
        name: '⚠️ Important',
        value: 'If you place a bounty and someone else kills the target, you do **not** receive the head.',
      },
      {
        name: '✅ Claiming',
        value: 'Bounties should be claimed through kill proof or the server\'s bounty system.',
      },
      { name: '💵 Minimum Bounty', value: `${prices.bountyMinimum} coins` }
    )
    .setColor(colors.red)
    .setTimestamp();
}

function teamsEmbed() {
  return new EmbedBuilder()
    .setTitle('Teams System')
    .setDescription('Teams let players survive together, but team sizes are limited.')
    .addFields(
      { name: '👥 Max Team Size', value: '**3 players** total. You and 2 others.' },
      { name: '💰 Create Team Cost', value: `${prices.teamCreation.toLocaleString()} coins.` },
      {
        name: '❓ Why Teams Cost Money',
        value: 'Teams are powerful. Creating one should be a real commitment.',
      },
      {
        name: '📜 Team Rules',
        value: 'No mega-teaming.\nNo bypassing team limits.\nNo secret 6-player alliances.\nStaff can break up unfair teaming.',
      },
      {
        name: '🛡️ Team Members',
        value: 'Team members should not be able to damage each other if the server supports it.',
      }
    )
    .setColor(colors.green)
    .setTimestamp();
}

function howToJoinEmbed() {
  return new EmbedBuilder()
    .setTitle('How To Join')
    .setDescription('Use this channel to explain how players join the Bedrock server.')
    .addFields(
      { name: 'Step 1', value: 'Open **Minecraft Bedrock**.' },
      { name: 'Step 2', value: 'Go to **Servers**.' },
      { name: 'Step 3', value: 'Tap **Add Server**.' },
      { name: 'Step 4', value: 'Enter the server IP and port.' },
      { name: 'Step 5', value: 'Join, read the rules, and start surviving.' },
      { name: '🌐 Server IP', value: `\`${serverIp}\`` },
      { name: '🔌 Port', value: `\`${serverPort}\`` }
    )
    .setColor(colors.gray)
    .setTimestamp();
}

function faqEmbed() {
  return new EmbedBuilder()
    .setTitle('FAQ')
    .addFields(
      { name: 'Do heads despawn?', value: 'No. Heads **never despawn**.' },
      { name: 'How many lives do I get?', value: 'You start with **3 lives**.' },
      {
        name: 'What happens when I die 3 times?',
        value: 'Your **Legendary head** drops and you are **fully dead**.',
      },
      {
        name: 'Can I sell my own head?',
        value: 'Yes, but only your **Common** or **Rare** head. You lose one life when doing it.',
      },
      { name: 'Can I sell my Legendary head?', value: '**No.**' },
      {
        name: 'Are hearts the same as lives?',
        value: '**No.** Lives are your death count. Hearts are your Minecraft max health. You start with **3 lives** and **10 hearts**.',
      },
      {
        name: 'Can hearts revive me?',
        value: '**No.** Hearts only increase max health. They do not restore lives or undo deaths.',
      },
      {
        name: 'Can I sell hearts?',
        value: `Yes, but only extra hearts above your default **${hearts.defaultHealth} hearts**. Selling a heart lowers your max health.`,
      },
      {
        name: 'How many hearts can I have?',
        value: `For MVP, the max is **${hearts.maxHealthCap} hearts**.`,
      },
      {
        name: 'How many extra hearts exist?',
        value: `Only **${hearts.startingExtraCirculation} extra hearts** are available at the start of the season.`,
      },
      { name: 'How big can teams be?', value: '**3 players** max.' },
      { name: 'Who gets a bounty reward?', value: 'The **killer**.' },
      {
        name: 'Does the bounty creator get the target\'s head?',
        value: '**No**, unless they personally killed the target.',
      }
    )
    .setColor(colors.gray)
    .setTimestamp();
}

function deathRulesEmbed() {
  return new EmbedBuilder()
    .setTitle('Death Rules')
    .setDescription('How deaths work on HeadHunt Survival.')
    .addFields(
      {
        name: '💀 PvP Deaths',
        value: 'Dying to another player counts as a death and drops the appropriate head rarity.',
      },
      {
        name: '🧟 Mob / Environment Deaths',
        value: 'All deaths count toward your life total unless staff reverses a bugged death.',
      },
      {
        name: '🚪 Combat Logging',
        value: 'Disconnecting during combat may be treated as a death at staff discretion.',
      },
      {
        name: '🗡️ Head Pickup',
        value: 'Whoever picks up your head owns it. Heads never despawn.',
      },
      {
        name: '❤️ Health vs Lives',
        value: 'Running out of health causes a **death**. Using up all **3 lives** causes **elimination**. Extra hearts make you harder to kill — they do not add lives.',
      },
      {
        name: '☠️ Elimination',
        value: 'After your Legendary head drops, you receive the **Eliminated** role and cannot participate in market, bounties, or team creation.',
      }
    )
    .setColor(colors.red)
    .setTimestamp();
}

function coinGuideEmbed() {
  return new EmbedBuilder()
    .setTitle('Coin Guide')
    .setDescription('How to earn and spend coins on HeadHunt Survival.')
    .addFields(
      {
        name: '⛏️ Earning Coins',
        value: 'Mining, mob farming, crop farming, trading, bounty rewards, market sales, and selling heads.',
      },
      {
        name: '💸 Spending Coins',
        value: 'Market purchases, extra max-health hearts, team creation, placing bounties, and trading with other players.',
      },
      {
        name: '📊 Value Reference',
        value:
          '**100** — pocket change\n' +
          '**500** — useful\n' +
          '**1,000** — serious\n' +
          '**2,500** — major purchase\n' +
          '**5,000+** — wealthy',
      },
      {
        name: '🪙 Starting Balance',
        value: `Each player starts with **${prices.starterCoins} coins**.`,
      }
    )
    .setColor(colors.gold)
    .setTimestamp();
}

function preServerPreviewEmbed() {
  return new EmbedBuilder()
    .setTitle('HeadHunt Survival — Coming Soon')
    .setDescription(
      'The **Minecraft Bedrock server is not live yet**. This Discord is open early so you can learn what HeadHunt Survival is about before launch.\n\n' +
        'HeadHunt is a custom Bedrock survival SMP with **3 lives**, **player heads**, **bounties**, **teams**, and a **player-driven market**.\n\n' +
        'Browse the info channels, ask questions in **#community-chat**, and watch **#launch-updates** for the go-live announcement.'
    )
    .addFields(
      { name: '🎮 Server Type', value: 'Custom Bedrock Survival', inline: true },
      { name: '👥 Max Players', value: '20', inline: true },
      { name: '❤️ Lives', value: '3 per player', inline: true },
      { name: '🗡️ Heads', value: 'Common → Rare → Legendary on death', inline: true },
      { name: '💰 Economy', value: 'Coins, heads, extra max-health hearts', inline: true },
      { name: '🤝 Teams', value: '3 players max', inline: true },
      {
        name: '📖 What to do now',
        value:
          '1. Read **#rules** and the HeadHunt system guides\n' +
          '2. Chat with others in **#community-chat**\n' +
          '3. Click **Accept Rules & Get Access** when you are ready to unlock the full Discord',
      },
      {
        name: '🚀 Minecraft Server',
        value: '**Not online yet.** IP and port will be posted in #launch-updates and #how-to-join when we go live.',
      }
    )
    .setColor(colors.gold)
    .setFooter({ text: 'You are in the pre-server phase. Thank you for joining early!' })
    .setTimestamp();
}

function launchUpdatesEmbed() {
  return new EmbedBuilder()
    .setTitle('Launch Updates')
    .setDescription(
      'Official announcements about the HeadHunt Survival Minecraft server launch will be posted here.\n\n' +
        '**Status:** 🟡 Pre-launch — Discord open, Minecraft server coming soon.'
    )
    .addFields(
      {
        name: 'What happens at launch',
        value: 'Server IP/port posted here, #how-to-join updated, and verified players can connect in-game.',
      },
      {
        name: 'Stay ready',
        value: 'Read **SERVER BASICS** and **ECONOMY** so you are prepared on day one.',
      }
    )
    .setColor(colors.gray)
    .setTimestamp();
}

function whatIsHeadhuntEmbed() {
  return new EmbedBuilder()
    .setTitle('What Is HeadHunt Survival?')
    .setDescription(
      'HeadHunt Survival is a custom Minecraft Bedrock survival server where every player has **limited lives**, drops their own **head** when they die, and can **trade**, **hunt**, **team up**, and **survive** in a player-driven economy.'
    )
    .addFields(
      { name: '3 Lives', value: 'You only get **3 deaths** before you become a **Ghost**.' },
      { name: 'Player Heads', value: 'Every death drops one of your heads. Collect, sell, trade, reclaim, or use them for bounties.' },
      { name: '👻 Ghosts', value: 'Eliminated players can **buy back** with coins for **1 life**. Heads are not returned automatically.' },
      { name: 'Extra Hearts', value: 'Players start with **10 Minecraft hearts**, but can buy or sell extra max-health hearts.' },
      { name: 'Market', value: 'Players can buy and sell heads, hearts, and valuable items.' },
      { name: 'Teams', value: 'Teams are limited to **3 players** max.' },
      { name: 'Bounties', value: 'Players can place bounties on others and reward the killer.' }
    )
    .setColor(colors.red)
    .setFooter({ text: 'See ECONOMY for Ghost buyback, pricing, and the server shop.' })
    .setTimestamp();
}

function quickRulesBasicsEmbed() {
  return new EmbedBuilder()
    .setTitle('Quick Rules')
    .setDescription('These are the basic rules you need to know before playing.')
    .addFields(
      { name: 'No Cheating', value: 'No hacked clients, x-ray, dupes, toolbox, autoclickers, or exploits.' },
      { name: 'No Combat Logging', value: 'Leaving during combat can count as a death.' },
      { name: 'Respect Players', value: 'No harassment, real-life threats, doxxing, or hateful behavior.' },
      { name: 'No Fake Heads', value: 'Heads are limited and important. Do not fake, duplicate, rename, or exploit them.' },
      { name: 'No Mega Teams', value: 'Teams are limited to 3 players. Do not bypass the team limit with secret alliances.' },
      { name: 'Staff Can Fix Bugs', value: 'If a death, head, market trade, or bounty breaks because of a bug, staff can fix it.' }
    )
    .setColor(colors.red)
    .setFooter({ text: 'More details will be added when the Minecraft server launches.' })
    .setTimestamp();
}

function livesHeadsHeartsBasicsEmbed() {
  return new EmbedBuilder()
    .setTitle('Lives, Heads, and Hearts')
    .setDescription('These are the three most important systems on the server.')
    .addFields(
      { name: 'Lives', value: 'You start with **3 lives**. Every death removes **1 life**.' },
      { name: 'Heads', value: 'Each death drops your head. Death 1 drops **Common**, Death 2 drops **Rare**, and Death 3 drops **Legendary**.' },
      { name: 'Elimination', value: 'After your **Legendary** head drops, you become a **Ghost** — fully eliminated from survival.' },
      {
        name: '👻 Ghost Buyback',
        value: `Ghosts can buy back for coins (**${ghost.buyback1.toLocaleString()}** / **${ghost.buyback2.toLocaleString()}** / **${ghost.buyback3.toLocaleString()}**). Each buyback gives **1 life**. Your heads stay where they are.`,
      },
      {
        name: '🔄 Head Reclaiming',
        value: 'Once alive again, reclaim **your own heads** for **+1 life** each (free for MVP). See **#head-reclaiming**.',
      },
      { name: 'Hearts', value: `Hearts are **max health**, not lives. Start with **${hearts.defaultHealth} hearts**, cap at **${hearts.maxHealthCap}** for MVP.` },
    )
    .setColor(colors.gold)
    .setFooter({ text: 'Full details in ECONOMY → #ghost-buyback and #head-reclaiming.' })
    .setTimestamp();
}

function marketTeamsBountiesBasicsEmbed() {
  return new EmbedBuilder()
    .setTitle('Market, Teams, and Bounties')
    .setDescription('These systems are how players trade, group up, and hunt each other.')
    .addFields(
      { name: 'Market', value: 'Buy and sell heads, extra hearts, gear, and valuable items.' },
      { name: 'Selling Your Own Head', value: 'You can sell your own **Common** or **Rare** head, but you **lose 1 life** when doing it.' },
      { name: 'Teams', value: 'Teams can have **3 players** max. You and 2 others.' },
      { name: 'Creating Teams', value: 'Creating a team costs coins.' },
      { name: 'Bounties', value: 'Players can place bounties on other players.' },
      { name: 'Bounty Reward', value: 'The **killer** gets the bounty reward. The bounty creator does not get the head unless they personally kill the target.' }
    )
    .setColor(colors.green)
    .setFooter({ text: 'See ECONOMY for full market, team, and bounty prices.' })
    .setTimestamp();
}

function howToStartBasicsEmbed() {
  return new EmbedBuilder()
    .setTitle('How To Start')
    .setDescription('Here is the simple beginner path.')
    .addFields(
      { name: 'Step 1', value: 'Join the Minecraft Bedrock server.' },
      { name: 'Step 2', value: 'Survive like normal Minecraft. Mine, farm, build, and gather resources.' },
      { name: 'Step 3', value: 'Protect your lives. Every death matters.' },
      { name: 'Step 4', value: 'Use the market to buy and sell items, heads, and extra hearts.' },
      { name: 'Step 5', value: 'Join or create a team if you want backup.' },
      { name: 'Step 6', value: 'If you become a Ghost, save coins and buy back — then recover your own heads.' },
      { name: 'Step 7', value: 'Check **ECONOMY** for prices, the server shop, and resource sell values.' }
    )
    .setColor(colors.gray)
    .setFooter({ text: 'The goal is simple: survive longer, get richer, and avoid losing your Legendary head.' })
    .setTimestamp();
}

function setupSuccessEmbed(summary) {
  return new EmbedBuilder()
    .setTitle('✅ HeadHunt Survival Setup Complete')
    .setDescription('Your server structure has been created or updated successfully.')
    .addFields(
      { name: 'Roles Created', value: `${summary.rolesCreated}`, inline: true },
      { name: 'Categories Created', value: `${summary.categoriesCreated}`, inline: true },
      { name: 'Channels Created', value: `${summary.channelsCreated}`, inline: true },
      { name: 'Embeds Posted', value: `${summary.embedsPosted}`, inline: true },
      { name: 'Permissions Updated', value: `${summary.permissionsUpdated ?? 0}`, inline: true },
      { name: 'Skipped (Existing)', value: `${summary.skipped}`, inline: true }
    )
    .setColor(colors.green)
    .setTimestamp();
}

module.exports = {
  welcomeEmbed,
  announcementsEmbed,
  whatIsHeadhuntEmbed,
  preServerPreviewEmbed,
  launchUpdatesEmbed,
  quickRulesBasicsEmbed,
  livesHeadsHeartsBasicsEmbed,
  marketTeamsBountiesBasicsEmbed,
  howToStartBasicsEmbed,
  setupSuccessEmbed,
};
