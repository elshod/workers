<template>
    <div>
        <b-row align-v="center" align-h="between">
            <b-col>
                <h2 class="mt-3">Ishchilar ro'yhati</h2>
            </b-col>
            <b-col class="text-right">
                <b-button v-b-modal.newWorker>Yangi xodim</b-button>
            </b-col>
        </b-row>
        <hr>
        <b-table striped hover :items="persons" :fields="fields">
            <template #cell(lang)="data">
                {{ data.value.join(' ') }}
            </template>
            <template #cell(btns)="data">
                <b-button @click='del(data.item.id)' variant="danger">
                    <b-icon-person-x></b-icon-person-x>
                </b-button>
            </template>
        </b-table>
        <b-modal id="newWorker" title="Yangi xodimni ro`yhatdan o`tkazish" hide-footer>
            <b-form-input v-model="person.name" class="mb-3" placeholder="Ismini kiriting"></b-form-input>
            <b-form-input v-model="person.age" class="mb-3" placeholder="Yoshini"></b-form-input>
            <b-form-input v-model="person.url" class="mb-3" placeholder="Rasm url"></b-form-input>
            <b-form-group class="mb-3" label="Jinsini tanlang">
                <b-form-radio v-model="person.gender"  name="gender" value="Erkak">Erkak</b-form-radio>
                <b-form-radio v-model="person.gender"  name="gender" value="Ayol">Ayol</b-form-radio>
            </b-form-group>
            <b-form-group class="mb-3" label="Qaysi dasturlash tilini bilasiz" >
                <b-form-row class="">
                <b-form-checkbox-group
                    id="checkbox-lang"
                    v-model="person.lang"
                    class="mb-3 d-flex mr-3"
                    :options="langs"
                    name="flavour-1"
                ></b-form-checkbox-group>
                </b-form-row>
            </b-form-group>
            <b-form-group class="mb-3" label="Qaysi bo`limga ishga kiryapdi" >
                <b-form-select v-model="person.depart" :options="options"></b-form-select>
            </b-form-group>
            <b-button variant="success" @click="add(), $bvModal.hide('newWorker')">Kiritish</b-button>
        </b-modal>  
    </div>
</template>

<script>

export default {
    data(){
        return {
            
            person: {
                lang: []
            },
            fields: [
                {key:'name', label:'Ismi'},
                {key:'age', label:'Yoshi'},
                {key:'gender', label:'Jinsi'},
                {key:'lang', label:'Dasturlash tili'},
                {key:'depart', label:'Bo`lim'},
                {key:'btns', label:''},
            ],
            langs: [
                {text: 'JavaScript', value: 'JavaScript'},
                {text: 'PHP', value: 'PHP'},
                {text: 'Python', value: 'Python'},
                {text: 'Dart', value: 'Dart'},
            ],
            options: [
                { text: 'Veb ilovalar bo`limi', value: 'Veb ilovalar bo`limi' },
                { text: 'Mobil ilovalar bo`limi', value: 'Mobil ilovalar bo`limi' },
                { text: 'Qo`llab-quvvatlash bo`limi', value: 'Qo`llab-quvvatlash bo`limi' },
                { text: 'Menejment bo`limi', value: 'Menejment bo`limi' },
            ]
        }
    },
    computed: {
        persons(){
            return this.$store.getters.workers
        }
    },
    methods: {
        add(){
            this.$store.dispatch('addNewWorker',this.person)
            this.person = {
                lang: []
            }
        },
        del(id){
            this.$store.dispatch('delWorker',id)
        }
    },
    created(){
       
    }
}
</script>

<style>
    
</style>