import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Questions } from 'src/app/interfaces/questions';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() questions?: Questions;
  @Input() root!: am5.Root;
  // private root!: am5.Root;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit() {
    console.log(this.questions);
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.root = am5.Root.new(this.questions!.questionId);

      this.root.setThemes([am5themes_Animated.new(this.root)]);

      let chart = this.root.container.children.push(
        am5percent.PieChart.new(this.root, {})
      );

      // chart.get('colors')
      //   .set('colors', [
      //     am5.color(0xfd7f6f),
      //     am5.color(0x7eb0d5),
      //     am5.color(0xb2e061),
      //     am5.color(0xffb55a),
      //     am5.color(0xbd7ebe),
      //     am5.color(0xbeb9db),
      //   ]);

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(this.root, {
          name: 'Series',
          categoryField: 'result',
          valueField: 'count',
        })
      );

      series.data.setAll(this.questions!.data);

      // let legend = chart.children.push(
      //   am5.Legend.new(root, {
      //     centerX: am5.percent(50),
      //     x: am5.percent(50),
      //   })
      // );

      // legend.data.setAll(series.dataItems);
    });
  }
  ngOnDestroy(): void {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
