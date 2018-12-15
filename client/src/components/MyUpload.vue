<template>
  <div class="relative">
    <div v-show="src" class="upload--wrap relative">
      <img :src="src" alt="" class="dialog--avatar hover">
      <div class="avatar--modal absolute flex all-center" @click="del">
        <i class="el-icon-delete" />
      </div>
    </div>
    <div v-show="src == ''" class="hover">
      <div class="avatar--wrap flex all-center hover">+</div>
      <input :name="name" type="file" class="avatar--input absolute hover" @change="getFile" >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyUpload',
  props: {
    src: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'avatar'
    },
  },
  watch: {

  },
  created() {

  },
  methods: {
    getFile(e) {
      var file = e.target.files[0],
          file_type = file.type.split('/')[0];
      if (file_type !== 'image') {
        this.$emit('error', file);
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          var src = reader.result
          // this.src = src;
          this.$emit('update:src', src)
          this.$emit('change', src, file);
        }, false);
      }
    },
    del() {
      this.$emit('update:src', '')
      this.$emit('change', '', '');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin w_h() {
  width: 120px;
  height: 120px;
  border-radius: 6px;
}
.upload--wrap {
  @include w_h;
}
.dialog--avatar,
.avatar--wrap {
  @include w_h;
}
.avatar--modal {
  z-index: 10;
  top: 0;left: 0;
  @include w_h;
  background: rgba(0,0,0, .6);
  color: #fff;
  font-size: 24px;
  display: none;
}
.upload--wrap:hover .avatar--modal {
  display: flex;
  cursor: pointer;
}
.avatar--wrap {
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  font-size: 48px;
}
.avatar--input {
  @include w_h;
  opacity: 0;
  z-index: 10;
  top: 0;
  left: 0;
}
</style>
