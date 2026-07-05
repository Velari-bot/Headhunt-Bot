const { grantFullAccess } = require('../utils/verification');
const { safeReply, deferEphemeral } = require('../utils/interactionReply');

const VERIFY_BUTTON_ID = 'headhunt_verify';

async function handleVerifyButton(interaction) {
  if (!interaction.isButton() || interaction.customId !== VERIFY_BUTTON_ID) return false;

  await deferEphemeral(interaction);

  try {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const result = await grantFullAccess(member);

    if (result.alreadyVerified) {
      await safeReply(interaction, {
        content: '✅ You already have the **Player** role!',
      });
      return true;
    }

    const roleList = result.rolesAdded.length
      ? result.rolesAdded.map((r) => `**${r}**`).join(', ')
      : '**Player**';

    await safeReply(interaction, {
      content:
        `✅ **Welcome to HeadHunt Survival!**\n\n` +
        `You now have ${roleList}. You are all set for when the Minecraft server launches.\n\n` +
        'Keep an eye on **#launch-updates** for the go-live announcement.',
    });
  } catch (error) {
    console.error('[Verify] Error:', error);

    let message = `❌ Verification failed: ${error.message}`;
    if (error.code === 50013) {
      message =
        '❌ I could not assign roles. Ask an admin to move my bot role **above** Player and your join role, and ensure I have **Manage Roles**.';
    }

    await safeReply(interaction, { content: message });
  }

  return true;
}

module.exports = { VERIFY_BUTTON_ID, handleVerifyButton };
