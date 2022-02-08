<template>
  <div class="course-info">
    <van-cell-group :style="styleOptions">
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <van-cell class="course-description">
        <h2 v-text="course.courseName"></h2>
        <p v-text="course.previewFirstField"></p>
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <van-cell class="course-detail">
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            />
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button type="primary" @click="handlePay">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import CourseSection from './components/courseSection'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  components: {
    CourseSection
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      course: {},
      sections: {},
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSections()
  },
  methods: {
    handlePay () {
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadSections () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}

.course-img {
  height: 280px;
}

.course-description {
  padding: 10px 20px;
  height: 150px;
}

.course-description h2 {
  padding: 0;
}

.course-sale-info{
  display: flex;
}

.course-sale-info .course-price {
  flex: 1;
  margin: 0;
}

.discounts {
  color: #ff7452;
  font-size: 24px !important;
  font-weight: 700;
}

.course-sale-info .tag {
  background: #f8f9fa;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
  padding: 7px;
  line-height: 15px;
  border-radius: 2px;
}

.van-cell-group {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price span {
  font-size: 14px;
}

.van-button {
  width: 50%;
  height: 80%;
}
</style>
