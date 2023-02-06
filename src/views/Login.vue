<template>
  <div class="container">
    
    <div class="tips_box" :style="type == 'login' ? {left: '0px'}:{left: '120vw'}" v-if="routerS.isWindow ">
      <div class="radius_box">
      </div>
    </div>
    <div class="tips_box" :style="type == 'login' ? {top: '0px'}:{top: '160vh'}" v-else>
      <div class="radius_box">
      </div>
    </div>
    <Transition name="fade" :enter-active-class="routerS.isWindow ?'animate__animated animate__slideInLeft': 'animate__animated animate__fadeInUp'" :leave-active-class="routerS.isWindow ?'animate__animated animate__fadeOutLeft': 'animate__animated animate__fadeOutUp'">
      <div :class="routerS.isWindow ? ['message_box','message_box_left']: ['message_box', 'message_box_top']" v-if="type == 'login'">
        <div class="text_box">
          <div class="title_box">开始今天的学习吧！</div>
          <div class="details_box">宁可枝头抱香死,何曾吹落北风中。—— 宋·郑思肖·寒菊</div>
          <button @click="stateChange">SIGN UP</button>
        </div>
        <div class="img_box">
          <img src="@/assets/image/logBlue.png" alt="">
        </div>
      </div>
    </Transition>
    <Transition name="fade" :enter-active-class="routerS.isWindow ?'animate__animated animate__slideInRight': 'animate__animated animate__fadeInDown'" :leave-active-class="routerS.isWindow ?'animate__animated animate__slideOutRight': 'animate__animated animate__fadeOutDown'" >
      <div :class="routerS.isWindow ? ['message_box', 'message_box_right']: ['message_box', 'message_box_bottom']" v-if="type == 'register'">
        <div class="text_box">
          <div class="title_box">这是个什么网站？</div>
          <div class="details_box">集记录、分享、学习为一身的网站，你可以将这里作为文档的存放基地，也可以分享你所学的知识，与学习同好们共同向前进！</div>
          <button @click="stateChange">SIGN IN</button>
        </div>
        <div class="img_box">
          <img src="@/assets/image/registerBlue.png" alt="">
        </div>
      </div>
    </Transition>
    <div class="login_box" :style="type == 'login' ? routerS.isWindow ? {right: '0px'}:{bottom: '0px'}:routerS.isWindow ? {right: '50vw'}: {bottom: '40vh'}">
        <div :class="type == 'login' ? ['login_box_base','login_box_show'] : ['login_box_base','login_box_hidden']">
          <div class="title">Sign in</div>
          <el-input v-model="account" placeholder="Username&Email">
            <template #prefix>
              <span class="icon-user"></span>
            </template>
          </el-input>
          <el-input v-model="password" placeholder="Password" show-password>
            <template #prefix>
              <span class="icon-lock"></span>
            </template>
          </el-input>
          <button>LOGIN</button>
        </div>
        <div :class="type == 'register' ? ['login_box_base','login_box_show'] : ['login_box_base','login_box_hidden']">
          <div class="title">Sign up</div>
          <el-input v-model="account" placeholder="Username">
            <template #prefix>
              <span class="icon-user"></span>
            </template>
          </el-input>
          <el-input v-model="email" placeholder="Email">
            <template #prefix>
              <span class="icon-envelop"></span>
            </template>
          </el-input>
          <el-input v-model="password" placeholder="Password" show-password>
            <template #prefix>
              <span class="icon-lock"></span>
            </template>
          </el-input>
          <button>SIGN UP</button>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'animate.css'
