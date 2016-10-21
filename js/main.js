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
  Runner = new RunnerClass(Settings, Status, Machine, WorldView, MachineView);
}

function compile()
{
  Status.clear();
  var result = Compiler.compile(document.getElementById('program').value);
  if(result === true)
    Status.setMessage('Compiled');
  else
    Status.setError(result);
  MachineView.init();
  if(result === true)
    MachineView.draw();
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
