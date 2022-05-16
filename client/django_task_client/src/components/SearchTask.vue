<template>
    <div class="wrapper">
        <form v-on:submit.prevent="selectDate">
            <input class="date_input" type="Date" v-model="selectedDate">
            <b-button pill variant="outline-light" type="submit">Select</b-button>
        </form>
        <div class="container">
        <div class="task" v-for="task in tasks" :key="task.id">
            <h1>{{task.title}}</h1>
            <p>{{task.description}}</p>
            <p>Date: {{task.created_at}}</p>
            <p>Status: {{task.stage}}</p>
            <p>Time:  {{convertTime(task.timer)}}</p>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default ({
    data(){
        return{
            selectedDate : '',
            tasks : [],
        }
    },

    methods:{
        
        convertTime(seconds){
      try{
        let time = new Date(seconds * 1000).toISOString().substr(11, 8);
        console.log(typeof(time));
        return time;
      }
      catch(error) {
        console.log(error);
      }
    },
        async selectDate(){
            this.getFilteredData();
        },

        async getFilteredData(){
            try {
                const response = await axios.get(
                `http://${location.hostname}:8000/api/taskss/?format=json&created_at=${this.selectedDate}`
                );
                this.tasks = response.data;
            }
            catch (error) {
                 console.log(error);
      }
        }

    },

    created() {
        this.getFilteredData();
    },
})
</script>

<style scoped>
.container{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
}
form{
    background-color: rgba(49, 49, 49, 0.623);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 250px;
    height: 50px;
    padding: 5px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    margin-bottom: 20px;
}
.date_input{
    background-color: rgba(255, 255, 255, 0);
    color: white;
    border: 1px solid white;
    border-radius: 20px;
    height: 35px;
}
.task{
  position: relative;
  list-style: none;
  min-width: 250px;
  max-width: 450px;
  /* height: 200px; */
  border-radius: 25px;
  padding: 10px;
  padding-bottom: 20px;
 background-color: rgba(116, 255, 243, 0.623); 
  margin: 20px;
}
</style>