import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { colors } from "../config/colors";
import { prices } from "../config/prices";
import { env } from "../config/env";

export function welcomeEmbed() {
  return new EmbedBuilder()
    .setTitle("Welcome to HeadHunt Survival")
    .setDescription(
      "A vanilla-core Minecraft Bedrock survival server with 3 lives, rare player heads, extra hearts, teams, bounties, and a player-driven market.",
    )
    .addFields(
      { name: "Platform", value: "Minecraft Bedrock", inline: true },
      { name: "Max Players", value: "40", inline: true },
      { name: "Core Loop", value: "Survive, hunt, trade, team up", inline: true },
      {
        name: "Account System",
        value: "Discord + Minecraft linking required",
        inline: false,
      },
    )
    .setColor(colors.red)
    .setTimestamp();
}

export function linkYourAccountEmbed() {
  return new EmbedBuilder()
    .setTitle("Link Your Minecraft Account")
    .setDescription(
      "HeadHunt Survival requires Discord and Minecraft Bedrock accounts to be linked through the web portal.",
    )
    .addFields(
      {
        name: "Steps",
        value:
          "1. Open the HeadHunt web portal\n" +
          "2. Connect Discord\n" +
          "3. Go to Profile\n" +
          "4. Generate a Minecraft link code\n" +
          "5. Join the Bedrock server\n" +
          "6. Type `?link HH-1234` in chat\n" +
          "7. Refresh your profile",
      },
    )
    .setColor(colors.gold)
    .setFooter({ text: "Link codes expire in 10 minutes and can only be used once." })
    .setTimestamp();
}

export function linkYourAccountComponents() {
  const portalUrl = env.portalUrl;
  if (!portalUrl) return [];

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Open HeadHunt Portal")
      .setStyle(ButtonStyle.Link)
      .setURL(portalUrl),
  );

  return [row];
}

export function consoleJoinGuideEmbed() {
  return new EmbedBuilder()
    .setTitle("Console Join Guide")
    .setDescription(
      "PC and mobile Bedrock players can join directly with IP and port.\n\n" +
        "Console players need the console join method because consoles do not normally allow custom server IPs.",
    )
    .addFields(
      {
        name: "Xbox",
        value: "Detailed Xbox join instructions are coming soon.",
      },
      {
        name: "PlayStation",
        value: "Detailed PlayStation join instructions are coming soon.",
      },
      {
        name: "Nintendo Switch",
        value: "Detailed Switch join instructions are coming soon.",
      },
    )
    .setColor(colors.gray)
    .setTimestamp();
}

export function howToJoinEmbed() {
  return new EmbedBuilder()
    .setTitle("How To Join")
    .setDescription("Join the HeadHunt Survival Bedrock server from Minecraft.")
    .addFields(
      { name: "Step 1", value: "Open **Minecraft Bedrock**." },
      { name: "Step 2", value: "Go to **Servers**." },
      { name: "Step 3", value: "Tap **Add Server**." },
      { name: "Step 4", value: "Enter the server IP and port from staff announcements." },
      { name: "Step 5", value: "Link your account at the web portal before playing." },
      {
        name: "Console Players",
        value: "See **#console-join-guide** for Xbox, PlayStation, and Switch instructions.",
      },
    )
    .setColor(colors.gray)
    .setTimestamp();
}

export function whatIsHeadhuntEmbed() {
  return new EmbedBuilder()
    .setTitle("What Is HeadHunt Survival?")
    .setDescription(
      "HeadHunt Survival is a Minecraft Bedrock survival server where every player has 3 lives. Each death drops one of your heads. Heads, hearts, coins, teams, and bounties create a player-driven survival economy.",
    )
    .setColor(colors.red)
    .setTimestamp();
}

export function quickRulesEmbed() {
  return new EmbedBuilder()
    .setTitle("Quick Rules")
    .setDescription("Basic rules every player should know.")
    .addFields(
      { name: "No Cheating", value: "No hacked clients, x-ray, dupes, or exploits." },
      { name: "No Combat Logging", value: "Leaving during combat can count as a death." },
      { name: "Respect Players", value: "No harassment, threats, or doxxing." },
      { name: "Heads Matter", value: "Do not fake, duplicate, or exploit player heads." },
      { name: "No Mega Teams", value: "Teams are limited to 3 players." },
    )
    .setColor(colors.red)
    .setTimestamp();
}

