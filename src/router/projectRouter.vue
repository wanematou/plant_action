<template>
    <Navebar/>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
    import Navebar from '@/components/Navebar.vue';
    export default{
    components:{Navebar}
    }
</script>
