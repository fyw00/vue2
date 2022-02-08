import request from '@/utils/request'

export const getAllAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const getPurchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}

export const getCourseById = params => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params
  })
}

export const getSectionAndLesson = params => {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params
  })
}

export const getvideoInfo = params => {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}
