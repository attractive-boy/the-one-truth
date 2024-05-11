<template>
  <div class="Game">
    <el-container>
  <el-header>骗术解密馆</el-header>
  <el-main>
    <el-row>
  <el-col :span="4"><div v-bind:class="{'grid-content bg-purple-dark':dark[0],'grid-content bg-purple':light[0]}">人物剧本</div></el-col>
  <el-col :span="4"><div v-bind:class="{'grid-content bg-purple-dark':dark[1],'grid-content bg-purple':light[1]}">自我介绍</div></el-col>
  <el-col :span="4"><div v-bind:class="{'grid-content bg-purple-dark':dark[2],'grid-content bg-purple':light[2]}">寻找线索</div></el-col>
  <el-col :span="4"><div v-bind:class="{'grid-content bg-purple-dark':dark[3],'grid-content bg-purple':light[3]}">开放讨论</div></el-col>
  <el-col :span="4"><div v-bind:class="{'grid-content bg-purple-dark':dark[4],'grid-content bg-purple':light[4]}">找出真相</div></el-col>
  <el-col :span="4"><div v-bind:class="{'grid-content bg-purple-dark':dark[5],'grid-content bg-purple':light[5]}">揭开真相</div></el-col>
</el-row>
<div v-if= "stage==4" class='grid-content bg-red'>
  <el-row>
    请选出你认为的凶手：
    <el-button  v-for= 'role in role_info' @click= 'selectedCriminal=role.role_id'>{{role.role_name}}</el-button>
  </el-row>
</div>
    <el-row>
      <el-col :span="8">
        <div class='grid-content bg-purple'>
          <el-radio v-model="scriptText" label="0">角色故事</el-radio>
          <el-radio v-model="scriptText" label="1">时间线</el-radio>
          <el-radio v-model="scriptText" label="2">角色任务</el-radio>
          <el-radio v-model="scriptText" label="3" v-if= 'stage==5'>案发真相</el-radio>
        </div>
        <div class='grid-content2 bg-purple'>
        <div  v-if= "scriptText==0">{{background}}</div>
        <div  v-if= "scriptText==1">{{timeline}}</div>
        <div  v-if= "scriptText==2">{{task}}</div>
        <div  v-if= "scriptText==3">凶手是：{{murder_name}} </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div v-if= 'stage<=1' class='grid-content bg-purple' >
        </div>
        <div v-if= 'stage>1'> 
        <div class='grid-content bg-purple' >
        <el-radio v-for= 'role in role_info' v-model= 'selectedRole' v-bind:label= 'role.player_id_in_room'>{{role.role_name}}</el-radio>
        <el-button type='info' @click='searchClue()'>搜索| {{movementPoint}}/1</el-button>
        </div>
        <div v-for= 'clue in clue_info' class='grid-content2 bg-purple' v-if= "clue.role_id==role_info[selectedRole].role_id && clue.description==1" >{{clue.text}}</div>        
        </div>

      </el-col>
      <el-col :span="8">
          <div class='grid-content2 bg-purple' >
          <div v-for= 'msg in chat'>{{msg.name}}:{{msg.message}}</div>      
        </div>
            
                      <div class='grid-content bg-purple' >
                        <div>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
          <el-button @click="mysend()"  type="plain">发送</el-button>
          </div>
            </div>

      </el-col>
    </el-row>
