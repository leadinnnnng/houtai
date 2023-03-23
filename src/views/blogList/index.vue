<template>
  <div class="blog-list-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column
        prop="date
      "
        label="序号"
        width="60"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + (currentPage - 1) * eachPage + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank "
              slot="reference"
              @click.prevent="goToTitleHandle(scope.row)"
            >
              {{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" width="250" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="浏览数" width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.scanNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论量" width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.commentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.category !== null ? scope.row.category.name : "未分类"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
      :page-count="eachPage"
      :page-sizes="[5, 10, 20]"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlog, delOneBlog } from "@/api/blog";
import { formatDate, frontEnd_URL } from "@/utils/tools";
import { server_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [],
      srcList: [],
      eachPage: 5, // 每一页显示的条数
      currentPage: 1, // 当前页码，默认进来是第一页
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(this.currentPage, this.eachPage);
      console.log(resp);
      this.data = resp.data.rows;
      for (let i of this.data) {
        i.createDate = formatDate(i.createDate);
        i.thumb = server_URL + i.thumb;
        this.srcList.push(i.thumb);
      }
      this.count = this.data.total;
      this.totalPage = Math.ceil(this.count / this.eachPage);
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        this.fetchData();
      }
    },
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除，是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneBlog(blogInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页相关事件
    sizeChangeHandle(pagerNum) {
      this.eachPage = parseInt(pagerNum);
      this.currentPage = 1;
      // this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style></style>
