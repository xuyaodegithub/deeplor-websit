<template>
  <div class="helloFirst">
    <div class="margin flex seachI">
      <input type="file" style="display: none" ref="upImg" @change="changeImg($event,1)">
      <el-button type="primary" round icon="el-icon-upload2" style="width:160px;" @click="upLoadimg()">上传</el-button>
      <span>或</span>
      <div class="flex input">
        <input placeholder="粘贴URL地址" v-model="imgUrl"/>
        <div class="cu" @click="copyImgUrl()">确定</div>
      </div>
    </div>
    <!--    <img :src="test" alt="">-->
    <div class="margin">
      <div class="Uploading flex a-i" v-show="upLoading">
        <el-progress type="circle" :percentage="percentValue" :stroke-width='strokeWidth'></el-progress>
      </div>
      <div class=" flex j-b content" v-show="canvasShow">
        <i style="position: absolute;right: 10px;top: 10px;font-size: 24px;color: #999;" class="el-icon-close cu"
           @click="clearFile()"></i>
        <div class="left">
          <div class="img">
            <!--              <img :src="other" alt="" v-if="!backimgShow">-->
            <canvas id="hiddenCanvas" v-show="!backimgShow" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
            <div v-show="backimgShow" class="imgList">
              <div class="flex j-b">
                <span>背景图片</span>
                <el-button round icon="el-icon-upload2" style="width:160px;" @click="upBackImgS()">选择一张图片</el-button>
              </div>
              <div class="titleList">
                <span v-for="(val,index) in titleList" :key="index" :class="{'active': index==titleIndex}" class="cu"
                      @click="changeimgList(index)">{{val}}</span>
              </div>
              <div class="imgAll flex">
                <img :src="item" alt="" v-for="(item,index) in imgAllList[titleIndex]" :key="index"
                     @click="addBackImg(item)" class="cu">
              </div>
              <el-button type="primary" round style="display:block;width:100px; margin: 50px auto;" size="small"
                         @click="backimgShow=false">确定
              </el-button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="canvas" @mousedown="mouseDown($event)" @mousemove.prevent="moeseMove($event)"
               @mouseup="mouseUp($event)">
            <canvas id="cDown" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
            <canvas id="cUp" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
            <div class="border" v-show="borderShow"
                 :style="{'top':borderLocal.y,'left':borderLocal.x,'width':borderLocal.width,'height': borderLocal.height}"></div>
          </div>
          <div class="btns flex">
            <!--              <el-button round>圆角按钮</el-button><el-button round icon="el-icon-edit">圆角按钮</el-button>-->
            <span>前景</span>
            <div class="cu btn" :class="{'active':clearOrdraw}" @click="clearOrdraw=true" slot="reference"><i
              class="icon iconfont icon-xiangpi"></i>擦除
            </div>
            <div class="cu btn" :class="{'active':!clearOrdraw}" @click="clearOrdraw=false"><i
              class="icon iconfont icon-qianbi"></i>还原
            </div>
            <div class="cu re" @click="backReset()"><i class="icon iconfont icon-chexiaofanhuichehuishangyibu"></i>撤回
            </div>
            <div class="cu re" @click="reset()"><i class="icon iconfont icon-zhongzhi"></i>复位</div>
          </div>
          <div style="padding-left: 20px;line-height: 38px;" class="flex">
            <div style="width:200px;margin-right: 10px;">
              <el-slider v-model="eraserWidthSelect" tooltip-effect="light" :min="3" :max="25"
                         :show-tooltip="showThost"></el-slider>
            </div>
            <span>{{eraserWidthSelect}}px</span>
          </div>
          <div class="otherBtn flex a-i">
            <span>背景</span>
            <div v-for="(item,index) in color" :key="index" :style="backg" @click="choseBackColor(item,index)"
                 class="cu" :class="{'bordershow' : index==choseBack}" v-if="index===0"></div>
            <div v-for="(item,index) in color" :key="index" :style="{'background':item }"
                 @click="choseBackColor(item,index)" class="cu" :class="{'bordershow' : index==choseBack}"
                 v-if="index!==0"></div>
            <!--              <el-button round icon="el-icon-more" size="mini" @click="choseColor()"></el-button>-->
            <span style="height: 28px;"><el-color-picker v-model="colorValue" size="mini" ref="colorS"
                                                         @change="choseColor()"
                                                         :class="{'bordershow': choseBack=='span'}"></el-color-picker></span>
            <p :style="back" class="cu" @click="backimgShow=!backimgShow"><i class="icon iconfont icon-zhaoxiangji"></i>背景图片
            </p>
          </div>
          <el-button type="primary" round icon="el-icon-download" style="width:160px;margin: 50px 0 0 150px;"
                     @click="save()">下载
          </el-button>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="margin flex">
        <div class="left">
          <h3>人工智能抠图</h3>
          <p>无需标注前景背景，深求AI人工智能，自动识别抠图区域，省时省力，快速获得带透明背景PNG。</p>
        </div>
        <img :src="other" alt="">
      </div>
    </div>
    <div class="lastMo margin flex">
      <img :src="men" alt="">
      <div class="right">
        <h3>无需下载PS，集成换背景</h3>
        <p>不论是纯色填充，还是背景替换，轻量点选，彻底摆脱PhotoShop，更有海量背景免费供选择，轻松又省钱。</p>
        <div class="seachDiv flex">
          <!--          <input type="file" style="display: none" ref="upImg" @change="changeImg($event)">-->
          <el-button type="primary" round icon="el-icon-upload2" style="width:160px;" @click="upLoadimgDwon()">上传
          </el-button>
          <span>或</span>
          <div class="flex input">
            <input placeholder="粘贴URL地址" v-model="imgUrl"/>
            <div class="cu" @click="copyImgUrl()">确定</div>
          </div>
        </div>
      </div>
    </div>
    <!--    @mouseup="mouseUp($event)"-->
  </div>
