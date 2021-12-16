import Discord from "discord.js";
export declare const client: Discord.Client<boolean>;
export declare var inited: boolean;
export declare function init(): Promise<void>;
export declare function standby(): void;
export declare function getUser(): Promise<Discord.User>;
export declare function sendMessage(message: string): Promise<void>;
export declare function standbyUseUser(callback: (user: Discord.User) => Promise<void>): Promise<void>;
//# sourceMappingURL=discord.d.ts.map