<template>
  <div>
    <div id="wrapper">
      <h1>剧本馆</h1>
      <div id="tableContainer">
        <el-row :gutter="30" style="align-items: center;">
          <el-col :xs="24" :sm="24" :lg="12" id="script_col">
            <div class="col-wrapper">
              <div v-for="(script, index) in scripts" class="script">
                <scriptItem>
                  <img src="@/assets/Home/book1.png" slot="fig" style="height: 30px;"/>
                  <div slot="scriptName">{{script.title}} </div>
                  <p slot="intro">{{script.intro}}</p>
                </scriptItem>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <el-button>上传剧本</el-button> -->
    </div>
  </div>
</template>

<script>
import scriptItem from '@/components/ScriptItem'
export default {
  name: 'Scripts',
  components: {
    scriptItem
  },
  data() {
    return {
      scripts: [
        {
          title: '无“药”可救',
          intro: '“老来宝公司”，一个神秘的保健品销售商，是无数普通打工人梦想进入的公司，在这里，金钱源源不断。近期，老来宝公司举办S省药品竞标活动，承诺丰厚的回报。然而，在竞标即将结束时，参与者纷纷眩晕并失去知觉，事情开始变得扑朔迷离。'
        },
        {
          title: '天上掉陷饼',
          intro: '4月4日晚20:05，M国东北部宇飞集团总公司负一层集会现场突然停电，部分集会参与者引起现场骚乱，与看守人员发生暴力冲突。一些人听见重物砸到地板的闷响声。20:15，电力恢复供能，只见集团领导吴宇的尸体出现演讲台上，初步判断为失血过多而亡。现场抓捕到多名试图逃跑、引发动乱的普通人，经初步排查，凶手锁定在5名嫌疑人中。'
        },
        {
          title: '同学你好',
          intro: '2047年B大校园「同学你好」联谊晚会的钟声敲响，晚会即将拉开帷幕。然而，主持人的突然失踪，让整个晚会陷入了混乱与尴尬。一系列诡异的现象接踵而至：灯光忽明忽暗，音响设备时好时坏，甚至有人声称看到了不明身影在会场中穿梭。这些事件的背后是否藏匿更大的阴谋？'
        },
        {
          title: '欺诈网之古代骗局揭秘',
          intro: '盛唐时期，国运兴旺，百姓日子过得蒸蒸日上。在明市最热闹的金碧街，人人都知这有位年轻帅气的林家公子。家境殷实，貌比潘安，邻里的少女每天都挤破脑袋想多看这位公子几眼，幻想着和这位富家少爷成就一段姻缘佳话。而金碧街更出名的，还有六位男女，都因参与过欺诈事件而臭名昭著。然而，这些诈骗事件背后似乎隐藏着一个更大的阴谋。'
        }
      ]
    }
  }
}
</script>

<style scope>
  .col-wrapper{
    box-sizing: border-box
 
 
  }
  #wrapper{
    text-align: center
 
  }
  #script_col{
    margin: 10px auto;
    text-indent: 2em;/* 首行缩进两字符*/
    line-height: 1.6;
    padding: 5px; /* 内边距为5像素 */  
   

  }
  #scriptName{
    font-weight: bold;
    color:#ede6e6
  }
</style>

<style>
  h1 {
    text-align: center;
    padding: 20px 0 20px 0;
    color: #ebe6e6;
    letter-spacing: 0.2em  /* 增加字符间距 */  
  }

  .script {
    display: flex;
    color: #ebe6e6;
  }
</style>