<template>
  <div class="home">
    <b-row class="mt-4">
      <b-col cols='4'>
        <b-card bg-variant="primary" text-variant="white" header="Ishchilar soni" class="text-center">
          <b-card-text>{{son}} ta</b-card-text>
        </b-card>
      </b-col>
      <b-col cols='4'>
        <b-card bg-variant="primary" text-variant="white" header="Ayol ishchilar soni" class="text-center">
          <b-card-text>{{woman}} ta</b-card-text>
        </b-card>
      </b-col>
      <b-col cols='4'>
        <b-card bg-variant="primary" text-variant="white" header="Erkak ishchilar soni" class="text-center">
          <b-card-text>{{meeen}} ta</b-card-text>
        </b-card>
      </b-col>
    </b-row>
      

    
  </div>
</template>

<script>

export default {
  data(){
    return {
      
    }
  },
  computed:{
    son(){
      return this.$store.getters.countWorkers
    },
    woman(){
      return this.$store.getters.getWoman
    },
    meeen(){
      return this.$store.getters.getDude
    }
  }
}
</script>
