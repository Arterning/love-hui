import {fetchJson} from "@/utils/fetch";

// 类型

export async function serviceGetRank() {
    return await fetchJson('/content/score/latest')
}
