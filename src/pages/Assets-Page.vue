<template>
  <q-page class="flex column">
    <div class="page-header">
      <div class="header-section">
        <div class="flex flex-center float-left">
          <div class="breadcrumbs">Wallet</div>
          <div class="breadcrumbs-line"></div>
        </div>
        <div class="flex flex-center float-right">
          <q-btn-group rounded>
            <q-btn-dropdown rounded label="bdevgroup@crypto"></q-btn-dropdown>
            <q-btn color="dark" rounded label="2.4253 ETH" />
            <q-btn color="dark" rounded label="0x8e6b . . . 12e2" />
          </q-btn-group>
          <q-btn class="option-align-btn" flat icon="format_align_right" />
        </div>
      </div>
      <div class="header-section">
        <q-breadcrumbs>
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" />
          </template>
          <q-breadcrumbs-el label="Dashboard" />
          <q-breadcrumbs-el label="Wallet" />
          <q-breadcrumbs-el label="Ethereum" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="page-body row">
      <div class="col-8">
        <div class="wallet-card ethereum-chart">
          <div id="chart">
            <div id="chart-timeline">
              <apexchart
                type="area"
                height="300"
                ref="chart"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
            <div class="toolbar">
              <q-btn flat @click="updateData('1H')" label="1H" />
              <q-btn flat @click="updateData('1D')" label="1D" />
              <q-btn flat @click="updateData('1W')" label="1W" />
              <q-btn flat @click="updateData('1M')" label="1M" />
              <q-btn flat @click="updateData('1Y')" label="1Y" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="wallet-card ethereum-chart q-pa-md">
          <div class="text-h6">Send</div>
          <q-input
            rounded
            standout
            v-model="text"
            label="Rounded outlined"
            hint="Equlvalent in USD"
          />

          <q-input
            rounded
            standout
            v-model="number"
            label="Amount"
            hint="Equlvalent in USD"
          >
            <template v-slot:append>
              <q-avatar>
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  stack-label
                  label="Standard"
                  color="secondary"
                >
                  <template v-slot:selected-item="scope">
                    <q-chip
                      removable
                      dense
                      @remove="scope.removeAtIndex(scope.index)"
                      :tabindex="scope.tabindex"
                      color="white"
                      text-color="secondary"
                      class="q-ma-none"
                    >
                      <q-avatar
                        color="secondary"
                        text-color="white"
                        :icon="scope.opt.icon"
                      />
                      {{ scope.opt.label }}
                    </q-chip>
                  </template>
                </q-select>
              </q-avatar>
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "IndexPage",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 300,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          show: false,
          type: "string",
          categories: ["", ""],
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: ["#2EC083"],
          width: 2,
          dashArray: 0,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: ["#c1a9cd", "#fcf6ff"],
        },
      },
      selection: "one_year",
    };
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    getChartData: function () {
      axios
        .get(
          "https://cache.volentix.io/https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
        )
        .then((response) => {
          console.log(response.data.prices);
          this.series[0].data = response.data.prices;
        })
        .catch(() => {});
    },
    updateData: function (timeline) {
      this.selection = timeline;

      switch (timeline) {
        case "one_month":
          this.$refs.chart.zoomX(
            new Date("28 Jan 2013").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "six_months":
          this.$refs.chart.zoomX(
            new Date("27 Sep 2012").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "one_year":
          this.$refs.chart.zoomX(
            new Date("27 Feb 2012").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "ytd":
          this.$refs.chart.zoomX(
            new Date("01 Jan 2013").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "all":
          this.$refs.chart.zoomX(
            new Date("23 Jan 2012").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        default:
      }
    },
  },
});
</script>
