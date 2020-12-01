<template>
  <div class="__container generate">
    <div class="__action">
      <el-button type="text" icon="el-icon-circle-plus-outline" @click="addMenu"
        >新增菜单</el-button
      >
    </div>
    <div style="padding: 0 10px">
      <el-table
        :data="list"
        style="width: 100%"
        border
        :row-key="getTreeKey"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="name"
          label="菜单名"
          width="200"
        ></el-table-column>
        <el-table-column prop="icon" label="图标" width="80">
          <template v-slot="scope">
            <i :class="scope.row['icon']"></i>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="50"></el-table-column>
        <el-table-column prop="pageName" label="路由地址"></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :formatter="formatter"
          width="100"
        ></el-table-column>
        <el-table-column prop="role" label="权限标识"></el-table-column>
        <el-table-column
          prop="hide"
          label="是否隐藏"
          :formatter="formatter"
          width="100"
        ></el-table-column>
        <el-table-column label="操作" width="300">
          <template v-slot="scope">
            <el-button
              type="text"
              v-if="scope.row.level == 1"
              @click="addSubMenu(scope)"
              >新增子菜单</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.level == 2"
              @click="addAction(scope)"
              >新增操作</el-button
            >
            <el-button type="text" @click="editItem(scope)">修改</el-button>
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
        v-if="dialogType === 'ADD_MENU' || dialogType === 'EDIT_MENU'"
        :model="dialogForm"
        :rules="rules"
        label-position="left"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="dialogForm.type">
            <el-radio label="LEFT">左菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <icon-picker :select.sync="dialogForm.icon"></icon-picker>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
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
        <el-form-item label="是否隐藏" prop="hide">
          <el-radio-group v-model="dialogForm.hide">
            <el-radio label="NO">否</el-radio>
            <el-radio label="YES">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form
        v-else-if="
          dialogType === 'ADD_SUB_MENU' || dialogType === 'EDIT_SUB_MENU'
        "
        :model="dialogForm"
        :rules="rules"
        label-position="left"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="上级菜单" prop="menuId">
          <el-select
            v-model="dialogForm.menuId"
            clearable
            placeholder=""
            class="flex-full"
          >
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <icon-picker :select.sync="dialogForm.icon"></icon-picker>
        </el-form-item>
        <el-form-item label="路由地址" prop="pageId">
          <el-cascader
            class="flex-full"
            :options="options"
            v-model="dialogForm.pageId"
            :show-all-levels="false"
            :props="cascadeProp"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="role">
          <el-input v-model="dialogForm.role"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            class="flex-full"
            v-model="dialogForm.sort"
            :min="0"
            :max="99"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="hide">
          <el-radio-group v-model="dialogForm.hide">
            <el-radio label="NO">否</el-radio>
            <el-radio label="YES">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form
        v-if="dialogType === 'ADD_ACTION' || dialogType === 'EDIT_ACTION'"
        :model="dialogForm"
        :rules="rules"
        label-position="left"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="操作名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="role">
          <el-input v-model="dialogForm.role"></el-input>
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
  </div>