import loginHook from '@/hooks/useScreenTest.js'
import {routerStore} from '@/store/index'
const routerS = routerStore()
let {type, account, email, password, stateChange} = loginHook()
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .tips_box, .message_box {
    position: absolute;
    width: 100%;
    z-index: 2;
  }
  .tips_box {
    height: 40%;
    transition: all 1s;
    .radius_box {
      background-color: rgb(125, 171, 235);
    }
  }
  .login_box {
    position: absolute;
    bottom: 0;
    height: 60%;
    width: 100%;
    z-index: 1;
    transition: all .8s;
    transition-delay: .2s;
    .title {
      font-size: 30px;
      font-weight: 700;
      color: rgb(71, 75, 82);
      text-align: center;
    }
  }
  .login_box_base {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      width: 170px;
      height: 50px;
      border-radius: 25px;
      margin-top: 20px;
      background-color: #7dabeb;
      font-size: 15px;
      font-weight: 700;
      color: white;
      cursor: pointer;
    }
  }
  .login_box_show {
    opacity: 1;
    transition: opacity .1s;
    transition-delay: .3s;
    z-index: 2;
  }
  .login_box_hidden {
    opacity: 0;
    transition: opacity .1s;
    transition-delay: .3s;
  }
  // .login_box_show, .login_box_hidden {
  //   // position: absolute;
  //   // top: 50%;
  //   // left: 50%;
  //   // transform: translate(-50%, -50%);
  // }
  .message_box {
    width: 100%;
    height: 30vh;
    position: absolute;
    .text_box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      max-width: 80vw;
      .title_box {
        font-weight: 700;
      }
      .details_box {
        margin: 15px 0;
        text-align: center;
      }
      button {
        width: 150px;
        height: 50px;
        padding: 10px 20px;
        border: 2px solid white;
        border-radius: 25px;
        background-color:rgb(125, 171, 235);
        color: white;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
  .message_box_bottom {
    bottom: 0;
  }
  .message_box_top {
    top: 0;
  }
  :deep(.el-input) {
    margin-top: 20px;
    height: 5vh;
  // border-radius: 30px;
  }
  :deep(.el-input__wrapper) {
    box-shadow: none;
    background-color: rgb(241, 239, 241);
    border-radius: 2.5vh;
    padding-left: 20px;
  }
  :deep(.el-input__prefix-inner) {
    margin-right: 8px;
  }
  .icon-user {
    font-size: 25px;
  }
  .icon-envelop {
    font-size: 25px;
  }
  .icon-lock {
    font-size: 25px;
  }
}
@media screen and (min-width: 951px) {
  .container {
    position: relative;
    .tips_box, .login_box {
      position: absolute;
      width: 50%;
      height: 100%;
    }
    .login_box {
      transition: all .8s;
      transition-delay: .2s;
      .login_box_base {
        width: 45%;
      }
    }
    .tips_box {
      z-index: 2;
      left: 0;
      .radius_box {
        width: 120vw;
        height: 120vh;
        border-bottom-left-radius: 150vh;
        border-bottom-right-radius: 150vh;
        transform: translateX(-70vw);
      }
    }
    .message_box {
      width: 50%;
      height: 100%;
      top: 0;
      z-index: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text_box {
        position: static;
        max-width: 35vw;
        .title_box {
          font-size: 25px;
        }
        .details_box {
          font-size: 15px;
        }
      }
      .img_box {
        img {
          width: 30vw;
        }
      }
    }
    .message_box_left {
      left: 0;
    }
    .message_box_right {
      right: 0;
    }
  }
}
@media screen and (max-width: 950px) {
  .container {
    .tips_box {
      .radius_box {
        height: 120vh;
        width: 128vh;
        transform: translate(-300px, -90vh);
        border-radius: 60vh;
        // border-radius: 100vw;
      }
    }
    .message_box {
      display: flex;
      align-items: center;
      left: 10vw;
      .text_box {
        width: 50vw;
        .title_box {
          font-size: 20px;
        }
        .details_box {
          font-size: 15px;
        }
        button {
          padding: 5px 10px;
        }
      }
      .img_box {
        position: absolute;
        right: 10vw;
        // position: absolute;
        // top: 50px;
        // right: 100px;
        img {
          // position: absolute;
          width: 200px;
        }
      }
    }
  }
  .login_box {
    .login_box_base {
      width: 50%;
    }
  }
}

@media screen and (max-width: 550px) {
  .container {
    .tips_box {
      .radius_box {
        width: 200vw;
        border-radius: 100vw;
        transform: translate(-50vw,-90vh);
      }
    }
    .message_box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30vh;
      padding: 0;
      margin: 0;
      left: 0;
      .img_box {
        img {
          width: 0;
        }
      }
      .text_box {
        width: 80%;
        .title_box {
          font-size: 4vw;
        }
        .details_box {
          font-size: 3vw;
        }
      }
    }
  }

  .login_box {
    .login_box_base {
      width: 70%;
    }
  }
}

</style>
