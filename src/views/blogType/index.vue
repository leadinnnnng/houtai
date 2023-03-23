<template>
  <div class="blog-type">
    <!-- 搜索框 -->
    <div style="margin-top: 15px; margin-left: 10px">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select blogInfo"
        style="width: 500px"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 10px"
        slot="append"
        @click="addBlogTypeHandle"
        >添加</el-button
      >
    </div>

    <!-- 分类表格 -->
    <div>
      <el-table :data="data" style="width: 100%" border>
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="博客类别" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="博客数量" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.articleCount }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="editBlogTypeHandle(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteBlogTypeHandle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑框 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="请选择活动区域">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType, //获取文章分类
  delOneQBlogType, //删除一个文章分类
  addOneBlogType, //添加一个文章分类
  updateOneBlogType, // 修改一个文章分类
  findOneBlogType, // 查找有一个文章分类
} from "@/api/blogType";
export default {
  data() {
    return {
      data: null,
      input: "",
      listLoading: false,
      select: 1,
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getBlogType().then((res) => {
        this.data = res.data;
        this.listLoading = false;

        console.log(res);
      });
    },
    addBlogTypeHandle() {
      if (this.input) {
        addOneBlogType({ name: this.input, order: this.select }).then((res) => {
          this.fetchData();
          this.$message.success("添加分类成功");
        });
      } else {
        this.$message.error("分类名称不能为空");
      }
    },
    deleteBlogTypeHandle({ id }) {
      this.$confirm(
        "删除该分类后，该分类下面的所有文章将变为未分类状态，是否继续?",
        "是否删除此文章分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneQBlogType(id).then(() => {
            this.fetchData();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editBlogTypeHandle({ id }) {
      findOneBlogType(id).then((res) => {
        this.dialogFormVisible = true;
        this.form = res.data;
      });
    },
    confirmEditBlogTypeHandle() {
      updateOneBlogType({
        id: this.form.id,
        data: this.form,
      }).then((res) => {
        this.fetchData();
        this.dialogFormVisible = false;
        this.$message.success("修改成功");
      });
    },
  },
};
</script>

<style>
.blogInfo {
  width: 400px;
  margin-bottom: 10px;
}
</style>
