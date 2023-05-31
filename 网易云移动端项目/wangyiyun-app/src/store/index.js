import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
export default createStore({
  state: {
    playList: [
      {
        al: {
          id: 3017104,
          name: "Queen of the Clouds",
          pic: 109951163112457780,
          picUrl: "https://p1.music.126.net/GlySJ0dQwc7tda25Pft5WA==/109951163112457777.jpg",
          pic_str: "109951163112457777"
        },
        id: 29460006,
        name: "Talking Body",
        ar: [{ name: 'Queen of the Clouds' }]
      }

    ],
    playListIndex: 0,
    isBtnShow: true, // 播放按钮的切换显示
    isPopup: false,  // 歌曲详情弹出层
    lyricList: {}, // 歌词部分
    currentTime: 0, // 歌单进行的事件
    duration: 0 // 歌曲总时长
  },
  getters: {
  },
  mutations: {
    updatePlay(state, value) {
      state.playList.push(value)
    },
    updateIsbtnShow(state, value) {
      state.isBtnShow = value
      console.log('触发了')
    },
    updatePlayList(state, value) {
      state.playList = value
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    upDateIsPopup(state) {
      state.isPopup = !state.isPopup
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
    },
    updateDuration(state, value) {
      state.duration = value
    }
  },
  actions: {
    async getLyric(context, value) {
      let { data } = await getMusicLyric(value)
      context.commit('updateLyricList', data.lrc)
      console.log(data)

    }
  },
  modules: {
  }
})
