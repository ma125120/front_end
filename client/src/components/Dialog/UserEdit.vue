<template>
  <el-dialog :visible="show" title="编辑用户信息" @close="close">
    <el-form ref="form" :model="form" class="form" label-position="left">
      <el-form-item :label-width="formLabelWidth" label="用户ID">
        <el-input v-model="info.id" readonly class = "readonly" name="id" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="昵称">
        <el-input v-model="info.nickname" autocomplete="off" name="nickname" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="头像">
        <MyUpload :src.sync="src" @change="changeSrc" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="年龄">
        <el-input v-model="info.age" autocomplete="off" type="number" name="age" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="性别">
        <el-select v-model="info.sex" placeholder="请选择性别" name="sex">
          <el-option v-for="(label, value) of $root.sex" :label="label" :value="+value" :key="value" />
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="用户角色">
        <el-select v-model="info.role" placeholder="请选择用户角色" name="role">
          <MyRoleSelect />
          <!-- <el-option v-for="(label, value) of $root.roles" :label="label" :value="+value" :key="value" :disabled="+value === 1" /> -->
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { edit } from '@/api/user'
import { obj2form } from '@/utils/index'

export default {
  name: 'UserEdit',
  props: {
    obj: {
      type: Object,
      default: function() { return {} }
    },
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      info: {},
      form: {
        nickname: '',
        age: '',
        sex: '',
        role: '',
      },
      fileList: [],
      formLabelWidth: '120px',
      src: '',
      file: '',
      roles: {
        1: '管理员',
        2: '普通用户',
      }
    }
  },
  watch: {
    obj(val) {
      this.info = { ...val };
      this.src = val.avatar ? this.$root.getFileUrl(val.avatar) : '';
      this.fileList = [{
        name: 'avatar',
        url: val.avatar,
      }]
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    },
    edit() {
      var file = this.file,
          data = this.info;
      if (file) {
        data.avatar = '';
        data = obj2form(data, file);
      }
      edit(data)
      .then(res => {
        this.$message({
          type: 'success',
          message: res.errmsg
        });
        this.$emit('success', res.data.result);
        this.close();
      }).catch(err => { this.close(err); });
    },
    changeSrc(src, file) {
      this.src = src;
      this.$set(this.info, 'avatar', src);
      this.file = file;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
