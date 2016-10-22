(
  function()
  {
    var _id = 0;
    Object.prototype.$id = function()
    {
      if(typeof this.$_id === 'undefined')
      {
        this.$_id = _id;
        _id++;
      }
      return this.$_id;
    };
    Object.prototype.$name = function()
    {
      if(typeof this.$_name === 'undefined')
      {
        this.$_name = '$$_'+this.$id();
        window[this.$_name] = this;
      }
      return this.$_name;
    };
  }
)();

var Settings = undefined;

var Status = undefined;

var WorldDimX = 20;
var WorldDimY = 20;
var World = undefined;

var Machine = undefined;
var Compiler = undefined;

var SettingsView = undefined;
var WorldView = undefined;
var MachineView = undefined;

var Filer = undefined;
var Runner = undefined;

function main()
{
  Settings = new SettingsClass();
  Status = new StatusClass(Settings, 'status');
  World = new WorldClass(WorldDimX, WorldDimY);
  Machine = new MachineClass(World);
  Compiler = new CompilerClass(Machine);
  SettingsView = new SettingsViewClass(Settings, 'tab_settings');
  WorldView = new WorldViewClass(Status, World, 'world_controller', 'world_canvas');
  MachineView = new MachineViewClass(Machine, 'tab_machine');
  Filer = new FilerClass(Status, 'program', World, Machine, WorldView, MachineView);
  Runner = new RunnerClass(Settings, Status, Machine, WorldView, MachineView);
}

function reset()
{
  Status.clear();
  Machine.reset();
  MachineView.draw();
}

function runStop()
{
  Runner.runStop();
}

function step()
{
  Runner.step();
}

function load()
{
  Status.clear();
  var files = document.getElementById('file').files;
  if(files.length != 1)
  {
    Status.setError('First select file');
    return;
  }
  var reader = new FileReader();
  reader.onerror = function(event)
  {
    Status.setError('Error in loading');
  };
  reader.onload = function(event)
  {
    Filer.load(reader.result);
  };
  reader.readAsText(files[0]);
  document.getElementById('file_name').value = files[0].name;
}

function save()
{
  Status.clear();
  var blob= new Blob([Filer.save()], {type:'text/plain'});
  var download = document.createElement('a');
  download.download = document.getElementById('file_name').value;
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
  Status.setMessage('Saved');
}

function get(name)
{
  Status.clear();
  var xhttp = new XMLHttpRequest();
  xhttp.onerror = function()
  {
    Status.setError('Error in get example');
  };
  xhttp.onload = function(event)
  {
    Filer.load(this.response);
  };
  xhttp.open('GET', 'examples/'+name, true);
  xhttp.send();
  document.getElementById('file_name').value = name;
}

function compile()
{
  Status.clear();
  var result = Compiler.compile(document.getElementById('program').value);
  if(result !== true)
  {
    Status.setError(result);
    MachineView.init();
    return;
  }
  Status.setMessage('Compiled');
  MachineView.init();
  MachineView.draw();
}
