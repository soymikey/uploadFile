<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <input
      type="file"
      title="选择图片"
      @change="InmageChange"
      ref="chooseInmage"
      accept="image/png, image/jpeg, image/gif, image/jpg"
    />
    <!-- <form enctype="multipart/form-data"> -->
      <input name="file" @change="fileChange" ref="file" type="file" />
      <!-- <input type="button" value="Upload" />
    </form> -->
  </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted () {},
  methods: {
    fileChange () {
      let f = this.$refs['file'].files[0]
      let formdata = new FormData()
      formdata.append('f', f)
      axios.post('api/upload', formdata).then(r => {
        if (r.data.code === 0) {
          alert('文件上传成功', r.data.data)
          this.$refs['file'].value = ''
        } else {
          alert('文件上传失败')
        }
      })
    },
    InmageChange () {
      // 发送图片
      let f = this.$refs['chooseInmage'].files[0]
      if (f.type.indexOf('image') === -1) {
        alert('只能上传图片!')
        return
      }
      const isLt1M = f.size / 1024 / 1024 < 1
      if (!isLt1M) {
        alert('图片大小不能超过 1MB!')
        return
      }
      let formdata = new FormData()
      formdata.append('f', f)
      axios.post('api/upload', formdata).then(r => {
        if (r.data.code === 0) {
          alert('图片上传成功', r.data.data)
        } else {
          alert('图片上传失败')
        }
      })
      this.$refs['chooseInmage'].value = ''
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
