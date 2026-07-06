import { BotCommand } from "../types/command";
import { setupCommand } from "./setup";
import { postbasicsCommand } from "./postbasics";
import { postrulesCommand } from "./postrules";
import { postlinkingCommand } from "./postlinking";
import { posteconomyCommand } from "./posteconomy";
import { postteamsCommand } from "./postteams";
import { postbountiesCommand } from "./postbounties";
import { statusCommand } from "./status";

export const commands: BotCommand[] = [
  setupCommand,
  postbasicsCommand,
  postrulesCommand,
  postlinkingCommand,
  posteconomyCommand,
  postteamsCommand,
  postbountiesCommand,
  statusCommand,
];
