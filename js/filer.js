function FilerClass(status, programID, world, machine, worldView, machineView)
{
  this.status = status;
  this.program = document.getElementById(programID);
  this.world = world;
  this.machine = machine;
  this.worldView = worldView;
  this.machineView = machineView;

  this.load = function(files, callback)
  {
    this.status.clear();
    if(files.length != 1)
    {
      this.status.setError('First select file');
      return;
    }
    var reader = new FileReader();
    reader.onerror =
    (
      function(that)
      {
        return function(event)
        {
          that.status.setError('Error in loading');
        };
      }
    )(this);
    reader.onload =
    (
      function(that)
      {
        return function(event)
        {
          var result = callback(reader.result);
          if(result === true)
            that.status.setMessage('Loaded');
          else
            that.status.setError(result);
        };
      }
    )(this);
    reader.readAsText(files[0]);
  };

  this.loadProgram = function(files)
  {
    this.load
    (
      files,
      (
        function(that)
        {
          return function(text)
          {
            that.program.value = text;
            that.machine.unSet();
            that.machineView.init();
            return true;
          }
        }
      )(this)
    );
  };

  this.loadWorld = function(files)
  {
    this.load
    (
      files,
      (
        function(that)
        {
          return function(text)
          {
            var data;
            try
            {
              data = JSON.parse(text);
            }
            catch(error)
            {
              return 'Bad world file format';
            }
            var result = that.world.load(data);
            if(result !== true)
              return 'Bad world file format: '+result;
            that.worldView.draw();
            return true;
          }
        }
      )
      (this)
    );
  };

  this.save = function(name, content)
  {
    this.status.clear();
    var blob= new Blob([content], {type:'text/plain'});
    var download = document.createElement('a');
    download.download = name;
    download.innerHTML = '';
    if(window.URL === undefined)
      window.URL = window.webkitURL;
    download.href = window.URL.createObjectURL(blob);
    download.onclick = function(event)
    {
      document.body.removeChild(event.target);
    };
    download.style.display = 'none';
    document.body.appendChild(download);
    download.click();
    this.status.setMessage('Saved');
  };

  this.saveProgram = function(name)
  {
    this.save(name, this.program.value);
  };

  this.saveWorld = function(name)
  {
    this.save(name, JSON.stringify(world.save()));
  };

  this.get = function(url, callback)
  {
    this.status.clear();
    var xhttp = new XMLHttpRequest();
    xhttp.onerror =
    (
      function(that)
      {
        return function(event)
        {
          that.status.setError('Error in get');
        };
      }
    )(this);
    xhttp.onload =
    (
      function(that)
      {
        return function(event)
        {
          var result = callback(this.response);
          if(result === true)
            that.status.setMessage('Loaded');
          else
            that.status.setError(result);
        }
      }
    )(this);
    xhttp.open('GET', url, true);
    xhttp.send();
  };

  this.getProgram = function(url)
  {
    this.get
    (
      url,
      (
        function(that)
        {
          return function(text)
          {
            that.program.value = text;
            that.machine.unSet();
            that.machineView.init();
            return true;
          }
        }
      )(this)
    );
  };

  this.getWorld = function(url)
  {
    this.get
    (
      url,
      (
        function(that)
        {
          return function(text)
          {
            var data;
            try
            {
              data = JSON.parse(text);
            }
            catch(error)
            {
              return 'Bad world file format';
            }
            var result = that.world.load(data);
            if(result !== true)
              return 'Bad world file format: '+result;
            that.worldView.draw();
            return true;
          }
        }
      )
      (this)
    );
  };
}
