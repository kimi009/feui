<template>
  <div class="page page-with-padding">
    <fe-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">Loading</fe-header>
    <div class="fe-content">
      <div style="margin:10px;">
        <fe-button type="primary" @click.native="showLoading">show Loading(2秒后关闭)</fe-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
  data () {
    return {
    }
  },
  created:function(){
  },
  methods:{
    showLoading () {
      Toast.loading({duration: 2000, mask: true });
      
      // Loading.show({text:'显示咯'});
      // setTimeout(function(){
      //    Loading.hide()
      // },2000)
    }
  }
}
</script>