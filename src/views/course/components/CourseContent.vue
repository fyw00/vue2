<template>
  <div class="course-content">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <course-content-list
      :fetch-data="fetchData"
    ></course-content-list>
  </div>
</template>

<script>
import CourseContentList from '@/components/CourseContentList'
import { getAllAds, getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    fetchData (options) {
      return getQueryCourses(options)
    },
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.my-swipe img {
  height: 170px;
}

.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
