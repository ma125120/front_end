<template>
  <MyPageLayout class="">
    <el-form 
      ref="ruleForm" 
      :rules="rules"
      :model="ruleForm" 
      class="form" 
      label-position="left"
      label-width="100px">
      <el-form-item label="用户账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" name="username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" autocomplete="off" name="nickname" />
      </el-form-item>
      <el-form-item label="头像">
        <MyUpload :src.sync="src" @change="changeSrc" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" autocomplete="off" type="number" name="age" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别" name="sex">
          <el-option v-for="(label, value) of $root.sex" :label="label" :value="+value" :key="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="ruleForm.role" placeholder="请选择用户角色" name="role">
          <MyRoleSelect />
          <!-- <el-option v-for="(label, value) of $root.roles" :label="label" :value="+value" :key="value" :disabled="+value === 1" /> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
      </el-form-item>

    </el-form>
  </MyPageLayout>
</template>

<script>
import { add } from '@/api/user'
import { obj2form } from '@/utils/index'
import { checkAge } from '@/utils/rule'

export default {
  name: 'Add',
  data() {
    return {
      ruleForm: {
        username: '',
        nickname: '',
        pwd: '123456',
        role: '',
        sex: '',
        avatar: '',
      },
      src: '',
      file: '',
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    changeSrc(src, file) {
      this.src = src;
      this.$set(this.ruleForm, 'avatar', src);
      this.file = file;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName = 'ruleForm') {
      this.$refs[formName].resetFields();
    },
    add() {
      var file = this.file,
          data = this.ruleForm;
      if (file) {
        data.avatar = '';
        data = obj2form(data, file);
      }

      add(data)
      .then(res => {
        this.$msg('success', res.errmsg);
        this.resetForm();
      });
    }
  }
}
</script>
