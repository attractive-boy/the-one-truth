<template>
  <div id="banner">
    <div id="det_div" @click="iconClick">
      <img src="@/assets/Home/detective.png" id="det_img"/>
      <div>骗术解密馆</div>
    </div>
    
    <slot class="banner_item"></slot>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  components: {
    
  },
  methods: {
    iconClick()
    {
      this.$router.push('/home')
    }
  }
}
</script>

<style>
  #banner {
    background-color: #320c03;
    box-shadow: 0 1px 5px rgba(32, 32, 32, 0.15);
    display: flex;
    justify-content: flex-end;
    text-align: center;
    color:#ebe6e6
  }

  #det_div{
    height: 70px;
    flex: 1 0 auto;
    text-align: left;
    line-height: 70px;
    display: flex;
  }

  #det_img{
    height: 70px;
    margin: 00px 20px 00px 20px;
  }

</style>