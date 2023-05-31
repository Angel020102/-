<template>
  <ToNav />
  <SwpierTop />
  <lconList />
  <MusicList />
</template>

<script>
import ToNav from '@/components/home/ToNav.vue';
import SwpierTop from '@/components/home/SwpierTop.vue';
import lconList from '@/components/home/lconList.vue';
import MusicList from '@/components/home/MusicList.vue';
export default {
  name: 'Home',
  components: {
    ToNav,
    SwpierTop,
    lconList,
    MusicList
  }
};
</script>