<el-footer>
<el-button @click="myready()"  type="info">下一阶段</el-button>
</el-footer>
</el-main> 
</el-container> 
<el-button @click="返回()"  type="info">返回</el-button>
<p>script_id:{{scriptid}},player:{{player}},room_id:{{room_id}}</p>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      count: 0,
      stage: 0,
      player_id:1,
      dark:[1,0,0,0,0,0],
      light:[0,1,1,1,1,1],
      /* 以下是剧情文本相关的数据 */
      murderindex:0,
      scriptText:0,
      scriptid:1,
      player:1,
      room_id:0,
      script_title:'s',
      role_info:[{'1':1}],
      clue_info:[{'1':1}],
      murder_name:'',
      chat:'聊天内容',
      background: '这是人物介绍\\n111111111111111111111111111111111111111111111111111111111111',
      timeline: '这是时间线。',
      task: '这是任务。',
      truth: '张三是凶手。',
      input:'',
      player_num:0,
      ready_player_num:0,
      /* 以下是线索相关的数据 */
      selectedRole:0,
      selectedCriminal:0,
      trueCriminal:-1,
      movementPoint:1,
      info:{},
      roles:[
        {id:0,name:'张三'},
        {id:1,name:'李四'},
        {id:2,name:'王五'},
      ],
      clues:[
        {id:0,text:'这是张三的线索,但不会告诉你谁是凶手',show:0},
        {id:1,text:'这是李四的线索，但不会告诉你谁是凶手',show:0},
        {id:2,text:'这是王五的线索，王五看见了张三行凶的过程，可推出张三是凶手',show:0},
      ]

    }
  },
  watch:{
    stage(curval,oldval){
      if(curval==5){
         if(this.selectedCriminal==this.trueCriminal){
           alert('恭喜你找出了凶手,游戏获胜！')
         }
         else{
           alert('没有找对凶手，游戏失败！')
         }
       }
       if(curval==0){
         this.movementPoint=1;
         for(let i=0;i<3;++i){
           this.clues[i].show=0;
         }
       }
    },
  },
  methods:{
    myready:function(){
       /*
       this.axios({
        method: 'post',
        url: '/synchronize/',
        data:{
 
        room_id:this.room_id,
        player_id:1
       
        }
      })
      .then(response => (
        //console.log(response.data),
        this.player_num=response.data.data.player_num,
        this.ready_player_num=response.data.data.ready_player_num
        ));
      */
       this.count=this.count+1;
       //if(this.player_num==this.ready_player_num){
       if(this.count>0){
         this.count=0;
         this.light[this.stage]=1;
         this.dark[this.stage]=0;
         this.stage=this.stage+1;
         this.light[this.stage]=0;
         this.dark[this.stage]=1;
       }
       if(this.stage==6)this.stage=0;
    },
    searchClue:function(){
      if(this.movementPoint>0 && this.stage==2 && this.clue_info[this.selectedRole].description!=1){
      this.clue_info[this.selectedRole].description=1;
      this.movementPoint--;
      }
    },
    gotest:function(){
      this.$router.push({name:'test',params:{mytimeline:this.timeline,mytask:this.task}})
    },
    mysend:function(){
      this.axios({
        method: 'post',
        url: '/send_message/',
        data:{
          room_id:this.room_id,
          player_id:this.role_info[this.player].player_id,
          message:this.input
        }
      })
      .then(response => (
        console.log(response.data),
        this.chat=response.data.data,
        this.input=''
        ));
    }
  },
  mounted () {
    /* this.$axios
      .get('/site/info.json')
      .then(response => (this.task = response))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
      */
    this.scriptid=this.$route.query.script_id
    this.player=this.$route.query.player
    this.room_id=this.$route.query.room_id
    console.log("current player " + this.player)

    /*
    this.axios({
        method: 'post',
        url: '/room_owner_choose_script/',
        data:{
          //username:'u2',
          room_id:1,
          script_title:'a_test_script_title'
          //is_master:0
          //password:'123456',
          //group_id:1,
          //email:"54321@pku.edu.cn"
          //num_person:2
       
        }
      })
      .then(response => (
        console.log(response.data)
        
        this.role_info=response.data.role_info,
        this.clue_info=response.data.clue_info,
        this.trueCriminal=response.data.murder_id,
        this.script_title=response.data.script_title
      
        )); 
    */

    this.axios({
        method: 'post',
        url: '/start_game/',
        data:{
          room_id:this.room_id,
        }
      })
      .then(response => {
        console.log(response.data.data.role_info[0]),
        this.role_info=response.data.data.role_info,
        this.clue_info=response.data.data['clue_info'],
        this.trueCriminal=response.data.data.murder.role_id,
        this.murder_name=response.data.data.murder.role_name,
        this.script_title=response.data.data.script_title,
        this.background=response.data.data.role_info[this.player].background,
        // console.log(this.role_info),
        // console.log(this.clue_info),
        // console.log(this.trueCriminal),
        this.timeline=response.data.data.role_info[this.player].timeline,
        this.task=response.data.data.role_info[this.player].task,
       
        console.log(this.background)
        }
      );
      // console.log(1)


      
  },
  created(){
      // console.log(this.$route.query)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d7cccc;
  margin-top: 30px;
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
  }
  .el-col-2{
    border-radius: 4px;
    text-align: center;
    line-height: 300px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .bg-purple-dark {
    background: #6f3435;
  }
  .bg-purple {
    background: #4b0102;
  }
  .bg-purple-light {
    background: #440102;
  }
  .bg-red {
    background: #998681;
  }
  .grid-content {
    border-radius: 30px;
    min-height: 45px;
    line-height: 45px;
    word-wrap: break-word;
    word-break: normal;
  }
  .grid-content2 {
    margin-top: 20px;
    border-radius: 8px;
    min-height: 100px;
    max-height: 500px;
    line-height: 30px;
    overflow-y: scroll;
    overflow-x: hidden;
    text-align: left;
    white-space: pre-wrap;
    overflow-y: scroll; /* 如果内容超出容器高度，则显示垂直滚动条 */ 
    padding: 5px;
    background-image:url(https://s2.loli.net/2024/04/16/5W2pCfQDMuTvFsr.png);
    background-repeat: no-repeat;
    background-size: 15%; 
    background-position: 90% 90%; 
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-header {
    background-color: #4b0102;
    color: #ebe6e6;
    font-size: 30px; /* 文本字体大小设置为16像素 */  
    text-align: center;
    line-height: 60px;
    height: 60px;
  }
  .el-footer {
    background-color: transparent;
    color: #ebe6e6;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #d7bdc0;
    color: #ebe6e6;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: rgb(255, 255, 255, 0.3);
    color: #ebe6e6;
    text-align: center;
    line-height: 300px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

