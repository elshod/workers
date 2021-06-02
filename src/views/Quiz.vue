<template>
    <div>
        <b-card :title="question.question" >
            <b-card-text>
                <b-form-radio v-for="(variant,index) of question.incorrect_answers" :key='index' v-model="answer" name="variants" :value="variant">{{variant}}</b-form-radio>
            </b-card-text>
            <b-button @click="check()" variant="warning">
                Check
            </b-button>
            
            
        </b-card>
        <b-table striped hover :items="questions"></b-table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            question: {},
            answer: '',
            questions: [],
            questionCount: 0,
            trueAnswer:0
        }
    },
    methods: {
        check(){
            if (this.answer == this.question.correct_answer){
                this.trueAnswer++
                console.log('correct')
            }
            this.questionCount++
            this.question   = this.questions[this.questionCount]
            this.question.incorrect_answers.push(this.question.correct_answer)
        }
    },
    created(){
        axios.get('https://opentdb.com/api.php?amount=20&difficulty=easy&type=multiple').then(response => {
            this.questions = response.data.results
            this.question   = this.questions[this.questionCount]
            this.question.incorrect_answers.push(this.question.correct_answer)
        })
    }
}
</script>

<style>

</style>