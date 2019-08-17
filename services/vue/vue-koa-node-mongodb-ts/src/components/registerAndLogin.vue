<template>
  <el-dialog title="登录"
             :width="isMobile ? '90%' : '50%'"
             :visible="dialogVisible"
             @close="cancel">
    <el-form>
      <el-form-item label="邮箱"
                    :label-width="formLabelWidth">
        <el-input v-model="params.email"
                  placeholder="邮箱"
                  auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="密码"
                    :label-width="formLabelWidth">
        <el-input type="password"
                  placeholder="密码"
                  v-model="params.password"
                  auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item v-if="handleFlag === 'register'"
                    label="昵称"
                    :label-width="formLabelWidth">
        <el-input v-model="params.name"
                  placeholder="用户名或者昵称"
                  auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item v-if="handleFlag === 'register'"
                    label="手机"
                    :label-width="formLabelWidth">
        <el-input v-model="params.phone"
                  placeholder="手机号"
                  auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item v-if="handleFlag === 'register'"
                    label="简介"
                    :label-width="formLabelWidth">
        <el-input v-model="params.desc"
                  placeholder="个人简介"
                  auto-complete="off">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="success"
                 @click="handleOAuth">
        github 授权登录
      </el-button>
      <el-button v-if="handleFlag === 'login'"
                 :loading="btnLoading"
                 type="primary"
                 @click="handleOk('login')">
        登录
      </el-button>
      <el-button v-if="handleFlag === 'register'"
                 :loading="btnLoading"
                 type="primary"
                 @click="handleOk('register')">
        注册
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import config from '@/utils/config';

@Component
export default class RegisterAndLogin extends Vue {
  @Prop({ default: false }) visible!: boolean;
  @Prop({ default: '' }) handleFlag!: string;
  @Prop({ default: '' }) isMobile!: string;

  // initial data.
  btnLoading: boolean = false;
  loading: boolean = false;
  formLabelWidth: string = this.isMobile ? '40px' : '60px';
  params: any = {
    email: '',
    name: '',
    password: '',
    phone: '',
    desc: '',
  }

  // lifecycle hook
  mounted() {}

  // computed
  get dialogVisible() {
    return this.visible;
  }

  // method
  handleOAuth() {
    // 保存授权前的页面链接内容
    let preventHistory: object = {
      name: this.$route.name,
      query: this.$route.query,
    };
    window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
  }

  handleOk() {
    const reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!this.params.email) {
      this.$message.warning('邮箱不能空!');
      return;
    }
    if (!reg.test(this.params.email)) {
      this.$message.warning('请输入正确的邮箱');
      return;
    }
    if (this.handleFlag === 'register') {
      if (!this.params.password) {
        this.$message.warning('密码不能为空!');
        return;
      }
      if (!this.params.name) {
        this.$message.warning('用户名不能为空!');
        return;
      }
      const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (this.params.phone && !re.test(this.params.phone)) {
        this.$message.warning('请输入正确的手机号!');
        return;
      }
    }
    this.submit();
  }

  // this.$emit
  @Emit()
  cancel() {
    return false;
  }

  @Emit('ok')
  async submit() {
    let res: any = "";
    this.btnLoading = true;
    if (this.handleFlag === 'register') {
      res = await this.$https.post(this.$urls.register, this.params);
    } else {
      res = await this.$https.post(this.$urls.login, this.params);
    }
    this.btnLoading = false;
    if (res.status === 200) {
      if (res.data.code === 0) {
        const data: any = res.data.data;
        const userInfo: object = {
          _id: data._id,
          name: data.name,
          avatar: data.avatar,
        };
        this.$store.commit('SAVE_USER', {
          userInfo
        });
        window.sessionStorage.userInfo = JSON.stringify(userInfo);
        this.$message.success(res.data.message);
        return false;
      } else {
        this.$message.error(res.data.message);
        return true;
      }
    } else {
      this.$message.error('网络错误!');
      return true;
    }
  }
}

</script>
