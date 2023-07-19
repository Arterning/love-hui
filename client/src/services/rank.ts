import http from '@/utils/http'

// 类型
export function serviceGetRank() {
    return http.get('/rank')
}