export function livesHeadsHeartsEmbed() {
  return new EmbedBuilder()
    .setTitle("Lives, Heads, and Hearts")
    .addFields(
      { name: "Death 1", value: "Drops a **Common** head." },
      { name: "Death 2", value: "Drops a **Rare** head." },
      { name: "Death 3", value: "Drops a **Legendary** head." },
      { name: "After Death 3", value: "**Ghost / dead state**" },
      {
        name: "Hearts",
        value:
          "Hearts are **max health**, not lives.\n" +
          "Everyone starts with **10 hearts**.\n" +
          "Extra hearts increase max health.",
      },
    )
    .setColor(colors.gold)
    .setTimestamp();
}

export function marketTeamsBountiesEmbed() {
  return new EmbedBuilder()
    .setTitle("Market, Teams, and Bounties")
    .addFields(
      { name: "Market", value: "Buy/sell heads, hearts, gear, items." },
      { name: "Teams", value: "3 players max." },
      { name: "Bounties", value: "Killer gets the bounty and the head." },
    )
    .setColor(colors.green)
    .setTimestamp();
}

export function howToStartEmbed() {
  return new EmbedBuilder()
    .setTitle("How To Start")
    .addFields(
      { name: "Step 1", value: "Link Discord + Minecraft on the web portal." },
      { name: "Step 2", value: "Join the Bedrock server." },
      { name: "Step 3", value: "Survive, gather resources, and protect your lives." },
      { name: "Step 4", value: "Use the market, teams, and bounties as you progress." },
    )
    .setColor(colors.gray)
    .setTimestamp();
}

export function fullRulesEmbed() {
  return new EmbedBuilder()
    .setTitle("HeadHunt Survival — Full Rules")
    .setDescription("Complete server rules. Staff may update these as the season evolves.")
    .addFields(
      { name: "1. Respect", value: "No harassment, slurs, threats, or doxxing." },
      { name: "2. No Cheating", value: "No hacked clients, x-ray, dupes, or exploits." },
      { name: "3. Combat Logging", value: "Disconnecting during combat may count as a death." },
      { name: "4. Heads", value: "Each player has exactly 3 heads. No fakes or duplicates." },
      { name: "5. Market", value: "No scam exploits, impersonation, or staff impersonation." },
      { name: "6. Bounties", value: "The killer earns the bounty and the head." },
      { name: "7. Teams", value: "Maximum 3 players per team. No secret mega-alliances." },
      { name: "8. Staff", value: "Staff may reverse bug deaths and fix economy issues." },
    )
    .setColor(colors.red)
    .setTimestamp();
}

export function economyInfoEmbed() {
  return new EmbedBuilder()
    .setTitle("Economy Overview")
    .setDescription(
      "Coins are the everyday currency. Heads are rare death-drop collectibles. Hearts are max-health upgrades — not lives.",
    )
    .addFields(
      { name: "Coins", value: "Buy heads, hearts, gear, teams, bounties, and market listings." },
      { name: "Heads", value: "Only 3 per player — Common, Rare, then Legendary." },
      { name: "Hearts", value: "Increase max health. They do not restore lives." },
      {
        name: "Earning Coins",
        value: "Mining, farming, trading, bounties, market sales, and resource selling.",
      },
    )
    .setColor(colors.gold)
    .setTimestamp();
}

