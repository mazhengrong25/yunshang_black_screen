<!--
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-05 15:35:48
 * @LastEditTime: 2021-12-14 15:48:31
 * @LastEditors: mzr
-->
<template>
    <div class="header">

        <v-card class="header_card">
            <v-card-title>

                <div class="header_img">
                    <img src="../assets/logo.png" alt="登陆图标" />
                </div>

                <v-spacer></v-spacer>

                <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn dark icon v-bind="attrs" v-on="on">
                            {{ userInfo.UserName }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="signOut">退出登陆</v-list-item>
                    </v-list>
                </v-menu>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                UserName: "",
            }
        }
    },
    methods: {
        // 退出登陆
        signOut() {
            window.location.href = '/'
        }
    },
    created() {
        this.userInfo.UserName = sessionStorage.getItem('UserName');
    }
}
</script>

<style lang="less" scoped>
.header {
    .header_card {
        height: 70px;
        background-color: #1976d2;
        .header_img {
            width: 160px;
            height: 40px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>