function StatisticsViewClass(statistics, containerID)
{
  this.statistics = statistics;
  this.container = document.getElementById(containerID);

  this.init = function()
  {
    this.container.innerHTML =
      '<table>'+
      '<tr><td>Count of tick</td><td>= <span id="'+this.$name()+'_counterTick" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of do LEFT</td><td>= <span id="'+this.$name()+'_counterDoLeft" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of do MOVE</td><td>= <span id="'+this.$name()+'_counterDoMove" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of do PUT</td><td>= <span id="'+this.$name()+'_counterDoPut" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of do TAKE</td><td>= <span id="'+this.$name()+'_counterDoTake" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of test NORTH</td><td>= <span id="'+this.$name()+'_counterTestNorth" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of test WALL</td><td>= <span id="'+this.$name()+'_counterTestWall" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of test HAVE</td><td>= <span id="'+this.$name()+'_counterTestHave" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of test FIND</td><td>= <span id="'+this.$name()+'_counterTestFind" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count of call</td><td>= <span id="'+this.$name()+'_counterCall" class="statistics_view_data"></span></td></tr>'+
      '</table>';
  };

  this.draw = function()
  {
    document.getElementById(this.$name()+'_counterTick').innerHTML = this.statistics.counterTick;
    document.getElementById(this.$name()+'_counterDoLeft').innerHTML = this.statistics.counterDoLeft;
    document.getElementById(this.$name()+'_counterDoMove').innerHTML = this.statistics.counterDoMove;
    document.getElementById(this.$name()+'_counterDoPut').innerHTML = this.statistics.counterDoPut;
    document.getElementById(this.$name()+'_counterDoTake').innerHTML = this.statistics.counterDoTake;
    document.getElementById(this.$name()+'_counterTestNorth').innerHTML = this.statistics.counterTestNorth;
    document.getElementById(this.$name()+'_counterTestWall').innerHTML = this.statistics.counterTestWall;
    document.getElementById(this.$name()+'_counterTestHave').innerHTML = this.statistics.counterTestHave;
    document.getElementById(this.$name()+'_counterTestFind').innerHTML = this.statistics.counterTestFind;
    document.getElementById(this.$name()+'_counterCall').innerHTML = this.statistics.counterCall;
  };

  this.init();
  this.draw();
}
