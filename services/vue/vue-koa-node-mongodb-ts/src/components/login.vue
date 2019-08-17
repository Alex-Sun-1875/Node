<template>
  <Dialog title="登录"
          width="60"
          :visible="dialogVisible"
          @close="cancel">
    <Form>
      <FormItem label="邮箱"
                placeholder="邮箱"
                :label-width="formLabelWidth">
        <Input v-model="params.email" autocomplete="off">
      </FormItem>
      <FormItem Label="密码"
                :label-width="formLabelWidth">
        <Input type="password"
               placeholder="密码"
               v-model="params.password"
               autocomplete="off">
      </FormItem>
    </Form>
    <div slot="footer"
         class="dialog-footer">
      <Button type="success"
              @click="handleAuth">
        github 授权登录
      </Button>
      <Button type="primary"
              @click="handleOk">
        确定
      </Button>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Dialog, Form, FormItem, Input, Button, Message } from 'element-ui';
import config from "@/utils/config";

@Component({
  components: {
    Dialog,
    Form,
    FormItem,
    Input,
    Button,
  }
})
export default class Login extends Vue {
  @Prop({ default: false }) visible!: boolean;

  // initial data
  btnLoading: boolean = false;
  loading: boolean = false;
  formLabelWidth: string = '60px';
  params: any = {
    email: '',
    password: '',
  }

  // lifecycle hook
  mounted() {
    // TODO:
  }

  // computed
  get dialogVisible() {
    return this.visible;
  }

  // method
  handleAuth() {
    // 保存授权前的页面链接内容

    let preventHistory = {
      pathname: window.location.pathname,
      search: window.location.search,
    };
    window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=http://biaochenxuying.cn/login'
    window.location.href = `${config.oauth_uri}?client_id=${
      config.client_id
    }&redirect_uri=${config.redirect_uri}`;
  }

  handleOk() {
    const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!this.params.email) {
      this.$message({
        message: '邮箱不能为空',
        type: 'warning',
      });
      return;
    } else if (!reg.test(this.params.email)) {
      this.$message({
        message: '请输入正确的邮箱',
        type: 'warning',
      });
      return;
    } else if (!this.params.password) {
      this.$message({
        message: '密码不能为空',
        type: 'warning',
      });
      return;
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
    const res: any = await this.$https.post(this.$urls.login, this.params);
    console.log(res);
    if (res.status === 200) {
      if (res.data.code === 0) {
        const data: any = res.data.data;
        const userInfo: object = {
          _id: data._id,
          name: data.name,
          avatar: data.avatar,
        };
        window.sessionStorage.userInfo = JSON.stringify(userInfo);
        this.$message.success(res.data.message);
      } else {
        this.$message.error(res.data.message);
      }
    } else {
      this.$message.error('网络错误');
    }
  }
}

</script>
