<template>
  <div class="conatiner">
    <div class="my_left">
      <div class="my_details">
        <div class="img_box">
          <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3114521287~100x100.awebp" alt="">
        </div>
        <div class="my_base">
          <div class="user_name">
            <span>{{ userName }}</span>
            <div class="user_lv">
              <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/9b2f31c663d17de59dd9e5fff272bb85.svg" alt="">
            </div>
          </div>
          <div class="user_label">
            <div class="tips">
              <span>{{ tips }}</span>
            </div>
            <div class="hobby">
              <span>{{ hobby }}</span>
            </div>
          </div>
        </div>
        <div class="update_box">
          <div class="social_box" v-if="!routerS.isWindow">
            <div class="follow">
              <span class="num">
                99
              </span>
              <div class="social_type">
                关注
              </div>
            </div>
            <div class="fans">
              <span class="num">
                9270
              </span>
              <div class="social_type">
                关注者
              </div>
            </div>
            <div class="article_number">
              <span class="num">
                23
              </span>
              <div class="social_type">
                总文章数
              </div>
            </div>
          </div>
          <div class="update_base">
            <span>{{ routerS.isWindow? '编辑个人资料': '设置' }}</span>
          </div>
        </div>
      </div>
      <div class="my_bottom">
      </div>
    </div>
    <div class="social_box" v-if="routerS.isWindow">
      <div class="social_top">
        <div class="follow">
          <div class="social_type">
            关注了
          </div>
          <span class="num">
            99
          </span>
        </div>
        <div class="line"></div>
        <div class="fans">
          <div class="social_type">
            关注者
          </div>
          <span class="num">
            9270
          </span>
        </div>
      </div>
      <div class="user_order">
        <div class="article_number">
          <span>总文章数</span>
          <span>{{ 100 }}</span>
        </div>
        <div class="article_open_number">
          <span>公开文章数</span>
          <span>{{ 20 }}</span>
        </div>
        <div class="live_label">
          <span>关注标签</span>
          <span>{{ 20 }}</span>
        </div>
        <div class="create_time">
          <span>加入于</span>
          <span>{{ '2019-08-11' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store';
const routerS = routerStore()

let userName = ref('用户12321321')
let tips = ref('+你的学习类型')
let hobby = ref('+你的生活爱好')
</script>

<style lang="less" scoped>
.conatiner {
  margin: 30px auto 0;
  display: flex;
  width: 950px;
  .my_left {
    display: flex;
    width: 708px;
    .my_details {
      height: 200px;
      width: 100%;
      display: flex;
      padding: 30px;
      background-color: #fff;
      .img_box {
        margin-right: 28px;
        img {
          width: 90px;
          height: 90px;
          border-radius: 45px;
        }
      }
      .my_base {
        flex: 1;
        .user_name {
          display: flex;
          font-size: 20px;
          font-weight: 700;
        }
        .user_label {
          color: rgb(113, 168, 246);
          padding-left: 12px;
          .tips, .hobby {
            margin: 10px 0;
          }
          .tips span, .hobby span{
            cursor: pointer;
          }
          .tips:hover, .hobby:hover {
            transform: scale(1.1);
          }
        }
      }
      .update_box {
        display: flex;
        .social_box {
          display: flex;
          >div {
            margin-right: 40px;
            font-size: 13px;
            .social_type {
              color:#a4a4a4;
            }
          }
        }
      }
      .update_base {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgb(113, 168, 246);
        color: rgb(113, 168, 246);
        cursor: pointer;
      }
    }
  }
  .social_box {
    flex: 1;
    margin-left: 10px;
    .social_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: #fff;
      height: 80px;
      .line {
        width: 1px;
        height: 50%;
        background-color: #f3f3f4;
      }
      .follow, .fans {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .follow, .fans {
        cursor: pointer;
        &:hover {
          .num {
            text-decoration:underline;
          }
        }
        span:last-child {
          font-weight: 700;
          margin-top: 5px;
        }
      }
    }
    .user_order {
      border-bottom: 1px solid rgba(230,230,231,.5);
      font-size: 15px;
      >div {
        display: flex;
        justify-content: space-between;
        height: 49px;
        padding: 15px 0;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 950px) {
  .conatiner {
    width: 100%;
    .my_left {
      width: 100%;
      .my_details {
        flex-direction: column;
        align-items: center;
        // .my_left_box {
        //   display: flex;
        //   align-items: center;
        //   flex-direction: column;
        // }
      }
    }
  }
}
</style>