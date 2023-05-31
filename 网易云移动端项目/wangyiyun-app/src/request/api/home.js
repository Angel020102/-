import service from "..";
// 获取首页轮播数据
export function getBanner() {
  return service({
    method: 'get',
    url: '/banner?type=2'
  })
}
// 获取推荐歌单数据
export function getMusicList() {
  return service({
    method: 'get',
    url: '/personalized?limit=10'
  })
}
// 搜索歌词
export function getSearchMusic(data) {
  return service({
    method: 'get',
    url: `/search?keywords=${data}`

  })
}