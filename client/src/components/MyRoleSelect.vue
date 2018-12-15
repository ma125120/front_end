<template>
  <div class="">
    <el-option v-for="(label, value) of $root.roles" :label="label" :value="+value" :key="value" :disabled="+value === 1" />
  </div>
</template>

<script>
export default {
  name: 'MyRoleSelect',
}
</script>

