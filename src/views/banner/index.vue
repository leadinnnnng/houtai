<template>
  <div class="banner">
    <el-table :data="data" style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="描述" width="250" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中图预览" width="180" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" width="180" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="data">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBannerApi } from "@/api/banner";
import { server_URL } from "@/urlConfig";
export default {
  data() {
    return {
      data: [],
      dialogFormVisible: true,
      form: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await getBannerApi();
      this.data = resp.data;
      for (let item of this.data) {
        item.bigImg = server_URL + item.bigImg;
        item.midImg = server_URL + item.midImg;
      }
      console.log(this.data);
    },
  },
};
</script>

<style></style>
