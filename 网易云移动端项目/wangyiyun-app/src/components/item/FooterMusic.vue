<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="upDateIsPopup">
      <img :src="this.playList[this.playListIndex].al.picUrl" />
      <div>
        <p>{{ this.playList[this.playListIndex].name }}</p>
        <span style="font-size: 12px">横滑切换下一首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-bofang3"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${
        this.playList[this.playListIndex].id
      }.mp3`"
    ></audio>
    <van-popup
      :show="isPopup"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :isBtnShow="isBtnShow"
        :play="play"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MusicDetail from './MusicDetail.vue';
export default {
  data() {
    return {
      interVal: 0
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isBtnShow', 'isPopup']),
  },
  mounted() {
    console.log(this.playList);
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    ...mapMutations(['updateIsbtnShow', 'upDateIsPopup', 'updateCurrentTime', 'updateDuration']),

    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsbtnShow(false)
        this.updateTime()
        console.log(2)
      } else {
        this.$refs.audio.pause()
        this.updateIsbtnShow(true)
        clearInterval(this.interVal)
      }

    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
    }
  },
  watch: {
    // 监听下标发生改变,自动播放音乐
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    // 监听歌单列表发生变化
    playList() {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    }
  },
  components: {
    MusicDetail
  }
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;

  .footerLeft {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      margin: 0 0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
