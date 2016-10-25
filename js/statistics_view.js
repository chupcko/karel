function StatisticsViewClass(statistics, containerID)
{
  this.statistics = statistics;
  this.container = document.getElementById(containerID);

  this.init = function()
  {
    this.container.innerHTML =
      '<table>'+
      '<tr><td>Count tick</td><td>= <span id="'+this.$name()+'_countTick" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count do LEFT</td><td>= <span id="'+this.$name()+'_countDoLeft" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count do MOVE</td><td>= <span id="'+this.$name()+'_countDoMove" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count do PUT</td><td>= <span id="'+this.$name()+'_countDoPut" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count do HAVE</td><td>= <span id="'+this.$name()+'_countDoTake" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count test NORTH</td><td>= <span id="'+this.$name()+'_countTestNorth" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count test WALL</td><td>= <span id="'+this.$name()+'_countTestWall" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count test HAVE</td><td>= <span id="'+this.$name()+'_countTestHave" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count test FIND</td><td>= <span id="'+this.$name()+'_countTestFind" class="statistics_view_data"></span></td></tr>'+
      '<tr><td>Count call</td><td>= <span id="'+this.$name()+'_countCall" class="statistics_view_data"></span></td></tr>'+
      '</table>';
  };

  this.draw = function()
  {
    document.getElementById(this.$name()+'_countTick').innerHTML = this.statistics.countTick;
    document.getElementById(this.$name()+'_countDoLeft').innerHTML = this.statistics.countDoLeft;
    document.getElementById(this.$name()+'_countDoMove').innerHTML = this.statistics.countDoMove;
    document.getElementById(this.$name()+'_countDoPut').innerHTML = this.statistics.countDoPut;
    document.getElementById(this.$name()+'_countDoTake').innerHTML = this.statistics.countDoTake;
    document.getElementById(this.$name()+'_countTestNorth').innerHTML = this.statistics.countTestNorth;
    document.getElementById(this.$name()+'_countTestWall').innerHTML = this.statistics.countTestWall;
    document.getElementById(this.$name()+'_countTestHave').innerHTML = this.statistics.countTestHave;
    document.getElementById(this.$name()+'_countTestFind').innerHTML = this.statistics.countTestFind;
    document.getElementById(this.$name()+'_countCall').innerHTML = this.statistics.countCall;
  };

  this.init();
  this.draw();
}
