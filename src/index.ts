import * as cloudflare from "./cloudflare";
import getPublicIP from "./ip";
import dotenv from "dotenv";
export async function init(): Promise<void> {
    dotenv.config();
    const zoneID = process.env.CLOUDFLARE_ZONE_ID;
    const authToken = process.env.CLOUDFLARE_AUTH_TOKEN;
    if (!zoneID || !authToken) throw new Error("Invalid Dotenv");
    cloudflare.init(zoneID, authToken);
}
export async function updateDNS(): Promise<boolean> {
    const ip = await getPublicIP();
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
if (require.main === module) {
    init().then(() => {
        updateDNS().then(result => {
            console.log(result);
        });
    });
}