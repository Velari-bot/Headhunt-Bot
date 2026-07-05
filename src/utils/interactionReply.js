const { MessageFlags } = require('discord.js');

const EPHEMERAL = MessageFlags.Ephemeral;

/**
 * Safely reply to a slash command or button interaction.
 * Falls back to followUp if editReply fails (expired webhook / unknown message).
 * @param {import('discord.js').Interaction} interaction
 * @param {import('discord.js').InteractionReplyOptions | string} options
 */
async function safeReply(interaction, options) {
  const payload = typeof options === 'string' ? { content: options } : options;

  try {
    if (interaction.deferred || interaction.replied) {
      return await interaction.editReply(payload);
    }
    return await interaction.reply({ ...payload, flags: payload.flags ?? EPHEMERAL });
  } catch (error) {
    if (error.code === 10008 || error.code === 10062) {
      try {
        return await interaction.followUp({ ...payload, flags: payload.flags ?? EPHEMERAL });
      } catch (followUpError) {
        console.error('[Reply] Interaction response failed:', followUpError.message);
        return null;
      }
    }
    throw error;
  }
}

/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 */
async function deferEphemeral(interaction) {
  if (interaction.deferred || interaction.replied) return;
  await interaction.deferReply({ flags: EPHEMERAL });
}

module.exports = {
  EPHEMERAL,
  safeReply,
  deferEphemeral,
};
