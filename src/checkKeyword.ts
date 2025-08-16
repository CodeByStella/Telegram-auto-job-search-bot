import { readTextFromFile } from "./fileManage";

export const checkKeywords = async (message: string ) =>{
    try {
        const keywords = (await readTextFromFile()).toLocaleLowerCase().split('\n');
        for (const keyword of keywords) {
            if (message.toLocaleLowerCase().includes(keyword)) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error reading keywords:", error);
        return false;
    }
}
