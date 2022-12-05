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
  // private root!: am5.Root;
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

    // this.root.setThemes([am5themes_Animated.new(this.root)]);

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

    this.yAxis = this.chart.yAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        maxDeviation: 0,
        categoryField: 'network',
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(this.root, { themeTags: ['axis'] }),
      })
    );

    this.xAxis = this.chart.xAxes.push(
      am5xy.ValueAxis.new(this.root, {
        maxDeviation: 0,
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererX.new(this.root, {}),
      })
    );

    this.series = this.chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: 'Series 1',
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        valueXField: 'value',
        categoryYField: 'network',
        tooltip: am5.Tooltip.new(this.root, {
          pointerOrientation: 'left',
          labelText: '{valueX}',
        }),
      })
    );

    this.series.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
    });

    // series.columns.template.adapters.add('fill', function (fill, target) {
    //   return chart.get('colors').getIndex(series.columns.indexOf(target));
    // });

    // series.columns.template.adapters.add('stroke', function (stroke, target) {
    //   return chart.get('colors').getIndex(series.columns.indexOf(target));
    // });

    // Set data
    let data = [
      {
        network: 'Facebook',
        value: 2255250000,
      },
      {
        network: 'Google+',
        value: 430000000,
      },
      {
        network: 'Instagram',
        value: 1000000000,
      },
      {
        network: 'Pinterest',
        value: 246500000,
      },
      {
        network: 'Reddit',
        value: 355000000,
      },
      {
        network: 'TikTok',
        value: 500000000,
      },
      {
        network: 'Tumblr',
        value: 624000000,
      },
      {
        network: 'Twitter',
        value: 329500000,
      },
      {
        network: 'WeChat',
        value: 1000000000,
      },
      {
        network: 'Weibo',
        value: 431000000,
      },
      {
        network: 'Whatsapp',
        value: 1433333333,
      },
      {
        network: 'YouTube',
        value: 1900000000,
      },
    ];

    this.yAxis.data.setAll(data);
    this.series.data.setAll(data);
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
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
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
