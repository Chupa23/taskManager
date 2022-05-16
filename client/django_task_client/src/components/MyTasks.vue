<template>
  <div class="task_container">
    <b-button pill variant="dark" @click="this.addTask=!this.addTask" class="addBtn"> {{addTask ? "Cancel":"Add New Task"}}</b-button>
    <div class="task_content">
      <div v-for="stage in stages" :key="stage">
      <transition-group  
      tag="div"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutDown"
      class="tasks_list">
        <p class="stage">{{stage}}</p>

        <div v-for="task in tasks" :key="task.id">
          <div v-if="task.stage == stage" v-bind:class="stage">
          <h2>{{ task.title }}</h2>
          <p>{{ task.description }}</p>
          <p >Total:{{ convertTime(task.timer) }}</p>
          <b-button pill variant="info" v-if="task.stage=='Doing'" @click="toggleTimer(task, 0,true)">
            {{ task.timerState?"Stop":"Start" }}
          </b-button>
          <b-button v-if="task.stage!='ToDo'" pill variant="outline-danger" @click="toggleStage(task, 'ToDo')">
            To Do
          </b-button>
          <b-button v-if="task.stage!='Doing'" pill variant="outline-warning" @click="toggleStage(task, 'Doing')">
            Doing
          </b-button>
          <b-button v-if="task.stage!='Done'" pill variant="outline-success" @click="toggleStage(task,'Done')">
            Done
          </b-button>
          <b-button pill variant="dark" @click="deleteTask(task)">Delete</b-button>
          </div>
        </div>
          
        </transition-group>
      </div>
    
    </div>
        <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
         >
        <div v-if="addTask" class="add_task">
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="title" >Title</label>
          <input type="text" class="form-control" id="title" v-model="title" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="description"
          ></textarea>
        </div>
        <div class="form-group">
          <b-button pill variant="outline-light" class="createBtn" type="submit">Add Task</b-button>
        </div>
      </form>
    </div>
        </transition>
        <img src="tourqoise.jpeg" class="background">
  </div>
  
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      stages: ["ToDo", "Doing", "Done"],
      tasks: [""],
      title: "",
      description: "",
      stage: "ToDo",
      addTask: false
    };
  },
mounted () {
    setInterval(() => {
        for(let task in this.tasks){
          if(this.tasks[task].timerState){
            this.toggleTimer(this.tasks[task],1,false);
          }
        
      }
    }, 1000)
  },
  methods: {

     convertTime(seconds){
      try{
        let time = new Date(seconds * 1000).toISOString().substr(11, 8);
        return time;
      }
      catch(error) {
        console.log(error);
      }
    },

    async getData() {
      try {
        const datetime = new Date();
        let date = datetime.getFullYear()+"-"+(datetime.getMonth()+1)+"-"+datetime.getDate();
        const response = await axios.get(
          `http://${location.hostname}:8000/api/taskss/?format=json&created_at=${date}`
        );
        this.tasks = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async toggleTimer(task, x, toggle){
      try{
        this.switch = task.timerState;
        if(toggle){
          this.switch=!this.switch;
          
        }
        console.log(task.timerState);
          const response = await axios.put(
          `http://${location.hostname}:8000/api/taskss/${task.id}/?format=json`,
          {
            stage: task.stageToggle,
            title: task.title,
            description: task.description,
            timer: task.timer+x,
            timerState: this.switch,

          });
          this.localTimer = 0;
          let taskIndex = this.tasks.findIndex((t) => t.id === task.id);
        this.tasks = this.tasks.map((task) => {
          if (this.tasks.findIndex((t) => t.id === task.id) === taskIndex) {
            return response.data;
          }
          return task;
          
        });
        }
        catch (error) {
        console.log(error);
    }},
    async toggleStage(task, stageToggle) {
      try {
        const response = await axios.put(
          `http://${location.hostname}:8000/api/taskss/${task.id}/?format=json`,
          {
            stage: stageToggle,
            title: task.title,
            description: task.description
          }
        );

        let taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        this.tasks = this.tasks.map((task) => {
          if (this.tasks.findIndex((t) => t.id === task.id) === taskIndex) {
            return response.data;
          }
          return task;
        });
      } catch (error) {
        console.log(error);
      }
    },
	async submitForm(){
		try{
			const response = await axios.post(
			`http://${location.hostname}:8000/api/taskss/?format=json`,
			{
				title: this.title,
				description: this.description,
				stage: this.stage
			}
			);
			this.tasks.push(response.data);
			this.title = '';
			this.description  = '';
		}
		catch(error){
			console.log(error);
		}
	}, async deleteTask(task){
    let confirmation = confirm("Are you sure?");
    if(confirmation){
			try{
				await axios.delete(`http://${location.hostname}:8000/api/taskss/${task.id}/?format=json`);
				this.getData();
			}
			catch(error){
				console.log(error);
			}
    }
	}
  },
  beforeMount () {
   document.querySelector('body').setAttribute('style', 'background-image:url("tourqoise.jpeg")')
  },
  beforeUnmout () {
    document.querySelector('body').setAttribute('style', '')
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>

.background{
  position: fixed;
  left: 0%;
  top: 0%;
  z-index: -1;
  width: 100%;
  height: 130%;
}

.stage{

  position: relative;
  color: White;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 5px;
}

button{
  margin: 5px;
}

.createBtn{
margin:15px
}
form{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 10px;
  padding-top: 20px;
  padding-bottom: 0px;
  background-color: rgba(44, 44, 44, 0.856);
  width: 500px;
  border-radius: 15px;
  color: white;

}
.title{
  position: absolute;
  top: 0px;
}
.task_content{
  position: absolute;
  display: flex;
  flex-wrap: column;
  left: 50%;
  margin-top: 30px;
  transform: translate(-50%);
}

.tasks_list {

  background-color: rgba(0, 0, 0, 0.199);
  padding: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 25px;
  min-width: 200px;
  margin: 5px;
  border-radius: 40px;
  border: 1px solid rgba(116, 255, 243, 0.623);
  padding-top:5px;
}
.tasks_list > div > div{

  position: relative;
  list-style: none;
  min-width: 250px;
  max-width: 450px;
  /* height: 200px; */
  border-radius: 25px;
  padding: 10px;
  padding-bottom: 20px;
 background-color: rgba(116, 255, 243, 0.623); 
  margin-left: 20px;
}

@media(max-width : 520px){
  .task_content{
  position: absolute;
  display: flex;
  left: 100%;
  transform: translate(-50%);
}

.background{
  position: fixed;
  left: -50%;
  top: 0%;
  z-index: -1;
  width: 300%;
  height: 100%;
}

  .addBtn{
    position:fixed;
    left:125px;
    top:30px;
  }
}

</style>