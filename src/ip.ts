import axois from "axios";
export default async function getPublicIP(): Promise<string> {
    const { data } = await axois.get("https://api.ipify.org?format=json");
    return data.ip;
}