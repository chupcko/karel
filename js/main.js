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

  Filer = new FilerClass(Status, 'program', World, Machine, Compiler, WorldView, MachineView);
  Runner = new RunnerClass(Settings, Status, Machine, WorldView, MachineView);
}

function loadProgram()
{
  var files = document.getElementById('program_file').files;
  if(files.length != 1)
  {
    Status.setError('First select program file');
    return;
  }
  Filer.loadProgram(files)
  document.getElementById('program_file_name').value = files[0].name;
}

function loadWorld()
{
  var files = document.getElementById('world_file').files;
  if(files.length != 1)
  {
    Status.setError('First select world file');
    return;
  }
  Filer.loadWorld(files)
  document.getElementById('world_file_name').value = files[0].name;
}

function saveProgram()
{
  Filer.saveProgram(document.getElementById('program_file_name').value)
}

function saveWorld()
{
  Filer.saveWorld(document.getElementById('world_file_name').value)
}

function getProgram(name)
{
  Filer.getProgram('examples/'+name+'.kp');
  document.getElementById('program_file_name').value = name+'.kp';
}

function getWorld(name)
{
  Filer.getWorld('examples/'+name+'.kw');
  document.getElementById('world_file_name').value = name+'.kw';
}

function getBoth(name)
{
  getProgram(name);
  getWorld(name);
}
