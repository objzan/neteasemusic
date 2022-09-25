import request from '@/utils/request.js'

export const recommendMusic = params => {
  return request({
    url: '/personalized',
    params
  })
}

export const getNewSong = params => {
  return request({
    url: '/personalized/newsong',
    params
  })
}

export const hotSearch = () => {
  return request({
    url: '/search/hot'
  })
}

export const searchResult = params => {
  return request({
    url: '/cloudsearch',
    params
  })
}

export const getSongByIdAPI = id => {
  return request({
    url: `/song/detail?ids=${id}`
  })
}

export const getLyricByIdAPI = id => {
  return request({
    url: `/lyric?id=${id}`
  })
}

export const getComment = params => {
  return request({
    url: '/comment/music',
    params
  })
}
