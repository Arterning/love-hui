import {fetchJson} from "@/utils/fetch";

// 类型

export async function serviceGetRank() {
    return await fetchJson('/content/score/latest')
}

export interface AddScoreType {
    partnerId: string
    add: number
    date: string
}

export async function serviceUpdateScore(addScoreDto: AddScoreType) {
    return await fetchJson('/content/score/updateTodayScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addScoreDto),
    })
}