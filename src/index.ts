import * as cloudflare from "./cloudflare";
import getPublicIP from "./ip";
import dotenv from "dotenv";
import cron from "node-cron";

var currentDNS: string = "";
export async function init(): Promise<void> {
    dotenv.config();
    const zoneID = process.env.CLOUDFLARE_ZONE_ID;
    const authToken = process.env.CLOUDFLARE_AUTH_TOKEN;
    if (!zoneID || !authToken) throw new Error("Invalid Dotenv");
    cloudflare.init(zoneID, authToken);
}
export async function updateDNS(ip?: string): Promise<boolean> {
    if (!ip) ip = await getPublicIP();
    const domainName = process.env.DOMAIN_NAME;
    const recordIdentifier = process.env.CLOUDFLARE_RECORD_IDENTIFIER;
    if (!domainName || !recordIdentifier) throw new Error("Invalid Dotenv");
    const result = await cloudflare.updateDNS(
        recordIdentifier,
        domainName,
        ip
    );
    return result;
}
export async function getCurrentDNS(): Promise<string> {
    const domainName = process.env.DOMAIN_NAME;
    if (!domainName) throw new Error("Invalid Dotenv");
    const result = await cloudflare.getDNSIP(domainName);
    return result;
}
if (require.main === module) {
    init().then(() => {
        cron.schedule(`*/${process.env.EVERY_SECOND} * * * * *`, async () => {
            const ip = await getPublicIP();
            console.log("IP:", ip);
            if (!currentDNS) currentDNS = await getCurrentDNS();
            if (currentDNS !== ip) {
                console.log("Updating DNS");
                currentDNS = "";
                await updateDNS(ip);
                console.log("Updated DNS");
            }
        });
    });
}