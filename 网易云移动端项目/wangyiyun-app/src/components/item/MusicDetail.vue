<template>
  <!-- 背景图片 -->
  <img :src="musicList.al.picUrl" alt="" class="backgroundImg" />
  <!-- 播放歌曲详情头部 -->
  <div class="detailTop">
    <!-- 头部_左侧 -->
    <div class="detailTopLeft">
      <div>
        <svg class="icon" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div style="margin-left: 15px">
        <Vue3Marquee>
          <p style="color: #fff">{{ musicList.al.name }}</p>
        </Vue3Marquee>
        <div>
          <span v-for="item in musicList.ar" :key="item.id">{{
            item.name
          }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
    </div>
    <!-- 头部_右侧 -->
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 播放歌曲详情内容 -->
  <div class="detailContent" v-if="!isLyricShow" @click="isLyricShow = true">
    <img
      src="@/assets/needle-ab.png"
      class="img_needle"
      :class="{ img_needle_active: !isBtnShow }"
    />
    <img src="@/assets/cd.png" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      class="img_ar"
      :class="[!isBtnShow ? 'img_ar_active' : 'img_ar_pauesd']"
    />
  </div>
  <!-- 显示歌词 -->
  <div class="musicLyric" ref="musicLyric" v-else @click="isLyricShow = false">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <!-- 播放歌曲详情底部 -->
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi2"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diandian"></use>
      </svg>
    </div>
    <!-- 歌曲播放进度条 -->
    <div class="footerContent">
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-zuobofang"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        fill="#fff"
        v-if="isBtnShow"
        @click="play"
        style="transform: scale(2)"
      >
        <use xlink:href="#icon-bofang4"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        v-else
        @click="play"
        style="transform: scale(2)"
      >
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-youbofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-list"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import { mapMutations, mapState } from 'vuex'
import 'vue3-marquee/dist/style.css'
export default {
  props: ['musicList', 'play', 'isBtnShow', 'addDuration'],
  data() {
    return {
      isLyricShow: false
    }
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playList', 'playListIndex', 'duration']),
    lyric() {
      let arr
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3)
          let sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lrc = item.slice(11, item.length)
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.length)
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          }
          return { min, sec, mill, lrc, time }
        })

        arr.forEach((item, index) => {
          if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
            item.pre = 0
          } else {
            item.pre = arr[index + 1].time
          }
        });
      }
      return arr
    }
  },
  watch: {
    currentTime(newValue) {
      if (!this.isLyricShow) return
      let p = document.querySelector('p.active')
      if (p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
      }
      if (this.currentTime === newValue) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0)
          // this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1)
        }
      }
    }
  },
  mounted() {
    this.addDuration()
  },
  methods: {
    ...mapMutations(['upDateIsPopup', 'updatePlayListIndex']),
    backHome() {
      this.isLyricShow = false
      this.upDateIsPopup()
    },
    goPlay(num) {
      let index = this.playListIndex + num
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index == this.playList.length.length) {
        index = 0
      }
      this.updatePlayListIndex(index)
    },
  },
  components: {
    Vue3Marquee
  }
}
</script>

<style lang="less" scoped>
.backgroundImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -999;
  filter: blur(60px);
}

// 头部样式
.detailTop {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;

  .detailTopLeft {
    width: 50%;
    display: flex;
    align-items: center;

    .icon {
      // width: 0.5rem;
      fill: #fff;
    }

    div {
      span {
        color: #999;
        font-size: 15px;
      }

      div {
        display: flex;
        padding-top: 3px;
      }
    }
  }
}

// 内容部分样式
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    top: 0;
    left: 45%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }

  .img_needle_active {
    transform: rotate(4deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    // bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    z-index: -2;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_pauesd {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musicLyric {
  width: 100%;
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  .active {
    color: #999;
    font-size: 20px;
  }

  p {
    color: #000;
    margin-bottom: 0.4rem;
    text-align: center;
  }
}

// 底部样式
.detailFooter {
  width: 100%;
  position: absolute;
  bottom: 30px;

  .footerTop {
    display: flex;
    justify-content: space-evenly;
    fill: #999;
    .icon {
      fill: #fff;
    }
  }

  .footerContent {
    width: 90%;
    height: 60px;
    margin: auto;
    padding-top: 10px;
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }

  .footer {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
