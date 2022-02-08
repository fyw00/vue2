<template>
  <div class="course-content-list">
    <van-pull-refresh
    v-model="isRefreshing"
    @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          @click="$router.push({
            name: 'course-info',
            params: {
              courseId: item.id
            }
          })">
          <div>
            <img :src="item.courseImgUrl || item.image" alt="">
          </div>
          <div class="course-info">
            <h3 v-text="item.courseName || item.name"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p class="price-container" v-if="item.price">
              <span class="course-discounts">￥{{item.discounts}}</span>
              <s class="course-price">￥{{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContentList',
  props: {
    fetchData: {
      type: Function,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      isRefreshing: false
    }
  },
  methods: {
    async onRefresh () {
      this.currentPage = 1
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      this.$toast('刷新成功')
      this.isRefreshing = false
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      this.currentPage++
      this.loading = false
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
}
.van-cell__value img {
  height: 100%;
  width: 75px;
  border-radius: 5px;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-info .course-preview {
  flex-grow: 1;
}

.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}

p, h3 {
  margin: 0;
}
</style>
