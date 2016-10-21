function RunnerClass(settings, status, machine, worldView, machineView)
{
  this.settings = settings;
  this.status = status;
  this.machine = machine;
  this.worldView = worldView;
  this.machineView = machineView;

  this.do = function()
  {
    var result = machine.step();
    if(result === false)
      status.setMessage('Machine stopped');
    else if(result !== true)
      status.setError(result);
    worldView.draw();
    machineView.draw();
  };

  this.job = undefined;

  this.stop = function()
  {
    if(this.job !== undefined)
    {
      clearInterval(this.job);
      this.job = undefined;
    }
  };

  this.start = function()
  {
    if(this.job === undefined)
      this.job = setInterval
      (
        (
          function(that)
          {
            return function()
            {
              that.do();
              if(that.machine.stopped)
                that.stop();
            };
          }
        )(this),
        this.settings.runnerJobMilliSeconds
      );
  };

  this.runStop = function()
  {
    status.clear();
    if(this.job === undefined)
      this.start();
    else
      this.stop();
  };

  this.step = function()
  {
    status.clear();
    if(this.job === undefined)
      this.do();
  };
}
