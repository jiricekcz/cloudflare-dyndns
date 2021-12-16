import axios from "axios";

const options: { zoneID?: string; authToken?: string } = {};
export async function updateDNS(
    recordIdentifier: string,
    domainName: string,
    ip: string
): Promise<boolean> {
	if (!options.zoneID || !options.authToken) throw new Error("Not initialized");
    const url = `https://api.cloudflare.com/client/v4/zones/${options.zoneID}/dns_records/${recordIdentifier}`;
    const response = await axios.put(
        url,
        {
            type: "A",
            name: domainName,
            content: ip,
            ttl: 1,
            proxied: false,
        },
        {
            headers: {
                Authorization: `Bearer ${options.authToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (response.status !== 200) {
		return false;
    }
	return true;
}
export async function getDNSIP(domainName: string): Promise<string> {
	if (!options.zoneID || !options.authToken) throw new Error("Not initialized");
	const url = `https://api.cloudflare.com/client/v4/zones/${options.zoneID}/dns_records?name=${domainName}&type=A`;
	const response = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${options.authToken}`,
			"Content-Type": "application/json",
		},
	});
	if (response.status !== 200) {
		return "";
	}
	const record = response.data.result[0];
	return record.content;
}
export function init(zoneID: string, authToken: string): void {
    options.zoneID = zoneID;
    options.authToken = authToken;
}
