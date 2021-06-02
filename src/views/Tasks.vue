<template>
    <div>
        <b-row align-v="center" align-h="between">
            <b-col>
                <h2 class="mt-3">Topshiriqlar ro'yhati</h2>
            </b-col>
            <b-col class="text-right">
                <b-button v-b-modal.newtask>Yangi topshiriq</b-button>
            </b-col>
        </b-row>
        <hr>
        <b-table striped hover :items="tasks" :fields="fields">
            <template #cell(lang)="data">
                {{ data.value.join(' ') }}
            </template>
            <template #cell(status)="data">
                <b-button :variant="statusColor[data.value]">
                {{ statusList[data.value] }}
                </b-button>
            </template>
            <template #cell(person)="data">
                <b-avatar :src="getWorkerImg(data.item.person)" size="2rem"></b-avatar>
                {{ getWorkerName(data.value) }}
            </template>
            <template #cell(btns)="data">
                <b-button @click='change(data.item.id,0)' variant="warning" class="me-2">
                    <b-icon-clock></b-icon-clock>
                </b-button>
                <b-button @click='change(data.item.id,1)' variant="success" class="me-2">
                    <b-icon-check-2></b-icon-check-2>
                </b-button>
                <b-button @click='change(data.item.id,2)' variant="danger" class="me-4">
                    <b-icon-x></b-icon-x>
                </b-button>
                
                <b-button @click='del(data.item.id)' variant="danger">
                    <b-icon-file-earmark-x-fill></b-icon-file-earmark-x-fill>
                </b-button>
            </template>
        </b-table>
        <b-modal id="newtask" title="Yangi xodimni ro`yhatdan o`tkazish" hide-footer>
            <b-form-input v-model="task.title" class="mb-3" placeholder="Topshiriq sarlavhasi"></b-form-input>
            <b-form-datepicker  v-model="task.deadline" class="mb-3"></b-form-datepicker>
            <vue-editor v-model="task.text" class="mb-3"/>
            
            <b-form-group class="mb-3" label="Mas`ul shaxs" >
                <b-form-select v-model="task.person" :options="persons"
                class="form-control"
                value-field="id"
                text-field="name"
                ></b-form-select>
            </b-form-group>
            <b-button variant="success" @click="add(), $bvModal.hide('newtask')">Kiritish</b-button>
        </b-modal>  
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: { VueEditor },
    data(){
        return {
            task: {
                status:0
            },
            statusList: ['Bajarilmoqda','Tugatildi','Bekor qilindi'],
            statusColor: ['warning','success','danger'],
            fields: [
                {key:'title', label:'Sarlavha'},
                {key:'deadline', label:'Ohirgi sana'}, 
                {key:'person', label:'Mas`ul shaxs'},
                {key:'avatar', label:''},
                {key:'status', label:'Topshiriq holati'},
                {key:'btns', label:''},
            ],
        }
    },
    computed: {
        tasks(){
            return this.$store.getters.tasks
        },
        persons(){
            return this.$store.getters.workers
        }
    },
    methods: {
        add(){
            this.$store.dispatch('addNewTask',this.task)
            this.task = {
                status: 0
            }
        },
        change(id,status){
            let currentTask = this.$store.getters.getTaskById(id)
            currentTask.status = status
            this.$store.dispatch('changeTask',currentTask)
        },
        del(id){
            this.$store.dispatch('delTask',id)
        },
        getWorkerName(id){
            let worker = this.$store.getters.getWorkerById(id)
            return worker[0].name
        },
        getWorkerImg(id){
            let worker = this.$store.getters.getWorkerById(id)
            return worker[0].url
        },
        
    },
}
</script>

<style>

</style>