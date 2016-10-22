function FilerClass(status, programID, world, machine, worldView, machineView)
{
  this.status = status;
  this.program = document.getElementById(programID);
  this.world = world;
  this.machine = machine;
  this.worldView = worldView;
  this.machineView = machineView;

  this.load = function(text)
  {
    var data = JSON.parse(text);
    if(data.hasOwnProperty('program') === false)
    {
      status.setError('Bad file format: missing program');
      return;
    }
    this.program.value = data.program;
    if(data.hasOwnProperty('world') === false)
    {
      status.setError('Bad file format: missing world');
      return;
    }
    var result = this.world.load(data.world);
    if(result !== true)
    {
      status.setError('Bad file format: '+result);
      return;
    }
    this.worldView.draw();
    this.machine.unSet();
    this.machineView.init();
    status.setMessage('Loaded');
  };

  this.save = function()
  {
    return JSON.stringify(
      {
        'program': this.program.value,
        'world':   world.save()
      }
    );
  };
}
