import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  answers: string[] = [];
  answearSelected: string = '';
  questions: any;
  questionSelected: any;

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title;
      this.finished = false;
      this.questions = quizz_questions.questions;

      this.questionMaxIndex = this.questions.length;
      this.selectQuestion(this.questionIndex);
    }
  }

  choose(value: string) {
    this.answers.push(value);
    this.questionIndex++;
    this.selectQuestion(this.questionIndex);
  }

  async selectQuestion(index: number) {
    if (this.questionMaxIndex > index) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnwser: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answearSelected =
        quizz_questions.results[
          finalAnwser as keyof typeof quizz_questions.results
        ];
    }
  }

  async checkResult(anwsers: string[]) {
    return anwsers.reduce((previous, current, index, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
  }
}
