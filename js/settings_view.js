function SettingsViewClass(settings, containerID)
{
  this.settings = settings;
  this.container = document.getElementById(containerID);

  this.minMilliSeconds = 5;

  this.init = function()
  {
    this.container.innerHTML =
      '<table><tr>'+
      '<td>Status timer in milli seconds:</td><td>'+
      '<input type="text" id="'+this.$name()+'_timer_milli_seconds" class="settings_view_input" onchange="'+this.$name()+'.setStatusTimerMilliSeconds();"/>'+
      '<button type="button" class="settings_view_button" onclick="'+this.$name()+'.setStatusTimerMilliSeconds();">Set</button>'+
      '<button type="button" class="settings_view_button" onclick="'+this.$name()+'.resetStatusTimerMilliSeconds();">Reset</button>'+
      '</td></tr><tr>'+
      '<td>Run pause in milli seconds:</td><td>'+
      '<input type="text" id="'+this.$name()+'_runner_job_milli_seconds" class="settings_view_input" onchange="'+this.$name()+'.setRunnerJobMilliSeconds();"/>'+
      '<button type="button" class="settings_view_button" onclick="'+this.$name()+'.setStatusTimerMilliSeconds();">Set</button>'+
      '<button type="button" class="settings_view_button" onclick="'+this.$name()+'.resetRunnerJobMilliSeconds();">Reset</button>'+
      '</td></tr></table>';
  };

  this.draw = function()
  {
    document.getElementById(this.$name()+'_timer_milli_seconds').value = this.settings.statusTimerMilliSeconds;
    document.getElementById(this.$name()+'_runner_job_milli_seconds').value = this.settings.runnerJobMilliSeconds;
  };

  this.setStatusTimerMilliSeconds = function()
  {
    var number = parseInt(document.getElementById(this.$name()+'_timer_milli_seconds').value);
    if(number < this.minMilliSeconds)
      number = this.minMilliSeconds;
    this.settings.setStatusTimerMilliSeconds(number);
    this.draw();
  };

  this.resetStatusTimerMilliSeconds = function()
  {
    this.settings.resetStatusTimerMilliSeconds();
    this.draw();
  };

  this.setRunnerJobMilliSeconds = function()
  {
    var number = parseInt(document.getElementById(this.$name()+'_runner_job_milli_seconds').value);
    if(number < this.minMilliSeconds)
      number = this.minMilliSeconds;
    this.settings.setRunnerJobMilliSeconds(number);
    this.draw();
  };

  this.resetRunnerJobMilliSeconds = function()
  {
    this.settings.resetRunnerJobMilliSeconds();
    this.draw();
  };

  this.init();
  this.draw();
}
