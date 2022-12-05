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

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() questions?: Questions;
  @Input() root!: am5.Root;
  private chart: any;
  private yAxis: any;
  private xAxis: any;
  private series: any;

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

  ngOnInit() {}

  ngAfterViewInit() {
    this.root = am5.Root.new(this.questions!.questionId + 1);

    this.root.setThemes([am5themes_Animated.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
      })
    );

    this.chart.zoomOutButton.set('forceHidden', true);

    let yRenderer = am5xy.AxisRendererY.new(this.root, {
      minGridDistance: 30,
    });

    let xRenderer = am5xy.AxisRendererX.new(this.root, {
      minGridDistance: 40,
    });

    this.yAxis = this.chart.yAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        maxDeviation: 0,
        categoryField: 'result',
        renderer: yRenderer,
      })
    );

    this.xAxis = this.chart.xAxes.push(
      am5xy.ValueAxis.new(this.root, {
        maxDeviation: 0,
        min: 0,
        extraMax: 0.1,
        renderer: xRenderer,
      })
    );

    this.series = this.chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: 'Series 1',
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        valueXField: 'count',
        categoryYField: 'result',
      })
    );

    this.series.columns.template.adapters.add(
      'fill',
      (fill: any, target: any) => {
        return this.chart
          .get('colors')
          .getIndex(this.series.columns.indexOf(target));
      }
    );

    this.series.columns.template.adapters.add(
      'stroke',
      (stroke: any, target: any) => {
        return this.chart
          .get('colors')
          .getIndex(this.series.columns.indexOf(target));
      }
    );

    this.yAxis.data.setAll(this.questions!.data);
    this.series.data.setAll(this.questions!.data);
    this.sortCategoryAxis();
  }

  getSeriesItem(category: any) {
    for (var i = 0; i < this.series.dataItems.length; i++) {
      let dataItem = this.series.dataItems[i];
      if (dataItem.get('categoryY') == category) {
        return dataItem;
      }
    }
  }

  sortCategoryAxis() {
    // Sort by value
    this.series.dataItems.sort(function (x: any, y: any) {
      return x.get('valueX') - y.get('valueX'); // descending
      //return y.get("valueY") - x.get("valueX"); // ascending
    });
    am5.array.each(this.yAxis.dataItems, (dataItem: any) => {
      // get corresponding series item
      let seriesDataItem = this.getSeriesItem(dataItem.get('category'));

      if (seriesDataItem) {
        // get index of series data item
        let index = this.series.dataItems.indexOf(seriesDataItem);
        // calculate delta position
        let deltaPosition =
          (index - dataItem.get('index', 0)) / this.series.dataItems.length;
        // set index to be the same as series data item index
        dataItem.set('index', index);
        // set deltaPosition instanlty
        dataItem.set('deltaPosition', -deltaPosition);
        // animate delta position to 0
        dataItem.animate({
          key: 'deltaPosition',
          to: 0,
          duration: 3000,
          easing: am5.ease.out(am5.ease.linear),
        });
      }
    });

    // Sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set,
    // they keep in the same places and then animate to true positions.
    this.yAxis.dataItems.sort(function (x: any, y: any) {
      return x.get('index') - y.get('index');
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
