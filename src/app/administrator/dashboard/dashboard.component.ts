import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { SubmissionsService } from '../../services/submissions.service';
import { QuizService } from '../../services/quiz.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Submissions } from '../../models/submissions/Submissions';
import { Students } from '../../models/students/Student';

import { StudentWithSubmissions } from '../../models/students/StudentWithSubmissions';
import { AsyncPipe } from '@angular/common';
import { Quiz } from '../../models/quiz/Quiz';
import { GameWithSubmissions } from '../../models/quiz/Game';
import { BaseChartDirective } from 'ng2-charts';
import { displayFullname } from '../../utils/Constants';
import { Category } from '../../models/submissions/Category';

export interface StudentSubmissionWithGame {
  name: string;
  profile: string;
  gameName: string;
  levelName: string;
  earning: number;
}

interface AverageScorePerGame {
  category: 'MATH' | 'ENGLISH';
  averegePerSubmission: number;
  totalMacthes: number;
}
interface MostPlayedCategories {
  category: Category;
  total: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  games$ = this.quizService.getAllQuiz();
  studentsWithSubmissions$ =
    this.submissionService.getSttudentWithSubmissions();

  submissions$: Observable<Submissions[]> = this.studentsWithSubmissions$.pipe(
    map((studentWithSubmissions) =>
      studentWithSubmissions
        .flatMap((sws) => sws.submissions)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    )
  );

  averageScorePerGame$ = this.submissions$.pipe(
    map((data: Submissions[]) => {
      let math = data.filter((e) => e.quizInfo?.type === 'MATH');
      let english = data.filter((e) => e.quizInfo?.type === 'ENGLISH');
      let mathMatches = math.length;
      let englishMatches = english.length;

      //compute average score per game
      let mathTotalScore = 0;
      let mathTotalPlayerEarning = 0;
      math.forEach((e) => {
        mathTotalScore +=
          (e.quizInfo?.levels?.points ?? 0) *
          (e.quizInfo?.levels?.questions ?? 0);
        mathTotalPlayerEarning += e.performance.earning;
      });

      //compute average score per game
      let englishTotalScore = 0;
      let englishTotalPlayerEarning = 0;
      english.forEach((e) => {
        englishTotalScore +=
          (e.quizInfo?.levels?.points ?? 0) *
          (e.quizInfo?.levels?.questions ?? 0);
        englishTotalPlayerEarning += e.performance.earning;
      });

      // Calculate average score per game
      let mathAveragePerGame =
        mathMatches > 0 ? mathTotalPlayerEarning / mathMatches : 0;
      let englishAveragePerGame =
        englishMatches > 0 ? englishTotalPlayerEarning / englishMatches : 0;
      return [
        {
          category: 'MATH',
          averagePerSubmission: mathAveragePerGame,
          totalMatches: mathMatches,
        },
        {
          category: 'ENGLISH',
          averagePerSubmission: englishAveragePerGame,
          totalMatches: englishMatches,
        },
      ];
    })
  );
  public barChartData: ChartData<'bar'> = {
    labels: ['MATH', 'ENGLISH'],
    datasets: [
      {
        data: [],
        label: 'Average score per game',
        backgroundColor: ['#FF6384', '#36A2EB'], // Optional: Add colors for the bars
      },
    ],
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  public barChartType: any = 'bar';

  top10Submissions$: Observable<Submissions[]> = this.submissions$.pipe(
    map(
      (submissions) =>
        submissions
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // Sort by createdAt in descending order
          .slice(0, 8) // Get the top 10 submissions
    )
  );

  top5Games$ = combineLatest([this.games$, this.submissions$]).pipe(
    map(([games, submissions]) => {
      return games.map((game) => {
        let matchingSubmissions = submissions.filter(
          (submission) => submission.quizInfo?.id === game.id
        );
        return {
          name: game.title,
          submissions: matchingSubmissions.length,
        } as GameWithSubmissions;
      });
    })
  );

  students$: Observable<Students[]> = this.studentsWithSubmissions$.pipe(
    map((studentWithSubmissions) =>
      studentWithSubmissions.map((sws) => sws.student)
    )
  );
  mostPlayedCategories$: Observable<MostPlayedCategories[]> =
    this.submissions$.pipe(
      map((submissions: Submissions[]) => {
        const categoryMap = new Map<Category, number>();

        submissions.forEach((submission) => {
          const category = submission.quizInfo?.category;
          if (category) {
            if (!categoryMap.has(category)) {
              categoryMap.set(category, 0);
            }
            categoryMap.set(category, categoryMap.get(category)! + 1);
          }
        });

        const result: MostPlayedCategories[] = [];
        categoryMap.forEach((total, category) => {
          result.push({ category, total });
        });

        return result;
      })
    );

  public pieChartData: ChartData<'pie'> = {
    labels: [],

    datasets: [
      {
        data: [],
        label: 'Most Played Categories',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartType: any = 'pie';

  recent$: Observable<StudentSubmissionWithGame[]> = combineLatest([
    this.students$,
    this.games$,
    this.top10Submissions$,
  ]).pipe(
    map(([students, games, submissions]) => {
      return submissions.map((submission) => {
        const student = students.find((s) => s.id === submission.studentID);
        const game = games.find((g) => g.id === submission.quizInfo?.id);
        return {
          name: displayFullname(
            student?.fname ?? '',
            student?.mname ?? '',
            student?.lname ?? 'unknown user'
          ),
          profile: student?.profile || '',
          gameName: game?.title || 'Unknown',
          levelName: submission.quizInfo?.levels?.name || 'Unknown',
          earning: submission.performance.earning || 0,
        } as StudentSubmissionWithGame;
      });
    })
  );

  top5Students$: Observable<StudentWithSubmissions[]> =
    this.studentsWithSubmissions$.pipe(
      map((studentWithSubmissions) =>
        studentWithSubmissions.sort((a, b) => b.points - a.points).slice(0, 5)
      )
    );

  constructor(
    private submissionService: SubmissionsService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.averageScorePerGame$.subscribe((categories) => {
      this.barChartData.datasets[0].data = categories.map(
        (category) => category.averagePerSubmission
      );
    });

    this.mostPlayedCategories$.subscribe((data) => {
      this.pieChartData.labels = data.map((category) => category.category);
      this.pieChartData.datasets[0].data = data.map(
        (category) => category.total
      );
    });
  }
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }
}
