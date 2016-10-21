function StatusClass(settings, containerID)
{
  this.settings = settings;
  this.containerID = document.getElementById(containerID);
  this.containerID.addEventListener
  (
    'click',
    (
      function(that)
      {
        return function(event)
        {
          that.clear();
          return false;
        };
      }
    )(this),
    false
  );

  this.timer = undefined;

  this.timerStop = function()
  {
    if(this.timer !== undefined)
    {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  };

  this.timerStart = function()
  {
    if(this.timer === undefined)
      this.timer = setTimeout
      (
        (
          function(that)
          {
            return function()
            {
              that.clear();
            };
          }
        )(this),
        this.settings.statusTimerMilliSeconds
      );
  };

  this.audioError = new Audio('ogg/error.ogg');

  this.clear = function()
  {
    this.timerStop();
    this.containerID.innerHTML = '&nbsp;';
  };

  this.setMessage = function(text)
  {
    this.timerStop();
    this.containerID.innerHTML = '<span class="status_messaage">'+text+'</span>';
    this.timerStart();
  };

  this.setWarning = function(text)
  {
    this.timerStop();
    this.containerID.innerHTML = '<span class="status_warning">'+text+'</span>';
    this.timerStart();
  };

  this.setError = function(text)
  {
    this.timerStop();
    this.containerID.innerHTML = '<span class="status_error">'+text+'</span>';
    this.audioError.play();
    this.timerStart();
  };

  this.clear();
}
