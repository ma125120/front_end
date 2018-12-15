<template>
  <div class = " flex all-center">
    <template v-if="total > 0">
      <el-pagination
        :page-size="pagesize"
        :total="total"
        :current-page="page"
        background
        layout="prev, pager, next, jumper, total"
        class="my-pagination"
        @current-change="changePage" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pagesize: {
      type: Number,
      default: 10
    },
    totalPages: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 20
    },
  },
  watch: {
    '$route'(to, from) {
      let { page, pagesize } = to.query;
      if (!this.getCurrentPage()) {
        this.$emit('change', +page || 1, +pagesize || 10);
      }
    }
  },
  created() {
    this.getCurrentPage();
  },
  methods: {
    changePage(val) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page: val, pagesize: this.pagesize },
      });
    },
    getCurrentPage() {
      var { page, pagesize } = this.$route.query,
          MAX_PAGESIZE = this.max;
      if (!page && !pagesize || (this.totalPages > 0 && (page > this.totalPages))) {
        this.$router.replace({
          path: this.$route.path,
          query: { ...this.$route.query, page: 1, pagesize: this.pagesize },
        });
        return true;
      } else if (pagesize > MAX_PAGESIZE) {
        this.$router.replace({
          path: this.$route.path,
          query: { ...this.$route.query, page: page || 1, pagesize: MAX_PAGESIZE },
        });
        return true;
      }
      return false;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-pagination {
  padding-top: 24px;   
}
</style>
