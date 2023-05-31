import service from '..'

// 获取歌单详情页数据

export function getMusicItemList(id) {
  return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`
  })
}

// 获取歌单所有的歌曲
export function getItemList(id) {
  return service({
    method: 'get',
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}

// 获取歌词
export function getMusicLyric(id) {
  return service({
    method: 'get',
    url: `/lyric?id=${id}`
  })
}