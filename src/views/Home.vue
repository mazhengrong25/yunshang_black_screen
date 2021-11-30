<!--
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-04 11:40:12
 * @LastEditTime: 2021-11-29 14:36:34
 * @LastEditors: mzr
-->
<template>
    <div class="home_contain">
        <div class="container">

            <div class="title">
                <img src="../assets/logo.png" alt="登陆图标" />
                <p>黑屏日志</p>
            </div>

            <div class="home_content">
                <v-form ref="form" v-model="valid" lazy-validation class="home_form" @keydown.enter.native="keyEvent()">
                    <v-text-field class="home_input" v-model="name" :rules="nameRules" label="用户名" solo></v-text-field>
                    <v-text-field class="home_input" v-model="password" :rules="psRules" label="密码" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" solo></v-text-field>

                    <!-- <v-btn :disabled="!valid" @click="validate">登陆</v-btn> -->
                    <v-btn :disabled="!valid" @click="validate">登陆</v-btn>

                    <v-btn @click="reset">重置</v-btn>
                    <v-alert class="home_alert" dense outlined type="error" v-model="alert">{{messageInfo}}</v-alert>
                </v-form>
            </div>
        </div>

    </div>

</template>

<script>
export default {

    data() {
        return {
            valid: true,

            name: '',
            nameRules: [
                v => !!v || '请输入用户名',
            ],

            password: '',
            psRules: [
                v => !!v || '请输入密码',
            ],
            show1: false,
            message: "", // 接口返回信息
            status: false, // 接口状态

            alert: false, // 提示框状态
            messageInfo: "", // 提示框内容
        }
    },
    methods: {
        // 登陆
        validate() {

            if (this.$refs.form.validate()) {
                let data = {
                    UserName: this.name,
                    Password: this.password
                }
                this.$axios.post('/webapi/token/login', data).then((res) => {
                    console.log(res)
                    if (res.status === 0) {
                        sessionStorage.setItem('UserName', this.name)
                        sessionStorage.setItem('token', res.token)
                        this.$router.push({
                            name: 'Log',
                            path: "/log",
                        });
                    } else {
                        this.alert = true
                        this.messageInfo = res.message
                    }


                })
            }

        },
        // 监听键盘
        keyEvent() {
            var key = window.event.keyCode
            if (key === 13) {
                this.validate();
            }
        },
        // 重置
        reset() {
            this.$refs.form.reset()
            this.alert = false
        },

    },
}
</script>


<style lang="less" scoped>
.home_contain {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        to bottom right,
        rgba(0, 123, 255, 0.8),
        rgba(0, 123, 255, 0.2)
    );
    .container {
        // position: absolute;
        .title {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-size: 25px;
            font-weight: 200;
            color: #fff;
            img {
                width: 165px;
                object-fit: contain;
                margin-right: 5px;
            }
            p {
                position: relative;
                padding-left: 10px;
                margin: 0;
                &::after {
                    content: "";
                    position: absolute;
                    display: block;
                    left: 0;
                    top: 6px;
                    height: 75%;
                    background: hsla(0, 0%, 100%, 0.5803921568627451);
                    width: 2px;
                }
            }
        }
        .home_content {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            .home_form {
                .home_input {
                    width: 250px;
                }
                button {
                    width: 100px;
                    color: #333;
                    background-color: #fff;
                    &:not(:last-child) {
                        margin-right: 10px;
                        margin-left: 10px;
                    }
                }
            }
        }
        .home_alert {
            // position: relative;
            margin-top: 30px;
        }
    }
}
</style>