</template>
<script>
  import c1 from '../assets/city/1.jpg'
  import c2 from '../assets/city/2.jpg'
  import c3 from '../assets/city/3.jpg'
  import c4 from '../assets/city/4.jpg'
  import c5 from '../assets/city/5.jpg'
  import c6 from '../assets/city/6.jpg'
  import c7 from '../assets/city/7.jpg'
  import c8 from '../assets/city/8.jpg'
  import c9 from '../assets/city/9.jpg'
  import c10 from '../assets/city/10.jpg'
  import c11 from '../assets/city/11.jpg'
  import c12 from '../assets/city/12.jpg'
  import c13 from '../assets/city/13.jpg'
  import c14 from '../assets/city/14.jpg'
  import c15 from '../assets/city/15.jpg'

  import m1 from '../assets/market/1.jpg'
  import m2 from '../assets/market/2.jpg'
  import m3 from '../assets/market/3.jpg'
  import m4 from '../assets/market/4.jpg'
  import m5 from '../assets/market/5.jpg'
  import m6 from '../assets/market/6.jpg'
  import m7 from '../assets/market/7.jpg'
  import m8 from '../assets/market/8.jpg'
  import m9 from '../assets/market/9.jpg'
  import m10 from '../assets/market/10.jpg'

  import sb1 from '../assets/sandyBeach/1.jpg'
  import sb2 from '../assets/sandyBeach/2.jpg'
  import sb3 from '../assets/sandyBeach/3.jpg'
  import sb4 from '../assets/sandyBeach/4.jpg'
  import sb5 from '../assets/sandyBeach/5.jpg'
  import sb6 from '../assets/sandyBeach/6.jpg'
  import sb7 from '../assets/sandyBeach/7.jpg'
  import sb8 from '../assets/sandyBeach/8.jpg'
  import sb9 from '../assets/sandyBeach/9.jpg'
  import sb10 from '../assets/sandyBeach/10.jpg'
  import sb11 from '../assets/sandyBeach/11.jpg'
  import sb12 from '../assets/sandyBeach/12.jpg'
  import sb13 from '../assets/sandyBeach/13.jpg'
  import sb14 from '../assets/sandyBeach/14.jpg'
  import sb15 from '../assets/sandyBeach/15.jpg'

  import s1 from '../assets/scenery/1.jpg'
  import s2 from '../assets/scenery/2.jpg'
  import s3 from '../assets/scenery/3.jpg'
  import s4 from '../assets/scenery/4.jpg'
  import s5 from '../assets/scenery/5.jpg'
  import s6 from '../assets/scenery/6.jpg'
  import s7 from '../assets/scenery/7.jpg'
  import s8 from '../assets/scenery/8.jpg'
  import s9 from '../assets/scenery/9.jpg'
  import s10 from '../assets/scenery/10.jpg'

  import other from '../assets/dieimg2.gif'
  import men from '../assets/dieimg1.gif'
  import opacity from '../assets/opacity.jpg'
  // import pen from '../assets/pen.png'
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import axios from 'axios'
  import {mixins} from '@/minxins/vue-mixins'//mixins混入写法
  export default {
    name: 'HelloWorld',
    mixins: [mixins],
    data() {
      return {
        historySet: [],//储存历史记录
        backimgShow: false,//背景图片选择列表
        canvasShow: false,//上传后显示
        timer: '',//上传过度动画
        opacity: opacity,//默认透明背景
        percentValue: 0,//上传百份比
        showThost: false,
        borderShow: false,//鼠标圆圈显示
        borderLocal: {x: '', y: '', width: '', height: ''},//鼠标圆圈位置
        eraserWidthSelect: 5,//鼠标圆大小
        downOrup: false,//鼠标滑动变量
        mousedown: {x: '', y: ''},//鼠标按下位置记录
        lastLocal: {x: '', y: ''},//鼠标弹起位置
        upOrCopy: true,//上传还是粘贴
        copyBackImg: '',//粘贴确认后返回的处理图片
        strokeWidth: 10,
        upLoading: false,
        other: other,
        men: men,
        color: ['rgba(255,255,255,0)', '#ffffff', '#eeeeee', '#5d5d5d'],
        colorValue: '#409EFF',
        back: {
          backgroundImage: "url(" + require("../assets/btnback.png") + ")",
          backgroundRepeat: 'mo-repeat',
          backgroundSize: 'cover'
        },
        backg: {
          backgroundImage: "url(" + require("../assets/opacity.jpg") + ")",
          backgroundRepeat: 'mo-repeat',
          backgroundSize: 'center'
        },
        cDown: '',//下层canvas
        cDownTxt: '',
        cUp: '',//上层canvas
        cUpTxt: '',
        hiddenCanvas: '',//隐藏canvas
        hiddenCanvasTxt: '',
        upInput: '',
        clearOrdraw: true,//擦除还是复原
        imgUrl: '',//图片链接
        choseBack: 0,//选中的背景色
        upImgUrl: '',//上传图片链接
        titleList: ['最热', '风景', '沙滩', '都市'],//背景图分类
        titleIndex: 0,//背景图分类下标
        imgAllList: [
          [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10],
          [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10],
          [sb1, sb2, sb3, sb4, sb5, sb6, sb7, sb8, sb9, sb10, sb11, sb12, sb13, sb14, sb15],
          [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15,]
        ],
        upBackImg: false,
        canveaContentW: 500,//画布内容宽高
        canveaContentH: 500,
        backImgW: 500,//背景图片大小
        backImgH: 500,
      }
    },
    mounted() {
      // this.funa()
      this.hiddenCanvas = document.getElementById('hiddenCanvas')
      this.hiddenCanvasTxt = this.hiddenCanvas.getContext('2d')
      this.cDown = document.getElementById('cDown')
      this.cDownTxt = this.cDown.getContext('2d')
      this.cUp = document.getElementById('cUp')
      this.cUpTxt = this.cUp.getContext('2d');
      // this.cUpTxt.fillStyle = 'rgba(255, 255, 255, 0)'
      // this.cUpTxt.fillRect(0, 0, 600, 600)
      // this.drawImg1()
    },
    computed: {
      ...mapGetters([]),
    },
    components: {},
    methods: {
      resetBImg() {//重置背景大小
        this.backImgW = 500//背景图片大小
        this.backImgH = 500
      },
      clearFile() {//关闭画布
        this.canvasShow = false
        this.$refs.upImg.value = ''
      },
      choseColor() {//选择颜色背景
        // this.clearCanvas()
        this.choseBack = 'span'
        this.cDownTxt.clearRect(0, 0, this.cDown.width, this.cDown.height)
        this.cDownTxt.fillStyle = this.colorValue
        this.cDownTxt.fillRect(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH)
      },
      choseBackColor(color, index) {//纯色背景切换
        this.choseBack = index
        if (index == 0) {
          this.resetBImg()
          this.drawImg(this.opacity, [this.cDown])
          return
        }
        // this.clearCanvas()
        this.cDownTxt.clearRect(0, 0, this.cDown.width, this.cDown.height)
        this.cDownTxt.fillStyle = color
        this.cDownTxt.fillRect(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH)
      },
      upBackImgS() {//上传背景图片
        this.upBackImg = true
        this.$refs.upImg.click()
      },
      upLoadimg() {//点击上传
        this.percentValue = 0
        this.upBackImg = false//避免用户点击上传背景后，不选图片
        this.backimgShow = false
        this.$refs.upImg.click()
      },
      upLoadimgDwon() {//点击上传
        this.percentValue = 0
        this.upBackImg = false
        this.backimgShow = false
        this.$refs.upImg.click()
        window.scrollTo(0, 500)
      },
      backReset() {//返回上一步
        if (this.historySet.length > 0) {
          // this.clearCanvas()
          // this.drawImg(this.historySet[this.historySet.length-1],[this.cUp])
          this.cUpTxt.clearRect(0, 0, this.cUp.width, this.cUp.height)
          this.cUpTxt.putImageData(this.historySet[this.historySet.length - 1], 250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2)
          this.historySet.pop()
        } else {
          this.$message({
            message: '不能再继续撤回了',
            type: 'warning'
          })
        }
      },
      reset() {//重置
        this.historySet = []
        let url = ''
        if (this.upOrCopy) url = this.upImgUrl
        else url = this.copyBackImg
        this.resetBImg()
        this.clearCanvas()
        this.drawImg(url, [this.cUp])
        this.drawImg(this.opacity, [this.cDown])
      },
      getImgData(url, callback) {//解决跨域问题
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          let url = URL.createObjectURL(this.response);
          let image = new Image();
          image.onload = function () {
            // 此时你就可以使用canvas对img为所欲为了
            // ... code ...
            callback(image)
            // 图片用完后记得释放内存
            URL.revokeObjectURL(url);
          };
          image.src = url;
        };
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.send();
      },
      save() {//保存下载
        let _self = this
        let can = document.createElement('canvas')
        can.width = this.canveaContentW
        can.height = this.canveaContentH
        let ctx = can.getContext('2d')
        if (this.choseBack !== 0) {
          let backData = this.cDownTxt.getImageData(250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH)
          ctx.putImageData(backData, 0, 0)
          _self.saveTwo(can, ctx)
        } else {
          _self.saveTwo(can, ctx)
        }
      },
      saveTwo(can, ctx) {//保存方法提取
        let _self = this
        let can2 = document.createElement('canvas')
        can2.width = this.canveaContentW
        can2.height = this.canveaContentH
        let ctx2 = can2.getContext('2d')
        let upData = this.cUpTxt.getImageData(250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH)
        ctx2.putImageData(upData, 0, 0)
        let dataURL = can2.toDataURL("image/png");
        let imgA = new Image()
        imgA.src = dataURL
        imgA.crossOrigin = ""
        imgA.onload = (e) => {
          ctx.drawImage(imgA, 0, 0, can.width, can.height)
          let url = can.toDataURL("image/png");
          let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = url;
          save_link.download = 'test.png';
          let event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        }
      },
      clearCanvas(k) {//清除画布
        if (k) this.hiddenCanvasTxt.clearRect(0, 0, this.hiddenCanvas.width, this.hiddenCanvas.height)
        this.cUpTxt.clearRect(0, 0, this.cUp.width, this.cUp.height)
        this.cDownTxt.clearRect(0, 0, this.cUp.width, this.cUp.height)
      },
      // saveHistory(val){//储存历史操作
      //   this.historySet.push(val)
      // },
      copyImgUrl() {//粘贴图片链接确定
        // console.log(111)
        if(!this.imgUrl){
          this.$message({
            message:'图片路径不可为空',
            type:'warning'
          })
          return
        }
        let _self = this
        this.backimgShow = false
        this.upOrCopy = false
        this.canvasShow = false
        this.percentValue = 9
        this.upLoading = true
        this.upGuodu()
        this.resetBImg()//重置背景大小
        // this.clearCanvas()
        this.clearCanvas('all')
        let data = {url: this.imgUrl}
        axios({
          url: 'http://47.111.168.199:8080/image/mattingByUrl',
          params: data,
          dataType: 'JSON',
          method: "POST",
        }).then(res => {
          if (res.data.code == 0) {
            this.upLoading = false
            this.copyBackImg = res.data.data.bgRemoved
            let image = new Image()
            image.src = res.data.data.bgRemoved
            image.onload = function () {
              let arrThis = [image.width, image.height]
              let bigOne = _self.fingBig(arrThis)
              if (bigOne == arrThis[0]) {
                if (bigOne > 500) {
                  image.height = 500 * image.height / image.width
                  image.width = 500
                }
              } else {
                if (bigOne > 500) {
                  image.width = 500 * image.width / image.height
                  image.height = 500
                }
              }
              _self.canveaContentW = image.width//画到画布上的大小
              _self.canveaContentH = image.height
              _self.drawImg(res.data.data.original, [_self.hiddenCanvas])
              // this.upImgUrl=res.data.data.bgRemoved
              _self.drawImg(res.data.data.bgRemoved, [_self.cUp], 'closeLoading')
              _self.drawImg(_self.opacity, [_self.cDown])
            }

          } else this.$message({message: res.data.msg, type: 'warning'})
        }).catch(err => {
          console.log(err)
          this.$message({message: '网络错误,请重新尝试', type: 'warning'})
        })
        // this.drawImg(this.imgUrl,[this.hiddenCanvas])
      },
      fingBig(val) {//找最大
        let big = val[0]
        val.map((v, i) => {
          if (big < v) {
            big = v
          }
        })
        return big
      },
      drawImg(url, arr, close, clear) {//画图封装
        let _self = this
        let image = new Image()
        image.crossOrigin = ""
        image.onload = function (ev) {
          arr.map((obj, index) => {
            if (obj == _self.cDown) {
              obj.getContext('2d').drawImage(image, _self.backImgW / 2 - _self.canveaContentW / 2, _self.backImgH / 2 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH, 250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH);
              console.log(_self.backImgW / 2 - _self.canveaContentW / 2, _self.backImgH / 2 - _self.canveaContentH / 2)
            } else obj.getContext('2d').drawImage(image, 250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH);
          })
          _self.upLoading = false
          _self.percentValue = 9
          _self.$refs.upImg.value = ''
          if (close) _self.canvasShow = true
          if (!clear) _self.historySet = []
        }
        image.src = url
      },
      upGuodu() {//定时器过度
        this.timer = setInterval(() => {
          if (this.percentValue < 99) {
            this.percentValue += 9
          } else {
            clearInterval(this.timer)
            this.percentValue = 99
          }
        }, 500)
      },
      changeImg(e) {//图片上传
        let _self = this
        let file = this.$refs.upImg.files[0]
//	     		alert("文件大小:"+(file.size / 1024).toFixed(1)+"kB")
        this.resetBImg()
        if (!file) return
        this.upLoading = true
        this.canvasShow = false
        this.upGuodu()
        // console.log(file)
        if (window.FileReader) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          //监听文件读取结束后事件
          reader.onloadend = function (e) {
            if (_self.upBackImg) {
              let oImg = new Image()
              oImg.src = e.target.result
              oImg.onload = function () {
                _self.backImgW = oImg.width
                _self.backImgH = oImg.height
              }
              _self.cDownTxt.clearRect(0, 0, _self.cDown.width, _self.cDown.height)
              _self.drawImg(e.target.result, [_self.cDown], 'close', 'noclear')
              _self.upBackImg = false
              return
            }
            let image = new Image()
            image.src = e.target.result
            image.onload = function () {
              let arrThis = [image.width, image.height]
              let bigOne = _self.fingBig(arrThis)
              if (bigOne == arrThis[0]) {
                if (bigOne > 500) {
                  image.height = 500 * image.height / image.width
                  image.width = 500
                }
              } else {
                if (bigOne > 500) {
                  image.width = 500 * image.width / image.height
                  image.height = 500
                }
              }
              _self.canveaContentW = image.width//画到画布上的位置
              _self.canveaContentH = image.height
            }
            // console.log(e)

            _self.setImgInitialization(file, e.target.result)
            _self.upOrCopy = true
          };
        }
      },
      windowToCanvas(x, y) { //这个函数的作用是捕捉鼠标点在canvas上的坐标
        let bbox = this.cUp.getBoundingClientRect()
        return {
          x: x - bbox.left,
          y: y - bbox.top
        }
      },
      setImgInitialization(file, e) {//图片上传接口
        let _self = this
        let param = new FormData();
        param.append('file', file, file.name)
        axios({
          timeout: 10000,
          method: 'post',
          url: 'http://47.111.168.199:8080/image/matting',
          dataType: 'JSON',
          headers: {'Content-Type': 'multipart/form-data'},
          data: param
        }).then(function (res) {
          if (res.data.code == 0) {
            _self.clearCanvas('all')
            _self.drawImg(e, [_self.hiddenCanvas])
            _self.upImgUrl = res.data.data.bgRemoved
            _self.drawImg(res.data.data.bgRemoved, [_self.cUp], 'closeLoading')
            _self.drawImg(_self.opacity, [_self.cDown])
          } else _self.$message({message: res.data.msg, type: 'warning'});
        }).catch(function (err) {
          console.log(err)
          _self.$refs.upImg.value = ''
          _self.$message({message: '网络错误,请重新尝试', type: 'warning'})
        })
      },
      //圆圈位置
      setLocal(e, key) {
        // let scrollTop=document.documentElement.scrollTop || document.body.scrollTop
        let loc = this.windowToCanvas(e.clientX, e.clientY)
        if (key) this.borderShow = true
        else this.borderShow = false
        this.borderLocal.width = 2 * this.eraserWidthSelect + 'px'
        this.borderLocal.height = 2 * this.eraserWidthSelect + 'px'
        this.borderLocal.x = (loc.x - this.eraserWidthSelect) + 'px'
        this.borderLocal.y = (loc.y - this.eraserWidthSelect) + 'px'
      },
      drawCri(x, y) {//复原状态填充
        let x_width = Math.abs(x - this.mousedown.x)//划过轨迹x轴长度
        let y_width = Math.abs(y - this.mousedown.y)//划过轨迹y轴长度
        let dataArr = []
        let oldImgData = this.hiddenCanvasTxt.getImageData(x - this.eraserWidthSelect, y - this.eraserWidthSelect, 2 * this.eraserWidthSelect, 2 * this.eraserWidthSelect)
        for (let i = y - this.eraserWidthSelect; i < y + this.eraserWidthSelect; i++) {//计算离鼠标圆圆心的距离
          for (let j = x - this.eraserWidthSelect; j < x + this.eraserWidthSelect; j++) {
            let radius = Math.sqrt((x - j) * (x - j) + (y - i) * (y - i))//坐标离鼠标的距离
            if (radius > this.eraserWidthSelect) dataArr = [...dataArr, ...this.cUpTxt.getImageData(j, i, 1, 1).data]
            else dataArr = [...dataArr, ...this.hiddenCanvasTxt.getImageData(j, i, 1, 1).data]
          }
        }
        // console.log(oldImgData,'---------------',dataArr)
        for (let i = 0; i < dataArr.length; i++) {
          oldImgData.data[i] = dataArr[i]
        }
        this.cUpTxt.putImageData(oldImgData, x - this.eraserWidthSelect, y - this.eraserWidthSelect)
      },
      drawrubber(x, y) {//绘制中心圆
        this.cUpTxt.beginPath()
        this.cUpTxt.arc(x, y, this.eraserWidthSelect, 0, Math.PI * 2, false)
        // this.cUpTxt.stroke();
        // this.cUpTxt.strokeStyle ='red'
        // this.cUpTxt.stroke()
        this.cUpTxt.clip()
      },
      drawGrid() { //这个函数的作用是填充进橡皮擦的剪辑区域
        this.cUpTxt.clearRect(0, 0, this.cUp.width, this.cUp.height);
      },
      mouseDown(e) {
        // if(this.cUp.toDataURL()!= this.historySet[this.historySet.length]){
        this.historySet.push(this.cUpTxt.getImageData(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH))
        // }
        // this.saveDrawingSurface()
        let loc = this.windowToCanvas(e.clientX, e.clientY)
        this.mousedown.x = loc.x//画布中鼠标x坐标
        this.mousedown.y = loc.y//画布中鼠标y坐标
        this.lastLocal.x = loc.x
        this.lastLocal.y = loc.y
        this.downOrup = true
        // context.save()
        this.setLocal(e, 1)
      },
      moeseMove(e) {
        // console.log(11)
        if (this.downOrup) {
          this.setLocal(e, 1)
          let loc = this.windowToCanvas(e.clientX, e.clientY)
          if (!this.clearOrdraw) { //如果复原状态
            this.cUpTxt.save()//保存当前画布状态
            // this.drawrubber(loc.x,loc.y)//绘制鼠标中心圆
            this.drawCri(loc.x, loc.y)
            // this.cUpTxt.stroke()//恢复画布之前状态
            this.cUpTxt.restore()//恢复画布之前状态
          } else { //如果是橡皮擦状态
            this.cUpTxt.save()//保存当前画布状态
            this.drawrubber(loc.x, loc.y)//绘制鼠标中心圆
            this.drawGrid()//填充中心圆
            this.cUpTxt.restore()//恢复画布之前状态
          }
        }
      },
      mouseUp(e) {
        this.downOrup = false;
        let loc = this.windowToCanvas(e.clientX, e.clientY)
        if (!this.clearOrdraw) {
          this.lastLocal.x = loc.x;
          this.lastLocal.y = loc.y;
          // restoreDrawingSurface()
          this.drawCri(this.lastLocal.x, this.lastLocal.y)
        } else {
          this.cUpTxt.save()
          this.drawrubber(loc.x, loc.y)
          this.drawGrid()
          this.cUpTxt.restore()
        }
        // restoreDrawingSurface()
        this.setLocal(e)
      },
      changeimgList(index) {//改变背景列表
        this.titleIndex = index
      },
      addBackImg(item) {//添加背景图片
        this.choseBack = -1
        this.cDownTxt.clearRect(0, 0, this.cDown.width, this.cDown.height)
        let x, y
        let _self = this
        let image = new Image()
        image.crossOrigin = ""
        image.onload = function (ev) {
          let arrThis = [image.width, image.height]
          _self.cDownTxt.drawImage(image, image.width / 2 - _self.canveaContentW / 2, image.height / 2 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH, 250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH);
        }
        image.src = item
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .helloFirst {
    background-color: #f5f5f6;
    /*padding-top:24px ;*/
    padding-bottom: 72px;

    .Uploading {
      height: 500px;
      background-color: #fff;
      justify-content: center;
      border-radius: 15px;
      margin-bottom: 20px;
    }

    .content {
      background-color: #ffffff;
      padding: 36px 36px 50px 36px;
      border-radius: 15px;
      margin-bottom: 80px;
      position: relative;

      & > div {
        width: 500px;
        border-radius: 8px;
        overflow: hidden;
      }

      .left {
        /*height: 500px;*/
        /*.img img {*/
        /*  display: block;*/
        /*  width: 100%;*/
        /*}*/
      }

      .right {
        .otherBtn {
          font-size: 12px;
          line-height: 28px;
          color: #b4b4b4;

          & > span {
            margin-right: 16px;
          }

          .bordershow.cu {
            border: 1px solid #26adf5;
          }

          .bordershow .el-color-picker__trigger {
            border-color: #26adf5;
          }

          & > div {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 1px solid #c7c7c7;
            margin-right: 8px;
          }

          p {
            text-align: center;
            margin-left: 20px;
            line-height: 30px;
            font-size: 12px;
            color: #fff;
            width: 100px;
            border-radius: 15px;

            i {
              margin-right: 5px;
            }
          }

          .el-color-picker__trigger {
            /*border: none;*/
            /*border-radius: 50%;*/
            width: 60px;
            border-radius: 13px;
            border-color: #c7c7c7;

            .el-color-picker__color-inner {
              display: none;
            }

            .el-icon-arrow-down:before {
              content: '\E646';
              color: #000;
            }

            .el-color-picker__color {
              /*display: none;*/
              border: none;
            }
          }
        }

        .btns {
          font-size: 12px;
          line-height: 28px;
          height: 30px;
          color: #b4b4b4;

          & > span {
            margin-right: 16px;
          }

          .btn {
            width: 72px;
            text-align: center;
            border: 1px solid #dcdcdc;
            border-radius: 15px;
            justify-content: center;
            margin-right: 12px;

            i {
              margin-right: 8px;
              font-size: 12px;
              font-weight: 600;
            }
          }

          .active {
            background-color: #26adf5;
            color: #fff;
          }

          div:nth-child(4) {
            margin-left: 175px;
            margin-right: 15px;
          }

          .re i {
            font-weight: 600;
            margin-right: 5px;
          }
        }

        .canvas {
          position: relative;
          width: 500px;
          height: 500px;
          margin-bottom: 16px;

          #cUp {
            z-index: 99;
          }

          canvas {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }

      .imgList {
        .j-b {
          font-size: 18px;
          line-height: 40px;
          color: #000;
          margin-bottom: 20px;
        }

        .titleList {
          font-size: 12px;
          line-height: 30px;
          color: #333333;
          border-bottom: 1px solid #b4b4b4;

          .active {
            color: #26adf5;
            border-bottom: 2px solid #26adf5;
          }

          span {
            height: 30px;
            display: inline-block;
            margin-right: 50px;
          }
        }

        .imgAll {
          padding: 20px 20px 0 0;
          flex-wrap: wrap;
          height: 400px;
          overflow-y: auto;

          img {
            width: 100px;
            height: 100px;
            margin: 0 15px 15px 0;
            border-radius: 10px;
          }
        }
      }
    }

    .section {
      background-color: #ffffff;
      font-size: 14px;
      color: #b4b4b4;
      line-height: 20px;
      padding: 72px 0;
      /*margin-top: 80px;*/
      .left {
        width: 285px;
        margin-right: 312px;
        margin-left: 112px;
        padding-top: 104px;
      }

      & > img {
        width: 360px;
        height: 360px;
      }

      h3 {
        font-size: 36px;
        color: #262626;
        margin-bottom: 32px;
        font-weight: 500;
        line-height: normal;
      }
    }

    .lastMo {
      font-size: 14px;
      color: #b4b4b4;
      line-height: 20px;
      padding: 72px 0 0 100px;

      & > img {
        width: 360px;
        height: 360px;
      }

      .right {
        width: 465px;
        margin-left: 200px;

        p {
          width: 290px;
        }
      }

      h3 {
        color: #333;
        font-size: 36px;
        margin-bottom: 32px;
        line-height: normal;
        font-weight: 500;
        margin-top: 72px;
      }

      .seachDiv {
        margin-top: 50px;
        position: static;
        color: #000;

        & > div {
          color: #fff;
        }
      }
    }

    .seachI, .seachDiv {
      justify-content: center;
      font-size: 16px;
      color: #fff;
      line-height: 50px;
      position: relative;
      top: -220px;
      left: -30px;

      .el-button {
        border-radius: 25px;
      }

      span {
        margin: 0 22px;
      }

      input {
        border: none;
        font-size: 16px;
        text-indent: 1em;
        width: 150px;
      }

      .input {
        width: 240px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
        background-color: #409EFF;
        /*border: 1px solid #333;*/
        & > div {
          flex: 1;
          text-align: center;
        }
      }
    }

    .border {
      position: absolute;
      border: 1px solid red;
      left: 0;
      top: 0;
      border-radius: 50%;
      z-index: 100;
    }
  }

  div.propeo, .el-popover, .el-popper[x-placement^=bottom] {
    padding: 0 !important;
  }
</style>
