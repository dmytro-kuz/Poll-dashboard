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

  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.root = am5.Root.new(this.questions!.questionId);

      this.root.setThemes([am5themes_Animated.new(this.root)]);

      let chart = this.root.container.children.push(
        am5percent.PieChart.new(this.root, {})
      );

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(this.root, {
          name: 'Series',
          categoryField: 'result',
          valueField: 'count',
        })
      );

      series.data.setAll(this.questions!.data);
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
