import Discord from "discord.js";
export const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS],
});
export var inited = false;
export function init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        client.once("ready", () => {
            inited = true;
            resolve();
        });
        if (!process.env.DISCORD_TOKEN) throw new Error("Invalid Dotenv");
        client.login(process.env.DISCORD_TOKEN);
    });
}
export function standby(): void {
    inited = false;
    client.destroy();
}
export async function getUser(): Promise<Discord.User> {
    if (!process.env.DISCORD_USER_ID) throw new Error("Invalid Dotenv");
    return client.users.fetch(process.env.DISCORD_USER_ID);
}
export async function sendMessage(message: string): Promise<void> {
    const user = await getUser();
    user.send(message);
}
export async function standbyUseUser(
    callback: (user: Discord.User) => Promise<void>
): Promise<void> {
    if (!inited) await init();
    const user = await getUser();
    await callback(user);
    standby();
}
