<template>
  <!-- 搜索栏 -->
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="张国荣"
      @keydown.enter="entryKey"
      v-model="searchKey"
    />
  </div>
  <!-- 搜索的历史记录 -->
  <div class="searchHistory">
    <span class="spanHistory">历史</span>
    <span
      v-for="(item, index) in keyWordList"
      :key="index"
      class="historyRecord"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
    <svg
      class="icon"
      aria-hidden="true"
      fill="#999"
      @click="deleteHistory"
      v-show="keyWordList.length !== 0"
    >
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div
    class="playList"
    v-for="(item, index) in searchList"
    :key="item.id"
    v-if="searchKey"
  >
    <span>{{ index + 1 }}</span>
    <div @click="updateIndex(item)">
      <div class="songTitle">
        {{ item.album.name }}
      </div>
      <span class="singerName" v-for="i in item.artists" :key="i.id">
        {{ i.name }}
      </span>
    </div>
    <svg class="icon" aria-hidden="true" v-if="item.mvid">
      <use xlink:href="#icon-caozuo-bofang"></use>
    </svg>
    <svg class="icon" aria-hidden="true" fill="#888">
      <use xlink:href="#icon-diandian"></use>
    </svg>
  </div>
</template>

<script>
import { getSearchMusic } from '@/request/api/home'
export default {
  data() {
    return {
      keyWordList: this.keyWordList = localStorage.getItem('keyWordList') ? JSON.parse(localStorage.getItem('keyWordList')) : [],
      searchKey: '',
      searchList: []
    }
  },
  methods: {
    async entryKey() {
      if (!this.searchKey) return
      if (this.keyWordList.length >= 10) {
        this.keyWordList.pop()
      }
      this.keyWordList.unshift(this.searchKey)
      this.keyWordList = [...new Set(this.keyWordList)]
      let { data } = await getSearchMusic(this.searchKey)
      this.searchList = data.result.songs
      console.log(data)
      localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
    },
    deleteHistory() {
      this.keyWordList = []
      this.searchKey = ''
      localStorage.setItem('keyWordList', '')
    },
    async searchHistory(item) {
      let { data } = await getSearchMusic(item)
      this.searchList = data.result.songs
      this.searchKey = item
      console.log(data)
    },
    updateIndex(item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('updatePlay', item)
      this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
    }

  }
}
</script>


<style  lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    width: 90%;
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    padding: 10px;
  }
}
.searchHistory {
  width: 100%;
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0.2rem 0 0.2rem;
  .historyRecord {
    font-size: 13px;
    padding: 0.1rem 0.3rem;
    margin-right: 10px;
    margin-bottom: 5px;
    border-radius: 15px;
    background-color: #d7cbcb;
  }
  .spanHistory {
    font-weight: 800;
    margin-right: 0.5rem;
  }
}
.playList {
  width: 100%;
  // border: 1px solid red;
  margin: 0.2rem 0;
  display: flex;
  align-items: center;
  padding: 0 0.2rem;
  span {
    width: 0.4rem;
    text-align: center;
    margin-right: 0.2rem;
  }
  .singerName {
    font-size: 0.24rem;
  }
  div {
    flex: 1;
  }
  .icon {
    margin-left: 0.2rem;
  }
}
</style>