export function priceGuideEmbed() {
  return new EmbedBuilder()
    .setTitle("Price Guide (MVP Values)")
    .setDescription("Suggested values — player market prices may vary.")
    .addFields(
      { name: "Starter Coins", value: `${prices.starterCoins}`, inline: true },
      { name: "Extra Heart", value: `${prices.extraHeart.toLocaleString()}`, inline: true },
      { name: "Create Team", value: `${prices.createTeam.toLocaleString()}`, inline: true },
      { name: "Market Tax", value: `${prices.marketTaxPercent}%`, inline: true },
      {
        name: "Common Head Quick-Sell",
        value: `${prices.commonHeadQuickSell}`,
        inline: true,
      },
      { name: "Rare Head Quick-Sell", value: `${prices.rareHeadQuickSell}`, inline: true },
      {
        name: "Legendary Head Quick-Sell",
        value: `${prices.legendaryHeadQuickSell.toLocaleString()}`,
        inline: true,
      },
      { name: "Minimum Bounty", value: `${prices.minimumBounty}`, inline: true },
    )
    .setColor(colors.gold)
    .setTimestamp();
}

export function ghostBuybackEmbed() {
  return new EmbedBuilder()
    .setTitle("Ghost Buyback")
    .setDescription("When you lose all 3 lives, you enter a Ghost/dead state. You can buy back with coins.")
    .addFields(
      { name: "1st Ghost Buyback", value: `${prices.ghostBuyback1.toLocaleString()} coins` },
      { name: "2nd Ghost Buyback", value: `${prices.ghostBuyback2.toLocaleString()} coins` },
      { name: "3rd Ghost Buyback", value: `${prices.ghostBuyback3.toLocaleString()} coins` },
      { name: "Max Buybacks Per Season", value: `${prices.maxGhostBuybacks}` },
      {
        name: "Important",
        value:
          "Buying back gives **1 life**.\n" +
          "It does **not** return your heads.\n" +
          "You must recover your own heads to restore more lives.",
      },
    )
    .setColor(colors.dark)
    .setTimestamp();
}

export function faqEmbed() {
  return new EmbedBuilder()
    .setTitle("FAQ")
    .addFields(
      { name: "How many lives?", value: "You start with **3 lives**." },
      { name: "Do heads despawn?", value: "No — heads should persist." },
      { name: "Are hearts lives?", value: "No — hearts are max health only." },
      { name: "Team size?", value: "**3 players** maximum." },
      { name: "Who gets a bounty?", value: "The **killer**." },
      { name: "How do I link?", value: "Use the web portal — see **#link-your-account**." },
    )
    .setColor(colors.gray)
    .setTimestamp();
}

export function teamInfoEmbed() {
  return new EmbedBuilder()
    .setTitle("Teams")
    .setDescription("Team up with other players — but keep it small and fair.")
    .addFields(
      { name: "Max Size", value: "**3 players** per team." },
      { name: "Create Cost", value: `${prices.createTeam.toLocaleString()} coins.` },
      { name: "Rules", value: "No mega-teaming or secret alliances beyond your team." },
    )
    .setColor(colors.green)
    .setTimestamp();
}

export function bountyBoardEmbed() {
  return new EmbedBuilder()
    .setTitle("Bounty Board")
    .setDescription("Active bounties will appear here once the bounty system syncs with the server.")
    .addFields(
      { name: "Minimum Bounty", value: `${prices.minimumBounty} coins` },
      { name: "Reward", value: "The **killer** receives the bounty." },
      { name: "Head", value: "The **killer** gets the target's head — not the bounty placer." },
      { name: "Status", value: "Coming soon — synced from the Minecraft server." },
    )
    .setColor(colors.red)
    .setTimestamp();
}

export type SetupSummary = {
  rolesCreated: number;
  categoriesCreated: number;
  channelsCreated: number;
  permissionsUpdated: number;
  skipped: number;
};

export function setupSuccessEmbed(summary: SetupSummary) {
  return new EmbedBuilder()
    .setTitle("HeadHunt Survival Setup Complete")
    .setDescription("Server structure created or updated. Run the `/post*` commands to publish embeds.")
    .addFields(
      { name: "Roles Created", value: `${summary.rolesCreated}`, inline: true },
      { name: "Categories Created", value: `${summary.categoriesCreated}`, inline: true },
      { name: "Channels Created", value: `${summary.channelsCreated}`, inline: true },
      { name: "Permissions Updated", value: `${summary.permissionsUpdated}`, inline: true },
      { name: "Skipped (Existing)", value: `${summary.skipped}`, inline: true },
    )
    .setColor(colors.green)
    .setTimestamp();
}
