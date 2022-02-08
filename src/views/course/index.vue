<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import CourseHeader from './components/CourseHeader'
import CourseContent from './components/CourseContent'
import LayoutFooter from '@/components/LayoutFooter'
export default {
  name: 'Course',
  components: {
    LayoutFooter,
    CourseHeader,
    CourseContent
  }
}
</script>

<style lang="scss" scoped></style>