</template>
<script>
import IconPicker from "admin-page-generator/components/IconPicker";
import {
  getMenuList,
  getPageList,
  addMenu,
  editMenu,
  deleteMenu,
  addSubMenu,
  editSubMenu,
  deleteSubMenu,
  addAction,
  editAction,
  deleteAction
} from "@/api/role";
export default {
  name: "menuManager",
  components: {
    IconPicker
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      dialogType: "",
      dialogTitle: "",
      dialogId: "",
      dialogForm: {
        type: "LEFT",
        icon: "",
        name: "",
        sort: 0,
        hide: "NO"
      },
      rules: {
        name: {
          required: true,
          message: "菜单名称不能为空",
          trigger: "change"
        },
        sort: { required: true, message: "排序不能为空", trigger: "change" }
      },
      options: [],
      cascadeProp: {
        value: "id",
        label: "name",
        children: "pageList",
        checkStrictly: false
        // multiple: true
      }
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
        case "NO":
          return "否";
        case "YES":
          return "是";
        case "LEFT":
          return "左菜单";
        default:
          return "";
      }
    },
    getTreeKey(row) {
      return row.level + "_" + row.id;
    },

    addMenu() {
      this.dialogForm = {
        type: "LEFT",
        icon: "",
        name: "",
        sort: 0,
        hide: "NO"
      };
      this.dialogType = "ADD_MENU";
      this.dialogTitle = "新增菜单";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editMenu(data) {
      this.dialogForm = {
        type: data.type,
        icon: data.icon,
        name: data.name,
        sort: data.sort,
        hide: data.hide
      };
      this.dialogId = data.id;
      this.dialogType = "EDIT_MENU";
      this.dialogTitle = "编辑菜单";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    addSubMenu(scope) {
      this.dialogForm = {
        menuId: scope.row.id,
        icon: "",
        role: "",
        name: "",
        sort: 0,
        hide: "NO",
        pageId: ""
      };
      this.dialogType = "ADD_SUB_MENU";
      this.dialogTitle = "新增子菜单";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editSubMenu(data) {
      this.dialogForm = {
        menuId: data.menuId,
        icon: data.icon,
        name: data.name,
        sort: data.sort,
        role: data.role,
        hide: data.hide,
        pageId: data.pageId
      };
      this.dialogId = data.id;
      this.dialogType = "EDIT_SUB_MENU";
      this.dialogTitle = "编辑子菜单";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    addAction(scope) {
      this.dialogForm = {
        menuSubId: scope.row.id,
        name: "",
        role: "",
        sort: 0
      };
      this.dialogType = "ADD_ACTION";
      this.dialogTitle = "新增操作";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editAction(data) {
      this.dialogForm = {
        menuSubId: data.menuSubId,
        name: data.name,
        role: data.role,
        sort: data.sort
      };
      this.dialogId = data.id;
      this.dialogType = "EDIT_ACTION";
      this.dialogTitle = "编辑操作";
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editItem(scope) {
      const data = scope.row;
      switch (data.level) {
        case 1:
          this.editMenu(data);
          break;
        case 2:
          this.editSubMenu(data);
          break;
        case 3:
          this.editAction(data);
          break;
      }
    },
    deleteItem(scope) {
      const data = scope.row;
      switch (data.level) {
        case 1:
          this.$confirm("确定删除该菜单，删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteMenu(data.id).then(res => {
                if (res.code === 200) {
                  this.$message.success("删除菜单成功！");
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
            })
            .catch(() => {});
          break;
        case 2:
          this.$confirm("确定删除该子菜单，删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteSubMenu(data.id).then(res => {
                if (res.code === 200) {
                  this.$message.success("删除子菜单成功！");
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
            })
            .catch(() => {});
          break;
        case 3:
          this.$confirm("确定删除该操作，删除后不可恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteAction(data.id).then(res => {
                if (res.code === 200) {
                  this.$message.success("删除操作成功！");
                  this.getMenuList();
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
            case "ADD_MENU":
              addMenu(this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增菜单成功！");
                  this.dialogVisible = false;
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "EDIT_MENU":
              editMenu(this.dialogId, this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("编辑菜单成功！");
                  this.dialogVisible = false;
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "ADD_SUB_MENU":
              addSubMenu(this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增子菜单成功！");
                  this.dialogVisible = false;
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "EDIT_SUB_MENU":
              editSubMenu(this.dialogId, this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("编辑子菜单成功！");
                  this.dialogVisible = false;
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "ADD_ACTION":
              addAction(this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("新增操作成功！");
                  this.dialogVisible = false;
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
            case "EDIT_ACTION":
              editAction(this.dialogId, this.dialogForm).then(res => {
                if (res.code === 200) {
                  this.$message.success("编辑操作成功！");
                  this.dialogVisible = false;
                  this.getMenuList();
                } else {
                  this.$message.error(res.msg);
                }
              });
              break;
          }
        }
      });
    },
    getMenuList() {
      getMenuList()
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.list = res.data;
          }
        })
        .catch(err => {
          console.warn(err);
        });
    },
    getPageList() {
      getPageList().then(res => {
        if (res.code === 200) {
          this.options = res.data;
        }
      });
    }
  },
  mounted() {
    this.getMenuList();
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
</style>
