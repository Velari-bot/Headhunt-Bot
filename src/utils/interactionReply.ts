import { PermissionFlagsBits } from "discord.js";
import {
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  MessageFlags,
} from "discord.js";

export const EPHEMERAL = MessageFlags.Ephemeral;

export async function safeReply(
  interaction: ChatInputCommandInteraction,
  options: InteractionReplyOptions | string,
) {
  const payload =
    typeof options === "string" ? { content: options } : options;

  try {
    if (interaction.deferred || interaction.replied) {
      const { flags, ...editPayload } = payload;
      void flags;
      return await interaction.editReply(editPayload);
    }
    return await interaction.reply({
      ...payload,
      flags: payload.flags ?? EPHEMERAL,
    });
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code === 10008 || code === 10062) {
      return interaction.followUp({
        ...payload,
        flags: payload.flags ?? EPHEMERAL,
      });
    }
    throw error;
  }
}

export async function deferEphemeral(interaction: ChatInputCommandInteraction) {
  if (interaction.deferred || interaction.replied) return;
  await interaction.deferReply({ flags: EPHEMERAL });
}

export function requireAdministrator(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    return "You need **Administrator** permission to run this command.";
  }
  return null;
}
