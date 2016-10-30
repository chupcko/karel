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

var WorldDimensionX = 20;
var WorldDimensionY = 20;
var World = undefined;

var Machine = undefined;
var Compiler = undefined;

var SettingsView = undefined;
var WorldView = undefined;
var MachineView = undefined;

var File = undefined;
var Runner = undefined;

function main()
{
  Settings = new SettingsClass();
  Status = new StatusClass(Settings, 'status');
  World = new WorldClass(WorldDimensionX, WorldDimensionY);
  Machine = new MachineClass(World);
  Compiler = new CompilerClass(Machine);

  SettingsView = new SettingsViewClass(Settings, 'tab_settings');
  WorldView = new WorldViewClass(Status, World, 'world_controller', 'world_canvas');
  MachineView = new MachineViewClass(Machine, 'tab_machine');

  File = new FileClass(Status, 'program', World, Machine, Compiler, WorldView, MachineView);
  FileView = new FileViewClass(Status, File, 'tab_file');
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
  File.loadProgram(files)
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
  File.loadWorld(files)
  document.getElementById('world_file_name').value = files[0].name;
}

function saveProgram()
{
  File.saveProgram(document.getElementById('program_file_name').value)
}

function saveWorld()
{
  File.saveWorld(document.getElementById('world_file_name').value)
}

function getProgram(name)
{
  File.getProgram('examples/'+name+'.kp');
  document.getElementById('program_file_name').value = name+'.kp';
}

function getWorld(name)
{
  File.getWorld('examples/'+name+'.kw');
  document.getElementById('world_file_name').value = name+'.kw';
}

function getBoth(name)
{
  getProgram(name);
  getWorld(name);
}
