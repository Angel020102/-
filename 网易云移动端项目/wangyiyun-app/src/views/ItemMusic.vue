<template>
  <ItemMusicTop :playlist="state.playlist" />
  <itemMusicList
    :itemList="state.itemList"
    :subscribedCount="state.playlist.subscribedCount"
  />
</template>
<script>
import { useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { getMusicItemList, getItemList } from '@/request/api/item';
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import itemMusicList from '@/components/item/ItemMusicList.vue';

export default {
  setup() {
    let state = reactive({
      playlist: {},
      itemList: []
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      // 获取歌单详情
      let { data } = await getMusicItemList(id);
      state.playlist = data.playlist;
      // 获取歌单所有歌曲
      let res = await getItemList(id);
      state.itemList = res.data.songs;
      // 防止页面刷新数据丢失,将数据保存本地
      sessionStorage.setItem('itemDetail', JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    itemMusicList
  }
};
</script>
