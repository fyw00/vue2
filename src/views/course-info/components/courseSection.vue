<template>
  <div class="course-section">
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <p
      class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="handleClick(item)"
    >
      <span v-text="item.theme"></span>
      <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
      <van-icon v-else name="lock" size="20"></van-icon>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CourseSection',
  props: {
    sectionData: {
      type: Object,
      require: true
    }
  },
  methods: {
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-section {
  padding: 0 20px;
}

.lesson {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
}
</style>
