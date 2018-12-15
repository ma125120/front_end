<template>
  <MyPageLayout class="">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id || scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname || '无' }}
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <a v-if="scope.row.avatar" :href="$root.getFileUrl(scope.row.avatar)" target="_blank">
            <img :src="$root.getFileUrl(scope.row.avatar)" alt="" class="list--avatar">
          </a>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex | sex }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.role | role }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | datetime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span class="user--edit option--item" @click="edit(scope.row, scope.$index)">编辑</span>
          <span class="user--del option--item" @click="del(scope.row.id)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- eslint-disable-next-line -->
    <MyPagination :total = "total" :pagesize = "pagesize" :page="page" :totalPages = "totalPages" @change = "changePage" />

    <!-- 编辑用户 -->
    <UserEdit :obj="obj" :show.sync="show" @success="changeUser" />
  </MyPageLayout>
</template>

<script>
import { getList, del } from '@/api/user'
import UserEdit from '@/components/Dialog/UserEdit'

export default {
  name: 'List',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { UserEdit },
  data() {
    return {
      list: null,
      listLoading: true,
      pagesize: 10,
      total: 0,
      totalPages: 1,
      page: 1,

      show: false,
      index: -1,
      obj: null,
    }
  },
  mounted() {
    let { page, pagesize } = this.$route.query;
    this.page = +page || 1;
    this.pagesize = +pagesize || 10;
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.page, this.pagesize).then(({ data }) => {
        this.list = data.data;
        this.listLoading = false;
        this.total = data.count;
        this.totalPages = data.totalPages;
      });
    },
    changePage(page, pagesize) {
      this.page = page;
      this.pagesize = pagesize;
      this.fetchData();
    },
    del(id) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delUser(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    delUser(id) {
      del(id)
      .then(({ data, errno }) => {
        if (errno === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();
        }
      });
    },
    edit(obj, index) {
      this.index = index;
      this.show = true;
      this.obj = { ...obj };
    },
    changeUser(info) {
      this.$set(this.list, this.index, info);
    }
  }
}
</script>
