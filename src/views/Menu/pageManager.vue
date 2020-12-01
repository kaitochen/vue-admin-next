<template>
  <div class="__container generate">
    <div class="__action">
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline"
        @click="addGroup"
        >新增组</el-button
      >
    </div>
    <div style="padding: 0 10px">
      <el-table
        :data="list"
        style="width: 100%"
        border
        :row-key="getTreeKey"
        :tree-props="{ children: 'pageList', hasChildren: 'hasPageList' }"
      >
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column
          prop="name"
          label="页面名称"
          width="200"
        ></el-table-column>
        <el-table-column prop="route" label="路由跳转"></el-table-column>
        <el-table-column
          prop="type"
          label="页面类型"
          :formatter="formatter"
          width="100"
        ></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>

        <el-table-column label="操作" width="300">
          <template v-slot="scope">
            <el-button
              type="text"
              v-if="scope.row.level == 1"
              @click="addPage(scope)"
              >新增</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.type == 'DYNAMIC'"
              @click="setPage(scope)"
              >页面设置器</el-button
            >
            <el-button type="text" @click="editItem(scope)">编辑信息</el-button>
            <el-button type="text" @click="deleteItem(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="dialogType === 'ADD_GROUP' || dialogType === 'EDIT_GROUP'"
        :model="dialogForm"
        :rules="rules"
        label-position="left"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="组名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            class="flex-full"
            v-model="dialogForm.sort"
            :min="0"
            :max="99"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <el-form
        v-else-if="dialogType === 'ADD_PAGE' || dialogType === 'EDIT_PAGE'"
        :model="dialogForm"
        :rules="rules"
        label-position="left"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="关联路由" prop="route">
          <el-input v-model="dialogForm.route" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="路由类型" prop="hide">
          <el-select v-model="dialogForm.type" placeholder="" class="flex-full">
            <el-option label="静态" value="STATIC"></el-option>
            <el-option label="动态" value="DYNAMIC"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            class="flex-full"
            v-model="dialogForm.sort"
            :min="0"
            :max="99"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      fullscreen
      :visible.sync="visible"
      :show-close="false"
      class="generate-dialog"
      :destroy-on-close="true"
      v-if="visible"
    >
      <generate-form
        :id="pageId"
        @quit="closeDialog"
        @import="importConfig"
        @save="saveConfig"
        @getHistory="getHistory"
        @getHistoryInfo="getHistoryInfo"
        @deleteHistory="deleteHistory"
      ></generate-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getPageList,
  addPageGroup,
  editPageGroup,
  deletePageGroup,
  addPage,
  editPage,
  deletePage,
  importPageConfig,
  getPageHistory,
  addPageHistory,
  pageHistoryDetail,
  deleteHistory
} from "@/api/role";
export default {
  name: "menuManager",
  components: {},
  data() {
    return {
      list: [],
      dialogVisible: false,
      dialogType: "",
      dialogTitle: "",
      dialogId: "",
      dialogForm: {
        name: "",
        sort: 0
      },
      rules: {
        name: {
          required: true,
          message: "名称不能为空",
          trigger: "change"
        },
        sort: { required: true, message: "排序不能为空", trigger: "change" }
      },
      visible: false,
      pageId: ""
    };
  },
  computed: {
    menuList() {
      return this.list.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });
    }
  },
  methods: {
    formatter(row, column, cellValue) {
      switch (cellValue) {
        case "STATIC":
          return "静态";
        case "DYNAMIC":
          return "动态";
        default:
          return "";
      }
    },
    getTreeKey(row) {
      return row.level + "_" + row.id;
    },

    addGroup() {
      this.dialogForm = {
        name: "",
        sort: 0
      };
      this.dialogType = "ADD_GROUP";
      this.dialogTitle = "新增组";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editGroup(data) {
      this.dialogForm = {
        name: data.name,
        sort: data.sort
      };
      this.dialogId = data.id;
      this.dialogType = "EDIT_GROUP";
      this.dialogTitle = "编辑组";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    addPage(scope) {
      this.dialogForm = {
        groupId: scope.row.id,
        name: "",
        sort: 0,
        type: "STATIC",
        route: ""
      };
      this.dialogType = "ADD_PAGE";
      this.dialogTitle = "新增";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editPage(data) {
      this.dialogForm = {
        groupId: data.groupId,
        name: data.name,
        sort: data.sort,
        type: data.type,
        route: data.route
      };
      this.dialogId = data.id;
      this.dialogType = "EDIT_PAGE";
      this.dialogTitle = "编辑";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editItem(scope) {
      const data = scope.row;
      switch (data.level) {
        case 1:
          this.editGroup(data);
          break;
        case 2:
          this.editPage(data);
          break;
      }
    },
    deleteItem(scope) {
      const data = scope.row;
      switch (data.level) {
        case 1:
          this.$confirm("确定删除该组，删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deletePageGroup(data.id).then(res => {
                if (res.code === 200) {
                  this.$message.success("删除组成功！");
                  this.getPageList();
                } else {
                  this.$message.error(res.msg);
                }
              });
            })
            .catch(() => {});
          break;
        case 2:
          this.$confirm("确定删除该页面，删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deletePage(data.id).then(res => {
                if (res.code === 200) {
                  this.$message.success("删除页面成功！");
                  this.getPageList();
                } else {
                  this.$message.error(res.msg);
                }
              });
            })
            .catch(() => {});
          break;
      }
    },
    submit() {
      this.$refs.form.validate(valid => {
        console.log(valid);
        if (valid) {
          switch (this.dialogType) {
            case "ADD_GROUP":
              addPageGroup(this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增组成功！");
                  this.dialogVisible = false;
                  this.getPageList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "EDIT_GROUP":
              editPageGroup(this.dialogId, this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("编辑组成功！");
                  this.dialogVisible = false;
                  this.getPageList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "ADD_PAGE":
              addPage(this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增页面成功！");
                  this.dialogVisible = false;
                  this.getPageList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "EDIT_PAGE":
              editPage(this.dialogId, this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("编辑页面成功！");
                  this.dialogVisible = false;
                  this.getPageList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
          }
        }
      });
    },
    setPage(scope) {
      this.pageId = scope.row.id;
      this.visible = true;
      // this.$router.push("/generator", {
      //   query: { pageId: scope.row.id }
      // });
    },
    getPageList() {
      getPageList().then(res => {
        if (res.code === 200) {
          this.list = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    closeDialog() {
      this.visible = false;
    },
    importConfig(fn) {
      importPageConfig().then(res => {
        if (res.code === 200) {
          fn(res.data.page, res.data.config);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    saveConfig(data) {
      addPageHistory({
        ...data,
        pageId: this.pageId
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.closeDialog();
        } else {
          this.$message.error(res.msg);
        }
      });
      // savePageConfig(data).then(res => {
      //   console.log(res);
      // });
    },
    getHistory(fn) {
      getPageHistory(this.pageId).then(res => {
        if (res.code === 200) {
          fn(res.data);
        }
      });
    },
    getHistoryInfo(params) {
      let { id } = params.data;
      pageHistoryDetail(id).then(res => {
        if (res.code === 200) {
          params.callback(res.data);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    deleteHistory(params) {
      console.log(params);
      let { id } = params.data;
      deleteHistory(id).then(res => {
        if (res.code === 200) {
          params.callback(res.data);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getPageList();
  }
};
</script>
<style lang="scss">
.__container {
  .__action {
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.generate-dialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
